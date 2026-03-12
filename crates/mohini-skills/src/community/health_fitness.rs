//! Community skills — HealthFitness category.

use super::types::{CommunitySkill, SkillCategory};

/// All HealthFitness community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "workout-planner",
        description: "Personalized workout plan generation",
        author: "community",
        category: SkillCategory::HealthFitness,
        tags: &["fitness", "workout", "exercise"],
        prompt_content: "# Workout Planner Skill\n\nPersonalized workout plan generation.\n\nUse this skill to assist with fitness, workout, exercise tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "nutrition-tracker",
        description: "Nutrition and meal tracking",
        author: "community",
        category: SkillCategory::HealthFitness,
        tags: &["nutrition", "diet", "meals"],
        prompt_content: "# Nutrition Tracker Skill\n\nNutrition and meal tracking.\n\nUse this skill to assist with nutrition, diet, meals tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "meditation-guide",
        description: "Guided meditation and mindfulness",
        author: "community",
        category: SkillCategory::HealthFitness,
        tags: &["meditation", "mindfulness"],
        prompt_content: "# Meditation Guide Skill\n\nGuided meditation and mindfulness.\n\nUse this skill to assist with meditation, mindfulness tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_health_fitness_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::HealthFitness);
        }
    }
}
