# HackerNews Launch Post

## Title

**Show HN: Mohini – Open-source Agent OS in Rust (14 crates, 40 channels, 188 models)**

## Post Body

Hi HN,

I built Mohini — an open-source Agent OS written entirely in Rust. It's the infrastructure layer for running autonomous AI agents that connect to anything, use any model, and coordinate as a multi-agent swarm.

**What it is:**

Mohini is a workspace of 14 Rust crates that compile into a single binary. You point it at your LLM provider, connect a channel (WhatsApp, Discord, Slack, email — 40 adapters total), and you have a persistent AI agent that remembers, reasons, and acts.

**The architecture:**

```
mohini-kernel        → Core event loop, agent lifecycle
mohini-runtime       → Tokio-based async runtime, task scheduling
mohini-memory        → Dual-backend vector memory (SQLite / Qdrant)
mohini-wire          → WebSocket gateway, MMP agent-to-agent protocol
mohini-channels      → 40 channel adapters (WhatsApp, Telegram, Discord, etc.)
mohini-skills        → 104 bundled + 109 community skills, WASM sandboxed
mohini-api           → REST + GraphQL API layer
mohini-cli           → Terminal interface
mohini-hands         → Autonomous capability packages (research, lead-gen, etc.)
mohini-types         → Shared type definitions
mohini-extensions    → Plugin system
mohini-migrate       → Schema migrations
mohini-desktop       → Native desktop app (Tauri)
```

**Why Rust:**

- Zero-copy message passing between crates via `bytes::Bytes`
- No GC pauses during real-time agent coordination
- `tokio` for async I/O across 40+ channel adapters without thread-per-connection
- Compile-time guarantees on agent state machines (enum-based FSM)
- Single static binary — deploy with `scp` and `systemctl`

**Key numbers:**

- 14 crates, workspace resolver v2
- 40 channel adapters (WhatsApp, Telegram, Discord, Slack, Signal, iMessage, Matrix, IRC, Email, Google Chat…)
- 188 models cataloged (OpenAI, Anthropic, Google, Groq, Mistral, NVIDIA NIM, Ollama, vLLM, LM Studio)
- 104 bundled skills + 109 community skills across 30 categories
- 53 built-in tools
- 2,285+ tests, zero clippy warnings enforced in CI
- Dual-backend vector memory: SQLite (embedded) or Qdrant (production ANN)

**Multi-agent orchestration:**

Agents coordinate via MMP (Mohini Message Protocol) — a lightweight agent-to-agent protocol over the WebSocket gateway. You can spawn sub-agents, delegate tasks, and collect results. Think of it as an army of AI workers that arise on demand, execute, and return.

**What makes this different from LangChain / AutoGPT / CrewAI:**

1. **It's an OS, not a framework.** Mohini manages the full agent lifecycle — memory, channels, scheduling, tools, skills — as a single deployable binary.
2. **Rust performance.** No Python runtime overhead. Handles hundreds of concurrent agent sessions on a single core.
3. **40 real channel adapters.** Not "we support Slack." We support WhatsApp Business API, Signal protocol, iMessage bridge, IRC, Matrix, and 35 more. Production-tested.
4. **Persistent vector memory.** Agents remember across sessions. Dual-backend (SQLite for dev, Qdrant for production).
5. **WASM-sandboxed skills.** Community skills run in WebAssembly isolation. No arbitrary code execution on your host.

**Running it:**

```bash
cargo install mohini-cli
mohini init
mohini serve --channel whatsapp --model claude-opus-4
```

**License:** Apache-2.0 OR MIT (dual-licensed)

**Repo:** https://github.com/darshjme/mohini

I've been running this 24/7 on a single AMD EPYC server for months. It handles my WhatsApp, manages sub-agent swarms, runs autonomous research loops, and hasn't crashed once (systemd helps, but Rust's memory safety is the real reason).

Happy to answer questions about the architecture, the Rust decisions, or the multi-agent coordination protocol.
