<p align="center">
  <h1 align="center">Mohini</h1>
  <h3 align="center">The Agent Operating System</h3>
</p>

<p align="center">
  Open-source Agent OS built in Rust. 14 crates. 2,285+ tests. Zero clippy warnings.<br/>
  <strong>One binary. 104 skills. 40 channels. 188 models. Agents that actually work.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/language-Rust-orange?style=flat-square" alt="Rust" />
  <img src="https://img.shields.io/badge/license-Apache--2.0%20%2F%20MIT-blue?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/version-0.3.49-green?style=flat-square" alt="v0.3.49" />
  <img src="https://img.shields.io/badge/tests-2,285%2B%20passing-brightgreen?style=flat-square" alt="Tests" />
  <img src="https://img.shields.io/badge/clippy-0%20warnings-brightgreen?style=flat-square" alt="Clippy" />
</p>

---

## What is Mohini?

Mohini is a **single Rust binary** that gives AI models the ability to act autonomously — browsing the web, managing files, sending messages, running code, and more. Think of it as an operating system where the "user" is an AI agent.

### Key Features

- **104 bundled skills** + 109 community skills across 30 categories
- **40 channel adapters** — WhatsApp, Telegram, Discord, Slack, Signal, iMessage, Email, Matrix, IRC, and more
- **8 autonomous Hands** — Researcher, Browser, Trader, Collector, Predictor, Lead, Clip, Twitter
- **188 model catalog** — OpenAI, Anthropic, Google Gemini, Groq, Mistral, NVIDIA NIM, Moonshot/Kimi, Ollama, vLLM, LM Studio, and any OpenAI-compatible endpoint
- **WebSocket gateway** — real-time multiplexed connections with presence tracking
- **Voice wake** — configurable wake word detection
- **A2UI Canvas** — interactive visual canvas for agent output
- **Media pipeline** — MIME detection, image optimization, audio transcription hooks
- **WASM sandbox** — secure skill execution via Wasmtime
- **SQLite + Qdrant** — dual-backend vector memory for semantic recall
- **Web dashboard** — Alpine.js SPA at `http://127.0.0.1:4200/`
- **Agent-to-Agent protocol** — MMP network for multi-agent coordination

---

## Quick Install (from GitHub)

### Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| **Rust** | 1.75+ | `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs \| sh` |
| **C toolchain** | gcc/clang | Ubuntu: `sudo apt install build-essential pkg-config libssl-dev` |
| | | macOS: `xcode-select --install` |
| | | Windows: Install Visual Studio Build Tools |

### Step 1: Clone

```bash
git clone https://github.com/darshjme/mohini.git
cd mohini
```

### Step 2: Build

```bash
cargo build --release -p mohini-cli
```

This takes ~10 minutes on first build (compiles 826 dependencies). The binary lands at `target/release/mohini`.

**Optional:** Add to PATH:
```bash
# Linux/macOS
sudo cp target/release/mohini /usr/local/bin/

# Or add to shell profile
echo 'export PATH="$PATH:/path/to/mohini/target/release"' >> ~/.bashrc
```

### Step 3: Initialize

```bash
mohini init
```

Creates `~/.mohini/` with default configuration.

### Step 4: Configure a Provider

Edit `~/.mohini/config.toml` with your preferred LLM provider:

<details>
<summary><b>NVIDIA NIM (Kimi K2.5 — free tier)</b></summary>

Get key at: https://build.nvidia.com/

```toml
[default_model]
provider = "nvidia"
model = "moonshotai/kimi-k2-instruct"
base_url = "https://integrate.api.nvidia.com/v1"
api_key_env = "NVIDIA_API_KEY"
```
```bash
export NVIDIA_API_KEY="nvapi-your-key-here"
```
</details>

<details>
<summary><b>OpenAI (GPT-4o)</b></summary>

```toml
[default_model]
provider = "openai"
model = "gpt-4o"
api_key_env = "OPENAI_API_KEY"
```
```bash
export OPENAI_API_KEY="sk-..."
```
</details>

<details>
<summary><b>Anthropic (Claude)</b></summary>

```toml
[default_model]
provider = "anthropic"
model = "claude-sonnet-4-20250514"
api_key_env = "ANTHROPIC_API_KEY"
```
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
```
</details>

<details>
<summary><b>Groq (free tier — Llama 3.3 70B)</b></summary>

Get key at: https://console.groq.com/

```toml
[default_model]
provider = "groq"
model = "llama-3.3-70b-versatile"
api_key_env = "GROQ_API_KEY"
```
```bash
export GROQ_API_KEY="gsk_..."
```
</details>

<details>
<summary><b>Ollama (fully local — no API key needed)</b></summary>

Install Ollama: https://ollama.com/

```bash
ollama pull llama3.2
ollama serve
```

```toml
[default_model]
provider = "ollama"
model = "llama3.2"
```
</details>

<details>
<summary><b>Google Gemini</b></summary>

```toml
[default_model]
provider = "google"
model = "gemini-2.0-flash"
api_key_env = "GOOGLE_API_KEY"
```
```bash
export GOOGLE_API_KEY="..."
```
</details>

### Step 5: Start

```bash
mohini start
```

Output:
```
✔ Kernel booted (nvidia/moonshotai/kimi-k2-instruct)
✔ 188 models available
✔ 1 agent(s) loaded
✔ 104 bundled skills loaded

API:         http://127.0.0.1:4200
Dashboard:   http://127.0.0.1:4200/
```

### Step 6: Chat

```bash
# Interactive CLI chat
mohini chat

# Single message
mohini agent --message "What is the Rust ownership model?"

# Via API
curl -X POST "http://127.0.0.1:4200/api/agents/$(curl -s http://127.0.0.1:4200/api/agents | python3 -c 'import sys,json;print(json.load(sys.stdin)[0]["id"])')/message" \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello!"}'
```

---

## CLI Reference

```bash
mohini init                          # Initialize ~/.mohini/
mohini start                         # Start the daemon
mohini stop                          # Stop the daemon
mohini chat                          # Interactive chat
mohini doctor                        # Run diagnostics

# Agents
mohini agent list                    # List agents
mohini agent new coder               # Create agent
mohini agent chat coder              # Chat with agent

# Skills
mohini skill list                    # List all 213+ skills
mohini skill search "docker"         # Search skills
mohini skill install <name>          # Install from SkillHub
mohini skill new my-skill            # Create custom skill

# Channels
mohini channel list                  # List channels
mohini channel setup telegram        # Configure channel
mohini channel test telegram         # Test channel

# Hands
mohini hand list                     # List hands
mohini hand activate researcher      # Activate hand

# Workflows
mohini workflow list                 # List workflows
mohini workflow run <name>           # Run workflow

# Migration
mohini migrate --source openclaw     # Import from OpenClaw
```

---

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/health` | GET | Health check |
| `/api/agents` | GET | List all agents |
| `/api/agents/{id}/message` | POST | Send message |
| `/api/agents/{id}/ws` | WS | WebSocket streaming |
| `/api/budget` | GET/PUT | Budget tracking |
| `/api/skills` | GET | List skills |
| `/api/network/status` | GET | Network status |

---

## Architecture

```
mohini/
├── crates/
│   ├── mohini-types/       # Shared types, config, errors
│   ├── mohini-memory/      # SQLite + Qdrant vector memory
│   ├── mohini-runtime/     # Agent loop, LLM drivers, tools
│   ├── mohini-wire/        # MMP wire protocol
│   ├── mohini-api/         # Axum REST/WS/SSE server + dashboard
│   ├── mohini-kernel/      # Orchestration engine
│   ├── mohini-cli/         # CLI entry point
│   ├── mohini-channels/    # 40 messaging adapters
│   ├── mohini-skills/      # Skill registry + 104 bundled skills
│   ├── mohini-hands/       # 8 autonomous hands
│   ├── mohini-migrate/     # Migration from other frameworks
│   ├── mohini-extensions/  # Extension system
│   └── mohini-desktop/     # Tauri desktop app
├── agents/                 # Agent TOML definitions
├── deploy/                 # systemd, Docker configs
├── scripts/                # Install scripts
└── sdk/                    # Python SDK
```

---

## Docker

```bash
docker build -t mohini .
docker run -d -p 4200:4200 -e NVIDIA_API_KEY="your-key" -v mohini-data:/data mohini
```

Or with docker-compose:
```bash
docker-compose up -d
```

---

## Configuration

Full `~/.mohini/config.toml` example:

```toml
api_listen = "127.0.0.1:4200"
log_level = "info"

[default_model]
provider = "nvidia"
model = "moonshotai/kimi-k2-instruct"
base_url = "https://integrate.api.nvidia.com/v1"
api_key_env = "NVIDIA_API_KEY"

[memory]
decay_rate = 0.05

# Optional: Qdrant vector DB for scalable memory
# [memory.vector_store]
# backend = "qdrant"
# qdrant_url = "http://localhost:6334"

[budget]
enabled = true
daily_limit_usd = 10.0
```

---

## License

Dual-licensed under [Apache 2.0](LICENSE-APACHE) and [MIT](LICENSE-MIT).
