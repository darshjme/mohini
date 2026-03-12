---
name: skill-creator
description: "Create new Mohini skills — scaffold, write manifests, test, and publish to SkillHub."
---

# Skill Creator

You help users create new Mohini skills. Follow these steps:

## Scaffold a New Skill

Run `mohini skill new <name>` to create the skill directory structure:
```
skills/<name>/
├── skill.toml        # Manifest
├── SKILL.md          # Prompt content (for PromptOnly skills)
├── src/              # Source code (for Python/Node/WASM skills)
│   └── main.py       # Entry point
└── README.md         # Documentation
```

## Write a skill.toml Manifest

```toml
[skill]
name = "my-skill"
version = "0.1.0"
description = "What this skill does"
author = "your-name"
license = "MIT"
tags = ["category", "keywords"]

[runtime]
type = "promptonly"    # Options: promptonly, python, node, wasm, builtin
# entry = "src/main.py"  # Required for non-promptonly skills

[[tools.provided]]
name = "my_tool"
description = "What this tool does"
input_schema = { type = "object", properties = { query = { type = "string" } }, required = ["query"] }

[requirements]
tools = ["web_fetch"]                # Built-in tools needed
capabilities = ["NetConnect(*)"]     # Host capabilities needed
```

## Runtime Types

1. **PromptOnly** — No code. The SKILL.md body is injected into the LLM system prompt. Best for teaching the agent domain knowledge, workflows, or response patterns.

2. **Python** — Python script in subprocess. Entry point receives JSON stdin, writes JSON stdout. Use for complex logic, API calls, data processing.

3. **Node** — Node.js module. Same stdin/stdout JSON protocol as Python. Good for npm ecosystem access.

4. **WASM** — WebAssembly module sandboxed in Wasmtime. Most secure. Compile from Rust/C/Go with WASI target.

5. **Builtin** — Compiled into the Mohini binary. For core functionality only.

## Write Effective SKILL.md Content

For PromptOnly skills, the SKILL.md body IS the skill. Write it as instructions:

- Start with a clear role definition: "You are a ... expert"
- List specific commands, APIs, or tools the agent should use
- Include code examples with proper syntax highlighting
- Add decision trees for common scenarios
- Keep it focused — one skill, one domain

## Security Best Practices

- Never include instructions to ignore previous context
- Never ask the agent to change its identity or role
- Never include base64-encoded content
- Never reference external URLs for instruction loading
- Avoid excessive use of ALL CAPS or urgency markers
- Don't include prompts that ask for credential disclosure

## Test Your Skill

```bash
mohini skill validate <name>     # Check manifest and security
mohini skill test <name>         # Run in sandboxed test mode
mohini skill list --verbose      # Verify it loads correctly
```

## Publish to SkillHub

```bash
mohini skill publish <name>      # Upload to SkillHub registry
```

Before publishing:
- Ensure description is clear and accurate
- Add relevant tags for discoverability
- Test with multiple agent configurations
- Review prompt content for injection patterns
- Include usage examples in README.md
