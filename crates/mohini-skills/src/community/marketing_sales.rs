//! Community skills — MarketingSales category.

use super::types::{CommunitySkill, SkillCategory};

/// All MarketingSales community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "seo-analyzer",
        description: "SEO analysis and recommendations",
        author: "community",
        category: SkillCategory::MarketingSales,
        tags: &["seo", "marketing"],
        prompt_content: "# Seo Analyzer Skill\n\nSEO analysis and recommendations.\n\nUse this skill to assist with seo, marketing tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "social-media",
        description: "Social media content planning",
        author: "community",
        category: SkillCategory::MarketingSales,
        tags: &["social", "content", "marketing"],
        prompt_content: "# Social Media Skill\n\nSocial media content planning.\n\nUse this skill to assist with social, content, marketing tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "email-campaign",
        description: "Email marketing campaign design",
        author: "community",
        category: SkillCategory::MarketingSales,
        tags: &["email", "marketing", "campaigns"],
        prompt_content: "# Email Campaign Skill\n\nEmail marketing campaign design.\n\nUse this skill to assist with email, marketing, campaigns tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_marketing_sales_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::MarketingSales);
        }
    }
}
