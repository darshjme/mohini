//! Enhanced onboarding logic for the Mohini CLI wizard.
//!
//! Provides step tracking, API key validation, default skill lists,
//! and config generation for new users going through the setup wizard.

use std::collections::HashMap;

/// Steps in the onboarding wizard.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum OnboardingStep {
    Welcome,
    ApiKeySetup,
    ProviderSelection,
    SkillInstall,
    GatewayConfig,
    Complete,
}

impl OnboardingStep {
    /// Returns the human-readable label for this step.
    pub fn label(&self) -> &'static str {
        match self {
            Self::Welcome => "Welcome",
            Self::ApiKeySetup => "API Key Setup",
            Self::ProviderSelection => "Provider Selection",
            Self::SkillInstall => "Skill Installation",
            Self::GatewayConfig => "Gateway Configuration",
            Self::Complete => "Complete",
        }
    }

    /// Returns all steps in order.
    pub fn all() -> &'static [OnboardingStep] {
        &[
            Self::Welcome,
            Self::ApiKeySetup,
            Self::ProviderSelection,
            Self::SkillInstall,
            Self::GatewayConfig,
            Self::Complete,
        ]
    }
}

/// Tracks progress through the onboarding wizard.
#[derive(Debug, Clone)]
pub struct OnboardingState {
    /// The current step the user is on.
    pub current_step: OnboardingStep,
    /// Steps that have been completed.
    pub completed_steps: Vec<OnboardingStep>,
    /// Steps that were explicitly skipped.
    pub skipped_steps: Vec<OnboardingStep>,
}

impl OnboardingState {
    /// Create a new onboarding state starting at the Welcome step.
    pub fn new() -> Self {
        Self {
            current_step: OnboardingStep::Welcome,
            completed_steps: Vec::new(),
            skipped_steps: Vec::new(),
        }
    }

    /// Mark the current step as completed and advance to the next step.
    pub fn complete_current(&mut self) {
        self.completed_steps.push(self.current_step);
        if let Some(next) = self.next_step() {
            self.current_step = next;
        }
    }

    /// Mark the current step as skipped and advance to the next step.
    pub fn skip_current(&mut self) {
        self.skipped_steps.push(self.current_step);
        if let Some(next) = self.next_step() {
            self.current_step = next;
        }
    }

    /// Returns the next step after the current one, if any.
    fn next_step(&self) -> Option<OnboardingStep> {
        let all = OnboardingStep::all();
        let pos = all.iter().position(|s| *s == self.current_step)?;
        all.get(pos + 1).copied()
    }

    /// Returns true if all steps are either completed or skipped.
    pub fn is_finished(&self) -> bool {
        self.current_step == OnboardingStep::Complete
            || self.completed_steps.contains(&OnboardingStep::Complete)
    }

    /// Returns the fraction of steps completed (0.0 to 1.0).
    pub fn progress(&self) -> f64 {
        let total = OnboardingStep::all().len() as f64;
        let done = (self.completed_steps.len() + self.skipped_steps.len()) as f64;
        (done / total).min(1.0)
    }
}

impl Default for OnboardingState {
    fn default() -> Self {
        Self::new()
    }
}

/// Configuration choices collected during onboarding.
#[derive(Debug, Clone)]
pub struct OnboardingConfig {
    /// LLM providers selected by the user (e.g. "openai", "anthropic", "groq").
    pub selected_providers: Vec<String>,
    /// API keys keyed by provider name.
    pub api_keys: HashMap<String, String>,
    /// Whether to install the recommended default skills.
    pub install_default_skills: bool,
    /// Optional gateway URL override.
    pub gateway_url: Option<String>,
}

impl OnboardingConfig {
    /// Create a new empty onboarding config.
    pub fn new() -> Self {
        Self {
            selected_providers: Vec::new(),
            api_keys: HashMap::new(),
            install_default_skills: true,
            gateway_url: None,
        }
    }
}

impl Default for OnboardingConfig {
    fn default() -> Self {
        Self::new()
    }
}

/// Known API key prefixes and their expected length ranges.
struct KeySpec {
    prefix: &'static str,
    min_len: usize,
    max_len: usize,
}

/// Returns the key specification for a known provider, if any.
fn key_spec(provider: &str) -> Option<KeySpec> {
    match provider {
        "openai" => Some(KeySpec {
            prefix: "sk-",
            min_len: 20,
            max_len: 200,
        }),
        "anthropic" => Some(KeySpec {
            prefix: "sk-ant-",
            min_len: 20,
            max_len: 200,
        }),
        "groq" => Some(KeySpec {
            prefix: "gsk_",
            min_len: 20,
            max_len: 200,
        }),
        "google" | "gemini" => Some(KeySpec {
            prefix: "AI",
            min_len: 20,
            max_len: 100,
        }),
        "mistral" => Some(KeySpec {
            prefix: "",
            min_len: 20,
            max_len: 100,
        }),
        "cohere" => Some(KeySpec {
            prefix: "",
            min_len: 20,
            max_len: 100,
        }),
        _ => None,
    }
}

/// Validate an API key's format for a given provider.
///
/// Returns `Ok(true)` if the key looks valid, `Ok(false)` if the format
/// is wrong (bad prefix or length), or `Err` for unknown providers.
pub fn validate_api_key(provider: &str, key: &str) -> Result<bool, String> {
    let key = key.trim();
    if key.is_empty() {
        return Ok(false);
    }

    match key_spec(provider) {
        Some(spec) => {
            if !spec.prefix.is_empty() && !key.starts_with(spec.prefix) {
                return Ok(false);
            }
            if key.len() < spec.min_len || key.len() > spec.max_len {
                return Ok(false);
            }
            Ok(true)
        }
        None => Err(format!("Unknown provider: {provider}")),
    }
}

/// Returns the list of recommended skills for new users.
pub fn get_default_skills() -> Vec<String> {
    vec![
        "web-search".to_string(),
        "web-fetch".to_string(),
        "code-interpreter".to_string(),
        "file-manager".to_string(),
        "shell".to_string(),
        "calculator".to_string(),
        "image-gen".to_string(),
        "summarizer".to_string(),
    ]
}

/// Generate a Mohini `config.toml` string from the onboarding choices.
pub fn generate_config(state: &OnboardingConfig) -> String {
    let mut lines = Vec::new();
    lines.push("# Mohini configuration (generated by onboarding wizard)".to_string());
    lines.push(String::new());
    lines.push("log_level = \"info\"".to_string());

    // Gateway / API listen address
    let listen = state
        .gateway_url
        .as_deref()
        .unwrap_or("127.0.0.1:4200");
    lines.push(format!("api_listen = \"{}\"", listen));
    lines.push(String::new());

    // Default model — pick the first selected provider
    if let Some(provider) = state.selected_providers.first() {
        lines.push("[default_model]".to_string());
        let model_name = default_model_for_provider(provider);
        lines.push(format!("provider = \"{}\"", provider));
        lines.push(format!("model = \"{}\"", model_name));
        lines.push(String::new());
    }

    // Providers: emit env-var hints as comments plus any inline key
    if !state.selected_providers.is_empty() {
        lines.push("# Provider API keys".to_string());
        lines.push("# Set these as environment variables for security:".to_string());
        for prov in &state.selected_providers {
            let env_var = provider_env_var(prov);
            if let Some(key) = state.api_keys.get(prov.as_str()) {
                lines.push(format!("#   {}={}", env_var, key));
            } else {
                lines.push(format!("#   {}=<your-key>", env_var));
            }
        }
        lines.push(String::new());
    }

    // Skills
    if state.install_default_skills {
        lines.push("# Default skills enabled by onboarding".to_string());
        lines.push("# Skills are loaded from ~/.mohini/skills/".to_string());
        lines.push(String::new());
    }

    lines.join("\n")
}

/// Map provider name to its conventional environment variable.
fn provider_env_var(provider: &str) -> &str {
    match provider {
        "openai" => "OPENAI_API_KEY",
        "anthropic" => "ANTHROPIC_API_KEY",
        "groq" => "GROQ_API_KEY",
        "google" | "gemini" => "GOOGLE_API_KEY",
        "mistral" => "MISTRAL_API_KEY",
        "cohere" => "COHERE_API_KEY",
        _ => "UNKNOWN_API_KEY",
    }
}

/// Return a sensible default model name for a given provider.
fn default_model_for_provider(provider: &str) -> &str {
    match provider {
        "openai" => "gpt-4o",
        "anthropic" => "claude-sonnet-4-20250514",
        "groq" => "llama-3.3-70b-versatile",
        "google" | "gemini" => "gemini-2.0-flash",
        "mistral" => "mistral-large-latest",
        "cohere" => "command-r-plus",
        _ => "default",
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_validate_openai_key_valid() {
        assert!(validate_api_key("openai", "sk-abc123def456ghi789jklmnopqrst").unwrap());
    }

    #[test]
    fn test_validate_openai_key_bad_prefix() {
        assert!(!(validate_api_key("openai", "pk-abc123def456ghi789jklmnopqrst").unwrap()));
    }

    #[test]
    fn test_validate_openai_key_too_short() {
        assert!(!(validate_api_key("openai", "sk-short").unwrap()));
    }

    #[test]
    fn test_validate_anthropic_key_valid() {
        assert!(validate_api_key("anthropic", "sk-ant-api03-longkeyvaluehere12345678").unwrap());
    }

    #[test]
    fn test_validate_anthropic_key_bad_prefix() {
        assert!(!(validate_api_key("anthropic", "sk-wrongprefix1234567890123456").unwrap()));
    }

    #[test]
    fn test_validate_groq_key_valid() {
        assert!(validate_api_key("groq", "gsk_abcdefghijklmnopqrstuvwxyz1234567890").unwrap());
    }

    #[test]
    fn test_validate_empty_key() {
        assert!(!(validate_api_key("openai", "").unwrap()));
    }

    #[test]
    fn test_validate_whitespace_key() {
        assert!(!(validate_api_key("openai", "   ").unwrap()));
    }

    #[test]
    fn test_validate_unknown_provider() {
        assert!(validate_api_key("unknownprovider", "somekey123").is_err());
    }

    #[test]
    fn test_get_default_skills_not_empty() {
        let skills = get_default_skills();
        assert!(!skills.is_empty());
        assert!(skills.contains(&"web-search".to_string()));
        assert!(skills.contains(&"shell".to_string()));
    }

    #[test]
    fn test_generate_config_basic() {
        let config = OnboardingConfig {
            selected_providers: vec!["openai".to_string()],
            api_keys: HashMap::new(),
            install_default_skills: true,
            gateway_url: None,
        };
        let toml_str = generate_config(&config);
        assert!(toml_str.contains("log_level = \"info\""));
        assert!(toml_str.contains("api_listen = \"127.0.0.1:4200\""));
        assert!(toml_str.contains("provider = \"openai\""));
        assert!(toml_str.contains("model = \"gpt-4o\""));
    }

    #[test]
    fn test_generate_config_with_gateway_url() {
        let config = OnboardingConfig {
            selected_providers: vec![],
            api_keys: HashMap::new(),
            install_default_skills: false,
            gateway_url: Some("0.0.0.0:8080".to_string()),
        };
        let toml_str = generate_config(&config);
        assert!(toml_str.contains("api_listen = \"0.0.0.0:8080\""));
    }

    #[test]
    fn test_generate_config_with_api_key() {
        let mut keys = HashMap::new();
        keys.insert("anthropic".to_string(), "sk-ant-test-key-12345678901234".to_string());
        let config = OnboardingConfig {
            selected_providers: vec!["anthropic".to_string()],
            api_keys: keys,
            install_default_skills: true,
            gateway_url: None,
        };
        let toml_str = generate_config(&config);
        assert!(toml_str.contains("ANTHROPIC_API_KEY=sk-ant-test-key-12345678901234"));
        assert!(toml_str.contains("provider = \"anthropic\""));
    }

    #[test]
    fn test_onboarding_state_progress() {
        let mut state = OnboardingState::new();
        assert_eq!(state.current_step, OnboardingStep::Welcome);
        assert!(!state.is_finished());
        assert!(state.progress() < f64::EPSILON);

        state.complete_current(); // Welcome -> ApiKeySetup
        assert_eq!(state.current_step, OnboardingStep::ApiKeySetup);

        state.skip_current(); // ApiKeySetup -> ProviderSelection (skipped)
        assert_eq!(state.current_step, OnboardingStep::ProviderSelection);
        assert!(state.skipped_steps.contains(&OnboardingStep::ApiKeySetup));

        state.complete_current(); // ProviderSelection -> SkillInstall
        state.complete_current(); // SkillInstall -> GatewayConfig
        state.complete_current(); // GatewayConfig -> Complete
        assert_eq!(state.current_step, OnboardingStep::Complete);
        assert!(state.is_finished());
    }

    #[test]
    fn test_onboarding_step_labels() {
        assert_eq!(OnboardingStep::Welcome.label(), "Welcome");
        assert_eq!(OnboardingStep::Complete.label(), "Complete");
    }

    #[test]
    fn test_onboarding_step_all() {
        let all = OnboardingStep::all();
        assert_eq!(all.len(), 6);
        assert_eq!(all[0], OnboardingStep::Welcome);
        assert_eq!(all[5], OnboardingStep::Complete);
    }

    #[test]
    fn test_onboarding_config_default() {
        let config = OnboardingConfig::default();
        assert!(config.selected_providers.is_empty());
        assert!(config.api_keys.is_empty());
        assert!(config.install_default_skills);
        assert!(config.gateway_url.is_none());
    }
}
