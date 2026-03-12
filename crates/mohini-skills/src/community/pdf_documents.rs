//! Community skills — PdfDocuments category.

use super::types::{CommunitySkill, SkillCategory};

/// All PdfDocuments community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "pdf-extract",
        description: "Extract text and tables from PDFs",
        author: "community",
        category: SkillCategory::PdfDocuments,
        tags: &["pdf", "extraction"],
        prompt_content: "# Pdf Extract Skill\n\nExtract text and tables from PDFs.\n\nUse this skill to assist with pdf, extraction tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "doc-converter",
        description: "Convert between document formats",
        author: "community",
        category: SkillCategory::PdfDocuments,
        tags: &["conversion", "documents"],
        prompt_content: "# Doc Converter Skill\n\nConvert between document formats.\n\nUse this skill to assist with conversion, documents tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "markdown-export",
        description: "Export documents to Markdown",
        author: "community",
        category: SkillCategory::PdfDocuments,
        tags: &["markdown", "export"],
        prompt_content: "# Markdown Export Skill\n\nExport documents to Markdown.\n\nUse this skill to assist with markdown, export tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "latex-helper",
        description: "LaTeX document authoring",
        author: "community",
        category: SkillCategory::PdfDocuments,
        tags: &["latex", "typesetting"],
        prompt_content: "# Latex Helper Skill\n\nLaTeX document authoring.\n\nUse this skill to assist with latex, typesetting tasks.",
        requires_bins: &["pdflatex"],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_pdf_documents_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::PdfDocuments);
        }
    }
}
