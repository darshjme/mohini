//! Community skills — NotesPkm category.

use super::types::{CommunitySkill, SkillCategory};

/// All NotesPkm community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "obsidian-helper",
        description: "Obsidian vault management and queries",
        author: "community",
        category: SkillCategory::NotesPkm,
        tags: &["obsidian", "notes", "pkm"],
        prompt_content: "# Obsidian Helper Skill\n\nObsidian vault management and queries.\n\nUse this skill to assist with obsidian, notes, pkm tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "notion-expert",
        description: "Notion workspace automation",
        author: "community",
        category: SkillCategory::NotesPkm,
        tags: &["notion", "productivity"],
        prompt_content: "# Notion Expert Skill\n\nNotion workspace automation.\n\nUse this skill to assist with notion, productivity tasks.",
        requires_bins: &[],
        requires_env: &["NOTION_API_KEY"],
    },
    CommunitySkill {
        name: "logseq-guide",
        description: "Logseq graph-based note-taking",
        author: "community",
        category: SkillCategory::NotesPkm,
        tags: &["logseq", "notes"],
        prompt_content: "# Logseq Guide Skill\n\nLogseq graph-based note-taking.\n\nUse this skill to assist with logseq, notes tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_notes_pkm_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::NotesPkm);
        }
    }
}
