//! Community skills — SmartHomeIot category.

use super::types::{CommunitySkill, SkillCategory};

/// All SmartHomeIot community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "homeassistant",
        description: "Home Assistant automation and control",
        author: "community",
        category: SkillCategory::SmartHomeIot,
        tags: &["homeassistant", "smart-home"],
        prompt_content: "# Homeassistant Skill\n\nHome Assistant automation and control.\n\nUse this skill to assist with homeassistant, smart-home tasks.",
        requires_bins: &[],
        requires_env: &["HASS_TOKEN"],
    },
    CommunitySkill {
        name: "mqtt-tools",
        description: "MQTT message publishing and monitoring",
        author: "community",
        category: SkillCategory::SmartHomeIot,
        tags: &["mqtt", "iot"],
        prompt_content: "# Mqtt Tools Skill\n\nMQTT message publishing and monitoring.\n\nUse this skill to assist with mqtt, iot tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_smart_home_iot_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::SmartHomeIot);
        }
    }
}
