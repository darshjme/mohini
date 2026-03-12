# Mohini CLI Reference

Complete command-line reference for `mohini`, the CLI tool for the Mohini Agent OS.

## Overview

The `mohini` binary is the primary interface for managing the Mohini Agent OS. It supports two modes of operation:

- **Daemon mode** -- When a daemon is running (`mohini start`), CLI commands communicate with it over HTTP. This is the recommended mode for production use.
- **In-process mode** -- When no daemon is detected, commands that support it will boot an ephemeral in-process kernel. Agents spawned in this mode are not persisted and will be lost when the process exits.

Running `mohini` with no subcommand launches the interactive TUI (terminal user interface) built with ratatui, which provides a full dashboard experience in the terminal.

## Installation

### From source (cargo)

```bash
cargo install --path crates/mohini-cli
```

### Build from workspace

```bash
cargo build --release -p mohini-cli
# Binary: target/release/mohini (or mohini.exe on Windows)
```

### Docker

```bash
docker run -it mohini/mohini:latest
```

### Shell installer

```bash
curl -fsSL https://get.mohini.ai | sh
```

## Global Options

These options apply to all commands.

| Option | Description |
|---|---|
| `--config <PATH>` | Path to a custom config file. Overrides the default `~/.mohini/config.toml`. |
| `--help` | Print help information for any command or subcommand. |
| `--version` | Print the version of the `mohini` binary. |

**Environment variables:**

| Variable | Description |
|---|---|
| `RUST_LOG` | Controls log verbosity (e.g. `info`, `debug`, `mohini_kernel=trace`). |
| `MOHINI_AGENTS_DIR` | Override the agent templates directory. |
| `EDITOR` / `VISUAL` | Editor used by `mohini config edit`. Falls back to `notepad` (Windows) or `vi` (Unix). |

---

## Command Reference

### mohini (no subcommand)

Launch the interactive TUI dashboard.

```
mohini [--config <PATH>]
```

The TUI provides a full-screen terminal interface with panels for agents, chat, workflows, channels, skills, settings, and more. Tracing output is redirected to `~/.mohini/tui.log` to avoid corrupting the terminal display.

Press `Ctrl+C` to exit. A second `Ctrl+C` force-exits the process.

---

### mohini init

Initialize the Mohini workspace. Creates `~/.mohini/` with subdirectories (`data/`, `agents/`) and a default `config.toml`.

```
mohini init [--quick]
```

**Options:**

| Option | Description |
|---|---|
| `--quick` | Skip interactive prompts. Auto-detects the best available LLM provider and writes config immediately. Suitable for CI/scripts. |

**Behavior:**

- Without `--quick`: Launches an interactive 5-step onboarding wizard (ratatui TUI) that walks through provider selection, API key configuration, and optionally starts the daemon.
- With `--quick`: Auto-detects providers by checking environment variables in priority order: Groq, Gemini, DeepSeek, Anthropic, OpenAI, OpenRouter. Falls back to Groq if none are found.
- File permissions are restricted to owner-only (`0600` for files, `0700` for directories) on Unix.

**Example:**

```bash
# Interactive setup
mohini init

# Non-interactive (CI/scripts)
export GROQ_API_KEY="gsk_..."
mohini init --quick
```

---

### mohini start

Start the Mohini daemon (kernel + API server).

```
mohini start [--config <PATH>]
```

**Behavior:**

- Checks if a daemon is already running; exits with an error if so.
- Boots the Mohini kernel (loads config, initializes SQLite database, loads agents, connects MCP servers, starts background tasks).
- Starts the HTTP API server on the address specified in `config.toml` (default: `127.0.0.1:4200`).
- Writes `daemon.json` to `~/.mohini/` so other CLI commands can discover the running daemon.
- Blocks until interrupted with `Ctrl+C`.

**Output:**

```
  Mohini Agent OS v0.1.0

  Starting daemon...

  [ok] Kernel booted (groq/llama-3.3-70b-versatile)
  [ok] 50 models available
  [ok] 3 agent(s) loaded

  API:        http://127.0.0.1:4200
  Dashboard:  http://127.0.0.1:4200/
  Provider:   groq
  Model:      llama-3.3-70b-versatile

  hint: Open the dashboard in your browser, or run `mohini chat`
  hint: Press Ctrl+C to stop the daemon
```

**Example:**

```bash
# Start with default config
mohini start

# Start with custom config
mohini start --config /path/to/config.toml
```

---

### mohini status

Show the current kernel/daemon status.

```
mohini status [--json]
```

**Options:**

| Option | Description |
|---|---|
| `--json` | Output machine-readable JSON for scripting. |

**Behavior:**

- If a daemon is running: queries `GET /api/status` and displays agent count, provider, model, uptime, API URL, data directory, and lists active agents.
- If no daemon is running: boots an in-process kernel and shows persisted state. Displays a warning that the daemon is not running.

**Example:**

```bash
mohini status

mohini status --json | jq '.agent_count'
```

---

### mohini doctor

Run diagnostic checks on the Mohini installation.

```
mohini doctor [--json] [--repair]
```

**Options:**

| Option | Description |
|---|---|
| `--json` | Output results as JSON for scripting. |
| `--repair` | Attempt to auto-fix issues (create missing directories, config, remove stale files). Prompts for confirmation before each repair. |

**Checks performed:**

1. **Mohini directory** -- `~/.mohini/` exists
2. **.env file** -- exists and has correct permissions (0600 on Unix)
3. **Config TOML syntax** -- `config.toml` parses without errors
4. **Daemon status** -- whether a daemon is running
5. **Port 4200 availability** -- if daemon is not running, checks if the port is free
6. **Stale daemon.json** -- leftover `daemon.json` from a crashed daemon
7. **Database file** -- SQLite magic bytes validation
8. **Disk space** -- warns if less than 100MB available (Unix only)
9. **Agent manifests** -- validates all `.toml` files in `~/.mohini/agents/`
10. **LLM provider keys** -- checks env vars for 10 providers (Groq, OpenRouter, Anthropic, OpenAI, DeepSeek, Gemini, Google, Together, Mistral, Fireworks), performs live validation (401/403 detection)
11. **Channel tokens** -- format validation for Telegram, Discord, Slack tokens
12. **Config consistency** -- checks that `api_key_env` references in config match actual environment variables
13. **Rust toolchain** -- `rustc --version`

**Example:**

```bash
mohini doctor

mohini doctor --repair

mohini doctor --json
```

---

### mohini dashboard

Open the web dashboard in the default browser.

```
mohini dashboard
```

**Behavior:**

- Requires a running daemon.
- Opens the daemon URL (e.g. `http://127.0.0.1:4200/`) in the system browser.
- Copies the URL to the system clipboard (uses PowerShell on Windows, `pbcopy` on macOS, `xclip`/`xsel` on Linux).

**Example:**

```bash
mohini dashboard
```

---

### mohini completion

Generate shell completion scripts.

```
mohini completion <SHELL>
```

**Arguments:**

| Argument | Description |
|---|---|
| `<SHELL>` | Target shell. One of: `bash`, `zsh`, `fish`, `elvish`, `powershell`. |

**Example:**

```bash
# Bash
mohini completion bash > ~/.bash_completion.d/mohini

# Zsh
mohini completion zsh > ~/.zfunc/_mohini

# Fish
mohini completion fish > ~/.config/fish/completions/mohini.fish

# PowerShell
mohini completion powershell > mohini.ps1
```

---

## Agent Commands

### mohini agent new

Spawn an agent from a built-in template.

```
mohini agent new [<TEMPLATE>]
```

**Arguments:**

| Argument | Description |
|---|---|
| `<TEMPLATE>` | Template name (e.g. `coder`, `assistant`, `researcher`). If omitted, displays an interactive picker listing all available templates. |

**Behavior:**

- Templates are discovered from: the repo `agents/` directory (dev builds), `~/.mohini/agents/` (installed), and `MOHINI_AGENTS_DIR` (env override).
- Each template is a directory containing an `agent.toml` manifest.
- In daemon mode: sends `POST /api/agents` with the manifest. Agent is persistent.
- In standalone mode: boots an in-process kernel. Agent is ephemeral.

**Example:**

```bash
# Interactive picker
mohini agent new

# Spawn by name
mohini agent new coder

# Spawn the assistant template
mohini agent new assistant
```

---

### mohini agent spawn

Spawn an agent from a custom manifest file.

```
mohini agent spawn <MANIFEST>
```

**Arguments:**

| Argument | Description |
|---|---|
| `<MANIFEST>` | Path to an agent manifest TOML file. |

**Behavior:**

- Reads and parses the TOML manifest file.
- In daemon mode: sends the raw TOML to `POST /api/agents`.
- In standalone mode: boots an in-process kernel and spawns the agent locally.

**Example:**

```bash
mohini agent spawn ./my-agent/agent.toml
```

---

### mohini agent list

List all running agents.

```
mohini agent list [--json]
```

**Options:**

| Option | Description |
|---|---|
| `--json` | Output as JSON array for scripting. |

**Output columns:** ID, NAME, STATE, PROVIDER, MODEL (daemon mode) or ID, NAME, STATE, CREATED (in-process mode).

**Example:**

```bash
mohini agent list

mohini agent list --json | jq '.[].name'
```

---

### mohini agent chat

Start an interactive chat session with a specific agent.

```
mohini agent chat <AGENT_ID>
```

**Arguments:**

| Argument | Description |
|---|---|
| `<AGENT_ID>` | Agent UUID. Obtain from `mohini agent list`. |

**Behavior:**

- Opens a REPL-style chat loop.
- Type messages at the `you>` prompt.
- Agent responses display at the `agent>` prompt, followed by token usage and iteration count.
- Type `exit`, `quit`, or press `Ctrl+C` to end the session.

**Example:**

```bash
mohini agent chat a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

---

### mohini agent kill

Terminate a running agent.

```
mohini agent kill <AGENT_ID>
```

**Arguments:**

| Argument | Description |
|---|---|
| `<AGENT_ID>` | Agent UUID to terminate. |

**Example:**

```bash
mohini agent kill a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

---

## Workflow Commands

All workflow commands require a running daemon.

### mohini workflow list

List all registered workflows.

```
mohini workflow list
```

**Output columns:** ID, NAME, STEPS, CREATED.

---

### mohini workflow create

Create a workflow from a JSON definition file.

```
mohini workflow create <FILE>
```

**Arguments:**

| Argument | Description |
|---|---|
| `<FILE>` | Path to a JSON file describing the workflow steps. |

**Example:**

```bash
mohini workflow create ./my-workflow.json
```

---

### mohini workflow run

Execute a workflow by ID.

```
mohini workflow run <WORKFLOW_ID> <INPUT>
```

**Arguments:**

| Argument | Description |
|---|---|
| `<WORKFLOW_ID>` | Workflow UUID. Obtain from `mohini workflow list`. |
| `<INPUT>` | Input text to pass to the workflow. |

**Example:**

```bash
mohini workflow run abc123 "Analyze this code for security issues"
```

---

## Trigger Commands

All trigger commands require a running daemon.

### mohini trigger list

List all event triggers.

```
mohini trigger list [--agent-id <ID>]
```

**Options:**

| Option | Description |
|---|---|
| `--agent-id <ID>` | Filter triggers by the owning agent's UUID. |

**Output columns:** TRIGGER ID, AGENT ID, ENABLED, FIRES, PATTERN.

---

### mohini trigger create

Create an event trigger for an agent.

```
mohini trigger create <AGENT_ID> <PATTERN_JSON> [--prompt <TEMPLATE>] [--max-fires <N>]
```

**Arguments:**

| Argument | Description |
|---|---|
| `<AGENT_ID>` | UUID of the agent that owns the trigger. |
| `<PATTERN_JSON>` | Trigger pattern as a JSON string. |

**Options:**

| Option | Default | Description |
|---|---|---|
| `--prompt <TEMPLATE>` | `"Event: {{event}}"` | Prompt template. Use `{{event}}` as a placeholder for the event data. |
| `--max-fires <N>` | `0` (unlimited) | Maximum number of times the trigger will fire. |

**Pattern examples:**

```bash
# Fire on any lifecycle event
mohini trigger create <AGENT_ID> '{"lifecycle":{}}'

# Fire when a specific agent is spawned
mohini trigger create <AGENT_ID> '{"agent_spawned":{"name_pattern":"*"}}'

# Fire on agent termination
mohini trigger create <AGENT_ID> '{"agent_terminated":{}}'

# Fire on all events (limited to 10 fires)
mohini trigger create <AGENT_ID> '{"all":{}}' --max-fires 10
```

---

### mohini trigger delete

Delete a trigger by ID.

```
mohini trigger delete <TRIGGER_ID>
```

**Arguments:**

| Argument | Description |
|---|---|
| `<TRIGGER_ID>` | UUID of the trigger to delete. |

---

## Skill Commands

### mohini skill list

List all installed skills.

```
mohini skill list
```

**Output columns:** NAME, VERSION, TOOLS, DESCRIPTION.

Loads skills from `~/.mohini/skills/` plus bundled skills compiled into the binary.

---

### mohini skill install

Install a skill from a local directory, git URL, or SkillHub marketplace.

```
mohini skill install <SOURCE>
```

**Arguments:**

| Argument | Description |
|---|---|
| `<SOURCE>` | Skill name (SkillHub), local directory path, or git URL. |

**Behavior:**

- **Local directory:** Looks for `skill.toml` in the directory. If not found, checks for LegacyImport-format skills (SKILL.md with YAML frontmatter) and auto-converts them.
- **Remote (SkillHub):** Fetches and installs from the SkillHub marketplace. Skills pass through SHA256 verification and prompt injection scanning.

**Example:**

```bash
# Install from local directory
mohini skill install ./my-skill/

# Install from SkillHub
mohini skill install web-search

# Install an LegacyImport-format skill
mohini skill install ./legacy_import-skill/
```

---

### mohini skill remove

Remove an installed skill.

```
mohini skill remove <NAME>
```

**Arguments:**

| Argument | Description |
|---|---|
| `<NAME>` | Name of the skill to remove. |

**Example:**

```bash
mohini skill remove web-search
```

---

### mohini skill search

Search the SkillHub marketplace for skills.

```
mohini skill search <QUERY>
```

**Arguments:**

| Argument | Description |
|---|---|
| `<QUERY>` | Search query string. |

**Example:**

```bash
mohini skill search "docker kubernetes"
```

---

### mohini skill create

Interactively scaffold a new skill project.

```
mohini skill create
```

**Behavior:**

Prompts for:
- Skill name
- Description
- Runtime (`python`, `node`, or `wasm`; defaults to `python`)

Creates a directory under `~/.mohini/skills/<name>/` with:
- `skill.toml` -- manifest file
- `src/main.py` (or `src/index.js`) -- entry point with boilerplate

**Example:**

```bash
mohini skill create
# Skill name: my-tool
# Description: A custom analysis tool
# Runtime (python/node/wasm) [python]: python
```

---

## Channel Commands

### mohini channel list

List configured channels and their status.

```
mohini channel list
```

**Output columns:** CHANNEL, ENV VAR, STATUS.

Checks `config.toml` for channel configuration sections and environment variables for required tokens. Status is one of: `Ready`, `Missing env`, `Not configured`.

**Channels checked:** webchat, telegram, discord, slack, whatsapp, signal, matrix, email.

---

### mohini channel setup

Interactive setup wizard for a channel integration.

```
mohini channel setup [<CHANNEL>]
```

**Arguments:**

| Argument | Description |
|---|---|
| `<CHANNEL>` | Channel name. If omitted, displays an interactive picker. |

**Supported channels:** `telegram`, `discord`, `slack`, `whatsapp`, `email`, `signal`, `matrix`.

Each wizard:
1. Displays step-by-step instructions for obtaining credentials.
2. Prompts for tokens/credentials.
3. Saves tokens to `~/.mohini/.env` with owner-only permissions.
4. Appends the channel configuration block to `config.toml` (prompts for confirmation).
5. Warns to restart the daemon if one is running.

**Example:**

```bash
# Interactive picker
mohini channel setup

# Direct setup
mohini channel setup telegram
mohini channel setup discord
mohini channel setup slack
```

---

### mohini channel test

Send a test message through a configured channel.

```
mohini channel test <CHANNEL>
```

**Arguments:**

| Argument | Description |
|---|---|
| `<CHANNEL>` | Channel name to test. |

Requires a running daemon. Sends `POST /api/channels/<channel>/test`.

**Example:**

```bash
mohini channel test telegram
```

---

### mohini channel enable

Enable a channel integration.

```
mohini channel enable <CHANNEL>
```

**Arguments:**

| Argument | Description |
|---|---|
| `<CHANNEL>` | Channel name to enable. |

In daemon mode: sends `POST /api/channels/<channel>/enable`. Without a daemon: prints a note that the change will take effect on next start.

---

### mohini channel disable

Disable a channel without removing its configuration.

```
mohini channel disable <CHANNEL>
```

**Arguments:**

| Argument | Description |
|---|---|
| `<CHANNEL>` | Channel name to disable. |

In daemon mode: sends `POST /api/channels/<channel>/disable`. Without a daemon: prints a note to edit `config.toml`.

---

## Config Commands

### mohini config show

Display the current configuration file.

```
mohini config show
```

Prints the contents of `~/.mohini/config.toml` with the file path as a header comment.

---

### mohini config edit

Open the configuration file in your editor.

```
mohini config edit
```

Uses `$EDITOR`, then `$VISUAL`, then falls back to `notepad` (Windows) or `vi` (Unix).

---

### mohini config get

Get a single configuration value by dotted key path.

```
mohini config get <KEY>
```

**Arguments:**

| Argument | Description |
|---|---|
| `<KEY>` | Dotted key path into the TOML structure. |

**Example:**

```bash
mohini config get default_model.provider
# groq

mohini config get api_listen
# 127.0.0.1:4200

mohini config get memory.decay_rate
# 0.05
```

---

### mohini config set

Set a configuration value by dotted key path.

```
mohini config set <KEY> <VALUE>
```

**Arguments:**

| Argument | Description |
|---|---|
| `<KEY>` | Dotted key path. |
| `<VALUE>` | New value. Type is inferred from the existing value (integer, float, boolean, or string). |

**Warning:** This command re-serializes the TOML file, which strips all comments.

**Example:**

```bash
mohini config set default_model.provider anthropic
mohini config set default_model.model claude-sonnet-4-20250514
mohini config set api_listen "0.0.0.0:4200"
```

---

### mohini config set-key

Save an LLM provider API key to `~/.mohini/.env`.

```
mohini config set-key <PROVIDER>
```

**Arguments:**

| Argument | Description |
|---|---|
| `<PROVIDER>` | Provider name (e.g. `groq`, `anthropic`, `openai`, `gemini`, `deepseek`, `openrouter`, `together`, `mistral`, `fireworks`, `perplexity`, `cohere`, `xai`, `brave`, `tavily`). |

**Behavior:**

- Prompts interactively for the API key.
- Saves to `~/.mohini/.env` as `<PROVIDER_NAME>_API_KEY=<value>`.
- Runs a live validation test against the provider's API.
- File permissions are restricted to owner-only on Unix.

**Example:**

```bash
mohini config set-key groq
# Paste your groq API key: gsk_...
# [ok] Saved GROQ_API_KEY to ~/.mohini/.env
# Testing key... OK
```

---

### mohini config delete-key

Remove an API key from `~/.mohini/.env`.

```
mohini config delete-key <PROVIDER>
```

**Arguments:**

| Argument | Description |
|---|---|
| `<PROVIDER>` | Provider name. |

**Example:**

```bash
mohini config delete-key openai
```

---

### mohini config test-key

Test provider connectivity with the stored API key.

```
mohini config test-key <PROVIDER>
```

**Arguments:**

| Argument | Description |
|---|---|
| `<PROVIDER>` | Provider name. |

**Behavior:**

- Reads the API key from the environment (loaded from `~/.mohini/.env`).
- Hits the provider's models/health endpoint.
- Reports `OK` (key accepted) or `FAILED (401/403)` (key rejected).
- Exits with code 1 on failure.

**Example:**

```bash
mohini config test-key groq
# Testing groq (GROQ_API_KEY)... OK
```

---

## Quick Chat

### mohini chat

Quick alias for starting a chat session.

```
mohini chat [<AGENT>]
```

**Arguments:**

| Argument | Description |
|---|---|
| `<AGENT>` | Optional agent name or UUID. |

**Behavior:**

- **Daemon mode:** Finds the agent by name or ID among running agents. If no agent name is given, uses the first available agent. If no agents exist, suggests `mohini agent new`.
- **Standalone mode (no daemon):** Boots an in-process kernel and auto-spawns an agent from templates. Searches for an agent matching the given name, then falls back to `assistant`, then to the first available template.

This is the simplest way to start chatting -- it works with or without a daemon.

**Example:**

```bash
# Chat with the default agent
mohini chat

# Chat with a specific agent by name
mohini chat coder

# Chat with a specific agent by UUID
mohini chat a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

---

## Migration

### mohini migrate

Migrate configuration and agents from another agent framework.

```
mohini migrate --from <FRAMEWORK> [--source-dir <PATH>] [--dry-run]
```

**Options:**

| Option | Description |
|---|---|
| `--from <FRAMEWORK>` | Source framework. One of: `legacy_import`, `langchain`, `autogpt`. |
| `--source-dir <PATH>` | Path to the source workspace. Auto-detected if not set (e.g. `~/.legacy_import`, `~/.langchain`, `~/Auto-GPT`). |
| `--dry-run` | Show what would be imported without making changes. |

**Behavior:**

- Converts agent configurations, YAML manifests, and settings from the source framework into Mohini format.
- Saves imported data to `~/.mohini/`.
- Writes a `migration_report.md` summarizing what was imported.

**Example:**

```bash
# Dry run migration from LegacyImport
mohini migrate --from legacy_import --dry-run

# Migrate from LegacyImport (auto-detect source)
mohini migrate --from legacy_import

# Migrate from LangChain with explicit source
mohini migrate --from langchain --source-dir /home/user/.langchain

# Migrate from AutoGPT
mohini migrate --from autogpt
```

---

## MCP Server

### mohini mcp

Start an MCP (Model Context Protocol) server over stdio.

```
mohini mcp
```

**Behavior:**

- Exposes running Mohini agents as MCP tools via JSON-RPC 2.0 over stdin/stdout with Content-Length framing.
- Each agent becomes a callable tool named `mohini_agent_<name>` (hyphens replaced with underscores).
- Connects to a running daemon via HTTP if available; otherwise boots an in-process kernel.
- Protocol version: `2024-11-05`.
- Maximum message size: 10MB (security limit).

**Supported MCP methods:**

| Method | Description |
|---|---|
| `initialize` | Returns server capabilities and info. |
| `tools/list` | Lists all available agent tools. |
| `tools/call` | Sends a message to an agent and returns the response. |

**Tool input schema:**

Each agent tool accepts a single `message` (string) argument.

**Integration with Claude Desktop / other MCP clients:**

Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "mohini": {
      "command": "mohini",
      "args": ["mcp"]
    }
  }
}
```

---

## Daemon Auto-Detect

The CLI uses a two-step mechanism to detect a running daemon:

1. **Read `daemon.json`:** On startup, the daemon writes `~/.mohini/daemon.json` containing the listen address (e.g. `127.0.0.1:4200`). The CLI reads this file to learn where the daemon is.

2. **Health check:** The CLI sends `GET http://<listen_addr>/api/health` with a 2-second timeout. If the health check succeeds, the daemon is considered running and the CLI uses HTTP to communicate with it.

If either step fails (no `daemon.json`, stale file, health check timeout), the CLI falls back to in-process mode for commands that support it. Commands that require a daemon (workflows, triggers, channel test/enable/disable, dashboard) will exit with an error and a helpful message.

**Daemon lifecycle:**

```
mohini start          # Starts daemon, writes daemon.json
                        # Other CLI instances detect daemon.json
mohini status         # Connects to daemon via HTTP
Ctrl+C                  # Daemon shuts down, daemon.json removed

mohini doctor --repair  # Cleans up stale daemon.json from crashes
```

---

## Environment File

Mohini loads `~/.mohini/.env` into the process environment on every CLI invocation. System environment variables take priority over `.env` values.

The `.env` file stores API keys and secrets:

```bash
GROQ_API_KEY=gsk_...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=AIza...
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
```

Manage keys with the `config set-key` / `config delete-key` commands rather than editing the file directly, as these commands enforce correct permissions.

---

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | Success. |
| `1` | General error (invalid arguments, failed operations, missing daemon, parse errors, spawn failures). |
| `130` | Interrupted by second `Ctrl+C` (force exit). |

---

## Examples

### First-time setup

```bash
# 1. Set your API key
export GROQ_API_KEY="gsk_your_key_here"

# 2. Initialize Mohini
mohini init --quick

# 3. Start the daemon
mohini start
```

### Daily usage

```bash
# Quick chat (auto-spawns agent if needed)
mohini chat

# Chat with a specific agent
mohini chat coder

# Check what's running
mohini status

# Open the web dashboard
mohini dashboard
```

### Agent management

```bash
# Spawn from a template
mohini agent new assistant

# Spawn from a custom manifest
mohini agent spawn ./agents/custom-agent/agent.toml

# List running agents
mohini agent list

# Chat with an agent by UUID
mohini agent chat <UUID>

# Kill an agent
mohini agent kill <UUID>
```

### Workflow automation

```bash
# Create a workflow
mohini workflow create ./review-pipeline.json

# List workflows
mohini workflow list

# Run a workflow
mohini workflow run <WORKFLOW_ID> "Review the latest PR"
```

### Event triggers

```bash
# Create a trigger that fires on agent spawn
mohini trigger create <AGENT_ID> '{"agent_spawned":{"name_pattern":"*"}}' \
  --prompt "New agent spawned: {{event}}" \
  --max-fires 100

# List all triggers
mohini trigger list

# List triggers for a specific agent
mohini trigger list --agent-id <AGENT_ID>

# Delete a trigger
mohini trigger delete <TRIGGER_ID>
```

### Skill management

```bash
# Search SkillHub
mohini skill search "code review"

# Install a skill
mohini skill install code-reviewer

# List installed skills
mohini skill list

# Create a new skill
mohini skill create

# Remove a skill
mohini skill remove code-reviewer
```

### Channel setup

```bash
# Interactive channel picker
mohini channel setup

# Direct channel setup
mohini channel setup telegram

# Check channel status
mohini channel list

# Test a channel
mohini channel test telegram

# Enable/disable channels
mohini channel enable discord
mohini channel disable slack
```

### Configuration

```bash
# View config
mohini config show

# Get a specific value
mohini config get default_model.provider

# Change provider
mohini config set default_model.provider anthropic
mohini config set default_model.model claude-sonnet-4-20250514
mohini config set default_model.api_key_env ANTHROPIC_API_KEY

# Manage API keys
mohini config set-key anthropic
mohini config test-key anthropic
mohini config delete-key openai

# Open in editor
mohini config edit
```

### Migration from other frameworks

```bash
# Preview migration
mohini migrate --from legacy_import --dry-run

# Run migration
mohini migrate --from legacy_import

# Migrate from LangChain
mohini migrate --from langchain --source-dir ~/.langchain
```

### MCP integration

```bash
# Start MCP server for Claude Desktop or other MCP clients
mohini mcp
```

### Diagnostics

```bash
# Run all diagnostic checks
mohini doctor

# Auto-repair issues
mohini doctor --repair

# Machine-readable diagnostics
mohini doctor --json
```

### Shell completions

```bash
# Generate and install completions for your shell
mohini completion bash >> ~/.bashrc
mohini completion zsh > "${fpath[1]}/_mohini"
mohini completion fish > ~/.config/fish/completions/mohini.fish
```

---

## Supported LLM Providers

The following providers are recognized by `mohini config set-key` and `mohini doctor`:

| Provider | Environment Variable | Default Model |
|---|---|---|
| Groq | `GROQ_API_KEY` | `llama-3.3-70b-versatile` |
| Gemini | `GEMINI_API_KEY` or `GOOGLE_API_KEY` | `gemini-2.5-flash` |
| DeepSeek | `DEEPSEEK_API_KEY` | `deepseek-chat` |
| Anthropic | `ANTHROPIC_API_KEY` | `claude-sonnet-4-20250514` |
| OpenAI | `OPENAI_API_KEY` | `gpt-4o` |
| OpenRouter | `OPENROUTER_API_KEY` | `openrouter/google/gemini-2.5-flash` |
| Together | `TOGETHER_API_KEY` | -- |
| Mistral | `MISTRAL_API_KEY` | -- |
| Fireworks | `FIREWORKS_API_KEY` | -- |
| Perplexity | `PERPLEXITY_API_KEY` | -- |
| Cohere | `COHERE_API_KEY` | -- |
| xAI | `XAI_API_KEY` | -- |

Additional search/fetch provider keys: `BRAVE_API_KEY`, `TAVILY_API_KEY`.
