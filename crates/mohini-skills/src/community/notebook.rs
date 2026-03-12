//! Community skills — Notebook category.

use super::types::{CommunitySkill, SkillCategory};

/// All Notebook community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "jupyter-helper",
        description: "Jupyter notebook management",
        author: "community",
        category: SkillCategory::Notebook,
        tags: &["jupyter", "notebook", "python"],
        prompt_content: "# Jupyter Helper Skill\n\nJupyter notebook management.\n\nUse this skill to assist with jupyter, notebook, python tasks.",
        requires_bins: &["jupyter"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "databricks-guide",
        description: "Databricks workspace operations",
        author: "community",
        category: SkillCategory::Notebook,
        tags: &["databricks", "spark"],
        prompt_content: "# Databricks Guide Skill\n\nDatabricks workspace operations.\n\nUse this skill to assist with databricks, spark tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_notebook_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::Notebook);
        }
    }
}
