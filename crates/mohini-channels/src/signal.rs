//! Signal channel adapter.
//!
//! Uses signal-cli's HTTP daemon mode for sending/receiving messages via its REST API.
//! Supports direct messages, group messages, attachments (base64), and delivery/read receipts.
//! Requires signal-cli to be installed, registered with a phone number, and running in
//! REST API mode (`signal-cli -a +NUMBER daemon --http`).

use crate::types::{ChannelAdapter, ChannelContent, ChannelMessage, ChannelType, ChannelUser};
use async_trait::async_trait;
use base64::Engine as _;
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

/// Default signal-cli REST API URL.
const DEFAULT_SIGNAL_CLI_URL: &str = "http://localhost:8080";

/// Polling interval for SSE/long-poll fallback.
const POLL_INTERVAL: Duration = Duration::from_secs(2);

// ---------------------------------------------------------------------------
// Error types
// ---------------------------------------------------------------------------

/// Errors specific to signal-cli communication.
#[derive(Debug)]
pub enum SignalError {
    /// HTTP request to signal-cli failed.
    HttpError(String),
    /// signal-cli returned a non-success status code.
    ApiError { status: u16, body: String },
    /// Failed to parse response from signal-cli.
    ParseError(String),
    /// Attachment encoding/decoding error.
    AttachmentError(String),
    /// Group operation error.
    GroupError(String),
}

impl fmt::Display for SignalError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::HttpError(msg) => write!(f, "Signal HTTP error: {msg}"),
            Self::ApiError { status, body } => {
                write!(f, "Signal API error {status}: {body}")
            }
            Self::ParseError(msg) => write!(f, "Signal parse error: {msg}"),
            Self::AttachmentError(msg) => write!(f, "Signal attachment error: {msg}"),
            Self::GroupError(msg) => write!(f, "Signal group error: {msg}"),
        }
    }
}

impl std::error::Error for SignalError {}

impl From<reqwest::Error> for SignalError {
    fn from(e: reqwest::Error) -> Self {
        Self::HttpError(e.to_string())
    }
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

/// Configuration for the Signal adapter.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SignalConfig {
    /// URL of the signal-cli REST API daemon.
    #[serde(default = "default_signal_cli_url")]
    pub signal_cli_url: String,
    /// Registered phone number (E.164 format, e.g. "+15551234567").
    pub phone_number: String,
    /// Trust all identity keys without prompting.
    #[serde(default)]
    pub trust_all_keys: bool,
    /// Allowed phone numbers (empty = allow all).
    #[serde(default)]
    pub allowed_users: Vec<String>,
}

fn default_signal_cli_url() -> String {
    DEFAULT_SIGNAL_CLI_URL.to_string()
}

impl Default for SignalConfig {
    fn default() -> Self {
        Self {
            signal_cli_url: default_signal_cli_url(),
            phone_number: String::new(),
            trust_all_keys: false,
            allowed_users: Vec::new(),
        }
    }
}

// ---------------------------------------------------------------------------
// Receipt types
// ---------------------------------------------------------------------------

/// Type of receipt received from Signal.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ReceiptType {
    Delivery,
    Read,
}

/// A delivery or read receipt from Signal.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SignalReceipt {
    /// Who sent the receipt (the recipient of the original message).
    pub sender: String,
    /// Timestamp of the original message this receipt refers to.
    pub timestamp: u64,
    /// Type of receipt.
    pub receipt_type: ReceiptType,
}

// ---------------------------------------------------------------------------
// Attachment helper
// ---------------------------------------------------------------------------

/// An attachment to send via Signal (base64 encoded).
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SignalAttachment {
    /// Base64-encoded file data.
    pub data: String,
    /// MIME type (e.g. "image/png").
    pub content_type: String,
    /// Optional filename.
    pub filename: Option<String>,
}

impl SignalAttachment {
    /// Create an attachment from raw bytes.
    pub fn from_bytes(data: &[u8], content_type: &str, filename: Option<String>) -> Self {
        Self {
            data: base64::engine::general_purpose::STANDARD.encode(data),
            content_type: content_type.to_string(),
            filename,
        }
    }
}

// ---------------------------------------------------------------------------
// Adapter
// ---------------------------------------------------------------------------

/// Signal messaging adapter via signal-cli HTTP daemon.
pub struct SignalAdapter {
    config: SignalConfig,
    client: reqwest::Client,
    shutdown_tx: Arc<watch::Sender<bool>>,
    shutdown_rx: watch::Receiver<bool>,
}

impl SignalAdapter {
    /// Create a new Signal adapter from config.
    pub fn new(config: SignalConfig) -> Self {
        let (shutdown_tx, shutdown_rx) = watch::channel(false);
        Self {
            config,
            client: reqwest::Client::new(),
            shutdown_tx: Arc::new(shutdown_tx),
            shutdown_rx,
        }
    }

    /// Convenience constructor for simple cases.
    pub fn from_url_and_phone(
        api_url: String,
        phone_number: String,
        allowed_users: Vec<String>,
    ) -> Self {
        Self::new(SignalConfig {
            signal_cli_url: api_url,
            phone_number,
            allowed_users,
            ..Default::default()
        })
    }

    /// Send a text message to a single recipient.
    async fn api_send_message(
        &self,
        recipient: &str,
        text: &str,
    ) -> Result<(), SignalError> {
        let url = format!("{}/v2/send", self.config.signal_cli_url);

        let body = serde_json::json!({
            "message": text,
            "number": self.config.phone_number,
            "recipients": [recipient],
        });

        let resp = self.client.post(&url).json(&body).send().await?;

        if !resp.status().is_success() {
            let status = resp.status().as_u16();
            let body = resp.text().await.unwrap_or_default();
            return Err(SignalError::ApiError { status, body });
        }

        Ok(())
    }

    /// Send a message with base64-encoded attachments.
    async fn api_send_message_with_attachments(
        &self,
        recipient: &str,
        text: &str,
        attachments: &[SignalAttachment],
    ) -> Result<(), SignalError> {
        let url = format!("{}/v2/send", self.config.signal_cli_url);

        let att_json: Vec<serde_json::Value> = attachments
            .iter()
            .map(|a| {
                let mut obj = serde_json::json!({
                    "data": a.data,
                    "contentType": a.content_type,
                });
                if let Some(ref name) = a.filename {
                    obj["filename"] = serde_json::Value::String(name.clone());
                }
                obj
            })
            .collect();

        let body = serde_json::json!({
            "message": text,
            "number": self.config.phone_number,
            "recipients": [recipient],
            "base64_attachments": att_json,
        });

        let resp = self.client.post(&url).json(&body).send().await?;

        if !resp.status().is_success() {
            let status = resp.status().as_u16();
            let body = resp.text().await.unwrap_or_default();
            return Err(SignalError::ApiError { status, body });
        }

        Ok(())
    }

    /// Send a text message to a group.
    async fn api_send_group_message(
        &self,
        group_id: &str,
        text: &str,
    ) -> Result<(), SignalError> {
        let url = format!("{}/v2/send", self.config.signal_cli_url);

        let body = serde_json::json!({
            "message": text,
            "number": self.config.phone_number,
            "recipients": [],
            "group_id": group_id,
        });

        let resp = self.client.post(&url).json(&body).send().await?;

        if !resp.status().is_success() {
            let status = resp.status().as_u16();
            let body = resp.text().await.unwrap_or_default();
            return Err(SignalError::ApiError { status, body });
        }

        Ok(())
    }

    /// Trust all keys for a recipient (if trust_all_keys is enabled).
    #[allow(dead_code)]
    async fn trust_identity(&self, recipient: &str) -> Result<(), SignalError> {
        if !self.config.trust_all_keys {
            return Ok(());
        }
        let url = format!(
            "{}/v1/identities/{}/trust/{}",
            self.config.signal_cli_url, self.config.phone_number, recipient
        );
        let body = serde_json::json!({"trust_all_known_keys": true});
        let resp = self.client.put(&url).json(&body).send().await?;
        if !resp.status().is_success() {
            let status = resp.status().as_u16();
            let body_text = resp.text().await.unwrap_or_default();
            return Err(SignalError::ApiError {
                status,
                body: body_text,
            });
        }
        Ok(())
    }

    /// Poll for incoming messages from the signal-cli REST API.
    #[allow(dead_code)]
    async fn receive_messages(
        &self,
    ) -> Result<Vec<serde_json::Value>, SignalError> {
        let url = format!(
            "{}/v1/receive/{}",
            self.config.signal_cli_url, self.config.phone_number
        );

        let resp = self.client.get(&url).send().await?;

        if !resp.status().is_success() {
            return Ok(vec![]);
        }

        let messages: Vec<serde_json::Value> = resp
            .json()
            .await
            .map_err(|e| SignalError::ParseError(e.to_string()))?;
        Ok(messages)
    }

    /// Parse a receipt from an envelope JSON value.
    pub fn parse_receipt(envelope: &serde_json::Value) -> Option<SignalReceipt> {
        let receipt_msg = envelope.get("receiptMessage")?;
        let sender = envelope.get("source")?.as_str()?.to_string();

        let is_delivery = receipt_msg
            .get("isDelivery")
            .and_then(|v| v.as_bool())
            .unwrap_or(false);
        let is_read = receipt_msg
            .get("isRead")
            .and_then(|v| v.as_bool())
            .unwrap_or(false);

        let receipt_type = if is_read {
            ReceiptType::Read
        } else if is_delivery {
            ReceiptType::Delivery
        } else {
            return None;
        };

        let timestamps = receipt_msg.get("timestamps")?;
        let timestamp = timestamps
            .as_array()
            .and_then(|arr| arr.first())
            .and_then(|v| v.as_u64())
            .unwrap_or(0);

        Some(SignalReceipt {
            sender,
            timestamp,
            receipt_type,
        })
    }

    #[allow(dead_code)]
    fn is_allowed(&self, phone: &str) -> bool {
        self.config.allowed_users.is_empty()
            || self.config.allowed_users.iter().any(|u| u == phone)
    }
}

#[async_trait]
impl ChannelAdapter for SignalAdapter {
    fn name(&self) -> &str {
        "signal"
    }

    fn channel_type(&self) -> ChannelType {
        ChannelType::Signal
    }

    async fn start(
        &self,
    ) -> Result<Pin<Box<dyn Stream<Item = ChannelMessage> + Send>>, Box<dyn std::error::Error>>
    {
        let (tx, rx) = mpsc::channel::<ChannelMessage>(256);
        let config = self.config.clone();
        let client = self.client.clone();
        let mut shutdown_rx = self.shutdown_rx.clone();

        info!(
            "Starting Signal adapter (polling {} every {:?})",
            config.signal_cli_url, POLL_INTERVAL
        );

        tokio::spawn(async move {
            loop {
                tokio::select! {
                    _ = shutdown_rx.changed() => {
                        info!("Signal adapter shutting down");
                        break;
                    }
                    _ = tokio::time::sleep(POLL_INTERVAL) => {}
                }

                // Poll for new messages
                let url = format!("{}/v1/receive/{}", config.signal_cli_url, config.phone_number);
                let resp = match client.get(&url).send().await {
                    Ok(r) => r,
                    Err(e) => {
                        debug!("Signal poll error: {e}");
                        continue;
                    }
                };

                if !resp.status().is_success() {
                    continue;
                }

                let messages: Vec<serde_json::Value> = match resp.json().await {
                    Ok(m) => m,
                    Err(_) => continue,
                };

                for msg in messages {
                    let envelope = msg.get("envelope").unwrap_or(&msg);

                    // Handle receipts (log them but don't forward as messages)
                    if let Some(receipt) = SignalAdapter::parse_receipt(envelope) {
                        debug!(
                            "Signal {:?} receipt from {} for timestamp {}",
                            receipt.receipt_type, receipt.sender, receipt.timestamp
                        );
                        continue;
                    }

                    let source = envelope["source"].as_str().unwrap_or("").to_string();

                    if source.is_empty() || source == config.phone_number {
                        continue;
                    }

                    if !config.allowed_users.is_empty()
                        && !config.allowed_users.iter().any(|u| u == &source)
                    {
                        continue;
                    }

                    let data_message = &envelope["dataMessage"];

                    // Extract text
                    let text = data_message["message"].as_str().unwrap_or("");
                    if text.is_empty() {
                        continue;
                    }

                    // Detect group messages
                    let group_info = data_message.get("groupInfo");
                    let is_group = group_info.is_some();
                    let group_id = group_info
                        .and_then(|g| g.get("groupId"))
                        .and_then(|v| v.as_str())
                        .map(String::from);

                    let source_name = envelope["sourceName"]
                        .as_str()
                        .unwrap_or(&source)
                        .to_string();

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

                    // Include group_id in metadata if present
                    if let Some(ref gid) = group_id {
                        metadata.insert(
                            "group_id".to_string(),
                            serde_json::Value::String(gid.clone()),
                        );
                    }

                    // Note attachments in metadata
                    if let Some(attachments) = data_message.get("attachments") {
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

                    let channel_msg = ChannelMessage {
                        channel: ChannelType::Signal,
                        platform_message_id: envelope["timestamp"]
                            .as_u64()
                            .unwrap_or(0)
                            .to_string(),
                        sender: ChannelUser {
                            platform_id: source.clone(),
                            display_name: source_name,
                            mohini_user: None,
                        },
                        content,
                        target_agent: None,
                        timestamp: Utc::now(),
                        is_group,
                        thread_id: group_id,
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
        match content {
            ChannelContent::Text(text) => {
                // Check if the platform_id looks like a group ID (base64 encoded)
                // Group IDs from Signal are typically longer base64 strings
                self.api_send_message(&user.platform_id, &text).await?;
            }
            ChannelContent::File { url, filename } => {
                // Send file URL as text with filename
                self.api_send_message(
                    &user.platform_id,
                    &format!("[File: {filename}] {url}"),
                )
                .await?;
            }
            ChannelContent::FileData {
                data,
                filename,
                mime_type,
            } => {
                let attachment = SignalAttachment::from_bytes(&data, &mime_type, Some(filename));
                self.api_send_message_with_attachments(&user.platform_id, "", &[attachment])
                    .await?;
            }
            ChannelContent::Image { url, caption } => {
                let text = caption.unwrap_or_else(|| url.clone());
                self.api_send_message(&user.platform_id, &text).await?;
            }
            _ => {
                warn!("Signal: unsupported content type, sending fallback text");
                self.api_send_message(&user.platform_id, "(Unsupported content type)")
                    .await?;
            }
        }
        Ok(())
    }

    async fn send_in_thread(
        &self,
        _user: &ChannelUser,
        content: ChannelContent,
        thread_id: &str,
    ) -> Result<(), Box<dyn std::error::Error>> {
        // thread_id is the group_id for Signal group messages
        let text = match content {
            ChannelContent::Text(t) => t,
            _ => "(Unsupported content type)".to_string(),
        };
        self.api_send_group_message(thread_id, &text).await?;
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
    fn test_signal_config_defaults() {
        let config = SignalConfig::default();
        assert_eq!(config.signal_cli_url, "http://localhost:8080");
        assert!(config.phone_number.is_empty());
        assert!(!config.trust_all_keys);
        assert!(config.allowed_users.is_empty());
    }

    #[test]
    fn test_signal_config_serde() {
        let config = SignalConfig {
            signal_cli_url: "http://localhost:9090".to_string(),
            phone_number: "+15551234567".to_string(),
            trust_all_keys: true,
            allowed_users: vec!["+15559876543".to_string()],
        };
        let json = serde_json::to_string(&config).unwrap();
        let back: SignalConfig = serde_json::from_str(&json).unwrap();
        assert_eq!(back.signal_cli_url, "http://localhost:9090");
        assert_eq!(back.phone_number, "+15551234567");
        assert!(back.trust_all_keys);
        assert_eq!(back.allowed_users.len(), 1);
    }

    #[test]
    fn test_signal_config_serde_defaults() {
        let json = r#"{"phone_number": "+15551234567"}"#;
        let config: SignalConfig = serde_json::from_str(json).unwrap();
        assert_eq!(config.signal_cli_url, "http://localhost:8080");
        assert!(!config.trust_all_keys);
    }

    #[test]
    fn test_signal_adapter_creation() {
        let adapter = SignalAdapter::new(SignalConfig {
            phone_number: "+1234567890".to_string(),
            ..Default::default()
        });
        assert_eq!(adapter.name(), "signal");
        assert_eq!(adapter.channel_type(), ChannelType::Signal);
    }

    #[test]
    fn test_signal_from_url_and_phone() {
        let adapter = SignalAdapter::from_url_and_phone(
            "http://localhost:8080".to_string(),
            "+1234567890".to_string(),
            vec![],
        );
        assert_eq!(adapter.config.signal_cli_url, "http://localhost:8080");
        assert_eq!(adapter.config.phone_number, "+1234567890");
    }

    #[test]
    fn test_signal_allowed_check() {
        let adapter = SignalAdapter::new(SignalConfig {
            phone_number: "+1234567890".to_string(),
            allowed_users: vec!["+9876543210".to_string()],
            ..Default::default()
        });
        assert!(adapter.is_allowed("+9876543210"));
        assert!(!adapter.is_allowed("+1111111111"));
    }

    #[test]
    fn test_signal_allowed_check_empty_allows_all() {
        let adapter = SignalAdapter::new(SignalConfig {
            phone_number: "+1234567890".to_string(),
            ..Default::default()
        });
        assert!(adapter.is_allowed("+anything"));
    }

    #[test]
    fn test_signal_attachment_from_bytes() {
        let data = b"hello world";
        let att = SignalAttachment::from_bytes(data, "text/plain", Some("test.txt".to_string()));
        assert_eq!(att.content_type, "text/plain");
        assert_eq!(att.filename, Some("test.txt".to_string()));
        // Verify base64 round-trip
        let decoded = base64::engine::general_purpose::STANDARD
            .decode(&att.data)
            .unwrap();
        assert_eq!(decoded, data);
    }

    #[test]
    fn test_signal_error_display() {
        let err = SignalError::HttpError("connection refused".to_string());
        assert!(err.to_string().contains("connection refused"));

        let err = SignalError::ApiError {
            status: 404,
            body: "not found".to_string(),
        };
        assert!(err.to_string().contains("404"));
        assert!(err.to_string().contains("not found"));

        let err = SignalError::ParseError("invalid json".to_string());
        assert!(err.to_string().contains("invalid json"));

        let err = SignalError::AttachmentError("too large".to_string());
        assert!(err.to_string().contains("too large"));

        let err = SignalError::GroupError("not a member".to_string());
        assert!(err.to_string().contains("not a member"));
    }

    #[test]
    fn test_signal_receipt_type_serde() {
        let rt = ReceiptType::Delivery;
        let json = serde_json::to_string(&rt).unwrap();
        let back: ReceiptType = serde_json::from_str(&json).unwrap();
        assert_eq!(back, ReceiptType::Delivery);

        let rt = ReceiptType::Read;
        let json = serde_json::to_string(&rt).unwrap();
        let back: ReceiptType = serde_json::from_str(&json).unwrap();
        assert_eq!(back, ReceiptType::Read);
    }

    #[test]
    fn test_parse_delivery_receipt() {
        let envelope = serde_json::json!({
            "source": "+15551234567",
            "receiptMessage": {
                "isDelivery": true,
                "isRead": false,
                "timestamps": [1234567890]
            }
        });
        let receipt = SignalAdapter::parse_receipt(&envelope).unwrap();
        assert_eq!(receipt.sender, "+15551234567");
        assert_eq!(receipt.timestamp, 1234567890);
        assert_eq!(receipt.receipt_type, ReceiptType::Delivery);
    }

    #[test]
    fn test_parse_read_receipt() {
        let envelope = serde_json::json!({
            "source": "+15559876543",
            "receiptMessage": {
                "isDelivery": false,
                "isRead": true,
                "timestamps": [9876543210u64]
            }
        });
        let receipt = SignalAdapter::parse_receipt(&envelope).unwrap();
        assert_eq!(receipt.receipt_type, ReceiptType::Read);
    }

    #[test]
    fn test_parse_receipt_returns_none_for_data_message() {
        let envelope = serde_json::json!({
            "source": "+15551234567",
            "dataMessage": {
                "message": "hello"
            }
        });
        assert!(SignalAdapter::parse_receipt(&envelope).is_none());
    }

    #[test]
    fn test_signal_receipt_serde() {
        let receipt = SignalReceipt {
            sender: "+15551234567".to_string(),
            timestamp: 1234567890,
            receipt_type: ReceiptType::Delivery,
        };
        let json = serde_json::to_string(&receipt).unwrap();
        let back: SignalReceipt = serde_json::from_str(&json).unwrap();
        assert_eq!(back.sender, receipt.sender);
        assert_eq!(back.timestamp, receipt.timestamp);
    }

    #[test]
    fn test_signal_message_construction_text() {
        let content = ChannelContent::Text("Hello Signal".to_string());
        let json = serde_json::to_string(&content).unwrap();
        assert!(json.contains("Hello Signal"));
    }

    #[test]
    fn test_signal_message_construction_command() {
        let text = "/status check";
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
                assert_eq!(name, "status");
                assert_eq!(args, vec!["check"]);
            }
            _ => panic!("Expected Command variant"),
        }
    }
}
