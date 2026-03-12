//! Community skills — SecurityPasswords category.

use super::types::{CommunitySkill, SkillCategory};

/// All SecurityPasswords community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "password-audit",
        description: "Password strength and security audit",
        author: "community",
        category: SkillCategory::SecurityPasswords,
        tags: &["passwords", "security"],
        prompt_content: "# Password Audit Skill\n\nPassword strength and security audit.\n\nUse this skill to assist with passwords, security tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "owasp-checker",
        description: "OWASP security checklist verification",
        author: "community",
        category: SkillCategory::SecurityPasswords,
        tags: &["owasp", "security", "web"],
        prompt_content: "# Owasp Checker Skill\n\nOWASP security checklist verification.\n\nUse this skill to assist with owasp, security, web tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "cve-lookup",
        description: "CVE vulnerability database lookup",
        author: "community",
        category: SkillCategory::SecurityPasswords,
        tags: &["cve", "vulnerabilities", "security"],
        prompt_content: "# Cve Lookup Skill\n\nCVE vulnerability database lookup.\n\nUse this skill to assist with cve, vulnerabilities, security tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_security_passwords_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::SecurityPasswords);
        }
    }
}
