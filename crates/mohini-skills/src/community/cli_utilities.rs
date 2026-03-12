//! Community skills — CliUtilities category.

use super::types::{CommunitySkill, SkillCategory};

/// All CliUtilities community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "jq-expert",
        description: "jq JSON processing mastery",
        author: "community",
        category: SkillCategory::CliUtilities,
        tags: &["jq", "json", "cli"],
        prompt_content: "# Jq Expert Skill\n\njq JSON processing mastery.\n\nUse this skill to assist with jq, json, cli tasks.",
        requires_bins: &["jq"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "awk-sed-master",
        description: "Text processing with awk and sed",
        author: "community",
        category: SkillCategory::CliUtilities,
        tags: &["awk", "sed", "text"],
        prompt_content: "# Awk Sed Master Skill\n\nText processing with awk and sed.\n\nUse this skill to assist with awk, sed, text tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "tmux-guru",
        description: "tmux session and window management",
        author: "community",
        category: SkillCategory::CliUtilities,
        tags: &["tmux", "terminal"],
        prompt_content: "# Tmux Guru Skill\n\ntmux session and window management.\n\nUse this skill to assist with tmux, terminal tasks.",
        requires_bins: &["tmux"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "ffmpeg-wizard",
        description: "FFmpeg media conversion commands",
        author: "community",
        category: SkillCategory::CliUtilities,
        tags: &["ffmpeg", "media", "conversion"],
        prompt_content: "# Ffmpeg Wizard Skill\n\nFFmpeg media conversion commands.\n\nUse this skill to assist with ffmpeg, media, conversion tasks.",
        requires_bins: &["ffmpeg"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "curl-expert",
        description: "Advanced curl HTTP request crafting",
        author: "community",
        category: SkillCategory::CliUtilities,
        tags: &["curl", "http"],
        prompt_content: "# Curl Expert Skill\n\nAdvanced curl HTTP request crafting.\n\nUse this skill to assist with curl, http tasks.",
        requires_bins: &["curl"],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_cli_utilities_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::CliUtilities);
        }
    }
}
