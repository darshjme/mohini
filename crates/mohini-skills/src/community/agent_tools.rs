//! Community skills — AgentTools category.

use super::types::{CommunitySkill, SkillCategory};

/// All AgentTools community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "memory-manager",
        description: "Agent memory management and search",
        author: "community",
        category: SkillCategory::AgentTools,
        tags: &["memory", "agent", "knowledge"],
        prompt_content: "# Memory Manager Skill\n\nAgent memory management and search.\n\nUse this skill to assist with memory, agent, knowledge tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "tool-builder",
        description: "Build custom agent tools",
        author: "community",
        category: SkillCategory::AgentTools,
        tags: &["tools", "agent", "plugins"],
        prompt_content: "# Tool Builder Skill\n\nBuild custom agent tools.\n\nUse this skill to assist with tools, agent, plugins tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "workflow-engine",
        description: "Agent workflow orchestration",
        author: "community",
        category: SkillCategory::AgentTools,
        tags: &["workflow", "orchestration"],
        prompt_content: "# Workflow Engine Skill\n\nAgent workflow orchestration.\n\nUse this skill to assist with workflow, orchestration tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_agent_tools_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::AgentTools);
        }
    }
}
