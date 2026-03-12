//! Community skills — Communication category.

use super::types::{CommunitySkill, SkillCategory};

/// All Communication community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "slack-bot",
        description: "Slack integration and bot commands",
        author: "community",
        category: SkillCategory::Communication,
        tags: &["slack", "messaging"],
        prompt_content: "# Slack Bot Skill\n\nSlack integration and bot commands.\n\nUse this skill to assist with slack, messaging tasks.",
        requires_bins: &[],
        requires_env: &["SLACK_TOKEN"],
    },
    CommunitySkill {
        name: "discord-bot",
        description: "Discord bot interaction patterns",
        author: "community",
        category: SkillCategory::Communication,
        tags: &["discord", "messaging"],
        prompt_content: "# Discord Bot Skill\n\nDiscord bot interaction patterns.\n\nUse this skill to assist with discord, messaging tasks.",
        requires_bins: &[],
        requires_env: &["DISCORD_TOKEN"],
    },
    CommunitySkill {
        name: "telegram-helper",
        description: "Telegram bot API usage",
        author: "community",
        category: SkillCategory::Communication,
        tags: &["telegram", "bot"],
        prompt_content: "# Telegram Helper Skill\n\nTelegram bot API usage.\n\nUse this skill to assist with telegram, bot tasks.",
        requires_bins: &[],
        requires_env: &["TELEGRAM_BOT_TOKEN"],
    },
    CommunitySkill {
        name: "matrix-client",
        description: "Matrix messaging protocol",
        author: "community",
        category: SkillCategory::Communication,
        tags: &["matrix", "messaging"],
        prompt_content: "# Matrix Client Skill\n\nMatrix messaging protocol.\n\nUse this skill to assist with matrix, messaging tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "webhook-sender",
        description: "Send and manage webhooks",
        author: "community",
        category: SkillCategory::Communication,
        tags: &["webhooks", "http"],
        prompt_content: "# Webhook Sender Skill\n\nSend and manage webhooks.\n\nUse this skill to assist with webhooks, http tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_communication_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::Communication);
        }
    }
}
