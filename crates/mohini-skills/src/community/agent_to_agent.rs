//! Community skills — AgentToAgent category.

use super::types::{CommunitySkill, SkillCategory};

/// All AgentToAgent community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "a2a-protocol",
        description: "Agent-to-Agent protocol communication",
        author: "community",
        category: SkillCategory::AgentToAgent,
        tags: &["a2a", "protocol", "agents"],
        prompt_content: "# A2A Protocol Skill\n\nAgent-to-Agent protocol communication.\n\nUse this skill to assist with a2a, protocol, agents tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "mcp-bridge",
        description: "Model Context Protocol bridge",
        author: "community",
        category: SkillCategory::AgentToAgent,
        tags: &["mcp", "protocol", "bridge"],
        prompt_content: "# Mcp Bridge Skill\n\nModel Context Protocol bridge.\n\nUse this skill to assist with mcp, protocol, bridge tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_agent_to_agent_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::AgentToAgent);
        }
    }
}
