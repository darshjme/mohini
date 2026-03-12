//! Community skills — PersonalDevelopment category.

use super::types::{CommunitySkill, SkillCategory};

/// All PersonalDevelopment community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "language-tutor",
        description: "Language learning conversation practice",
        author: "community",
        category: SkillCategory::PersonalDevelopment,
        tags: &["languages", "learning"],
        prompt_content: "# Language Tutor Skill\n\nLanguage learning conversation practice.\n\nUse this skill to assist with languages, learning tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "book-summarizer",
        description: "Book summary and key takeaways",
        author: "community",
        category: SkillCategory::PersonalDevelopment,
        tags: &["books", "reading", "summary"],
        prompt_content: "# Book Summarizer Skill\n\nBook summary and key takeaways.\n\nUse this skill to assist with books, reading, summary tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_personal_development_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::PersonalDevelopment);
        }
    }
}
