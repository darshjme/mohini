//! Community skills — Transportation category.

use super::types::{CommunitySkill, SkillCategory};

/// All Transportation community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "flight-tracker",
        description: "Track flight status and schedules",
        author: "community",
        category: SkillCategory::Transportation,
        tags: &["flights", "travel"],
        prompt_content: "# Flight Tracker Skill\n\nTrack flight status and schedules.\n\nUse this skill to assist with flights, travel tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "transit-planner",
        description: "Public transit route planning",
        author: "community",
        category: SkillCategory::Transportation,
        tags: &["transit", "routes"],
        prompt_content: "# Transit Planner Skill\n\nPublic transit route planning.\n\nUse this skill to assist with transit, routes tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "ev-charger",
        description: "Find EV charging stations nearby",
        author: "community",
        category: SkillCategory::Transportation,
        tags: &["ev", "charging", "electric"],
        prompt_content: "# Ev Charger Skill\n\nFind EV charging stations nearby.\n\nUse this skill to assist with ev, charging, electric tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_transportation_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::Transportation);
        }
    }
}
