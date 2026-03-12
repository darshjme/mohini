//! Community skills — all categories re-exported.

pub mod types;

pub mod agent_to_agent;
pub mod agent_tools;
pub mod ai_llms;
pub mod apple_apps;
pub mod browser_automation;
pub mod calendar_scheduling;
pub mod cli_utilities;
pub mod coding_agents;
pub mod communication;
pub mod devops_cloud;
pub mod finance;
pub mod gaming;
pub mod git_github;
pub mod health_fitness;
pub mod image_video;
pub mod ios_macos_dev;
pub mod marketing_sales;
pub mod media_streaming;
pub mod notebook;
pub mod notes_pkm;
pub mod pdf_documents;
pub mod personal_development;
pub mod productivity;
pub mod search_research;
pub mod security_passwords;
pub mod self_hosted;
pub mod shopping_ecommerce;
pub mod smart_home_iot;
pub mod transportation;
pub mod web_frontend;

pub use types::{CommunitySkill, SkillCategory, all_community_skills};

