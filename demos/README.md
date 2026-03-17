# 🎬 Mohini Demos

Interactive terminal demos showcasing Mohini's core capabilities.

## Prerequisites

- Bash 4.0+ (macOS: `brew install bash`)
- Terminal with ANSI color support
- (Optional) [asciinema](https://asciinema.org/) for recording

## Quick Start

```bash
# Make all demos executable
chmod +x demos/*.sh

# Run a specific demo
./demos/01-spawn-agent.sh

# Run all demos sequentially
for demo in demos/*.sh; do
  echo "=== Running: $demo ==="
  bash "$demo"
  echo
  read -p "Press Enter for next demo..."
done
```

## Demo Index

| # | Script | Feature | Duration |
|---|--------|---------|----------|
| 01 | `01-spawn-agent.sh` | ARISE — spawn a single sub-agent | ~5s |
| 02 | `02-multi-agent.sh` | Shadow army — 4-wave parallel execution | ~8s |
| 03 | `03-memory-recall.sh` | Persistent memory across session restarts | ~6s |
| 04 | `04-n8n-workflow.sh` | n8n webhook → lead qualification pipeline | ~5s |
| 05 | `05-self-healing.sh` | Auto-restart, fallback, and error recovery | ~7s |

## What Each Demo Shows

### 01 — ARISE: Spawn Agent
A single task arrives. Mohini spawns one shadow soldier, assigns it a rank and model, and receives the result. Demonstrates the core sub-agent lifecycle.

### 02 — Shadow Army
A complex task (build a REST API) triggers a 4-wave deployment: Recon → Build → QA → Ship. 12 agents work in parallel, completing in minutes what takes hours solo.

### 03 — Memory Recall
Shows the 4-layer memory architecture: daily logs, long-term memory, vector embeddings, and core identity files. Memory survives session restarts because files > brain.

### 04 — n8n Workflow
An n8n webhook triggers Mohini's lead-qualification flow: enrich data, score the lead, draft a response, and notify via WhatsApp. Zero human intervention until approval.

### 05 — Self-Healing
Three failure scenarios — API rate limits, gateway crashes, context overflow — and how Mohini recovers automatically. Model fallback, systemd restart, and context compaction.

## Recording with asciinema

```bash
# Install asciinema
pip install asciinema

# Record a demo
asciinema rec demos/recordings/01-spawn-agent.cast -c "bash demos/01-spawn-agent.sh"

# Play it back
asciinema play demos/recordings/01-spawn-agent.cast

# Upload to asciinema.org (optional)
asciinema upload demos/recordings/01-spawn-agent.cast
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| No colors in output | Use a terminal that supports ANSI (iTerm2, Windows Terminal, GNOME Terminal) |
| `Permission denied` | Run `chmod +x demos/*.sh` |
| Demos run too fast | Increase `sleep` values in the scripts |
| asciinema not found | `pip install asciinema` or `brew install asciinema` |
