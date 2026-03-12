//! Community skills — SearchResearch category.

use super::types::{CommunitySkill, SkillCategory};

/// All SearchResearch community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "arxiv-search",
        description: "Search and summarize arXiv papers",
        author: "community",
        category: SkillCategory::SearchResearch,
        tags: &["arxiv", "research", "papers"],
        prompt_content: "# Arxiv Search Skill\n\nSearch and summarize arXiv papers.\n\nUse this skill to assist with arxiv, research, papers tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "wikipedia-lookup",
        description: "Efficient Wikipedia information retrieval",
        author: "community",
        category: SkillCategory::SearchResearch,
        tags: &["wikipedia", "knowledge"],
        prompt_content: "# Wikipedia Lookup Skill\n\nEfficient Wikipedia information retrieval.\n\nUse this skill to assist with wikipedia, knowledge tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "scholar-search",
        description: "Google Scholar paper search and citation analysis",
        author: "community",
        category: SkillCategory::SearchResearch,
        tags: &["scholar", "academic"],
        prompt_content: "# Scholar Search Skill\n\nGoogle Scholar paper search and citation analysis.\n\nUse this skill to assist with scholar, academic tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "patent-search",
        description: "Search and analyze patents",
        author: "community",
        category: SkillCategory::SearchResearch,
        tags: &["patents", "ip"],
        prompt_content: "# Patent Search Skill\n\nSearch and analyze patents.\n\nUse this skill to assist with patents, ip tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "news-aggregator",
        description: "Aggregate news from multiple sources",
        author: "community",
        category: SkillCategory::SearchResearch,
        tags: &["news", "aggregation"],
        prompt_content: "# News Aggregator Skill\n\nAggregate news from multiple sources.\n\nUse this skill to assist with news, aggregation tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_search_research_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::SearchResearch);
        }
    }
}
