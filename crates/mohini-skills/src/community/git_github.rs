//! Community skills — GitGithub category.

use super::types::{CommunitySkill, SkillCategory};

/// All GitGithub community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "git-workflow",
        description: "Git branching strategies and workflows",
        author: "community",
        category: SkillCategory::GitGithub,
        tags: &["git", "workflow", "branching"],
        prompt_content: "# Git Workflow Skill\n\nGit branching strategies and workflows.\n\nUse this skill to assist with git, workflow, branching tasks.",
        requires_bins: &["git"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "pr-reviewer",
        description: "GitHub PR review best practices",
        author: "community",
        category: SkillCategory::GitGithub,
        tags: &["github", "pr", "review"],
        prompt_content: "# Pr Reviewer Skill\n\nGitHub PR review best practices.\n\nUse this skill to assist with github, pr, review tasks.",
        requires_bins: &["gh"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "git-bisect",
        description: "Git bisect for bug hunting",
        author: "community",
        category: SkillCategory::GitGithub,
        tags: &["git", "debug", "bisect"],
        prompt_content: "# Git Bisect Skill\n\nGit bisect for bug hunting.\n\nUse this skill to assist with git, debug, bisect tasks.",
        requires_bins: &["git"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "github-actions",
        description: "GitHub Actions workflow authoring",
        author: "community",
        category: SkillCategory::GitGithub,
        tags: &["github", "ci", "actions"],
        prompt_content: "# Github Actions Skill\n\nGitHub Actions workflow authoring.\n\nUse this skill to assist with github, ci, actions tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "conventional-commits",
        description: "Conventional commit message formatting",
        author: "community",
        category: SkillCategory::GitGithub,
        tags: &["git", "commits", "conventions"],
        prompt_content: "# Conventional Commits Skill\n\nConventional commit message formatting.\n\nUse this skill to assist with git, commits, conventions tasks.",
        requires_bins: &["git"],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_git_github_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::GitGithub);
        }
    }
}
