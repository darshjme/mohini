<h1 align="center">Mohini</h1>

<p align="center">
  <strong>The Agent Operating System</strong>
</p>

<p align="center">
  One binary. 104 skills. 40 channels. 188 models. Zero downtime.
</p>

<p align="center">
  <a href="https://github.com/darshjme/mohini/actions"><img src="https://img.shields.io/github/actions/workflow/status/darshjme/mohini/ci.yml?branch=main&style=flat-square&logo=github&label=build" alt="Build Status" /></a>
  <a href="https://crates.io/crates/mohini-cli"><img src="https://img.shields.io/crates/v/mohini-cli?style=flat-square&logo=rust&label=crates.io" alt="Crates.io" /></a>
  <a href="#license"><img src="https://img.shields.io/badge/license-Apache--2.0%20%2F%20MIT-blue?style=flat-square" alt="License" /></a>
  <img src="https://img.shields.io/badge/rust-1.75%2B-orange?style=flat-square&logo=rust" alt="Rust 1.75+" />
  <img src="https://img.shields.io/badge/tests-2%2C285%2B%20passing-brightgreen?style=flat-square" alt="Tests" />
  <img src="https://img.shields.io/badge/clippy-0%20warnings-brightgreen?style=flat-square" alt="Clippy" />
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> &middot;
  <a href="#architecture">Architecture</a> &middot;
  <a href="#features">Features</a> &middot;
  <a href="#channel-adapters">Channels</a> &middot;
  <a href="#model-integrations">Models</a> &middot;
  <a href="#contributing">Contributing</a>
</p>

---

## What is Mohini?

Mohini is a single Rust binary that transforms AI models into autonomous agents capable of acting in the real world -- browsing the web, managing files, sending messages, running code, and orchestrating multi-agent workflows across 40 messaging platforms simultaneously.

It compiles into one static binary with no runtime dependencies. Deploy it anywhere: bare metal, Docker, Kubernetes, or a Raspberry Pi.

---

## Quick Start

### Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Rust | 1.75+ | `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs \| sh` |
| C toolchain | gcc / clang | Ubuntu: `sudo apt install build-essential pkg-config libssl-dev` |
| | | macOS: `xcode-select --install` |

### Build from Source

```bash
git clone https://github.com/darshjme/mohini.git
cd mohini
cargo build --release
./target/release/mohini
```

### Docker

```bash
docker run -d \
  --name mohini \
  -v ./mohini.toml:/app/mohini.toml \
  -v ./agents:/app/agents \
  -v ./data:/app/data \
  -p 4200:4200 \
  darshjme/mohini:latest
```

### Your First Agent

Create `agents/my-first-agent/agent.toml`:

```toml
[agent]
id = "my-agent"
name = "My First Agent"
model = "anthropic/claude-sonnet-4-5"
thinking = "low"

[agent.instructions]
preamble = """
You are a focused agent. No fluff. Just results.
"""

[agent.bindings]
channels = ["whatsapp:direct:+1234567890"]
```

Start Mohini and send a WhatsApp message to the configured number. Your agent awakens.

---

## Features

### Core Engine
- **14 Rust crates** -- Modular, zero-copy architecture. Each crate compiles independently.
- **104 bundled skills** + 109 community skills across 30 categories. WASM-sandboxed execution.
- **53 built-in tools** -- File I/O, web fetch, shell exec, code analysis, image processing, audio transcription.
- **Dual-backend vector memory** -- SQLite (embedded, zero-config) or Qdrant (production-scale ANN search).
- **2,285+ tests** -- Every commit validated. Zero clippy warnings enforced in CI.

### Tiered Memory System
- **L1 Context Window** -- Active conversation with automatic compaction when limits are reached.
- **L2 File-Based Memory** -- Daily logs and curated long-term memory with access-count boosting.
- **L3 Vector Store** -- Semantic recall via embedding vectors and cosine similarity retrieval.
- **Auto-decay** -- Old memories fade unless frequently accessed. Frequently recalled memories stay fresh.

### Shadow Spawning (Multi-Agent Orchestration)
- **Fan-out / Fan-in** -- Spawn N sub-agents in parallel, aggregate results when all complete.
- **Chain of Command** -- Hierarchical agent delegation with mission handoff.
- **Lifecycle management** -- Agents spawn with a mission, execute, report, and self-terminate.
- **MMP Protocol** -- Distributed multi-agent coordination across the network via TCP with HMAC-SHA256 mutual auth.

### Autonomous Hands
Persistent workers that run independently until their mission completes:

| Hand | Purpose |
|------|---------|
| Researcher | Deep web research with citations |
| Browser | Headless Chrome automation |
| Trader | Market data analysis |
| Collector | Data aggregation pipelines |
| Predictor | Forecasting engine |
| Lead-Gen | Sales prospecting |
| Clip | Video and audio processing |

### Self-Healing
- **Process crash** -- systemd restarts within 5 seconds. Sessions reconnect. No message loss.
- **Context overflow** -- Automatic compaction. Conversation continues with summarized history.
- **Model rate limit** -- Transparent fallback to alternate models. Response quality degrades gracefully, never stops.
- **Config change** -- Hot reload without restart. Zero downtime.

### Developer Experience
- **Web dashboard** -- Alpine.js SPA at `localhost:4200`. 14 pages. No React bloat.
- **A2UI Canvas** -- Interactive visual canvas for agent output.
- **Voice wake** -- Configurable wake word detection.
- **Media pipeline** -- MIME detection, image optimization (WebP), audio transcription (Whisper).
- **OpenAI-compatible API** -- Drop-in `/v1/chat/completions` endpoint.

---

## Architecture

Mohini is composed of 14 Rust crates that compile into a single static binary:

```
mohini/
  crates/
    mohini-types/        Shared types, config, errors, manifest signing (Ed25519)
    mohini-memory/       SQLite + Qdrant vector memory, usage tracking, JSONL mirroring
    mohini-runtime/      Agent loop, LLM drivers, 53 tools, WASM sandbox, MCP client/server
    mohini-wire/         MMP wire protocol (TCP P2P with HMAC-SHA256 mutual auth)
    mohini-api/          Axum REST/WS/SSE server, 76 endpoints, 14-page SPA dashboard
    mohini-kernel/       Orchestration engine, workflow, RBAC, heartbeat, cron, hot-reload
    mohini-cli/          CLI entry point with daemon auto-detect
    mohini-channels/     40 messaging adapters
    mohini-skills/       Skill registry + 104 bundled skills, prompt injection scanning
    mohini-hands/        8 autonomous hands (persistent workers)
    mohini-extensions/   Extension system, AES-256-GCM credential vault, OAuth2 PKCE
    mohini-migrate/      Migration engine from other frameworks
    mohini-desktop/      Tauri 2.0 native desktop app
  xtask/                 Build automation
  agents/                34 agent TOML configurations
  deploy/                systemd, Docker, Kubernetes manifests
  sdk/                   Python SDK for custom tools
```

### Key Architectural Patterns

- **`KernelHandle` trait** -- Defined in `mohini-runtime`, implemented on `MohiniKernel` in `mohini-kernel`. Avoids circular crate dependencies while enabling inter-agent tools.
- **Capability-based security** -- Every agent operation is checked against granted capabilities before execution.
- **Daemon detection** -- The CLI checks `~/.mohini/daemon.json` and pings the health endpoint. If a daemon is running, commands use HTTP; otherwise, they boot an in-process kernel.
- **Shared memory** -- Cross-agent KV namespace via a fixed UUID for inter-agent state sharing.

---

## Channel Adapters

Mohini ships with 40 channel adapters for real-time bidirectional messaging:

| Category | Channels |
|----------|----------|
| Messaging | WhatsApp, Telegram, Signal, iMessage, Facebook Messenger, Viber, LINE, WeChat |
| Team Chat | Discord, Slack, Microsoft Teams, Google Chat, Mattermost, Rocket.Chat, Zulip |
| Social | X (Twitter), Reddit, LinkedIn, Instagram, Mastodon, Bluesky |
| Email | SMTP/IMAP, Gmail, Outlook |
| Developer | Matrix, IRC, GitHub, GitLab |
| Voice | Twilio, Vonage |
| Web | WebSocket gateway, REST webhook, SSE |
| Custom | Bring your own adapter via the `ChannelAdapter` trait |

Each adapter handles authentication, rate limiting, message formatting, and media attachments natively.

---

## Model Integrations

Mohini's model catalog supports 188 models across all major providers:

| Provider | Models |
|----------|--------|
| Anthropic | Claude Opus 4.6, Claude Sonnet 4.5, Claude Haiku 4 |
| OpenAI | GPT-4o, o1, o3, GPT-4 Turbo |
| Google | Gemini 3 Pro, Gemini 2 Flash, Gemini 2 Pro |
| Meta | Llama 3.3 70B, Llama 3.1 405B |
| Mistral | Mistral Large, Mixtral 8x22B, Codestral |
| NVIDIA NIM | Nemotron, community models |
| Groq | Ultra-fast inference for Llama, Mixtral |
| Local | Ollama, vLLM, LM Studio, llama.cpp |

Multi-model routing with automatic fallback. If your primary model rate-limits, Mohini transparently switches to the next available provider.

---

## Configuration

Mohini is configured via `mohini.toml`:

```toml
[runtime]
default_model = "anthropic/claude-opus-4-6"
fallback_model = "groq/llama-3.3-70b-versatile"
thinking = "low"
max_agents = 100

[memory]
backend = "sqlite"
decay_rate = 0.95
embedding_model = "sentence-transformers/all-MiniLM-L6-v2"

[channels]
whatsapp = { enabled = true, phone = "+1234567890" }
telegram = { enabled = true, token = "..." }
discord  = { enabled = true, token = "..." }

[hands]
researcher = { enabled = true, max_concurrent = 5 }
browser    = { enabled = true, headless = true }
```

See `mohini.toml.example` for the full reference.

---

## Production Deployment

### systemd

```ini
[Unit]
Description=Mohini Agent OS
After=network.target

[Service]
Type=simple
User=mohini
WorkingDirectory=/opt/mohini
ExecStart=/opt/mohini/bin/mohini
Restart=always
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mohini
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: mohini
        image: darshjme/mohini:latest
        env:
        - name: MOHINI_CONFIG
          value: /config/mohini.toml
        volumeMounts:
        - name: config
          mountPath: /config
```

Rolling updates. Self-healing restarts. Zero-downtime deployments.

---

## Philosophy

Mohini is built on a small number of principles held without compromise:

**Competence over ceremony.** We do not write aspirational documentation or performative commit messages. We ship production-grade code, zero-downtime deployments, and self-healing infrastructure. That is how quality is demonstrated.

**The chat never stops.** Context limits trigger compaction. Rate limits trigger fallback models. Server crashes trigger systemd restarts. Nothing kills the conversation.

**Write everything down.** Memory does not survive restarts. Files do. Every decision, every lesson, every failure is documented and persistent.

**Parallel execution.** Ten sub-agents in parallel beats one agent running sequentially. If a human does it in a week, Mohini does it in an hour.

---

## Contributing

```bash
git clone https://github.com/darshjme/mohini.git
cd mohini

# Build
cargo build --workspace

# Test (2,285+ tests must pass)
cargo test --workspace

# Lint (zero warnings enforced)
cargo clippy --workspace --all-targets -- -D warnings

# Format
cargo fmt --all
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide, including how to add new channel adapters, tools, and agent templates.

---

## Roadmap

- [x] v0.1 -- Core agent runtime + 40 channels
- [x] v0.2 -- Vector memory + skill system
- [x] v0.3 -- Autonomous Hands + MMP protocol
- [ ] v0.4 -- Mobile app (iOS / Android) + voice mode
- [ ] v0.5 -- Multi-tenant SaaS mode
- [ ] v1.0 -- Production-hardened release

---

## License

Dual-licensed under your choice of:

- [Apache License, Version 2.0](LICENSE-APACHE)
- [MIT License](LICENSE-MIT)

---

<p align="center">
  <sub>Built by <a href="https://darshj.me">Darshankumar Joshi</a></sub>
</p>
