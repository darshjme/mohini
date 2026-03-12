//! Community skills — WebFrontend category.

use super::types::{CommunitySkill, SkillCategory};

/// All WebFrontend community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "react-expert",
        description: "React development best practices and patterns",
        author: "community",
        category: SkillCategory::WebFrontend,
        tags: &["react", "frontend"],
        prompt_content: "# React Expert Skill\n\nReact development best practices and patterns.\n\nUse this skill to assist with react, frontend tasks.",
        requires_bins: &["node"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "nextjs-guide",
        description: "Next.js app router and server components expert",
        author: "community",
        category: SkillCategory::WebFrontend,
        tags: &["nextjs", "react", "ssr"],
        prompt_content: "# Nextjs Guide Skill\n\nNext.js app router and server components expert.\n\nUse this skill to assist with nextjs, react, ssr tasks.",
        requires_bins: &["node"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "tailwind-helper",
        description: "Tailwind CSS utility class expert",
        author: "community",
        category: SkillCategory::WebFrontend,
        tags: &["tailwind", "css"],
        prompt_content: "# Tailwind Helper Skill\n\nTailwind CSS utility class expert.\n\nUse this skill to assist with tailwind, css tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "vue-expert",
        description: "Vue.js 3 composition API patterns",
        author: "community",
        category: SkillCategory::WebFrontend,
        tags: &["vue", "frontend"],
        prompt_content: "# Vue Expert Skill\n\nVue.js 3 composition API patterns.\n\nUse this skill to assist with vue, frontend tasks.",
        requires_bins: &["node"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "svelte-guide",
        description: "SvelteKit development patterns",
        author: "community",
        category: SkillCategory::WebFrontend,
        tags: &["svelte", "frontend"],
        prompt_content: "# Svelte Guide Skill\n\nSvelteKit development patterns.\n\nUse this skill to assist with svelte, frontend tasks.",
        requires_bins: &["node"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "css-wizard",
        description: "Advanced CSS layout and animations",
        author: "community",
        category: SkillCategory::WebFrontend,
        tags: &["css", "layout", "animation"],
        prompt_content: "# Css Wizard Skill\n\nAdvanced CSS layout and animations.\n\nUse this skill to assist with css, layout, animation tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "html-accessibility",
        description: "Web accessibility (WCAG) compliance checker",
        author: "community",
        category: SkillCategory::WebFrontend,
        tags: &["a11y", "wcag"],
        prompt_content: "# Html Accessibility Skill\n\nWeb accessibility (WCAG) compliance checker.\n\nUse this skill to assist with a11y, wcag tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "typescript-strict",
        description: "TypeScript strict mode and advanced types",
        author: "community",
        category: SkillCategory::WebFrontend,
        tags: &["typescript", "types"],
        prompt_content: "# Typescript Strict Skill\n\nTypeScript strict mode and advanced types.\n\nUse this skill to assist with typescript, types tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_web_frontend_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::WebFrontend);
        }
    }
}
