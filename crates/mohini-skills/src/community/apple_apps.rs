//! Community skills — AppleApps category.

use super::types::{CommunitySkill, SkillCategory};

/// All AppleApps community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "shortcuts-builder",
        description: "Apple Shortcuts workflow builder",
        author: "community",
        category: SkillCategory::AppleApps,
        tags: &["shortcuts", "automation", "apple"],
        prompt_content: "# Shortcuts Builder Skill\n\nApple Shortcuts workflow builder.\n\nUse this skill to assist with shortcuts, automation, apple tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "reminders-sync",
        description: "Apple Reminders management",
        author: "community",
        category: SkillCategory::AppleApps,
        tags: &["reminders", "apple", "tasks"],
        prompt_content: "# Reminders Sync Skill\n\nApple Reminders management.\n\nUse this skill to assist with reminders, apple, tasks tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_apple_apps_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::AppleApps);
        }
    }
}
