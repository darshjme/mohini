//! Voice wake word detection configuration system.
//!
//! Manages wake word settings persisted to `~/.mohini/settings/voicewake.json`.
//! Ported from OpenClaw's `voicewake.ts`.

use serde::{Deserialize, Serialize};
use std::path::{Path, PathBuf};
use tokio::sync::Mutex;

/// Default wake words recognised by the voice detection engine.
const DEFAULT_WAKE_WORDS: &[&str] = &["mohini", "hey mohini", "computer"];

/// Default sensitivity (0.0 = least sensitive, 1.0 = most sensitive).
const DEFAULT_SENSITIVITY: f32 = 0.5;

/// Default listen window after wake word detection (milliseconds).
const DEFAULT_LISTEN_DURATION_MS: u32 = 5_000;

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

/// Persistent voice-wake configuration.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct VoiceWakeConfig {
    /// Whether voice wake detection is enabled.
    #[serde(default = "default_enabled")]
    pub enabled: bool,

    /// Wake words/phrases that trigger listening.
    #[serde(default = "default_wake_words")]
    pub wake_words: Vec<String>,

    /// Detection sensitivity in `[0.0, 1.0]`.
    #[serde(default = "default_sensitivity")]
    pub sensitivity: f32,

    /// How long to keep listening after a wake word (ms).
    #[serde(default = "default_listen_duration_ms")]
    pub listen_duration_ms: u32,

    /// Epoch-millis timestamp of last update (0 = never persisted).
    #[serde(default)]
    pub updated_at_ms: u64,
}

fn default_enabled() -> bool {
    false
}

fn default_wake_words() -> Vec<String> {
    DEFAULT_WAKE_WORDS.iter().map(|s| (*s).to_owned()).collect()
}

fn default_sensitivity() -> f32 {
    DEFAULT_SENSITIVITY
}

fn default_listen_duration_ms() -> u32 {
    DEFAULT_LISTEN_DURATION_MS
}

impl Default for VoiceWakeConfig {
    fn default() -> Self {
        Self {
            enabled: default_enabled(),
            wake_words: default_wake_words(),
            sensitivity: default_sensitivity(),
            listen_duration_ms: default_listen_duration_ms(),
            updated_at_ms: 0,
        }
    }
}

impl VoiceWakeConfig {
    /// Sanitize wake words: trim, remove blanks, fall back to defaults.
    fn sanitize_wake_words(words: &[String]) -> Vec<String> {
        let cleaned: Vec<String> = words
            .iter()
            .map(|w| w.trim().to_owned())
            .filter(|w| !w.is_empty())
            .collect();
        if cleaned.is_empty() {
            default_wake_words()
        } else {
            cleaned
        }
    }

    /// Clamp sensitivity to valid range.
    fn clamp_sensitivity(val: f32) -> f32 {
        val.clamp(0.0, 1.0)
    }

    /// Return a sanitized copy.
    pub fn sanitized(&self) -> Self {
        Self {
            enabled: self.enabled,
            wake_words: Self::sanitize_wake_words(&self.wake_words),
            sensitivity: Self::clamp_sensitivity(self.sensitivity),
            listen_duration_ms: self.listen_duration_ms,
            updated_at_ms: self.updated_at_ms,
        }
    }
}

// ---------------------------------------------------------------------------
// Persistence helpers
// ---------------------------------------------------------------------------

/// Resolve the config file path, defaulting to `~/.mohini/settings/voicewake.json`.
fn resolve_config_path(base_dir: Option<&Path>) -> PathBuf {
    let root = match base_dir {
        Some(p) => p.to_path_buf(),
        None => dirs::home_dir()
            .unwrap_or_else(|| PathBuf::from("."))
            .join(".mohini"),
    };
    root.join("settings").join("voicewake.json")
}

/// Load the config from disk, returning defaults on any error.
pub async fn load_voice_wake_config(base_dir: Option<&Path>) -> VoiceWakeConfig {
    let path = resolve_config_path(base_dir);
    match tokio::fs::read_to_string(&path).await {
        Ok(raw) => match serde_json::from_str::<VoiceWakeConfig>(&raw) {
            Ok(cfg) => cfg.sanitized(),
            Err(e) => {
                tracing::warn!("voicewake config parse error: {e}");
                VoiceWakeConfig::default()
            }
        },
        Err(_) => VoiceWakeConfig::default(),
    }
}

/// Atomically write config to disk (write-tmp then rename).
async fn save_voice_wake_config(
    cfg: &VoiceWakeConfig,
    base_dir: Option<&Path>,
) -> std::io::Result<()> {
    let path = resolve_config_path(base_dir);
    if let Some(parent) = path.parent() {
        tokio::fs::create_dir_all(parent).await?;
    }
    let tmp = path.with_extension(format!("{}.tmp", uuid::Uuid::new_v4()));
    let json = serde_json::to_string_pretty(cfg).map_err(std::io::Error::other)?;
    tokio::fs::write(&tmp, json.as_bytes()).await?;
    tokio::fs::rename(&tmp, &path).await?;
    Ok(())
}

// ---------------------------------------------------------------------------
// Change notification callback
// ---------------------------------------------------------------------------

/// Trait for receiving voice-wake config change notifications.
pub trait VoiceWakeListener: Send + Sync {
    /// Called after the config has been updated and persisted.
    fn on_config_changed(&self, config: &VoiceWakeConfig);
}

// ---------------------------------------------------------------------------
// Manager
// ---------------------------------------------------------------------------

/// Manages voice-wake configuration with serialized access.
pub struct VoiceWakeManager {
    config: Mutex<VoiceWakeConfig>,
    base_dir: Option<PathBuf>,
    listeners: Mutex<Vec<Box<dyn VoiceWakeListener>>>,
}

impl VoiceWakeManager {
    /// Create a new manager, loading persisted config from disk.
    pub async fn new(base_dir: Option<PathBuf>) -> Self {
        let config = load_voice_wake_config(base_dir.as_deref()).await;
        Self {
            config: Mutex::new(config),
            base_dir,
            listeners: Mutex::new(Vec::new()),
        }
    }

    /// Return a snapshot of the current config.
    pub async fn get_config(&self) -> VoiceWakeConfig {
        self.config.lock().await.clone()
    }

    /// Replace the entire config, persist, and notify listeners.
    pub async fn set_config(&self, mut cfg: VoiceWakeConfig) -> std::io::Result<VoiceWakeConfig> {
        cfg = cfg.sanitized();
        cfg.updated_at_ms = chrono::Utc::now().timestamp_millis() as u64;
        save_voice_wake_config(&cfg, self.base_dir.as_deref()).await?;
        let snapshot = cfg.clone();
        *self.config.lock().await = cfg;
        // Notify listeners
        let listeners = self.listeners.lock().await;
        for l in listeners.iter() {
            l.on_config_changed(&snapshot);
        }
        Ok(snapshot)
    }

    /// Update only the wake words, keeping everything else.
    pub async fn set_wake_words(&self, words: Vec<String>) -> std::io::Result<VoiceWakeConfig> {
        let mut cfg = self.config.lock().await.clone();
        cfg.wake_words = words;
        drop(cfg.clone()); // release nothing, just reuse
        self.set_config(cfg).await
    }

    /// Enable or disable voice wake.
    pub async fn set_enabled(&self, enabled: bool) -> std::io::Result<VoiceWakeConfig> {
        let mut cfg = self.config.lock().await.clone();
        cfg.enabled = enabled;
        self.set_config(cfg).await
    }

    /// Register a change listener.
    pub async fn add_listener(&self, listener: Box<dyn VoiceWakeListener>) {
        self.listeners.lock().await.push(listener);
    }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_config() {
        let cfg = VoiceWakeConfig::default();
        assert!(!cfg.enabled);
        assert_eq!(cfg.wake_words, vec!["mohini", "hey mohini", "computer"]);
        assert!((cfg.sensitivity - 0.5).abs() < f32::EPSILON);
        assert_eq!(cfg.listen_duration_ms, 5_000);
        assert_eq!(cfg.updated_at_ms, 0);
    }

    #[test]
    fn test_serialization_roundtrip() {
        let cfg = VoiceWakeConfig {
            enabled: true,
            wake_words: vec!["alpha".into(), "beta".into()],
            sensitivity: 0.8,
            listen_duration_ms: 3_000,
            updated_at_ms: 1_700_000_000_000,
        };
        let json = serde_json::to_string(&cfg).unwrap();
        let parsed: VoiceWakeConfig = serde_json::from_str(&json).unwrap();
        assert_eq!(cfg, parsed);
    }

    #[test]
    fn test_deserialize_missing_fields_uses_defaults() {
        let json = r#"{"enabled": true}"#;
        let cfg: VoiceWakeConfig = serde_json::from_str(json).unwrap();
        assert!(cfg.enabled);
        assert_eq!(cfg.wake_words, default_wake_words());
        assert!((cfg.sensitivity - 0.5).abs() < f32::EPSILON);
        assert_eq!(cfg.listen_duration_ms, 5_000);
    }

    #[test]
    fn test_sanitize_empty_wake_words_falls_back() {
        let cfg = VoiceWakeConfig {
            wake_words: vec!["".into(), "  ".into()],
            ..Default::default()
        };
        let sanitized = cfg.sanitized();
        assert_eq!(sanitized.wake_words, default_wake_words());
    }

    #[test]
    fn test_sanitize_trims_wake_words() {
        let cfg = VoiceWakeConfig {
            wake_words: vec!["  hello ".into(), "world  ".into()],
            ..Default::default()
        };
        let sanitized = cfg.sanitized();
        assert_eq!(sanitized.wake_words, vec!["hello", "world"]);
    }

    #[test]
    fn test_sensitivity_clamped() {
        let cfg = VoiceWakeConfig {
            sensitivity: 2.5,
            ..Default::default()
        };
        assert!((cfg.sanitized().sensitivity - 1.0).abs() < f32::EPSILON);

        let cfg2 = VoiceWakeConfig {
            sensitivity: -1.0,
            ..Default::default()
        };
        assert!(cfg2.sanitized().sensitivity.abs() < f32::EPSILON);
    }

    #[tokio::test]
    async fn test_load_save_roundtrip() {
        let tmp = tempfile::tempdir().unwrap();
        let base = tmp.path().to_path_buf();

        let cfg = VoiceWakeConfig {
            enabled: true,
            wake_words: vec!["test".into()],
            sensitivity: 0.7,
            listen_duration_ms: 4_000,
            updated_at_ms: 42,
        };
        save_voice_wake_config(&cfg, Some(&base)).await.unwrap();

        let loaded = load_voice_wake_config(Some(&base)).await;
        assert!(loaded.enabled);
        assert_eq!(loaded.wake_words, vec!["test"]);
        assert!((loaded.sensitivity - 0.7).abs() < f32::EPSILON);
    }

    #[tokio::test]
    async fn test_load_missing_file_returns_defaults() {
        let tmp = tempfile::tempdir().unwrap();
        let cfg = load_voice_wake_config(Some(tmp.path())).await;
        assert_eq!(cfg, VoiceWakeConfig::default());
    }

    #[tokio::test]
    async fn test_manager_get_set() {
        let tmp = tempfile::tempdir().unwrap();
        let mgr = VoiceWakeManager::new(Some(tmp.path().to_path_buf())).await;

        let initial = mgr.get_config().await;
        assert!(!initial.enabled);

        let updated = mgr.set_enabled(true).await.unwrap();
        assert!(updated.enabled);
        assert!(updated.updated_at_ms > 0);

        let reloaded = mgr.get_config().await;
        assert!(reloaded.enabled);
    }
}
