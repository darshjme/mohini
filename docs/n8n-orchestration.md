# n8n Orchestration Layer for Mohini

## Overview

n8n serves as Mohini's external workflow orchestration engine — handling scheduled triggers, webhook integrations, multi-step pipelines, and cross-service coordination that sit outside the OpenClaw heartbeat loop.

## Why n8n > Cron

| Dimension | Cron | n8n |
|-----------|------|-----|
| **Visibility** | Silent. Fails silently. Logs buried in syslog. | Visual workflow editor. Execution history with payloads. |
| **Error handling** | None built-in. Must wrap scripts. | Retry policies, error branches, notifications on failure. |
| **Conditional logic** | Bash `if/else` spaghetti. | Visual branching, switch nodes, expressions. |
| **State** | Stateless. Each run is isolated. | Workflow variables, static data, cross-execution state. |
| **Integrations** | Manual HTTP/curl scripts. | 400+ pre-built nodes (Slack, GitHub, PostgreSQL, HTTP, etc.). |
| **Chaining** | Pipe hacks, temp files. | Native data flow between nodes. Output → Input. |
| **Monitoring** | `grep syslog`. | Dashboard with execution counts, error rates, durations. |
| **Authentication** | Manage tokens in env vars. | Credential store with encryption at rest. |

**Bottom line:** Cron is a dumb timer. n8n is an orchestration platform. Mohini uses cron only for exact clock-time triggers (systemd timers); everything else routes through n8n.

## Architecture

```
┌──────────────────────────────────────────────────┐
│                   n8n Instance                    │
│              http://localhost:5678                 │
├──────────────┬───────────────┬────────────────────┤
│  Schedules   │   Webhooks    │   Event Triggers   │
│  (Cron node) │  (HTTP node)  │  (Polling nodes)   │
└──────┬───────┴───────┬───────┴────────┬───────────┘
       │               │                │
       ▼               ▼                ▼
┌──────────────────────────────────────────────────┐
│              OpenClaw Gateway API                  │
│           http://localhost:18789                    │
├──────────────────────────────────────────────────┤
│  POST /api/sessions/spawn   (spawn sub-agents)    │
│  POST /api/sessions/steer   (steer agents)        │
│  GET  /api/sessions/list    (check status)         │
│  POST /api/heartbeat        (trigger heartbeat)    │
└──────────────────────────────────────────────────┘
```

## Installation

```bash
# Docker (recommended — isolated, easy upgrades)
docker run -d \
  --name n8n \
  --restart unless-stopped \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=mohini \
  -e N8N_BASIC_AUTH_PASSWORD=<strong-password> \
  -e GENERIC_TIMEZONE=Asia/Kolkata \
  -e N8N_SECURE_COOKIE=false \
  n8nio/n8n:latest

# Or via npm (if you prefer native)
npm install -g n8n
n8n start --tunnel  # tunnel for webhook testing
```

## Configuration Patterns

### 1. OpenClaw API Credential

Create a credential of type "Header Auth" in n8n:

- **Name:** `OpenClaw Gateway`
- **Header Name:** `Authorization`
- **Header Value:** `Bearer <your-openclaw-api-token>`

### 2. Base HTTP Request Node (reusable)

```json
{
  "url": "http://localhost:18789/api/sessions/spawn",
  "method": "POST",
  "headers": { "Content-Type": "application/json" },
  "body": {
    "task": "Your agent task description",
    "model": "anthropic/claude-sonnet-4-20250514",
    "label": "workflow-agent"
  }
}
```

### 3. Environment Variables

Set in n8n's environment or `.env`:

```env
OPENCLAW_API_URL=http://localhost:18789
OPENCLAW_API_TOKEN=<token>
MOHINI_WORKSPACE=/root/openclaw/workspace
```

## Workflow Examples

See the `workflows/` directory for importable JSON:

| Workflow | File | Description |
|----------|------|-------------|
| Spawn Agent Hourly | `spawn-agent-hourly.json` | Scheduled agent spawning for recurring tasks |
| Memory Decay | `memory-decay.json` | Periodic memory maintenance and compaction |
| Health Check | `health-check.json` | System health monitoring with alerts |
| Multi-Agent Coordination | `multi-agent-coordination.json` | Complex parallel agent orchestration |
| Webhook Trigger | `webhook-trigger.json` | External event → agent response |

## Error Handling

### Retry Policy

Every HTTP Request node calling OpenClaw should have:

```json
{
  "retryOnFail": true,
  "maxTries": 3,
  "waitBetweenTries": 5000
}
```

### Error Branch Pattern

```
[Trigger] → [HTTP Request] →── success ──→ [Process Result]
                             └── error ───→ [Send Alert] → [Log to File]
```

- **Send Alert:** Post to WhatsApp via OpenClaw message API or Telegram.
- **Log to File:** Append to `/root/openclaw/workspace/memory/n8n-errors.log`.

### Dead Letter Queue

For critical workflows, add a "Write to File" node on error branches that logs the full payload:

```
/root/openclaw/workspace/n8n-dlq/YYYY-MM-DD-workflow-name.json
```

Review DLQ during heartbeats.

## Monitoring

### Execution Dashboard

n8n provides built-in execution history at `http://localhost:5678/executions`. Key metrics:

- **Success rate** per workflow
- **Average execution time**
- **Error frequency and types**
- **Last execution timestamp**

### Health Check Endpoint

n8n exposes `/healthz` — monitor with:

```bash
# In a systemd timer or heartbeat check
curl -sf http://localhost:5678/healthz || echo "n8n is down" >> /root/openclaw/workspace/memory/alerts.log
```

### Prometheus Metrics (optional)

Enable in n8n settings:

```env
N8N_METRICS=true
N8N_METRICS_PREFIX=n8n_
```

Exposes `/metrics` for Prometheus/Grafana integration.

## Security

1. **Bind to localhost only** — n8n should not be exposed to the internet unless behind a reverse proxy with auth.
2. **Use basic auth** — Always set `N8N_BASIC_AUTH_ACTIVE=true`.
3. **Credential encryption** — n8n encrypts credentials at rest. Set a strong `N8N_ENCRYPTION_KEY`.
4. **Network isolation** — Run in Docker with `--network host` only if needed; prefer bridge + explicit port mapping.
5. **Webhook secrets** — Always validate `X-Webhook-Secret` header on incoming webhooks.

## Best Practices

1. **One workflow per concern** — Don't cram unrelated logic into one workflow.
2. **Use sub-workflows** — Extract reusable patterns (e.g., "spawn and monitor agent") into sub-workflows.
3. **Idempotency** — Design workflows to be safely re-runnable. Use dedup keys.
4. **Timeouts** — Set execution timeouts to prevent runaway workflows.
5. **Version control** — Export workflows as JSON and commit to `workflows/` directory.
6. **Test with manual trigger** — Every workflow should have a manual trigger node for testing.
