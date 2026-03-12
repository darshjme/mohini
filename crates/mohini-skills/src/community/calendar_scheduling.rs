//! Community skills — CalendarScheduling category.

use super::types::{CommunitySkill, SkillCategory};

/// All CalendarScheduling community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "gcal-manager",
        description: "Google Calendar event management",
        author: "community",
        category: SkillCategory::CalendarScheduling,
        tags: &["calendar", "google", "scheduling"],
        prompt_content: "# Gcal Manager Skill\n\nGoogle Calendar event management.\n\nUse this skill to assist with calendar, google, scheduling tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "meeting-scheduler",
        description: "Automated meeting scheduling",
        author: "community",
        category: SkillCategory::CalendarScheduling,
        tags: &["meetings", "scheduling"],
        prompt_content: "# Meeting Scheduler Skill\n\nAutomated meeting scheduling.\n\nUse this skill to assist with meetings, scheduling tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_calendar_scheduling_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::CalendarScheduling);
        }
    }
}
