//! Enhanced media pipeline for the Mohini runtime.
//!
//! Provides MIME detection from magic bytes, image optimisation config,
//! a stub media processor, and temp-file lifecycle management.

use serde::{Deserialize, Serialize};
use std::path::{Path, PathBuf};

// ---------------------------------------------------------------------------
// MIME detection via magic numbers
// ---------------------------------------------------------------------------

/// Detect MIME type from the leading bytes of a file/buffer.
///
/// Returns `None` if the bytes do not match any known signature.
pub fn detect_mime(bytes: &[u8]) -> Option<&'static str> {
    if bytes.len() < 4 {
        return None;
    }

    // JPEG: FF D8 FF
    if bytes.starts_with(&[0xFF, 0xD8, 0xFF]) {
        return Some("image/jpeg");
    }

    // PNG: 89 50 4E 47 0D 0A 1A 0A
    if bytes.len() >= 8 && bytes.starts_with(&[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]) {
        return Some("image/png");
    }

    // GIF: GIF87a or GIF89a
    if bytes.starts_with(b"GIF87a") || bytes.starts_with(b"GIF89a") {
        return Some("image/gif");
    }

    // WebP: RIFF....WEBP
    if bytes.len() >= 12 && bytes.starts_with(b"RIFF") && &bytes[8..12] == b"WEBP" {
        return Some("image/webp");
    }

    // PDF: %PDF
    if bytes.starts_with(b"%PDF") {
        return Some("application/pdf");
    }

    // MP4: ....ftyp (offset 4)
    if bytes.len() >= 8 && &bytes[4..8] == b"ftyp" {
        return Some("video/mp4");
    }

    // MP3: ID3 tag or sync word FF FB / FF F3 / FF F2
    if bytes.starts_with(b"ID3")
        || (bytes.len() >= 2 && bytes[0] == 0xFF && (bytes[1] & 0xE0) == 0xE0)
    {
        return Some("audio/mpeg");
    }

    // WAV: RIFF....WAVE
    if bytes.len() >= 12 && bytes.starts_with(b"RIFF") && &bytes[8..12] == b"WAVE" {
        return Some("audio/wav");
    }

    None
}

// ---------------------------------------------------------------------------
// Image optimisation config
// ---------------------------------------------------------------------------

/// Configuration for image optimisation/transcoding.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct ImageOptimizationConfig {
    /// Maximum width in pixels (0 = no limit).
    #[serde(default)]
    pub max_width: u32,
    /// Maximum height in pixels (0 = no limit).
    #[serde(default)]
    pub max_height: u32,
    /// Quality factor for lossy formats (1–100).
    #[serde(default = "default_quality")]
    pub quality: u8,
    /// Target output format (e.g. "webp", "jpeg"). Empty = keep original.
    #[serde(default)]
    pub target_format: String,
}

fn default_quality() -> u8 {
    85
}

impl Default for ImageOptimizationConfig {
    fn default() -> Self {
        Self {
            max_width: 1920,
            max_height: 1080,
            quality: default_quality(),
            target_format: String::new(),
        }
    }
}

// ---------------------------------------------------------------------------
// Media metadata (returned by stubs)
// ---------------------------------------------------------------------------

/// Basic metadata about a processed media file.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct MediaMetadata {
    /// Detected or assigned MIME type.
    pub mime_type: String,
    /// Size of the input in bytes.
    pub size_bytes: u64,
    /// Width in pixels (images/video only).
    pub width: Option<u32>,
    /// Height in pixels (images/video only).
    pub height: Option<u32>,
    /// Duration in seconds (audio/video only).
    pub duration_secs: Option<f64>,
}

// ---------------------------------------------------------------------------
// MediaProcessor
// ---------------------------------------------------------------------------

/// Central media processing façade.
///
/// Currently provides MIME detection and stub methods for image/audio
/// processing that return metadata without performing real transcoding.
#[derive(Default)]
pub struct MediaProcessor {
    /// Image optimisation settings.
    pub image_config: ImageOptimizationConfig,
}

impl MediaProcessor {
    /// Create a processor with the given image config.
    pub fn new(image_config: ImageOptimizationConfig) -> Self {
        Self { image_config }
    }

    /// Detect MIME type from a byte buffer.
    pub fn detect_mime(&self, bytes: &[u8]) -> Option<&'static str> {
        detect_mime(bytes)
    }

    /// Determine whether an image (given its dimensions) should be optimised
    /// according to the current config.
    pub fn should_optimize(&self, width: u32, height: u32) -> bool {
        let max_w = self.image_config.max_width;
        let max_h = self.image_config.max_height;
        let exceeds_size = (max_w > 0 && width > max_w) || (max_h > 0 && height > max_h);
        let wants_transcode = !self.image_config.target_format.is_empty();
        exceeds_size || wants_transcode
    }

    /// Stub: "process" an image and return its metadata.
    ///
    /// In a real implementation this would resize/transcode. Currently it
    /// only returns the input metadata unchanged.
    pub fn process_image(&self, bytes: &[u8], width: u32, height: u32) -> MediaMetadata {
        let mime = self.detect_mime(bytes).unwrap_or("application/octet-stream");
        tracing::debug!(mime, width, height, "process_image stub called");
        MediaMetadata {
            mime_type: mime.to_owned(),
            size_bytes: bytes.len() as u64,
            width: Some(width),
            height: Some(height),
            duration_secs: None,
        }
    }

    /// Stub: "process" an audio file and return its metadata.
    pub fn process_audio(&self, bytes: &[u8], duration_secs: Option<f64>) -> MediaMetadata {
        let mime = self.detect_mime(bytes).unwrap_or("application/octet-stream");
        tracing::debug!(mime, ?duration_secs, "process_audio stub called");
        MediaMetadata {
            mime_type: mime.to_owned(),
            size_bytes: bytes.len() as u64,
            width: None,
            height: None,
            duration_secs,
        }
    }
}

// ---------------------------------------------------------------------------
// TempMediaFile (with Drop cleanup)
// ---------------------------------------------------------------------------

/// A temporary file on disk that is automatically deleted when dropped.
#[derive(Debug)]
pub struct TempMediaFile {
    path: PathBuf,
    /// If false, the destructor will not delete the file.
    auto_cleanup: bool,
}

impl TempMediaFile {
    /// Create a new `TempMediaFile` wrapping an existing path.
    pub fn new(path: PathBuf) -> Self {
        Self {
            path,
            auto_cleanup: true,
        }
    }

    /// Create a temp file in the system temp directory with a unique name.
    pub fn in_temp_dir(prefix: &str, extension: &str) -> std::io::Result<Self> {
        let dir = std::env::temp_dir();
        let name = format!("{prefix}_{}.{extension}", uuid::Uuid::new_v4());
        let path = dir.join(name);
        // Create the file to reserve the name.
        std::fs::File::create(&path)?;
        Ok(Self::new(path))
    }

    /// Return the path.
    pub fn path(&self) -> &Path {
        &self.path
    }

    /// Detach: prevent automatic deletion on drop.
    pub fn detach(&mut self) {
        self.auto_cleanup = false;
    }
}

impl Drop for TempMediaFile {
    fn drop(&mut self) {
        if self.auto_cleanup {
            if let Err(e) = std::fs::remove_file(&self.path) {
                // Best-effort; file may already be gone.
                tracing::trace!(path = %self.path.display(), error = %e, "temp file cleanup failed");
            }
        }
    }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

#[cfg(test)]
mod tests {
    use super::*;

    // -- MIME detection -------------------------------------------------------

    #[test]
    fn test_detect_jpeg() {
        let bytes = [0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10];
        assert_eq!(detect_mime(&bytes), Some("image/jpeg"));
    }

    #[test]
    fn test_detect_png() {
        let bytes = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00];
        assert_eq!(detect_mime(&bytes), Some("image/png"));
    }

    #[test]
    fn test_detect_gif87a() {
        assert_eq!(detect_mime(b"GIF87a..."), Some("image/gif"));
    }

    #[test]
    fn test_detect_gif89a() {
        assert_eq!(detect_mime(b"GIF89a..."), Some("image/gif"));
    }

    #[test]
    fn test_detect_webp() {
        let mut bytes = Vec::new();
        bytes.extend_from_slice(b"RIFF");
        bytes.extend_from_slice(&[0x00; 4]); // size placeholder
        bytes.extend_from_slice(b"WEBP");
        assert_eq!(detect_mime(&bytes), Some("image/webp"));
    }

    #[test]
    fn test_detect_pdf() {
        assert_eq!(detect_mime(b"%PDF-1.7 ..."), Some("application/pdf"));
    }

    #[test]
    fn test_detect_mp4() {
        let mut bytes = vec![0x00, 0x00, 0x00, 0x1C]; // size
        bytes.extend_from_slice(b"ftypisom");
        assert_eq!(detect_mime(&bytes), Some("video/mp4"));
    }

    #[test]
    fn test_detect_mp3_id3() {
        assert_eq!(detect_mime(b"ID3\x04\x00\x00"), Some("audio/mpeg"));
    }

    #[test]
    fn test_detect_mp3_sync() {
        assert_eq!(detect_mime(&[0xFF, 0xFB, 0x90, 0x00]), Some("audio/mpeg"));
    }

    #[test]
    fn test_detect_wav() {
        let mut bytes = Vec::new();
        bytes.extend_from_slice(b"RIFF");
        bytes.extend_from_slice(&[0x00; 4]);
        bytes.extend_from_slice(b"WAVE");
        assert_eq!(detect_mime(&bytes), Some("audio/wav"));
    }

    #[test]
    fn test_detect_unknown() {
        assert_eq!(detect_mime(&[0x00, 0x01, 0x02, 0x03, 0x04, 0x05]), None);
    }

    #[test]
    fn test_detect_too_short() {
        assert_eq!(detect_mime(&[0xFF, 0xD8]), None);
    }

    // -- ImageOptimizationConfig ----------------------------------------------

    #[test]
    fn test_default_image_config() {
        let cfg = ImageOptimizationConfig::default();
        assert_eq!(cfg.max_width, 1920);
        assert_eq!(cfg.max_height, 1080);
        assert_eq!(cfg.quality, 85);
        assert!(cfg.target_format.is_empty());
    }

    #[test]
    fn test_image_config_roundtrip() {
        let cfg = ImageOptimizationConfig {
            max_width: 800,
            max_height: 600,
            quality: 70,
            target_format: "webp".into(),
        };
        let json = serde_json::to_string(&cfg).unwrap();
        let parsed: ImageOptimizationConfig = serde_json::from_str(&json).unwrap();
        assert_eq!(parsed, cfg);
    }

    // -- MediaProcessor -------------------------------------------------------

    #[test]
    fn test_should_optimize_oversized() {
        let proc = MediaProcessor::default();
        assert!(proc.should_optimize(4000, 3000));
    }

    #[test]
    fn test_should_optimize_within_limits() {
        let proc = MediaProcessor::default();
        assert!(!proc.should_optimize(800, 600));
    }

    #[test]
    fn test_should_optimize_transcode_requested() {
        let proc = MediaProcessor::new(ImageOptimizationConfig {
            target_format: "webp".into(),
            ..Default::default()
        });
        assert!(proc.should_optimize(100, 100));
    }

    #[test]
    fn test_process_image_stub() {
        let proc = MediaProcessor::default();
        let jpeg = [0xFF, 0xD8, 0xFF, 0xE0, 0x00];
        let meta = proc.process_image(&jpeg, 1024, 768);
        assert_eq!(meta.mime_type, "image/jpeg");
        assert_eq!(meta.size_bytes, 5);
        assert_eq!(meta.width, Some(1024));
        assert_eq!(meta.height, Some(768));
    }

    #[test]
    fn test_process_audio_stub() {
        let proc = MediaProcessor::default();
        let mp3 = b"ID3\x04\x00\x00extra";
        let meta = proc.process_audio(mp3, Some(120.5));
        assert_eq!(meta.mime_type, "audio/mpeg");
        assert_eq!(meta.duration_secs, Some(120.5));
    }

    // -- TempMediaFile --------------------------------------------------------

    #[test]
    fn test_temp_file_created_and_cleaned_up() {
        let path;
        {
            let tmp = TempMediaFile::in_temp_dir("test_mohini", "bin").unwrap();
            path = tmp.path().to_path_buf();
            assert!(path.exists());
        }
        // After drop, the file should be gone.
        assert!(!path.exists());
    }

    #[test]
    fn test_temp_file_detach_skips_cleanup() {
        let path;
        {
            let mut tmp = TempMediaFile::in_temp_dir("test_mohini_detach", "bin").unwrap();
            path = tmp.path().to_path_buf();
            tmp.detach();
        }
        // File should still exist after drop because we detached.
        assert!(path.exists());
        // Clean up manually.
        std::fs::remove_file(&path).ok();
    }
}
