//! Community skills — Finance category.

use super::types::{CommunitySkill, SkillCategory};

/// All Finance community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "stock-tracker",
        description: "Stock market data and analysis",
        author: "community",
        category: SkillCategory::Finance,
        tags: &["stocks", "finance", "market"],
        prompt_content: "# Stock Tracker Skill\n\nStock market data and analysis.\n\nUse this skill to assist with stocks, finance, market tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "budget-planner",
        description: "Personal budget planning and tracking",
        author: "community",
        category: SkillCategory::Finance,
        tags: &["budget", "finance", "planning"],
        prompt_content: "# Budget Planner Skill\n\nPersonal budget planning and tracking.\n\nUse this skill to assist with budget, finance, planning tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_finance_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::Finance);
        }
    }
}
