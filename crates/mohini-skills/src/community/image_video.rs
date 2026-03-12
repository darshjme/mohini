//! Community skills — ImageVideo category.

use super::types::{CommunitySkill, SkillCategory};

/// All ImageVideo community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "dalle-prompt",
        description: "DALL-E image generation prompt crafting",
        author: "community",
        category: SkillCategory::ImageVideo,
        tags: &["dalle", "image-gen", "ai"],
        prompt_content: "# Dalle Prompt Skill\n\nDALL-E image generation prompt crafting.\n\nUse this skill to assist with dalle, image-gen, ai tasks.",
        requires_bins: &[],
        requires_env: &["OPENAI_API_KEY"],
    },
    CommunitySkill {
        name: "imagemagick",
        description: "ImageMagick image processing commands",
        author: "community",
        category: SkillCategory::ImageVideo,
        tags: &["imagemagick", "images"],
        prompt_content: "# Imagemagick Skill\n\nImageMagick image processing commands.\n\nUse this skill to assist with imagemagick, images tasks.",
        requires_bins: &["convert"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "video-editor",
        description: "Video editing with ffmpeg",
        author: "community",
        category: SkillCategory::ImageVideo,
        tags: &["video", "editing", "ffmpeg"],
        prompt_content: "# Video Editor Skill\n\nVideo editing with ffmpeg.\n\nUse this skill to assist with video, editing, ffmpeg tasks.",
        requires_bins: &["ffmpeg"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "screenshot-ocr",
        description: "Extract text from screenshots",
        author: "community",
        category: SkillCategory::ImageVideo,
        tags: &["ocr", "screenshot", "text"],
        prompt_content: "# Screenshot Ocr Skill\n\nExtract text from screenshots.\n\nUse this skill to assist with ocr, screenshot, text tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "svg-creator",
        description: "Create and optimize SVG graphics",
        author: "community",
        category: SkillCategory::ImageVideo,
        tags: &["svg", "vector", "graphics"],
        prompt_content: "# Svg Creator Skill\n\nCreate and optimize SVG graphics.\n\nUse this skill to assist with svg, vector, graphics tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_image_video_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::ImageVideo);
        }
    }
}
