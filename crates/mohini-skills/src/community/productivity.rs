//! Community skills — Productivity category.

use super::types::{CommunitySkill, SkillCategory};

/// All Productivity community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "todo-manager",
        description: "Task and todo list management",
        author: "community",
        category: SkillCategory::Productivity,
        tags: &["tasks", "todos", "gtd"],
        prompt_content: "# Todo Manager Skill\n\nTask and todo list management.\n\nUse this skill to assist with tasks, todos, gtd tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "pomodoro",
        description: "Pomodoro technique timer and tracking",
        author: "community",
        category: SkillCategory::Productivity,
        tags: &["pomodoro", "focus", "time"],
        prompt_content: "# Pomodoro Skill\n\nPomodoro technique timer and tracking.\n\nUse this skill to assist with pomodoro, focus, time tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "meeting-notes",
        description: "Meeting note-taking and action item extraction",
        author: "community",
        category: SkillCategory::Productivity,
        tags: &["meetings", "notes"],
        prompt_content: "# Meeting Notes Skill\n\nMeeting note-taking and action item extraction.\n\nUse this skill to assist with meetings, notes tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "email-drafter",
        description: "Draft professional emails with context",
        author: "community",
        category: SkillCategory::Productivity,
        tags: &["email", "writing"],
        prompt_content: "# Email Drafter Skill\n\nDraft professional emails with context.\n\nUse this skill to assist with email, writing tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "project-planner",
        description: "Project planning and milestone tracking",
        author: "community",
        category: SkillCategory::Productivity,
        tags: &["project", "planning"],
        prompt_content: "# Project Planner Skill\n\nProject planning and milestone tracking.\n\nUse this skill to assist with project, planning tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_productivity_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::Productivity);
        }
    }
}
