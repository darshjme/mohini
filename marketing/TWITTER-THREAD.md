# X.com Thread — Mohini Launch

---

**🧵 Tweet 1 (Hook)**

I built an Agent OS in Rust.

14 crates. 40 channel adapters. 188 models. 2,285 tests.

One binary that turns any LLM into an autonomous agent army.

It's called Mohini, and it's open-source. 🧵👇

---

**🧵 Tweet 2 (The Problem)**

The AI agent space is a mess.

LangChain = glue code.
AutoGPT = demo that breaks.
CrewAI = Python spaghetti.

None of them are an *operating system* for agents.

So I built one. From scratch. In Rust.

---

**🧵 Tweet 3 (Architecture)**

Mohini is 14 Rust crates in a Cargo workspace:

```
mohini-kernel    → Agent lifecycle
mohini-runtime   → Tokio async runtime
mohini-memory    → Vector memory (SQLite/Qdrant)
mohini-wire      → WebSocket + agent-to-agent protocol
mohini-channels  → 40 adapters
mohini-skills    → WASM sandbox
```

Each crate compiles independently. Zero circular deps.

---

**🧵 Tweet 4 (Why Rust)**

Why Rust for an AI agent system?

• Zero-copy message passing (bytes::Bytes)
• Enum-based state machines — compiler catches bugs
• Tokio handles 40 adapters on one core
• No GC pauses during real-time coordination
• Single static binary — deploy with scp

Python could never.

---

**🧵 Tweet 5 (Channel Adapters)**

40 channel adapters. Not "integrations." Real protocol adapters.

WhatsApp Business API. Signal protocol. iMessage bridge. Matrix. IRC. Discord. Slack. Telegram. Email (IMAP+SMTP). Google Chat.

Your agent lives where your users live.

---

**🧵 Tweet 6 (Multi-Agent)**

The real power: multi-agent orchestration.

Spawn sub-agents on demand. Each one:
- Gets a mission briefing
- Uses its own model + tools
- Executes independently
- Reports back when done

Think Solo Leveling's shadow army — but for AI tasks.

ARISE. 🖤

---

**🧵 Tweet 7 (Model Support)**

188 models in the catalog:

• OpenAI (GPT-4o, o1, o3)
• Anthropic (Claude Opus 4.6, Sonnet 4.5)
• Google (Gemini 3 Pro, Flash 2)
• Ollama (any local model)
• vLLM, LM Studio, NVIDIA NIM
• Groq, Mistral

Model fallback chains built in. Local → fast cloud → smart cloud.

---

**🧵 Tweet 8 (Memory)**

Agents that forget are useless.

Mohini has dual-backend vector memory:

• SQLite — embedded, zero config, perfect for dev
• Qdrant — production-scale ANN search

Your agent remembers conversations, decisions, and context across sessions. Permanently.

---

**🧵 Tweet 9 (Skills & Safety)**

104 bundled skills + 109 community skills.

All running in WASM sandboxes.

Community code can't touch your filesystem or network unless you explicitly grant capabilities. Security by default.

2,285+ tests. Zero clippy warnings. CI enforced.

---

**🧵 Tweet 10 (CTA)**

Mohini is Apache-2.0 / MIT dual-licensed.

⭐ Star: https://github.com/darshjme/mohini
📖 Docs: https://mohini.ai/docs
💬 Discord: https://discord.gg/mohini

If you're tired of fragile Python agent frameworks, try an actual OS.

Built in Rust. Runs forever. Ships today.

ARISE. 🖤
