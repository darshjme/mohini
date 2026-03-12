//! Community skills — IosMacosDev category.

use super::types::{CommunitySkill, SkillCategory};

/// All IosMacosDev community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "swiftui-expert",
        description: "SwiftUI development patterns",
        author: "community",
        category: SkillCategory::IosMacosDev,
        tags: &["swiftui", "ios", "macos"],
        prompt_content: "# Swiftui Expert Skill\n\nSwiftUI development patterns.\n\nUse this skill to assist with swiftui, ios, macos tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "xcode-helper",
        description: "Xcode project management and debugging",
        author: "community",
        category: SkillCategory::IosMacosDev,
        tags: &["xcode", "ios", "build"],
        prompt_content: "# Xcode Helper Skill\n\nXcode project management and debugging.\n\nUse this skill to assist with xcode, ios, build tasks.",
        requires_bins: &["xcodebuild"],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_ios_macos_dev_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::IosMacosDev);
        }
    }
}
