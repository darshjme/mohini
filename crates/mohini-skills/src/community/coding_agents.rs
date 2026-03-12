//! Community skills — CodingAgents category.

use super::types::{CommunitySkill, SkillCategory};

/// All CodingAgents community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "cursor-rules",
        description: "Generate and manage Cursor IDE rules for consistent coding",
        author: "cursor-community",
        category: SkillCategory::CodingAgents,
        tags: &["cursor", "ide", "rules"],
        prompt_content: "# Cursor Rules Skill\n\nGenerate and manage Cursor IDE rules for consistent coding.\n\nUse this skill to assist with cursor, ide, rules tasks.",
        requires_bins: &[],
        requires_env: &["CURSOR_API_KEY"],
    },
    CommunitySkill {
        name: "copilot-chat",
        description: "Enhanced GitHub Copilot Chat interactions",
        author: "github",
        category: SkillCategory::CodingAgents,
        tags: &["copilot", "ai", "coding"],
        prompt_content: "# Copilot Chat Skill\n\nEnhanced GitHub Copilot Chat interactions.\n\nUse this skill to assist with copilot, ai, coding tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "aider-expert",
        description: "Use aider AI coding assistant effectively",
        author: "aider-community",
        category: SkillCategory::CodingAgents,
        tags: &["aider", "ai", "coding"],
        prompt_content: "# Aider Expert Skill\n\nUse aider AI coding assistant effectively.\n\nUse this skill to assist with aider, ai, coding tasks.",
        requires_bins: &["aider"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "code-review-ai",
        description: "AI-powered code review with detailed feedback",
        author: "community",
        category: SkillCategory::CodingAgents,
        tags: &["review", "quality", "ai"],
        prompt_content: "# Code Review Ai Skill\n\nAI-powered code review with detailed feedback.\n\nUse this skill to assist with review, quality, ai tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "refactor-guru",
        description: "Intelligent code refactoring suggestions",
        author: "community",
        category: SkillCategory::CodingAgents,
        tags: &["refactor", "clean-code"],
        prompt_content: "# Refactor Guru Skill\n\nIntelligent code refactoring suggestions.\n\nUse this skill to assist with refactor, clean-code tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "debug-detective",
        description: "Systematic debugging methodology",
        author: "community",
        category: SkillCategory::CodingAgents,
        tags: &["debug", "troubleshoot"],
        prompt_content: "# Debug Detective Skill\n\nSystematic debugging methodology.\n\nUse this skill to assist with debug, troubleshoot tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "test-generator",
        description: "Auto-generate unit tests for any language",
        author: "community",
        category: SkillCategory::CodingAgents,
        tags: &["testing", "unit-test"],
        prompt_content: "# Test Generator Skill\n\nAuto-generate unit tests for any language.\n\nUse this skill to assist with testing, unit-test tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "codebase-analyst",
        description: "Analyze large codebases for patterns and issues",
        author: "community",
        category: SkillCategory::CodingAgents,
        tags: &["analysis", "patterns"],
        prompt_content: "# Codebase Analyst Skill\n\nAnalyze large codebases for patterns and issues.\n\nUse this skill to assist with analysis, patterns tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_coding_agents_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::CodingAgents);
        }
    }
}
