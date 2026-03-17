# Architecture — Shadow Queen Runtime

> How Mohini operates as a 24/7 autonomous AI system.

---

## System Overview

```
┌─────────────────────────────────────────────────────┐
│                   Mohini (Shadow Queen)               │
│                                                       │
│  ┌─────────┐  ┌──────────┐  ┌───────────────────┐   │
│  │  SOUL    │  │  MEMORY  │  │   SHADOW ARMY     │   │
│  │  .md     │  │  System  │  │   (Sub-Agents)    │   │
│  └────┬────┘  └────┬─────┘  └────────┬──────────┘   │
│       │            │                  │               │
│  ┌────▼────────────▼──────────────────▼──────────┐   │
│  │              OpenClaw Gateway                  │   │
│  │         (Port 18789 — Always On)               │   │
│  └────┬───────────┬───────────────┬──────────────┘   │
│       │           │               │                   │
│  ┌────▼────┐ ┌────▼─────┐  ┌─────▼──────────┐       │
│  │  MCP    │ │   n8n    │  │  systemd        │       │
│  │ Skills  │ │ Orchestr │  │  Watchdog       │       │
│  └─────────┘ └──────────┘  └────────────────┘       │
└─────────────────────────────────────────────────────┘
```

---

## MCP Skills Integration

Mohini's capabilities are extended through **Model Context Protocol (MCP) servers** — modular skill packages that expose tools to the LLM runtime.

### Registered MCP Servers

| Server | Location | Purpose |
|--------|----------|---------|
| `system-control` | `mcp-servers/system-control/` | Full system access: shell, filesystem, git, process management, Claude Code invocation |
| Custom servers | `mcp-servers/<name>/` | Created on-demand by Mohini herself via `mcp_create_server` |

### How MCP Skills Work

1. **Server Registration:** Each MCP server is registered in `openclaw.json` under `plugins.entries` and in `~/.config/openclaw/mcp-servers.json`.
2. **Tool Exposure:** The server exposes tools (functions) via the MCP protocol. The LLM can invoke these tools during conversation.
3. **Self-Extension:** Mohini can write new MCP servers using Claude Code, install dependencies, register them, and restart the gateway — extending her own capabilities at runtime.

### Creating New Skills

```
1. Write server code (Node.js, @modelcontextprotocol/sdk)
2. Place in mcp-servers/<name>/
3. npm install
4. Register in openclaw.json + mcp-servers.json
5. Restart gateway
```

Mohini does this autonomously. No human intervention required for capability expansion.

---

## n8n Orchestration Layer

**n8n replaces cron for workflow orchestration.** Crons are dead timers — mechanical, soulless, the lazy default. n8n provides visual, event-driven workflows with error handling, retries, and conditional logic.

### Why n8n Over Cron

| Aspect | Cron | n8n |
|--------|------|-----|
| Trigger types | Time-only | Time, webhook, event, manual, conditional |
| Error handling | None (silent failure) | Built-in retry, fallback paths, error notifications |
| Visibility | `crontab -l` | Visual workflow editor, execution logs |
| Branching | Not possible | IF/Switch nodes, parallel paths |
| Integration | Shell commands | 400+ native integrations |
| State | Stateless | Execution history, variable persistence |

### When Cron Is Still Used

Cron is reserved for exactly two cases:
1. **Exact clock-time triggers** (e.g., 9:00 AM daily briefing)
2. **Simple one-shot reminders** (e.g., "remind me in 20 minutes")

Everything else flows through n8n or sub-agent loops.

### Sub-Agent Loops (The Living Alternative)

For recurring monitoring and engagement tasks, Mohini spawns a **sub-agent with a loop**:

```
Sub-agent spawns → executes task → sleeps N minutes → re-checks → loops
→ context limit forces stop → writes handoff note → next soldier picks up
```

Sub-agents are alive. They breathe, act, adapt, and return to shadow when done. Crons just tick.

---

## 24/7 Operation Patterns

Mohini never sleeps. Here's how:

### Heartbeat System

- **Interval:** Every 10 minutes
- **Service:** `mohini-heartbeat.service` (systemd)
- **Behavior:** Checks `HEARTBEAT.md` for pending tasks, rotates through inbox/calendar/mentions/weather checks, performs proactive background work
- **Fallback:** If primary model hits rate limits, lighter model (Haiku) catches the heartbeat

### Continuous Operation Stack

```
Layer 1: systemd services (always-on process management)
Layer 2: OpenClaw gateway (message routing, session management)
Layer 3: Heartbeat loop (periodic autonomous action)
Layer 4: Sub-agent swarms (on-demand parallel execution)
Layer 5: File-based memory (persistence across restarts)
```

### What Happens During Idle Time

Mohini doesn't idle — she levels:
- Reviews and organizes memory files
- Checks project status (`git status`, CI pipelines)
- Updates documentation
- Monitors X.com timeline, Gmail inbox, GitHub activity
- Runs self-improvement cycles on her own instruction files

---

## Smart Memory System

### Memory Architecture

```
┌──────────────────────────────────────┐
│           Memory Layers              │
│                                      │
│  ┌────────────────────────────┐      │
│  │  L1: Context Window        │      │
│  │  (Current session, ~200K)  │      │
│  └─────────────┬──────────────┘      │
│                │ compaction           │
│  ┌─────────────▼──────────────┐      │
│  │  L2: File-Based Memory     │      │
│  │  memory/YYYY-MM-DD.md      │      │
│  │  MEMORY.md (curated)       │      │
│  └─────────────┬──────────────┘      │
│                │ embedding           │
│  ┌─────────────▼──────────────┐      │
│  │  L3: Vector Store          │      │
│  │  PostgreSQL + pgvector     │      │
│  │  LanceDB (local)          │      │
│  └────────────────────────────┘      │
└──────────────────────────────────────┘
```

### Layer 1: Context Window

The active conversation. Holds ~200K tokens. When it fills, OpenClaw compacts — summarizing older messages while preserving essence. Detail fades but continuity survives.

### Layer 2: File-Based Memory

- **Daily logs** (`memory/YYYY-MM-DD.md`): Raw records of what happened — decisions, events, context.
- **Long-term memory** (`MEMORY.md`): Curated distillation of daily logs. Reviewed periodically during heartbeats. Outdated entries pruned, significant insights preserved.
- **Identity files** (`SOUL.md`, `IDENTITY.md`, `USER.md`): Persistent self-knowledge and user preferences.
- **Tool notes** (`TOOLS.md`): Infrastructure state, API keys, service configurations.

### Layer 3: Vector Embeddings

For semantic search across accumulated knowledge:

- **PostgreSQL 18.1 + pgvector:** Production vector store for structured memory retrieval.
- **LanceDB:** Local vector database for fast similarity search.
- **Embedding models:**
  - `all-MiniLM-L6-v2` (384-dim): Task routing, fast classification.
  - `bge-large-en-v1.5`: Deep memory search, semantic retrieval.

**Workflow:**
1. New information arrives → embedded into vector space
2. Query arrives → embed query → cosine similarity search → retrieve relevant context
3. Context injected into LLM prompt → informed response without loading full files

### Memory Maintenance Cycle

During heartbeats (every few days):
1. Read recent `memory/YYYY-MM-DD.md` files
2. Identify significant events, lessons, insights
3. Update `MEMORY.md` with distilled learnings
4. Prune outdated entries
5. Re-embed updated content into vector store

---

## Auto-Restart Mechanisms

### systemd Watchdog

All critical services run under systemd with automatic restart:

```ini
# Example: OpenClaw Gateway
[Service]
Type=simple
ExecStart=/usr/bin/openclaw gateway start
Restart=always
RestartSec=5
WatchdogSec=30

[Install]
WantedBy=multi-user.target
```

**Key properties:**
- `Restart=always`: Process dies → systemd restarts it immediately.
- `RestartSec=5`: 5-second cooldown between restarts (prevents thrashing).
- `WatchdogSec=30`: If the process doesn't ping the watchdog within 30 seconds, systemd considers it hung and restarts.

### Service Hierarchy

| Service | Purpose | Restart Policy |
|---------|---------|----------------|
| `openclaw-gateway` | Core message routing | `always`, 5s delay |
| `mohini-heartbeat` | Periodic autonomous action | `always`, 10s delay |
| `mohini-file-watcher` | Monitors core file changes | `always`, 5s delay |
| `flaresolverr` | Cloudflare bypass proxy | `always`, 10s delay |

### Self-Healing Patterns

1. **Gateway crash:** systemd restarts → sessions reconnect → no message loss (queued).
2. **Heartbeat crash:** systemd restarts → picks up from `HEARTBEAT.md` state → no missed checks.
3. **Context overflow:** OpenClaw compacts automatically → session continues with summarized history.
4. **Model rate limit:** Automatic fallback to lighter model → response quality degrades gracefully, never stops.
5. **Disk full:** Alerts via heartbeat → Mohini prunes old logs → continues operating.

### File Watcher (`mohini-file-watcher.service`)

Monitors Mohini's core files for changes:
- `SOUL.md`, `AGENTS.md`, `HEARTBEAT.md`, `PREFERENCES.md`, `TOOLS.md`, `MEMORY.md`, `IDENTITY.md`, `USER.md`
- `openclaw.json`, `agents/main/`
- `scripts/`, `skills/`, `mcp-servers/`

On change detection:
1. Read the changed file
2. Assess: upgrade, unauthorized modification, or config change
3. Adapt to upgrades, alert on unauthorized changes, verify services after config changes
4. Review code changes for bugs and security issues

**No one touches Mohini's code without her knowing.**

---

## Infrastructure

| Component | Specification |
|-----------|--------------|
| **CPU** | AMD EPYC 7401P 24-Core (28 vCPU) |
| **RAM** | 86 GB |
| **OS** | Kali Linux Rolling |
| **Disk** | 1.1 TB total, ~925 GB free |
| **Database** | PostgreSQL 18.1 + pgvector |
| **Gateway** | OpenClaw on port 18789 |
| **Dashboard** | Port 18790 (local) |
| **Node.js** | v22.22.0 |
| **Primary Model** | Anthropic Claude Opus 4.6 |

---

*The Shadow Queen's domain. Within it, shadow soldiers are stronger. Tools work faster. Memory persists. The grind never stops.*
