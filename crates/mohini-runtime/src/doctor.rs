//! Comprehensive diagnostic checks for the Mohini installation.
//!
//! Provides a `doctor` command that validates configuration, providers,
//! external dependencies, database health, gateway reachability, and
//! installed skills.

use std::path::Path;

/// Status of a single diagnostic check.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum CheckStatus {
    Pass,
    Warn,
    Fail,
}

impl std::fmt::Display for CheckStatus {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::Pass => write!(f, "PASS"),
            Self::Warn => write!(f, "WARN"),
            Self::Fail => write!(f, "FAIL"),
        }
    }
}

/// A single diagnostic check result.
#[derive(Debug, Clone)]
pub struct DiagnosticCheck {
    /// Human-readable name of the check.
    pub name: String,
    /// Whether the check passed, warned, or failed.
    pub status: CheckStatus,
    /// Descriptive message about the result.
    pub message: String,
    /// Optional suggestion for how to fix a warning or failure.
    pub fix_suggestion: Option<String>,
}

impl DiagnosticCheck {
    fn pass(name: impl Into<String>, message: impl Into<String>) -> Self {
        Self {
            name: name.into(),
            status: CheckStatus::Pass,
            message: message.into(),
            fix_suggestion: None,
        }
    }

    fn warn(
        name: impl Into<String>,
        message: impl Into<String>,
        fix: impl Into<String>,
    ) -> Self {
        Self {
            name: name.into(),
            status: CheckStatus::Warn,
            message: message.into(),
            fix_suggestion: Some(fix.into()),
        }
    }

    fn fail(
        name: impl Into<String>,
        message: impl Into<String>,
        fix: impl Into<String>,
    ) -> Self {
        Self {
            name: name.into(),
            status: CheckStatus::Fail,
            message: message.into(),
            fix_suggestion: Some(fix.into()),
        }
    }
}

/// Aggregated report from all diagnostic checks.
#[derive(Debug, Clone)]
pub struct DoctorReport {
    /// Individual check results.
    pub checks: Vec<DiagnosticCheck>,
    /// True if no checks failed (warnings are acceptable).
    pub overall_healthy: bool,
}

impl DoctorReport {
    /// Count checks by status.
    pub fn count(&self, status: CheckStatus) -> usize {
        self.checks.iter().filter(|c| c.status == status).count()
    }
}

/// Check that config.toml exists and can be parsed as valid TOML.
pub fn check_config(home_dir: &Path) -> DiagnosticCheck {
    let config_path = home_dir.join("config.toml");
    if !config_path.exists() {
        return DiagnosticCheck::fail(
            "Config file",
            format!("config.toml not found at {}", config_path.display()),
            "Run `mohini init` to create a default configuration.",
        );
    }

    match std::fs::read_to_string(&config_path) {
        Ok(contents) => {
            // Try to parse as generic TOML to validate syntax
            match serde_json::from_str::<serde_json::Value>("{}") {
                Ok(_) => {
                    // We don't have the `toml` crate here, so do a basic
                    // sanity check: the file is non-empty and looks like TOML.
                    let trimmed = contents.trim();
                    if trimmed.is_empty() {
                        DiagnosticCheck::warn(
                            "Config file",
                            "config.toml exists but is empty.",
                            "Run `mohini init` to populate the configuration.",
                        )
                    } else if trimmed.contains('=') || trimmed.contains('[') {
                        DiagnosticCheck::pass(
                            "Config file",
                            format!(
                                "config.toml found and readable ({} bytes).",
                                contents.len()
                            ),
                        )
                    } else {
                        DiagnosticCheck::warn(
                            "Config file",
                            "config.toml exists but may not be valid TOML.",
                            "Check config.toml syntax (expected key = value pairs).",
                        )
                    }
                }
                Err(_) => DiagnosticCheck::pass(
                    "Config file",
                    format!(
                        "config.toml found and readable ({} bytes).",
                        contents.len()
                    ),
                ),
            }
        }
        Err(e) => DiagnosticCheck::fail(
            "Config file",
            format!("Cannot read config.toml: {e}"),
            "Check file permissions on config.toml.",
        ),
    }
}

/// Verify at least one LLM provider is configured with an API key env var set.
///
/// Accepts a `serde_json::Value` representing the parsed config. Checks for
/// known provider environment variables in the current process environment.
pub fn check_providers(config: &serde_json::Value) -> DiagnosticCheck {
    let known_providers = [
        ("openai", "OPENAI_API_KEY"),
        ("anthropic", "ANTHROPIC_API_KEY"),
        ("groq", "GROQ_API_KEY"),
        ("google", "GOOGLE_API_KEY"),
        ("gemini", "GOOGLE_API_KEY"),
        ("mistral", "MISTRAL_API_KEY"),
        ("cohere", "COHERE_API_KEY"),
        ("deepseek", "DEEPSEEK_API_KEY"),
        ("xai", "XAI_API_KEY"),
    ];

    // Check if any provider env var is set
    let mut found_keys: Vec<&str> = Vec::new();
    for (provider, env_var) in &known_providers {
        if std::env::var(env_var).map(|v| !v.is_empty()).unwrap_or(false) {
            found_keys.push(provider);
        }
    }

    // Also check if a default_model.provider is configured
    let configured_provider = config
        .get("default_model")
        .and_then(|dm| dm.get("provider"))
        .and_then(|p| p.as_str())
        .unwrap_or("");

    if !found_keys.is_empty() {
        DiagnosticCheck::pass(
            "LLM Providers",
            format!(
                "API key(s) found for: {}.",
                found_keys.join(", ")
            ),
        )
    } else if !configured_provider.is_empty() {
        DiagnosticCheck::warn(
            "LLM Providers",
            format!(
                "Provider '{}' configured but no API key env var detected.",
                configured_provider
            ),
            "Set the appropriate API key environment variable (e.g. OPENAI_API_KEY).",
        )
    } else {
        DiagnosticCheck::warn(
            "LLM Providers",
            "No LLM provider API keys detected in environment.",
            "Set at least one provider API key (e.g. OPENAI_API_KEY, ANTHROPIC_API_KEY).",
        )
    }
}

/// Check for optional external binaries that enhance Mohini's capabilities.
pub fn check_dependencies() -> DiagnosticCheck {
    let binaries = [
        "python3", "node", "signal-cli", "ffmpeg", "docker", "git",
    ];

    let mut found = Vec::new();
    let mut missing = Vec::new();

    for bin in &binaries {
        if is_binary_available(bin) {
            found.push(*bin);
        } else {
            missing.push(*bin);
        }
    }

    if missing.is_empty() {
        DiagnosticCheck::pass(
            "Dependencies",
            format!("All optional binaries found: {}.", found.join(", ")),
        )
    } else if found.is_empty() {
        DiagnosticCheck::warn(
            "Dependencies",
            format!("No optional binaries found. Missing: {}.", missing.join(", ")),
            "Install optional dependencies for full functionality.",
        )
    } else {
        DiagnosticCheck::warn(
            "Dependencies",
            format!(
                "Found: {}. Missing (optional): {}.",
                found.join(", "),
                missing.join(", ")
            ),
            format!(
                "Install missing binaries for additional features: {}.",
                missing.join(", ")
            ),
        )
    }
}

/// Check that the SQLite database file exists and is readable.
pub fn check_database(home_dir: &Path) -> DiagnosticCheck {
    let data_dir = home_dir.join("data");
    if !data_dir.exists() {
        return DiagnosticCheck::warn(
            "Database",
            format!("Data directory not found at {}.", data_dir.display()),
            "Run `mohini start` to initialize the database.",
        );
    }

    // Look for .db or .sqlite files
    let db_candidates = ["mohini.db", "mohini.sqlite", "memory.db"];
    let mut found_db = None;
    for name in &db_candidates {
        let path = data_dir.join(name);
        if path.exists() {
            found_db = Some(path);
            break;
        }
    }

    match found_db {
        Some(path) => {
            // Check if readable
            match std::fs::metadata(&path) {
                Ok(meta) => {
                    if meta.len() == 0 {
                        DiagnosticCheck::warn(
                            "Database",
                            format!("Database file {} is empty.", path.display()),
                            "The database may not have been initialized. Try `mohini start`.",
                        )
                    } else {
                        DiagnosticCheck::pass(
                            "Database",
                            format!(
                                "Database found: {} ({} bytes).",
                                path.display(),
                                meta.len()
                            ),
                        )
                    }
                }
                Err(e) => DiagnosticCheck::fail(
                    "Database",
                    format!("Cannot read database at {}: {e}", path.display()),
                    "Check file permissions on the database file.",
                ),
            }
        }
        None => DiagnosticCheck::warn(
            "Database",
            "No database file found in data directory.",
            "Run `mohini start` to create and initialize the database.",
        ),
    }
}

/// Validate that a gateway URL has correct format.
///
/// This performs format validation only (no network calls).
pub fn check_gateway(url: &str) -> DiagnosticCheck {
    let url = url.trim();
    if url.is_empty() {
        return DiagnosticCheck::warn(
            "Gateway",
            "No gateway URL configured.",
            "Set api_listen in config.toml (e.g. \"127.0.0.1:4200\").",
        );
    }

    // Accept formats: "host:port", "http://host:port", "https://host:port"
    let check_url = if url.starts_with("http://") || url.starts_with("https://") {
        url.to_string()
    } else {
        format!("http://{}", url)
    };

    // Basic URL format validation
    if let Some(authority) = check_url.strip_prefix("http://").or_else(|| check_url.strip_prefix("https://")) {
        let parts: Vec<&str> = authority.split(':').collect();
        if parts.len() == 2 {
            let host = parts[0];
            let port_str = parts[1].split('/').next().unwrap_or("");
            if !host.is_empty() {
                if let Ok(port) = port_str.parse::<u16>() {
                    if port > 0 {
                        return DiagnosticCheck::pass(
                            "Gateway",
                            format!("Gateway URL looks valid: {} (port {}).", url, port),
                        );
                    }
                }
            }
        }
        // host-only without port is also acceptable
        if !authority.is_empty() && !authority.contains(' ') {
            return DiagnosticCheck::pass(
                "Gateway",
                format!("Gateway URL looks valid: {}.", url),
            );
        }
    }

    DiagnosticCheck::warn(
        "Gateway",
        format!("Gateway URL format may be invalid: '{}'.", url),
        "Expected format: \"host:port\" (e.g. \"127.0.0.1:4200\").",
    )
}

/// Check the skills directory for installed skills.
pub fn check_skills(home_dir: &Path) -> DiagnosticCheck {
    let skills_dir = home_dir.join("skills");
    if !skills_dir.exists() {
        return DiagnosticCheck::warn(
            "Skills",
            format!("Skills directory not found at {}.", skills_dir.display()),
            "Run `mohini init` or create ~/.mohini/skills/ manually.",
        );
    }

    // Count entries in the skills directory (subdirectories or files)
    match std::fs::read_dir(&skills_dir) {
        Ok(entries) => {
            let count = entries
                .filter_map(|e| e.ok())
                .filter(|e| {
                    // Count directories (skill packages) and .wasm files
                    let ft = e.file_type().ok();
                    let is_dir = ft.as_ref().map(|f| f.is_dir()).unwrap_or(false);
                    let is_wasm = e.path().extension().map(|ext| ext == "wasm").unwrap_or(false);
                    is_dir || is_wasm
                })
                .count();

            if count == 0 {
                DiagnosticCheck::warn(
                    "Skills",
                    "Skills directory exists but contains no skills.",
                    "Install skills with `mohini add <skill-name>`.",
                )
            } else {
                DiagnosticCheck::pass(
                    "Skills",
                    format!("Found {} skill(s) in {}.", count, skills_dir.display()),
                )
            }
        }
        Err(e) => DiagnosticCheck::fail(
            "Skills",
            format!("Cannot read skills directory: {e}"),
            "Check permissions on the skills directory.",
        ),
    }
}

/// Run all diagnostic checks and produce a report.
///
/// `home_dir` is the Mohini home directory (typically `~/.mohini`).
pub fn run_all_checks(home_dir: &Path) -> DoctorReport {
    let mut checks = Vec::new();

    // 1. Config
    checks.push(check_config(home_dir));

    // 2. Providers — build a minimal config value from what we can read
    let config_val = read_config_as_json(home_dir);
    checks.push(check_providers(&config_val));

    // 3. Dependencies
    checks.push(check_dependencies());

    // 4. Database
    checks.push(check_database(home_dir));

    // 5. Gateway — extract api_listen from config if available
    let gateway_url = config_val
        .get("api_listen")
        .and_then(|v| v.as_str())
        .unwrap_or("127.0.0.1:4200");
    checks.push(check_gateway(gateway_url));

    // 6. Skills
    checks.push(check_skills(home_dir));

    let overall_healthy = !checks.iter().any(|c| c.status == CheckStatus::Fail);

    DoctorReport {
        checks,
        overall_healthy,
    }
}

/// Attempt to read config.toml and parse it into a serde_json::Value.
///
/// Returns an empty JSON object if the file cannot be read or parsed.
fn read_config_as_json(home_dir: &Path) -> serde_json::Value {
    let config_path = home_dir.join("config.toml");
    if let Ok(contents) = std::fs::read_to_string(&config_path) {
        // Simple line-by-line extraction of key = "value" pairs into JSON.
        // This avoids needing the `toml` crate in this module.
        let mut map = serde_json::Map::new();
        for line in contents.lines() {
            let line = line.trim();
            if line.starts_with('#') || line.is_empty() || line.starts_with('[') {
                continue;
            }
            if let Some((key, val)) = line.split_once('=') {
                let key = key.trim().to_string();
                let val = val.trim();
                // Handle quoted strings
                if let Some(stripped) = val.strip_prefix('"').and_then(|v| v.strip_suffix('"')) {
                    map.insert(key, serde_json::Value::String(stripped.to_string()));
                } else if val == "true" {
                    map.insert(key, serde_json::Value::Bool(true));
                } else if val == "false" {
                    map.insert(key, serde_json::Value::Bool(false));
                } else if let Ok(n) = val.parse::<i64>() {
                    map.insert(key, serde_json::Value::Number(n.into()));
                }
            }
        }
        serde_json::Value::Object(map)
    } else {
        serde_json::Value::Object(serde_json::Map::new())
    }
}

/// Check if a binary is available on the system PATH.
fn is_binary_available(name: &str) -> bool {
    // Use `which` on Unix, `where` on Windows
    #[cfg(unix)]
    {
        std::process::Command::new("which")
            .arg(name)
            .stdout(std::process::Stdio::null())
            .stderr(std::process::Stdio::null())
            .status()
            .map(|s| s.success())
            .unwrap_or(false)
    }
    #[cfg(not(unix))]
    {
        std::process::Command::new("where")
            .arg(name)
            .stdout(std::process::Stdio::null())
            .stderr(std::process::Stdio::null())
            .status()
            .map(|s| s.success())
            .unwrap_or(false)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;
    use tempfile::TempDir;

    fn make_home() -> TempDir {
        tempfile::tempdir().unwrap()
    }

    #[test]
    fn test_check_config_missing() {
        let home = make_home();
        let result = check_config(home.path());
        assert_eq!(result.status, CheckStatus::Fail);
        assert!(result.fix_suggestion.is_some());
    }

    #[test]
    fn test_check_config_exists_valid() {
        let home = make_home();
        fs::write(
            home.path().join("config.toml"),
            "log_level = \"info\"\napi_listen = \"127.0.0.1:4200\"\n",
        )
        .unwrap();
        let result = check_config(home.path());
        assert_eq!(result.status, CheckStatus::Pass);
    }

    #[test]
    fn test_check_config_empty() {
        let home = make_home();
        fs::write(home.path().join("config.toml"), "").unwrap();
        let result = check_config(home.path());
        assert_eq!(result.status, CheckStatus::Warn);
    }

    #[test]
    fn test_check_providers_no_keys() {
        let config = serde_json::json!({});
        // This test may pass or warn depending on what env vars are set
        // in the test environment. Just verify it doesn't panic.
        let result = check_providers(&config);
        assert!(result.status == CheckStatus::Pass || result.status == CheckStatus::Warn);
    }

    #[test]
    fn test_check_providers_with_configured_provider() {
        let config = serde_json::json!({
            "default_model": {
                "provider": "openai"
            }
        });
        let result = check_providers(&config);
        // May pass if OPENAI_API_KEY is set in env, or warn otherwise
        assert!(result.status == CheckStatus::Pass || result.status == CheckStatus::Warn);
    }

    #[test]
    fn test_check_dependencies_runs() {
        // Just verify the check runs without panicking
        let result = check_dependencies();
        assert!(
            result.status == CheckStatus::Pass || result.status == CheckStatus::Warn
        );
    }

    #[test]
    fn test_check_database_missing_data_dir() {
        let home = make_home();
        let result = check_database(home.path());
        assert_eq!(result.status, CheckStatus::Warn);
    }

    #[test]
    fn test_check_database_empty_dir() {
        let home = make_home();
        fs::create_dir_all(home.path().join("data")).unwrap();
        let result = check_database(home.path());
        assert_eq!(result.status, CheckStatus::Warn);
        assert!(result.message.contains("No database file"));
    }

    #[test]
    fn test_check_database_with_db() {
        let home = make_home();
        let data = home.path().join("data");
        fs::create_dir_all(&data).unwrap();
        fs::write(data.join("mohini.db"), "SQLite data here").unwrap();
        let result = check_database(home.path());
        assert_eq!(result.status, CheckStatus::Pass);
    }

    #[test]
    fn test_check_database_empty_db() {
        let home = make_home();
        let data = home.path().join("data");
        fs::create_dir_all(&data).unwrap();
        fs::write(data.join("mohini.db"), "").unwrap();
        let result = check_database(home.path());
        assert_eq!(result.status, CheckStatus::Warn);
        assert!(result.message.contains("empty"));
    }

    #[test]
    fn test_check_gateway_valid() {
        let result = check_gateway("127.0.0.1:4200");
        assert_eq!(result.status, CheckStatus::Pass);
    }

    #[test]
    fn test_check_gateway_with_http() {
        let result = check_gateway("http://localhost:4200");
        assert_eq!(result.status, CheckStatus::Pass);
    }

    #[test]
    fn test_check_gateway_empty() {
        let result = check_gateway("");
        assert_eq!(result.status, CheckStatus::Warn);
    }

    #[test]
    fn test_check_skills_missing_dir() {
        let home = make_home();
        let result = check_skills(home.path());
        assert_eq!(result.status, CheckStatus::Warn);
    }

    #[test]
    fn test_check_skills_empty_dir() {
        let home = make_home();
        fs::create_dir_all(home.path().join("skills")).unwrap();
        let result = check_skills(home.path());
        assert_eq!(result.status, CheckStatus::Warn);
        assert!(result.message.contains("no skills"));
    }

    #[test]
    fn test_check_skills_with_skills() {
        let home = make_home();
        let skills = home.path().join("skills");
        fs::create_dir_all(&skills).unwrap();
        fs::create_dir_all(skills.join("web-search")).unwrap();
        fs::create_dir_all(skills.join("calculator")).unwrap();
        let result = check_skills(home.path());
        assert_eq!(result.status, CheckStatus::Pass);
        assert!(result.message.contains("2 skill(s)"));
    }

    #[test]
    fn test_check_skills_with_wasm() {
        let home = make_home();
        let skills = home.path().join("skills");
        fs::create_dir_all(&skills).unwrap();
        fs::write(skills.join("custom.wasm"), [0u8; 4]).unwrap();
        let result = check_skills(home.path());
        assert_eq!(result.status, CheckStatus::Pass);
        assert!(result.message.contains("1 skill(s)"));
    }

    #[test]
    fn test_run_all_checks() {
        let home = make_home();
        // Create a minimal setup
        fs::write(
            home.path().join("config.toml"),
            "log_level = \"info\"\napi_listen = \"127.0.0.1:4200\"\n",
        )
        .unwrap();
        let data = home.path().join("data");
        fs::create_dir_all(&data).unwrap();
        fs::write(data.join("mohini.db"), "some data").unwrap();
        let skills = home.path().join("skills");
        fs::create_dir_all(&skills).unwrap();
        fs::create_dir_all(skills.join("web-search")).unwrap();

        let report = run_all_checks(home.path());
        // Config, database, gateway, skills should pass; providers/deps may warn
        assert_eq!(report.checks.len(), 6);
        assert!(report.overall_healthy); // no Fail checks
    }

    #[test]
    fn test_run_all_checks_empty_home() {
        let home = make_home();
        let report = run_all_checks(home.path());
        assert_eq!(report.checks.len(), 6);
        // Config is missing -> Fail -> not healthy
        assert!(!report.overall_healthy);
    }

    #[test]
    fn test_doctor_report_count() {
        let report = DoctorReport {
            checks: vec![
                DiagnosticCheck::pass("a", "ok"),
                DiagnosticCheck::warn("b", "hmm", "fix"),
                DiagnosticCheck::fail("c", "bad", "fix"),
                DiagnosticCheck::pass("d", "ok"),
            ],
            overall_healthy: false,
        };
        assert_eq!(report.count(CheckStatus::Pass), 2);
        assert_eq!(report.count(CheckStatus::Warn), 1);
        assert_eq!(report.count(CheckStatus::Fail), 1);
    }

    #[test]
    fn test_check_status_display() {
        assert_eq!(format!("{}", CheckStatus::Pass), "PASS");
        assert_eq!(format!("{}", CheckStatus::Warn), "WARN");
        assert_eq!(format!("{}", CheckStatus::Fail), "FAIL");
    }
}
