//! Community skills — Gaming category.

use super::types::{CommunitySkill, SkillCategory};

/// All Gaming community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "game-wiki",
        description: "Game wiki and walkthrough lookup",
        author: "community",
        category: SkillCategory::Gaming,
        tags: &["gaming", "wiki", "guides"],
        prompt_content: "# Game Wiki Skill\n\nGame wiki and walkthrough lookup.\n\nUse this skill to assist with gaming, wiki, guides tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "steam-tools",
        description: "Steam library and achievement tracking",
        author: "community",
        category: SkillCategory::Gaming,
        tags: &["steam", "gaming"],
        prompt_content: "# Steam Tools Skill\n\nSteam library and achievement tracking.\n\nUse this skill to assist with steam, gaming tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_gaming_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::Gaming);
        }
    }
}
