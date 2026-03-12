//! Community skills — BrowserAutomation category.

use super::types::{CommunitySkill, SkillCategory};

/// All BrowserAutomation community skills.
pub static SKILLS: &[CommunitySkill] = &[
    CommunitySkill {
        name: "playwright-expert",
        description: "Browser automation with Playwright",
        author: "community",
        category: SkillCategory::BrowserAutomation,
        tags: &["playwright", "testing", "automation"],
        prompt_content: "# Playwright Expert Skill\n\nBrowser automation with Playwright.\n\nUse this skill to assist with playwright, testing, automation tasks.",
        requires_bins: &["node"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "puppeteer-guide",
        description: "Puppeteer browser automation patterns",
        author: "community",
        category: SkillCategory::BrowserAutomation,
        tags: &["puppeteer", "chrome"],
        prompt_content: "# Puppeteer Guide Skill\n\nPuppeteer browser automation patterns.\n\nUse this skill to assist with puppeteer, chrome tasks.",
        requires_bins: &["node"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "selenium-helper",
        description: "Selenium WebDriver automation",
        author: "community",
        category: SkillCategory::BrowserAutomation,
        tags: &["selenium", "webdriver"],
        prompt_content: "# Selenium Helper Skill\n\nSelenium WebDriver automation.\n\nUse this skill to assist with selenium, webdriver tasks.",
        requires_bins: &["python3"],
        requires_env: &[],
    },
    CommunitySkill {
        name: "web-scraper",
        description: "Ethical web scraping best practices",
        author: "community",
        category: SkillCategory::BrowserAutomation,
        tags: &["scraping", "extraction"],
        prompt_content: "# Web Scraper Skill\n\nEthical web scraping best practices.\n\nUse this skill to assist with scraping, extraction tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
    CommunitySkill {
        name: "form-filler",
        description: "Automated form filling and submission",
        author: "community",
        category: SkillCategory::BrowserAutomation,
        tags: &["forms", "automation"],
        prompt_content: "# Form Filler Skill\n\nAutomated form filling and submission.\n\nUse this skill to assist with forms, automation tasks.",
        requires_bins: &[],
        requires_env: &[],
    },
];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_browser_automation_skills_not_empty() {
        assert!(!SKILLS.is_empty());
        for skill in SKILLS {
            assert!(!skill.name.is_empty());
            assert!(!skill.description.is_empty());
            assert_eq!(skill.category, SkillCategory::BrowserAutomation);
        }
    }
}
