//! Community skills — DevopsCloud category.

use super::types::{CommunitySkill, SkillCategory};

/// All DevopsCloud community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "aws-expert",
        description: "AWS services configuration and best practices",
        author: "community",
        category: SkillCategory::DevopsCloud,
        tags: &["aws", "cloud"],
        prompt_content: "# Aws Expert Skill\n\nAWS services configuration and best practices.\n\nUse this skill to assist with aws, cloud tasks.",
        requires_bins: &["aws"],
        requires_env: &["AWS_ACCESS_KEY_ID"],
    },
    CommunitySkill {
        name: "gcp-guide",
        description: "Google Cloud Platform operations",
        author: "community",
        category: SkillCategory::DevopsCloud,
        tags: &["gcp", "cloud"],
        prompt_content: "# Gcp Guide Skill\n\nGoogle Cloud Platform operations.\n\nUse this skill to assist with gcp, cloud tasks.",
        requires_bins: &["gcloud"],
        requires_env: &["GOOGLE_APPLICATION_CREDENTIALS"],
    },
    CommunitySkill {
        name: "azure-helper",
        description: "Microsoft Azure cloud services",
        author: "community",
        category: SkillCategory::DevopsCloud,
        tags: &["azure", "cloud"],
        prompt_content: "# Azure Helper Skill\n\nMicrosoft Azure cloud services.\n\nUse this skill to assist with azure, cloud tasks.",
        requires_bins: &["az"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "helm-charts",
        description: "Kubernetes Helm chart authoring",
        author: "community",
        category: SkillCategory::DevopsCloud,
        tags: &["helm", "kubernetes"],
        prompt_content: "# Helm Charts Skill\n\nKubernetes Helm chart authoring.\n\nUse this skill to assist with helm, kubernetes tasks.",
        requires_bins: &["helm"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "ci-pipeline",
        description: "CI/CD pipeline design and optimization",
        author: "community",
        category: SkillCategory::DevopsCloud,
        tags: &["ci", "cd", "pipeline"],
        prompt_content: "# Ci Pipeline Skill\n\nCI/CD pipeline design and optimization.\n\nUse this skill to assist with ci, cd, pipeline tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "monitoring-stack",
        description: "Observability stack setup (Prometheus, Grafana, Loki)",
        author: "community",
        category: SkillCategory::DevopsCloud,
        tags: &["monitoring", "observability"],
        prompt_content: "# Monitoring Stack Skill\n\nObservability stack setup (Prometheus, Grafana, Loki).\n\nUse this skill to assist with monitoring, observability tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_devops_cloud_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::DevopsCloud);
        }
    }
}
