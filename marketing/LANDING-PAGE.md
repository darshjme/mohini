# Mohini — Landing Page Copy

---

## Hero Section

### Headline
**The Agent OS.**

### Subheadline
Open-source infrastructure for autonomous AI agents. 14 Rust crates. 40 channels. 188 models. One binary.

### CTA Buttons
- **[Get Started →]** → /docs/quickstart
- **[Star on GitHub ⭐]** → https://github.com/mohini-ai/mohini

### Hero Code Block
```bash
cargo install mohini-cli
mohini init
mohini serve --channel whatsapp --model claude-opus-4
# Your agent is live. It remembers. It reasons. It acts.
```

---

## Why Mohini

### Not a Framework. An Operating System.

Frameworks give you building blocks. Mohini gives you a running system.

Connect any LLM. Plug into any channel. Deploy one binary. Your agent is live in minutes — with persistent memory, multi-agent coordination, and 213 skills out of the box.

---

## Features

### 🔥 14 Rust Crates
Modular, zero-copy architecture. Each crate compiles independently. Single static binary output. No Python runtime. No garbage collector. No "it works on my machine."

### 🌐 40 Channel Adapters
WhatsApp. Telegram. Discord. Slack. Signal. iMessage. Matrix. IRC. Email. Google Chat. And 30 more. Your agent lives where your users live.

### 🧠 188 Models
OpenAI, Anthropic, Google, Groq, Mistral, NVIDIA NIM, Ollama, vLLM, LM Studio. Model fallback chains built in. Local-first, cloud when needed.

### 💾 Persistent Vector Memory
Dual-backend: SQLite (embedded, zero config) or Qdrant (production-scale ANN). Your agent remembers conversations, decisions, and context. Permanently.

### ⚔️ Multi-Agent Orchestration
Spawn sub-agents on demand. Each gets its own model, tools, and mission. They execute in parallel, report back, dissolve. The shadow army pattern.

### 🛡️ WASM-Sandboxed Skills
104 bundled + 109 community skills across 30 categories. All running in WebAssembly isolation. Community code can't touch your system unless you grant it.

### 🔌 Agent-to-Agent Protocol (MMP)
Lightweight coordination protocol. Spawn, delegate, query, report. Agents call other agents across the network. Distributed by design.

### 📊 2,285+ Tests
Every commit validated. Zero clippy warnings enforced in CI. Rust edition 2021. MSRV 1.75.

---

## How It Works

### Step 1: Install
```bash
cargo install mohini-cli
```

### Step 2: Initialize
```bash
mohini init
# Creates mohini.toml with sensible defaults
```

### Step 3: Configure Your Model
```toml
# mohini.toml
[model]
provider = "ollama"        # or "anthropic", "openai", "groq"
name = "llama3.2"          # any model your provider supports
fallback = "groq/mixtral"  # automatic fallback chain
```

### Step 4: Connect a Channel
```toml
[channels.whatsapp]
enabled = true
phone = "+1234567890"
```

### Step 5: Deploy
```bash
mohini serve
# That's it. Your agent is live.
```

---

## Architecture

```
┌─────────────────────────────────────────────┐
│                 mohini-cli                    │
│              mohini-desktop                   │
│               mohini-api                      │
├─────────────────────────────────────────────┤
│              mohini-kernel                    │
│   ┌──────────┬──────────┬──────────┐        │
│   │ runtime  │  memory  │   wire   │        │
│   └──────────┴──────────┴──────────┘        │
├─────────────────────────────────────────────┤
│  channels  │  skills  │  hands  │ extensions │
├─────────────────────────────────────────────┤
│           mohini-types │ mohini-migrate       │
└─────────────────────────────────────────────┘
```

---

## Use Cases

### Personal AI Assistant
Run a private agent on your server. Connect it to WhatsApp. It manages your schedule, answers questions, remembers everything, and never shares your data.

### Customer Support
Deploy agents across WhatsApp, email, and web chat simultaneously. Persistent memory means they remember returning customers. WASM skills handle domain-specific logic.

### Research Automation
Spawn a swarm of research agents. Each investigates a different angle. Results are synthesized automatically. A task that takes a human researcher days completes in minutes.

### Development Workflow
Agents that monitor your GitHub repos, review PRs, run tests, and report results. Multi-agent coordination for complex development tasks.

---

## Testimonials

> *"Placeholder — We're collecting testimonials from early adopters. If you're using Mohini, we'd love to hear from you."*

> *"Placeholder — Share your experience on GitHub Discussions or Discord."*

> *"Placeholder — Tag us @mohini_ai on X.com with your use case."*

---

## Compare

| Feature | Mohini | LangChain | AutoGPT | CrewAI |
|---------|--------|-----------|---------|--------|
| Language | Rust | Python | Python | Python |
| Deployment | Single binary | pip + deps | Docker | pip + deps |
| Channel adapters | 40 | 0 (BYO) | 1 (web) | 0 (BYO) |
| Persistent memory | Built-in (SQLite/Qdrant) | BYO | Basic | Basic |
| Skill sandbox | WASM | None | None | None |
| Multi-agent | MMP protocol | Chains | Loop | Roles |
| Test coverage | 2,285+ tests | Varies | Minimal | Varies |

---

## Get Started

### Quick Install
```bash
cargo install mohini-cli
mohini init
mohini serve
```

### From Source
```bash
git clone https://github.com/mohini-ai/mohini
cd mohini
cargo build --release
./target/release/mohini serve
```

### Docker
```bash
docker run -d --name mohini \
  -v ./mohini.toml:/etc/mohini/mohini.toml \
  ghcr.io/mohini-ai/mohini:latest
```

---

## Footer CTA

### Ready to deploy your agent army?

**[Get Started →]** → /docs/quickstart
**[Star on GitHub ⭐]** → https://github.com/mohini-ai/mohini
**[Join Discord 💬]** → https://discord.gg/mohini
**[Read the Docs 📖]** → https://mohini.ai/docs

---

**Apache-2.0 OR MIT** — Open source, forever.

Built with 🖤 and Rust.
