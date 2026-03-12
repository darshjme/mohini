//! Community skills — ShoppingEcommerce category.

use super::types::{CommunitySkill, SkillCategory};

/// All ShoppingEcommerce community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "price-tracker",
        description: "Product price tracking and alerts",
        author: "community",
        category: SkillCategory::ShoppingEcommerce,
        tags: &["prices", "shopping", "deals"],
        prompt_content: "# Price Tracker Skill\n\nProduct price tracking and alerts.\n\nUse this skill to assist with prices, shopping, deals tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "amazon-search",
        description: "Amazon product search and comparison",
        author: "community",
        category: SkillCategory::ShoppingEcommerce,
        tags: &["amazon", "shopping"],
        prompt_content: "# Amazon Search Skill\n\nAmazon product search and comparison.\n\nUse this skill to assist with amazon, shopping tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_shopping_ecommerce_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::ShoppingEcommerce);
        }
    }
}
