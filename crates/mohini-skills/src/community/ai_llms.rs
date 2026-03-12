//! Community skills — AiLlms category.

use super::types::{CommunitySkill, SkillCategory};

/// All AiLlms community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "prompt-engineer",
        description: "Prompt engineering techniques and optimization",
        author: "community",
        category: SkillCategory::AiLlms,
        tags: &["prompts", "engineering"],
        prompt_content: "# Prompt Engineer Skill\n\nPrompt engineering techniques and optimization.\n\nUse this skill to assist with prompts, engineering tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "model-compare",
        description: "Compare LLM model capabilities and pricing",
        author: "community",
        category: SkillCategory::AiLlms,
        tags: &["models", "comparison"],
        prompt_content: "# Model Compare Skill\n\nCompare LLM model capabilities and pricing.\n\nUse this skill to assist with models, comparison tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "fine-tune-guide",
        description: "LLM fine-tuning workflow guide",
        author: "community",
        category: SkillCategory::AiLlms,
        tags: &["fine-tuning", "training"],
        prompt_content: "# Fine Tune Guide Skill\n\nLLM fine-tuning workflow guide.\n\nUse this skill to assist with fine-tuning, training tasks.",
        requires_bins: &["python3"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "rag-builder",
        description: "Build RAG (Retrieval Augmented Generation) pipelines",
        author: "community",
        category: SkillCategory::AiLlms,
        tags: &["rag", "embeddings", "vector"],
        prompt_content: "# Rag Builder Skill\n\nBuild RAG (Retrieval Augmented Generation) pipelines.\n\nUse this skill to assist with rag, embeddings, vector tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "agent-designer",
        description: "Design multi-agent AI systems",
        author: "community",
        category: SkillCategory::AiLlms,
        tags: &["agents", "multi-agent"],
        prompt_content: "# Agent Designer Skill\n\nDesign multi-agent AI systems.\n\nUse this skill to assist with agents, multi-agent tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_ai_llms_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::AiLlms);
        }
    }
}
