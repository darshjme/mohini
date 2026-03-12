//! Community skills — SelfHosted category.

use super::types::{CommunitySkill, SkillCategory};

/// All SelfHosted community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "docker-compose-gen",
        description: "Generate docker-compose configurations",
        author: "community",
        category: SkillCategory::SelfHosted,
        tags: &["docker", "self-hosted"],
        prompt_content: "# Docker Compose Gen Skill\n\nGenerate docker-compose configurations.\n\nUse this skill to assist with docker, self-hosted tasks.",
        requires_bins: &["docker"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "traefik-config",
        description: "Traefik reverse proxy configuration",
        author: "community",
        category: SkillCategory::SelfHosted,
        tags: &["traefik", "proxy"],
        prompt_content: "# Traefik Config Skill\n\nTraefik reverse proxy configuration.\n\nUse this skill to assist with traefik, proxy tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_self_hosted_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::SelfHosted);
        }
    }
}
