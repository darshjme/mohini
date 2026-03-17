# Reddit Launch Posts

---

## r/rust

### Title
Mohini: An Agent OS built with 14 Rust crates — 40 channel adapters, 188 models, WASM-sandboxed skills

### Body

I've been building Mohini — an open-source Agent OS for running autonomous AI agents. The entire system is 14 Rust crates in a Cargo workspace.

**Why I chose Rust for this:**

The core challenge is real-time coordination of multiple AI agents across dozens of communication channels (WhatsApp, Discord, Slack, etc.) while maintaining persistent memory. Python would have been faster to prototype, but:

1. **Zero-copy message routing.** Messages flow between crates as `bytes::Bytes`. The kernel routes a WhatsApp message to the LLM, gets a response, routes it back — all without copying the payload. At scale (hundreds of concurrent sessions), this matters.

2. **Enum-based agent state machines.** Agent lifecycle (Idle → Processing → Delegating → Responding → Idle) is a Rust enum with exhaustive match. The compiler catches invalid state transitions at build time. In Python, I'd discover these at 3am in production.

3. **Tokio for 40 channel adapters.** Each adapter (WhatsApp, Telegram, IRC, Matrix…) is an async task on the Tokio runtime. No thread-per-connection. A single core handles all 40 adapters concurrently.

4. **WASM skill sandbox.** Community-contributed skills (104 bundled + 109 community) run in WebAssembly. Untrusted code can't touch the filesystem or network unless explicitly granted capabilities.

5. **Single binary deployment.** `cargo build --release` → one static binary. Deploy with `scp`. No virtualenvs, no Docker required, no dependency hell.

**Crate overview:**

| Crate | Purpose |
|-------|---------|
| `mohini-kernel` | Core event loop, agent lifecycle FSM |
| `mohini-runtime` | Tokio runtime, task scheduling, resource limits |
| `mohini-memory` | Vector memory — SQLite (embedded) or Qdrant (ANN) |
| `mohini-wire` | WebSocket gateway, MMP agent-to-agent protocol |
| `mohini-channels` | 40 channel adapters |
| `mohini-skills` | Skill registry, WASM sandbox |
| `mohini-api` | REST + GraphQL |
| `mohini-cli` | Terminal interface |
| `mohini-hands` | Autonomous capability packages |
| `mohini-types` | Shared types (serde-derived) |
| `mohini-extensions` | Plugin system |
| `mohini-migrate` | Schema migrations |
| `mohini-desktop` | Tauri desktop app |
| `xtask` | Build automation |

**Stats:**
- 2,285+ tests
- Zero clippy warnings (enforced in CI)
- `rust-version = "1.75"` MSRV
- Apache-2.0 OR MIT dual-licensed

**Repo:** https://github.com/mohini-ai/mohini

Interested in feedback on the crate architecture, the WASM sandboxing approach, and the MMP protocol design. PRs welcome.

---

## r/LocalLLaMA

### Title
Mohini: Open-source Agent OS with 188 model support — Ollama, vLLM, LM Studio, and every cloud provider

### Body

Built an Agent OS called Mohini that runs autonomous AI agents with support for 188 models across local and cloud providers.

**Local LLM support:**

- **Ollama** — First-class adapter. Point Mohini at your Ollama instance, it auto-discovers available models.
- **vLLM** — OpenAI-compatible endpoint. Run any HuggingFace model with vLLM, Mohini connects via the standard API.
- **LM Studio** — Same OpenAI-compatible interface. Drop in your local model, Mohini routes to it.
- **NVIDIA NIM** — NIM API adapter for enterprise GPU inference.

**Cloud providers:**

OpenAI (GPT-4o, o1, o3), Anthropic (Claude Opus 4.6, Sonnet 4.5, Haiku 4), Google (Gemini 3 Pro, Flash 2), Groq (ultra-fast inference), Mistral, and more. 188 models total in the catalog.

**Why this matters for local LLM users:**

1. **Model fallback chains.** Configure: try local Ollama first → fall back to Groq (fast, cheap) → fall back to Claude (expensive, smart). Mohini handles the routing automatically based on availability and latency.

2. **Persistent vector memory.** Your local agent remembers across sessions. Dual-backend: SQLite for personal use, Qdrant for when you scale up.

3. **40 channel adapters.** Connect your local LLM to WhatsApp, Discord, Telegram, email — without writing integration code. Mohini handles the protocol adapters.

4. **Multi-agent swarms.** Spawn multiple agents, each using different models. Research agent on a large cloud model, execution agents on fast local models. They coordinate via MMP (agent-to-agent protocol).

5. **WASM-sandboxed skills.** 104 built-in + 109 community skills. Your local LLM gains tools (web search, file I/O, code execution) safely.

**Quick start with Ollama:**

```bash
cargo install mohini-cli
mohini init
mohini serve --model ollama/llama3.2 --channel terminal
```

**The system is written in Rust** (14 crates), runs as a single binary, and I've had it running 24/7 on a single server for months without memory leaks or crashes.

**Repo:** https://github.com/mohini-ai/mohini

Looking for feedback from the local LLM community. What models are you running? What integrations would be most useful?
