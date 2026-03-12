//! Community skill data types.
//!
//! Community skills are compiled into the binary as static data.
//! They are loaded into the registry after bundled skills but before user-installed skills.

use serde::{Deserialize, Serialize};

/// Category of a community skill.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum SkillCategory {
    CodingAgents,
    WebFrontend,
    DevopsCloud,
    SearchResearch,
    BrowserAutomation,
    Productivity,
    AiLlms,
    CliUtilities,
    GitGithub,
    ImageVideo,
    Communication,
    PdfDocuments,
    Transportation,
    MarketingSales,
    HealthFitness,
    MediaStreaming,
    NotesPkm,
    CalendarScheduling,
    ShoppingEcommerce,
    SecurityPasswords,
    PersonalDevelopment,
    AppleApps,
    SmartHomeIot,
    AgentTools,
    Gaming,
    SelfHosted,
    Notebook,
    IosMacosDev,
    Finance,
    AgentToAgent,
}

impl SkillCategory {
    /// Human-readable display name.
    pub fn display_name(&self) -> &'static str {
        match self {
            Self::CodingAgents => "Coding Agents & IDEs",
            Self::WebFrontend => "Web & Frontend",
            Self::DevopsCloud => "DevOps & Cloud",
            Self::SearchResearch => "Search & Research",
            Self::BrowserAutomation => "Browser & Automation",
            Self::Productivity => "Productivity & Tasks",
            Self::AiLlms => "AI & LLMs",
            Self::CliUtilities => "CLI Utilities",
            Self::GitGithub => "Git & GitHub",
            Self::ImageVideo => "Image & Video",
            Self::Communication => "Communication",
            Self::PdfDocuments => "PDF & Documents",
            Self::Transportation => "Transportation",
            Self::MarketingSales => "Marketing & Sales",
            Self::HealthFitness => "Health & Fitness",
            Self::MediaStreaming => "Media & Streaming",
            Self::NotesPkm => "Notes & PKM",
            Self::CalendarScheduling => "Calendar & Scheduling",
            Self::ShoppingEcommerce => "Shopping & E-commerce",
            Self::SecurityPasswords => "Security & Passwords",
            Self::PersonalDevelopment => "Personal Development",
            Self::AppleApps => "Apple Apps",
            Self::SmartHomeIot => "Smart Home & IoT",
            Self::AgentTools => "Agent Tools",
            Self::Gaming => "Gaming",
            Self::SelfHosted => "Self-Hosted",
            Self::Notebook => "Notebook",
            Self::IosMacosDev => "iOS/macOS Dev",
            Self::Finance => "Finance",
            Self::AgentToAgent => "Agent-to-Agent",
        }
    }

    /// All categories.
    pub fn all() -> &'static [SkillCategory] {
        &[
            Self::CodingAgents,
            Self::WebFrontend,
            Self::DevopsCloud,
            Self::SearchResearch,
            Self::BrowserAutomation,
            Self::Productivity,
            Self::AiLlms,
            Self::CliUtilities,
            Self::GitGithub,
            Self::ImageVideo,
            Self::Communication,
            Self::PdfDocuments,
            Self::Transportation,
            Self::MarketingSales,
            Self::HealthFitness,
            Self::MediaStreaming,
            Self::NotesPkm,
            Self::CalendarScheduling,
            Self::ShoppingEcommerce,
            Self::SecurityPasswords,
            Self::PersonalDevelopment,
            Self::AppleApps,
            Self::SmartHomeIot,
            Self::AgentTools,
            Self::Gaming,
            Self::SelfHosted,
            Self::Notebook,
            Self::IosMacosDev,
            Self::Finance,
            Self::AgentToAgent,
        ]
    }
}

/// A community-contributed skill compiled into the binary.
#[derive(Debug, Clone)]
pub struct CommunitySkill {
    /// Unique skill name (kebab-case).
    pub name: &'static str,
    /// Short description.
    pub description: &'static str,
    /// Author name or handle.
    pub author: &'static str,
    /// Category.
    pub category: SkillCategory,
    /// Discovery tags.
    pub tags: &'static [&'static str],
    /// The SKILL.md body content (prompt injected into LLM context).
    pub prompt_content: &'static str,
    /// Required external binaries (e.g., "python3", "node", "ffmpeg").
    pub requires_bins: &'static [&'static str],
    /// Required environment variables (e.g., "OPENAI_API_KEY").
    pub requires_env: &'static [&'static str],
}

impl CommunitySkill {
    /// Convert to a SkillManifest for registry loading.
    pub fn to_manifest(&self) -> crate::SkillManifest {
        crate::SkillManifest {
            skill: crate::SkillMeta {
                name: self.name.to_string(),
                version: "1.0.0".to_string(),
                description: self.description.to_string(),
                author: self.author.to_string(),
                license: "MIT".to_string(),
                tags: self.tags.iter().map(|t| t.to_string()).collect(),
            },
            runtime: crate::SkillRuntimeConfig {
                runtime_type: crate::SkillRuntime::PromptOnly,
                entry: String::new(),
            },
            tools: crate::SkillTools { provided: vec![] },
            requirements: crate::SkillRequirements::default(),
            prompt_context: Some(self.prompt_content.to_string()),
            source: Some(crate::SkillSource::SkillHub {
                slug: self.name.to_string(),
                version: "1.0.0".to_string(),
            }),
        }
    }
}

/// Get all community skills.
pub fn all_community_skills() -> Vec<&'static CommunitySkill> {
    let mut skills = Vec::new();
    skills.extend(super::coding_agents::SKILLS.iter());
    skills.extend(super::web_frontend::SKILLS.iter());
    skills.extend(super::devops_cloud::SKILLS.iter());
    skills.extend(super::search_research::SKILLS.iter());
    skills.extend(super::browser_automation::SKILLS.iter());
    skills.extend(super::productivity::SKILLS.iter());
    skills.extend(super::ai_llms::SKILLS.iter());
    skills.extend(super::cli_utilities::SKILLS.iter());
    skills.extend(super::git_github::SKILLS.iter());
    skills.extend(super::image_video::SKILLS.iter());
    skills.extend(super::communication::SKILLS.iter());
    skills.extend(super::pdf_documents::SKILLS.iter());
    skills.extend(super::transportation::SKILLS.iter());
    skills.extend(super::marketing_sales::SKILLS.iter());
    skills.extend(super::health_fitness::SKILLS.iter());
    skills.extend(super::media_streaming::SKILLS.iter());
    skills.extend(super::notes_pkm::SKILLS.iter());
    skills.extend(super::calendar_scheduling::SKILLS.iter());
    skills.extend(super::shopping_ecommerce::SKILLS.iter());
    skills.extend(super::security_passwords::SKILLS.iter());
    skills.extend(super::personal_development::SKILLS.iter());
    skills.extend(super::apple_apps::SKILLS.iter());
    skills.extend(super::smart_home_iot::SKILLS.iter());
    skills.extend(super::agent_tools::SKILLS.iter());
    skills.extend(super::gaming::SKILLS.iter());
    skills.extend(super::self_hosted::SKILLS.iter());
    skills.extend(super::notebook::SKILLS.iter());
    skills.extend(super::ios_macos_dev::SKILLS.iter());
    skills.extend(super::finance::SKILLS.iter());
    skills.extend(super::agent_to_agent::SKILLS.iter());
    skills
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_all_categories() {
        assert_eq!(SkillCategory::all().len(), 30);
    }

    #[test]
    fn test_category_display_names() {
        assert_eq!(SkillCategory::CodingAgents.display_name(), "Coding Agents & IDEs");
        assert_eq!(SkillCategory::Finance.display_name(), "Finance");
    }

    #[test]
    fn test_community_skill_to_manifest() {
        let skill = CommunitySkill {
            name: "test-skill",
            description: "A test skill",
            author: "test",
            category: SkillCategory::CodingAgents,
            tags: &["test"],
            prompt_content: "You are a test assistant.",
            requires_bins: &[],
            requires_env: &[],
        };
        let manifest = skill.to_manifest();
        assert_eq!(manifest.skill.name, "test-skill");
        assert_eq!(manifest.runtime.runtime_type, crate::SkillRuntime::PromptOnly);
        assert!(manifest.prompt_context.is_some());
    }

    #[test]
    fn test_all_community_skills_loads() {
        let skills = all_community_skills();
        // Should have skills from all categories
        assert!(!skills.is_empty());
    }
}
