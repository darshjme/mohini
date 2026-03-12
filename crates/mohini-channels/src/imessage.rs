//! iMessage channel adapter (macOS only via `imsg` CLI).
//!
//! Sends and receives iMessages by shelling out to the `imsg` command-line tool.
//! On non-macOS platforms, all methods return an unsupported-platform error.
//! Supports SMS fallback when iMessage delivery fails, and file attachments.

use crate::types::{ChannelAdapter, ChannelContent, ChannelMessage, ChannelType, ChannelUser};
use async_trait::async_trait;
use chrono::Utc;
use futures::Stream;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fmt;
use std::pin::Pin;
use std::sync::Arc;
use std::time::Duration;
use tokio::sync::{mpsc, watch};
use tracing::{debug, info, warn};

/// Default path to the imsg CLI binary.
const DEFAULT_IMSG_CLI_PATH: &str = "imsg";

/// Polling interval for checking new messages.
const POLL_INTERVAL: Duration = Duration::from_secs(3);

// ---------------------------------------------------------------------------
// Error types
// ---------------------------------------------------------------------------

/// Errors specific to iMessage adapter operations.
#[derive(Debug)]
pub enum IMessageError {
    /// Platform is not macOS — iMessage is unsupported.
    UnsupportedPlatform,
    /// The imsg CLI command failed.
    CliError { exit_code: Option<i32>, stderr: String },
    /// Failed to parse output from imsg CLI.
    ParseError(String),
    /// iMessage delivery failed (may fall back to SMS).
    DeliveryFailed(String),
    /// Attachment error.
    AttachmentError(String),
}

impl fmt::Display for IMessageError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::UnsupportedPlatform => {
                write!(f, "iMessage is only supported on macOS")
            }
            Self::CliError { exit_code, stderr } => {
                write!(
                    f,
                    "imsg CLI error (exit code {:?}): {}",
                    exit_code, stderr
                )
            }
            Self::ParseError(msg) => write!(f, "iMessage parse error: {msg}"),
            Self::DeliveryFailed(msg) => write!(f, "iMessage delivery failed: {msg}"),
            Self::AttachmentError(msg) => write!(f, "iMessage attachment error: {msg}"),
        }
    }
}

impl std::error::Error for IMessageError {}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

/// Configuration for the iMessage adapter.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IMessageConfig {
    /// Path to the imsg CLI binary.
    #[serde(default = "default_imsg_cli_path")]
    pub imsg_cli_path: String,
    /// Whether to fall back to SMS when iMessage delivery fails.
    #[serde(default)]
    pub fallback_to_sms: bool,
    /// Directory for storing/reading attachments.
    #[serde(default = "default_attachment_dir")]
    pub attachment_dir: String,
    /// Allowed contacts (phone numbers or Apple IDs). Empty = allow all.
    #[serde(default)]
    pub allowed_contacts: Vec<String>,
}

fn default_imsg_cli_path() -> String {
    DEFAULT_IMSG_CLI_PATH.to_string()
}

fn default_attachment_dir() -> String {
    "/tmp/mohini-imessage-attachments".to_string()
}

impl Default for IMessageConfig {
    fn default() -> Self {
        Self {
            imsg_cli_path: default_imsg_cli_path(),
            fallback_to_sms: false,
            attachment_dir: default_attachment_dir(),
            allowed_contacts: Vec::new(),
        }
    }
}

// ---------------------------------------------------------------------------
// Platform check
// ---------------------------------------------------------------------------

/// Returns `true` if running on macOS.
fn is_macos() -> bool {
    cfg!(target_os = "macos")
}

/// Returns an error if not on macOS.
fn require_macos() -> Result<(), IMessageError> {
    if is_macos() {
        Ok(())
    } else {
        Err(IMessageError::UnsupportedPlatform)
    }
}

// ---------------------------------------------------------------------------
// Adapter
// ---------------------------------------------------------------------------

/// iMessage adapter that communicates via the `imsg` CLI tool.
///
/// On non-macOS platforms, all operations return [`IMessageError::UnsupportedPlatform`].
pub struct IMessageAdapter {
    config: IMessageConfig,
    shutdown_tx: Arc<watch::Sender<bool>>,
    shutdown_rx: watch::Receiver<bool>,
}

impl IMessageAdapter {
    /// Create a new iMessage adapter from config.
    pub fn new(config: IMessageConfig) -> Self {
        let (shutdown_tx, shutdown_rx) = watch::channel(false);
        Self {
            config,
            shutdown_tx: Arc::new(shutdown_tx),
            shutdown_rx,
        }
    }

    /// Send a text message via the imsg CLI.
    ///
    /// Runs: `imsg send <recipient> "<text>"`
    async fn cli_send_message(
        &self,
        recipient: &str,
        text: &str,
    ) -> Result<(), IMessageError> {
        require_macos()?;

        let output = tokio::process::Command::new(&self.config.imsg_cli_path)
            .args(["send", recipient, text])
            .output()
            .await
            .map_err(|e| IMessageError::CliError {
                exit_code: None,
                stderr: e.to_string(),
            })?;

        if !output.status.success() {
            let stderr = String::from_utf8_lossy(&output.stderr).to_string();
            return Err(IMessageError::CliError {
                exit_code: output.status.code(),
                stderr,
            });
        }

        Ok(())
    }

    /// Send an SMS message via the imsg CLI (fallback).
    ///
    /// Runs: `imsg send-sms <recipient> "<text>"`
    async fn cli_send_sms(
        &self,
        recipient: &str,
        text: &str,
    ) -> Result<(), IMessageError> {
        require_macos()?;

        let output = tokio::process::Command::new(&self.config.imsg_cli_path)
            .args(["send-sms", recipient, text])
            .output()
            .await
            .map_err(|e| IMessageError::CliError {
                exit_code: None,
                stderr: e.to_string(),
            })?;

        if !output.status.success() {
            let stderr = String::from_utf8_lossy(&output.stderr).to_string();
            return Err(IMessageError::CliError {
                exit_code: output.status.code(),
                stderr,
            });
        }

        Ok(())
    }

    /// Send a message with an attachment via the imsg CLI.
    ///
    /// Runs: `imsg send <recipient> "<text>" --attachment <path>`
    async fn cli_send_with_attachment(
        &self,
        recipient: &str,
        text: &str,
        attachment_path: &str,
    ) -> Result<(), IMessageError> {
        require_macos()?;

        let output = tokio::process::Command::new(&self.config.imsg_cli_path)
            .args(["send", recipient, text, "--attachment", attachment_path])
            .output()
            .await
            .map_err(|e| IMessageError::CliError {
                exit_code: None,
                stderr: e.to_string(),
            })?;

        if !output.status.success() {
            let stderr = String::from_utf8_lossy(&output.stderr).to_string();
            return Err(IMessageError::CliError {
                exit_code: output.status.code(),
                stderr,
            });
        }

        Ok(())
    }

    /// Send a text message with SMS fallback if iMessage fails.
    async fn send_with_fallback(
        &self,
        recipient: &str,
        text: &str,
    ) -> Result<(), IMessageError> {
        match self.cli_send_message(recipient, text).await {
            Ok(()) => Ok(()),
            Err(e) => {
                if self.config.fallback_to_sms {
                    warn!(
                        "iMessage delivery failed, falling back to SMS: {}",
                        e
                    );
                    self.cli_send_sms(recipient, text).await
                } else {
                    Err(e)
                }
            }
        }
    }

    /// Poll for new messages via the imsg CLI.
    ///
    /// Runs: `imsg receive --json`
    #[allow(dead_code)]
    async fn cli_receive_messages(
        &self,
    ) -> Result<Vec<serde_json::Value>, IMessageError> {
        require_macos()?;

        let output = tokio::process::Command::new(&self.config.imsg_cli_path)
            .args(["receive", "--json"])
            .output()
            .await
            .map_err(|e| IMessageError::CliError {
                exit_code: None,
                stderr: e.to_string(),
            })?;

        if !output.status.success() {
            let stderr = String::from_utf8_lossy(&output.stderr).to_string();
            return Err(IMessageError::CliError {
                exit_code: output.status.code(),
                stderr,
            });
        }

        let stdout = String::from_utf8_lossy(&output.stdout);
        let messages: Vec<serde_json::Value> = serde_json::from_str(&stdout)
            .map_err(|e| IMessageError::ParseError(e.to_string()))?;
        Ok(messages)
    }

    #[allow(dead_code)]
    fn is_allowed(&self, contact: &str) -> bool {
        self.config.allowed_contacts.is_empty()
            || self.config.allowed_contacts.iter().any(|c| c == contact)
    }
}

#[async_trait]
impl ChannelAdapter for IMessageAdapter {
    fn name(&self) -> &str {
        "imessage"
    }

    fn channel_type(&self) -> ChannelType {
        ChannelType::IMessage
    }

    async fn start(
        &self,
    ) -> Result<Pin<Box<dyn Stream<Item = ChannelMessage> + Send>>, Box<dyn std::error::Error>>
    {
        if !is_macos() {
            return Err(Box::new(IMessageError::UnsupportedPlatform));
        }

        let (tx, rx) = mpsc::channel::<ChannelMessage>(256);
        let config = self.config.clone();
        let mut shutdown_rx = self.shutdown_rx.clone();

        info!("Starting iMessage adapter (polling every {:?})", POLL_INTERVAL);

        tokio::spawn(async move {
            loop {
                tokio::select! {
                    _ = shutdown_rx.changed() => {
                        info!("iMessage adapter shutting down");
                        break;
                    }
                    _ = tokio::time::sleep(POLL_INTERVAL) => {}
                }

                // Poll for new messages via imsg CLI
                let output = match tokio::process::Command::new(&config.imsg_cli_path)
                    .args(["receive", "--json"])
                    .output()
                    .await
                {
                    Ok(o) => o,
                    Err(e) => {
                        debug!("iMessage poll error: {e}");
                        continue;
                    }
                };

                if !output.status.success() {
                    continue;
                }

                let stdout = String::from_utf8_lossy(&output.stdout);
                let messages: Vec<serde_json::Value> = match serde_json::from_str(&stdout) {
                    Ok(m) => m,
                    Err(_) => continue,
                };

                for msg in messages {
                    let sender_id = msg["sender"].as_str().unwrap_or("").to_string();
                    if sender_id.is_empty() {
                        continue;
                    }

                    if !config.allowed_contacts.is_empty()
                        && !config.allowed_contacts.iter().any(|c| c == &sender_id)
                    {
                        continue;
                    }

                    let text = msg["text"].as_str().unwrap_or("");
                    if text.is_empty() {
                        continue;
                    }

                    let display_name = msg["sender_name"]
                        .as_str()
                        .unwrap_or(&sender_id)
                        .to_string();

                    let is_group = msg["is_group"].as_bool().unwrap_or(false);
                    let thread_id = msg["chat_id"].as_str().map(String::from);

                    let content = if text.starts_with('/') {
                        let parts: Vec<&str> = text.splitn(2, ' ').collect();
                        let cmd = parts[0].trim_start_matches('/');
                        let args: Vec<String> = parts
                            .get(1)
                            .map(|a| a.split_whitespace().map(String::from).collect())
                            .unwrap_or_default();
                        ChannelContent::Command {
                            name: cmd.to_string(),
                            args,
                        }
                    } else {
                        ChannelContent::Text(text.to_string())
                    };

                    let mut metadata = HashMap::new();

                    // Note attachments in metadata
                    if let Some(attachments) = msg.get("attachments") {
                        if let Some(arr) = attachments.as_array() {
                            if !arr.is_empty() {
                                metadata.insert(
                                    "attachment_count".to_string(),
                                    serde_json::Value::Number(
                                        serde_json::Number::from(arr.len()),
                                    ),
                                );
                            }
                        }
                    }

                    let message_id = msg["message_id"]
                        .as_str()
                        .unwrap_or("0")
                        .to_string();

                    let channel_msg = ChannelMessage {
                        channel: ChannelType::IMessage,
                        platform_message_id: message_id,
                        sender: ChannelUser {
                            platform_id: sender_id,
                            display_name,
                            mohini_user: None,
                        },
                        content,
                        target_agent: None,
                        timestamp: Utc::now(),
                        is_group,
                        thread_id,
                        metadata,
                    };

                    if tx.send(channel_msg).await.is_err() {
                        break;
                    }
                }
            }
        });

        Ok(Box::pin(tokio_stream::wrappers::ReceiverStream::new(rx)))
    }

    async fn send(
        &self,
        user: &ChannelUser,
        content: ChannelContent,
    ) -> Result<(), Box<dyn std::error::Error>> {
        if !is_macos() {
            return Err(Box::new(IMessageError::UnsupportedPlatform));
        }

        match content {
            ChannelContent::Text(text) => {
                self.send_with_fallback(&user.platform_id, &text).await?;
            }
            ChannelContent::File { url, filename } => {
                // If it looks like a local path, send as attachment
                if url.starts_with('/') || url.starts_with("file://") {
                    let path = url.strip_prefix("file://").unwrap_or(&url);
                    self.cli_send_with_attachment(&user.platform_id, &filename, path)
                        .await?;
                } else {
                    self.send_with_fallback(
                        &user.platform_id,
                        &format!("[File: {filename}] {url}"),
                    )
                    .await?;
                }
            }
            ChannelContent::FileData {
                data,
                filename,
                mime_type: _,
            } => {
                // Write data to attachment_dir then send
                let path = format!("{}/{}", self.config.attachment_dir, filename);
                tokio::fs::create_dir_all(&self.config.attachment_dir)
                    .await
                    .map_err(|e| IMessageError::AttachmentError(e.to_string()))?;
                tokio::fs::write(&path, &data)
                    .await
                    .map_err(|e| IMessageError::AttachmentError(e.to_string()))?;
                self.cli_send_with_attachment(&user.platform_id, "", &path)
                    .await?;
            }
            ChannelContent::Image { url, caption } => {
                let text = caption.unwrap_or_else(|| url.clone());
                if url.starts_with('/') || url.starts_with("file://") {
                    let path = url.strip_prefix("file://").unwrap_or(&url);
                    self.cli_send_with_attachment(&user.platform_id, &text, path)
                        .await?;
                } else {
                    self.send_with_fallback(&user.platform_id, &text).await?;
                }
            }
            _ => {
                warn!("iMessage: unsupported content type, sending fallback text");
                self.send_with_fallback(&user.platform_id, "(Unsupported content type)")
                    .await?;
            }
        }
        Ok(())
    }

    async fn stop(&self) -> Result<(), Box<dyn std::error::Error>> {
        let _ = self.shutdown_tx.send(true);
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_imessage_config_defaults() {
        let config = IMessageConfig::default();
        assert_eq!(config.imsg_cli_path, "imsg");
        assert!(!config.fallback_to_sms);
        assert_eq!(config.attachment_dir, "/tmp/mohini-imessage-attachments");
        assert!(config.allowed_contacts.is_empty());
    }

    #[test]
    fn test_imessage_config_serde() {
        let config = IMessageConfig {
            imsg_cli_path: "/usr/local/bin/imsg".to_string(),
            fallback_to_sms: true,
            attachment_dir: "/tmp/imsg-att".to_string(),
            allowed_contacts: vec!["+15551234567".to_string(), "user@icloud.com".to_string()],
        };
        let json = serde_json::to_string(&config).unwrap();
        let back: IMessageConfig = serde_json::from_str(&json).unwrap();
        assert_eq!(back.imsg_cli_path, "/usr/local/bin/imsg");
        assert!(back.fallback_to_sms);
        assert_eq!(back.attachment_dir, "/tmp/imsg-att");
        assert_eq!(back.allowed_contacts.len(), 2);
    }

    #[test]
    fn test_imessage_config_serde_defaults() {
        let json = "{}";
        let config: IMessageConfig = serde_json::from_str(json).unwrap();
        assert_eq!(config.imsg_cli_path, "imsg");
        assert!(!config.fallback_to_sms);
    }

    #[test]
    fn test_imessage_adapter_creation() {
        let adapter = IMessageAdapter::new(IMessageConfig::default());
        assert_eq!(adapter.name(), "imessage");
        assert_eq!(adapter.channel_type(), ChannelType::IMessage);
    }

    #[test]
    fn test_imessage_error_display() {
        let err = IMessageError::UnsupportedPlatform;
        assert!(err.to_string().contains("macOS"));

        let err = IMessageError::CliError {
            exit_code: Some(1),
            stderr: "command not found".to_string(),
        };
        assert!(err.to_string().contains("command not found"));
        assert!(err.to_string().contains("1"));

        let err = IMessageError::ParseError("bad json".to_string());
        assert!(err.to_string().contains("bad json"));

        let err = IMessageError::DeliveryFailed("network error".to_string());
        assert!(err.to_string().contains("network error"));

        let err = IMessageError::AttachmentError("file not found".to_string());
        assert!(err.to_string().contains("file not found"));
    }

    #[test]
    fn test_imessage_platform_detection() {
        // On Linux CI, is_macos() should be false
        // On macOS dev machines, it should be true
        // Either way, the function should not panic
        let _result = is_macos();
    }

    #[test]
    fn test_imessage_require_macos() {
        let result = require_macos();
        if cfg!(target_os = "macos") {
            assert!(result.is_ok());
        } else {
            assert!(result.is_err());
            assert!(result.unwrap_err().to_string().contains("macOS"));
        }
    }

    #[test]
    fn test_imessage_allowed_check() {
        let adapter = IMessageAdapter::new(IMessageConfig {
            allowed_contacts: vec!["+15551234567".to_string()],
            ..Default::default()
        });
        assert!(adapter.is_allowed("+15551234567"));
        assert!(!adapter.is_allowed("+19999999999"));
    }

    #[test]
    fn test_imessage_allowed_check_empty_allows_all() {
        let adapter = IMessageAdapter::new(IMessageConfig::default());
        assert!(adapter.is_allowed("anyone@icloud.com"));
    }

    #[test]
    fn test_imessage_message_construction_text() {
        let content = ChannelContent::Text("Hello from iMessage".to_string());
        let json = serde_json::to_string(&content).unwrap();
        assert!(json.contains("Hello from iMessage"));
    }

    #[test]
    fn test_imessage_message_construction_command() {
        let text = "/help me";
        let parts: Vec<&str> = text.splitn(2, ' ').collect();
        let cmd = parts[0].trim_start_matches('/');
        let args: Vec<String> = parts
            .get(1)
            .map(|a| a.split_whitespace().map(String::from).collect())
            .unwrap_or_default();
        let content = ChannelContent::Command {
            name: cmd.to_string(),
            args,
        };
        match content {
            ChannelContent::Command { name, args } => {
                assert_eq!(name, "help");
                assert_eq!(args, vec!["me"]);
            }
            _ => panic!("Expected Command variant"),
        }
    }

    #[test]
    fn test_imessage_channel_type_serde() {
        let ct = ChannelType::IMessage;
        let json = serde_json::to_string(&ct).unwrap();
        let back: ChannelType = serde_json::from_str(&json).unwrap();
        assert_eq!(back, ChannelType::IMessage);
    }
}
