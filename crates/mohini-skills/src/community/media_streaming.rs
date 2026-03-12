//! Community skills — MediaStreaming category.

use super::types::{CommunitySkill, SkillCategory};

/// All MediaStreaming community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "spotify-control",
        description: "Spotify playback control and playlists",
        author: "community",
        category: SkillCategory::MediaStreaming,
        tags: &["spotify", "music"],
        prompt_content: "# Spotify Control Skill\n\nSpotify playback control and playlists.\n\nUse this skill to assist with spotify, music tasks.",
        requires_bins: &[],
        requires_env: &["SPOTIFY_CLIENT_ID"],
    },
    CommunitySkill {
        name: "podcast-manager",
        description: "Podcast discovery and management",
        author: "community",
        category: SkillCategory::MediaStreaming,
        tags: &["podcasts", "audio"],
        prompt_content: "# Podcast Manager Skill\n\nPodcast discovery and management.\n\nUse this skill to assist with podcasts, audio tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "youtube-tools",
        description: "YouTube video tools and metadata",
        author: "community",
        category: SkillCategory::MediaStreaming,
        tags: &["youtube", "video"],
        prompt_content: "# Youtube Tools Skill\n\nYouTube video tools and metadata.\n\nUse this skill to assist with youtube, video tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_media_streaming_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::MediaStreaming);
        }
    }
}
