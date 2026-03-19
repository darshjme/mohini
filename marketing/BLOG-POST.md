# Building an Agent OS: Lessons from Mohini

*How we built an autonomous AI agent operating system in Rust — 14 crates, 40 channels, and a philosophy that agents should be infrastructure, not experiments.*

---

## The Problem with AI Agent Frameworks

Every AI agent framework today has the same fundamental flaw: they're libraries, not systems.

LangChain gives you chains of LLM calls. AutoGPT gives you a loop with a prompt. CrewAI gives you role-playing agents. But none of them answer the real question: **where does the agent live?**

An agent needs:
- **Persistent memory** that survives restarts
- **Channel connectivity** to reach users where they are
- **Multi-agent coordination** for complex tasks
- **Skill execution** with security boundaries
- **Lifecycle management** — startup, health checks, graceful shutdown
- **Observability** — logs, metrics, traces

That's not a library. That's an operating system.

So we built one. We called it Mohini.

---

## Why Rust?

This is the question we get most, and the answer is simple: **AI agents are long-running, concurrent, and memory-sensitive. Rust is the only language that gives us all three without tradeoffs.**

### Zero-Copy Message Passing

Messages in Mohini flow through multiple crates: a WhatsApp adapter receives a message, the kernel routes it, the runtime schedules LLM inference, the response flows back through the kernel to the channel adapter. In Python, each handoff copies the message. In Rust, we pass `bytes::Bytes` — reference-counted, zero-copy byte buffers.

At hundreds of concurrent sessions, this difference is not academic. It's the difference between 200MB and 2GB of memory usage.

### Compile-Time State Machine Verification

An agent's lifecycle is a state machine:

```rust
enum AgentState {
    Idle,
    Processing { message_id: MessageId },
    Delegating { sub_agents: Vec<AgentId> },
    Responding { channel: ChannelId },
    Error { reason: String, retries: u32 },
}
```

Every state transition is a match arm. The compiler enforces exhaustiveness. If we add a new state, every handler that doesn't account for it fails to compile. In Python, we'd discover missing handlers in production at 3am.

### Tokio for 40 Channel Adapters

Each channel adapter (WhatsApp, Telegram, Discord, IRC, Matrix, etc.) is a Tokio task. Not a thread. Not a process. A lightweight async task on the Tokio runtime.

A single core handles all 40 adapters concurrently. WebSocket connections, HTTP polling, XMPP streams, IRC sockets — all multiplexed on one event loop.

We tested this with 500 concurrent agent sessions across 12 different channels on a single AMD EPYC core. CPU usage: 8%. Memory: 340MB.

### Single Binary Deployment

`cargo build --release` produces one static binary. Deployment is:

```bash
scp mohini user@server:/usr/local/bin/
systemctl restart mohini
```

No virtualenvs. No Docker required (though we provide images). No dependency resolution at deploy time. No "works on my machine."

---

## The 14-Crate Architecture

Mohini is organized as a Cargo workspace with 14 crates. Each crate has a single responsibility, compiles independently, and communicates through well-defined trait interfaces.

### Core Layer

**mohini-types** — Shared type definitions. Every other crate depends on this. Message types, agent types, channel types, model types — all serde-derivable, all with exhaustive documentation.

**mohini-kernel** — The core event loop. Receives messages from channels, routes them to agents, manages agent lifecycle, handles errors. This is the heart of the system. ~4,000 lines of carefully tested Rust.

**mohini-runtime** — Tokio runtime configuration, task scheduling, resource limits. Manages concurrency budgets (max concurrent LLM calls, max sub-agents per parent), backpressure, and graceful shutdown.

### Memory Layer

**mohini-memory** — Dual-backend vector memory system.

The embedded backend uses SQLite with a custom vector extension. Zero configuration, works out of the box, perfect for development and single-server deployments.

The production backend connects to Qdrant for approximate nearest neighbor search at scale. When your agent's memory grows past what SQLite handles efficiently (roughly 1M vectors), you switch backends by changing one config line.

Both backends implement the same `MemoryStore` trait:

```rust
#[async_trait]
trait MemoryStore: Send + Sync {
    async fn store(&self, embedding: &[f32], metadata: Value) -> Result<MemoryId>;
    async fn search(&self, query: &[f32], limit: usize) -> Result<Vec<Memory>>;
    async fn delete(&self, id: MemoryId) -> Result<()>;
}
```

### Connectivity Layer

**mohini-wire** — WebSocket gateway with multiplexed connections and presence tracking. Also implements MMP (Mohini Message Protocol) — our agent-to-agent coordination protocol.

MMP is simple by design: agents can `spawn`, `delegate`, `query`, and `report`. A parent agent spawns children, delegates tasks, queries their status, and collects reports. Children can spawn their own children. The topology is a tree, enforced at the protocol level.

**mohini-channels** — 40 channel adapters. Each adapter implements the `Channel` trait:

```rust
#[async_trait]
trait Channel: Send + Sync {
    async fn connect(&mut self) -> Result<()>;
    async fn receive(&mut self) -> Result<InboundMessage>;
    async fn send(&self, message: OutboundMessage) -> Result<()>;
    async fn disconnect(&mut self) -> Result<()>;
}
```

Adapters handle protocol-specific details: WhatsApp Business API webhooks, Telegram Bot API long polling, Discord gateway WebSocket, IRC protocol, Matrix client-server API, XMPP streams, IMAP/SMTP for email, and so on.

### Intelligence Layer

**mohini-skills** — Skill registry and WASM sandbox.

Skills are compiled to WebAssembly and run in a sandboxed environment. A community-contributed skill cannot access the filesystem, network, or system calls unless the host explicitly grants capabilities through a WASI-like interface.

104 skills are bundled (web search, file operations, code analysis, image processing, audio transcription, etc.). 109 community skills are available across 30 categories.

**mohini-hands** — Autonomous capability packages. A "Hand" is a multi-phase playbook: INIT → RESEARCH → ANALYZE → SYNTHESIZE → DELIVER → REFLECT. Hands are higher-level than skills — they orchestrate multiple skills and tools to accomplish complex goals autonomously.

### Interface Layer

**mohini-api** — REST and GraphQL API for external integrations and dashboards.

**mohini-cli** — Terminal interface for interactive use and scripting.

**mohini-desktop** — Tauri-based native desktop application (macOS, Windows, Linux).

### Infrastructure Layer

**mohini-extensions** — Plugin system for third-party extensions.

**mohini-migrate** — Database schema migrations with forward/backward compatibility.

**xtask** — Build automation (benchmarks, code generation, release management).

---

## Multi-Agent Orchestration: The Shadow Army

The most powerful feature of Mohini is multi-agent orchestration. We call it the shadow army.

When a complex task arrives, the primary agent doesn't try to handle it alone. It spawns sub-agents — each with its own model, tools, and mission briefing. Sub-agents execute in parallel, report results, and dissolve.

### How It Works

1. **Mission briefing.** The parent agent creates a detailed, self-contained task description. No ambiguity. The sub-agent must be able to execute without further context.

2. **Model selection.** Different tasks get different models. Research tasks get large, expensive models (Claude Opus). Formatting tasks get fast, cheap models (Haiku, Flash). The parent decides.

3. **Parallel execution.** Sub-agents run concurrently on the Tokio runtime. A complex project might have 10-15 sub-agents running simultaneously.

4. **Result aggregation.** Sub-agents report results via MMP. The parent collects, validates, and synthesizes.

5. **Failure handling.** If a sub-agent fails, the parent can retry with a different model, adjust the task, or report the failure. No silent deaths.

### Wave Deployment Pattern

For large tasks, we deploy agents in waves:

- **Wave 1 (Research):** 3-4 agents research the problem space in parallel
- **Wave 2 (Create):** 5-8 agents build different sections simultaneously
- **Wave 3 (Polish):** 2-3 agents review, check quality, fix issues
- **Wave 4 (Deliver):** 1 agent consolidates everything and delivers

This pattern consistently delivers complex projects in minutes that would take hours sequentially.

---

## n8n vs Cron vs Sub-Agents: Choosing the Right Orchestration

We get asked a lot about how Mohini's orchestration compares to workflow tools like n8n or simple cron jobs.

### Cron Jobs

Cron is a dead timer. It fires at a scheduled time, runs a script, and doesn't care about the result. It has no context, no memory, no ability to adapt.

**Use cron for:** Exact clock-time triggers. Daily backups. Scheduled reports. One-shot reminders.

### n8n / Temporal / Prefect

Workflow engines like n8n give you visual DAGs with conditional branching. They're good for deterministic workflows where you know the steps in advance.

**Use workflow engines for:** ETL pipelines. Approval workflows. Notification chains. Anything where the graph of steps is known at design time.

### Mohini Sub-Agents

Sub-agents are alive. They reason, adapt, and coordinate. The task might say "research this market" — the agent decides *how* to research, what sources to check, when to go deeper, when to pivot.

**Use sub-agents for:** Open-ended research. Creative work. Complex problem-solving. Anything where the execution path isn't predetermined.

The key insight: **these are not competing approaches.** Mohini can trigger sub-agents from cron schedules. Sub-agents can invoke n8n workflows as tools. The right answer is usually a combination.

---

## Lessons Learned

### 1. Memory is Everything

An agent without memory is a chatbot. The single most impactful feature we built was persistent vector memory. Once an agent remembers your preferences, your projects, your communication style — it stops being a tool and starts being useful.

### 2. Channels Are Harder Than Models

Supporting a new LLM is trivial — they all speak HTTP with JSON. Supporting a new channel (WhatsApp, Signal, iMessage) is weeks of protocol work, edge case handling, and rate limit management. We underestimated this by 5x.

### 3. WASM Sandboxing Was Worth Every Hour

The initial implementation of WASM skill sandboxing took three weeks. Every week since then, it has prevented at least one community skill from doing something it shouldn't. Security by default is not optional for an agent OS.

### 4. Rust's Compile Times Are Real

With 14 crates, a clean build takes ~4 minutes on our CI. Incremental builds are fast (5-15 seconds), but that initial compile is painful. We mitigate this with aggressive caching (sccache) and by keeping crate boundaries stable.

### 5. The Agent-to-Agent Protocol Must Be Simple

Our first version of MMP had 23 message types. The current version has 4: `spawn`, `delegate`, `query`, `report`. Simple protocols get adopted. Complex protocols get abandoned.

---

## What's Next

Mohini v0.3.49 is stable and running in production. The roadmap:

- **Distributed agent mesh** — Agents across multiple servers coordinating via MMP over the network
- **GPU-accelerated local inference** — Native GGUF/GGML runtime integration (no Ollama dependency)
- **Visual agent builder** — Drag-and-drop agent workflow design in the desktop app
- **Marketplace** — Publish and discover community skills and hands

---

## Try It

```bash
cargo install mohini-cli
mohini init
mohini serve --channel terminal --model ollama/llama3.2
```

**Repository:** https://github.com/darshjme/mohini
**Documentation:** https://mohini.ai/docs
**Discord:** https://discord.gg/mohini
**License:** Apache-2.0 OR MIT

Mohini is open-source because we believe agent infrastructure should be a public good. Star the repo, try it out, file issues, submit PRs. The shadow army grows with every contributor.

*ARISE.* 🖤
