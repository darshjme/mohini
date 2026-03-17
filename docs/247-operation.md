# 24/7 Operation Guide

## Overview

Mohini runs continuously on a dedicated server (AMD EPYC 7401P, 86GB RAM, Kali Linux). This guide covers the systemd services, auto-restart, watchdog timers, resource monitoring, and log rotation required for uninterrupted operation.

## Architecture

```
┌──────────────────────────────────────────────────┐
│                   systemd                         │
├──────────────┬───────────────┬────────────────────┤
│ openclaw.    │ mohini-       │ mohini-file-       │
│ service      │ heartbeat.    │ watcher.service    │
│ (gateway)    │ service       │ (inotify)          │
└──────┬───────┴───────┬───────┴────────┬───────────┘
       │               │                │
       ▼               ▼                ▼
┌──────────────────────────────────────────────────┐
│              OpenClaw Gateway                     │
│         Port 18789 (API + WebSocket)              │
│         Port 18790 (Dashboard)                    │
└──────────────────────────────────────────────────┘
```

## systemd Services

### 1. OpenClaw Gateway

```ini
# /etc/systemd/system/openclaw.service
[Unit]
Description=OpenClaw Gateway - Mohini's Body
After=network-online.target postgresql.service
Wants=network-online.target
StartLimitIntervalSec=300
StartLimitBurst=5

[Service]
Type=simple
User=root
WorkingDirectory=/root/openclaw
ExecStart=/usr/bin/openclaw gateway start --foreground
ExecReload=/bin/kill -HUP $MAINPID
Restart=always
RestartSec=10
WatchdogSec=120
Environment=NODE_ENV=production
Environment=OPENCLAW_WORKSPACE=/root/openclaw/workspace

# Resource limits
MemoryMax=4G
CPUQuota=200%
TasksMax=512

# Security
ProtectSystem=false
PrivateTmp=true

# Logging
StandardOutput=journal
StandardError=journal
SyslogIdentifier=openclaw

[Install]
WantedBy=multi-user.target
```

### 2. Heartbeat Service

```ini
# /etc/systemd/system/mohini-heartbeat.service
[Unit]
Description=Mohini Heartbeat - Periodic Check-ins
After=openclaw.service
Requires=openclaw.service

[Service]
Type=simple
User=root
ExecStart=/root/openclaw/workspace/scripts/heartbeat-loop.sh
Restart=always
RestartSec=30
Environment=HEARTBEAT_INTERVAL=600

[Install]
WantedBy=multi-user.target
```

### 3. File Watcher

```ini
# /etc/systemd/system/mohini-file-watcher.service
[Unit]
Description=Mohini File Watcher - Self-Awareness
After=openclaw.service

[Service]
Type=simple
User=root
ExecStart=/root/openclaw/workspace/scripts/file-watcher.sh
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

## Auto-Restart Configuration

### Restart Policies

| Service | Restart | RestartSec | Rationale |
|---------|---------|------------|-----------|
| openclaw | `always` | 10s | Core service, must always be up |
| heartbeat | `always` | 30s | Can tolerate brief gaps |
| file-watcher | `always` | 5s | Lightweight, restart fast |
| n8n (Docker) | `unless-stopped` | — | Docker handles restart |

### Crash Recovery

```ini
# Prevent restart loops
StartLimitIntervalSec=300  # 5-minute window
StartLimitBurst=5          # Max 5 restarts in window
# After 5 crashes in 5 minutes → service enters "failed" state
# Manual intervention required: systemctl reset-failed openclaw
```

### Boot Order

```bash
# Enable all services on boot
systemctl enable openclaw.service
systemctl enable mohini-heartbeat.service
systemctl enable mohini-file-watcher.service

# Verify boot order
systemd-analyze critical-chain openclaw.service
```

## Watchdog Timers

### systemd Watchdog

The `WatchdogSec=120` directive requires the service to notify systemd every 120 seconds. If it doesn't, systemd kills and restarts it.

OpenClaw gateway must call `sd_notify(WATCHDOG=1)` periodically. For Node.js:

```javascript
// In gateway startup
const { notify } = require("sd-notify");
setInterval(() => notify.watchdog(), 60000); // Ping every 60s
```

### Application-Level Watchdog

```bash
#!/bin/bash
# /root/openclaw/workspace/scripts/watchdog.sh
# Run via cron every 5 minutes

GATEWAY_URL="http://localhost:18789/health"
ALERT_FILE="/root/openclaw/workspace/memory/alerts.log"

response=$(curl -sf -o /dev/null -w "%{http_code}" "$GATEWAY_URL" 2>/dev/null)

if [ "$response" != "200" ]; then
  echo "$(date -Iseconds) ALERT: Gateway unreachable (HTTP $response)" >> "$ALERT_FILE"
  systemctl restart openclaw.service
  echo "$(date -Iseconds) ACTION: Restarted openclaw.service" >> "$ALERT_FILE"
fi
```

## Resource Monitoring

### Real-Time Metrics

```bash
# Quick system overview
openclaw gateway status

# Detailed resource usage
systemctl status openclaw.service
journalctl -u openclaw -n 50 --no-pager

# Memory pressure
free -h
cat /proc/meminfo | grep -E "MemTotal|MemAvailable|SwapTotal|SwapFree"

# CPU per service
systemd-cgroup-info openclaw.service
```

### Automated Monitoring Script

```bash
#!/bin/bash
# /root/openclaw/workspace/scripts/resource-monitor.sh

LOG="/root/openclaw/workspace/memory/resource-log.jsonl"
THRESHOLD_MEM=85  # Alert if >85% memory used
THRESHOLD_CPU=90  # Alert if >90% CPU

mem_pct=$(free | awk '/Mem/{printf("%.0f"), $3/$2*100}')
cpu_pct=$(top -bn1 | grep "Cpu(s)" | awk '{print 100-$8}' | cut -d. -f1)
disk_pct=$(df / | awk 'NR==2{print $5}' | tr -d '%')

echo "{\"ts\":\"$(date -Iseconds)\",\"mem\":$mem_pct,\"cpu\":$cpu_pct,\"disk\":$disk_pct}" >> "$LOG"

if [ "$mem_pct" -gt "$THRESHOLD_MEM" ]; then
  echo "$(date -Iseconds) WARN: Memory at ${mem_pct}%" >> /root/openclaw/workspace/memory/alerts.log
fi
```

### OOM Prevention

```ini
# In openclaw.service
MemoryMax=4G
MemoryHigh=3G    # Start throttling at 3G
OOMPolicy=stop   # Stop service instead of killing random processes
```

## Log Rotation

### journald (Primary)

```ini
# /etc/systemd/journald.conf
[Journal]
SystemMaxUse=2G
SystemMaxFileSize=256M
MaxRetentionSec=30day
Compress=yes
```

### Application Logs

```bash
# /etc/logrotate.d/mohini
/root/openclaw/workspace/memory/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 root root
}

/root/openclaw/workspace/n8n-dlq/*.json {
    weekly
    missingok
    rotate 4
    compress
    notifempty
}
```

### Log Cleanup Script

```bash
#!/bin/bash
# Run weekly — clean old daily memory files
find /root/openclaw/workspace/memory/ -name "*.md" -mtime +30 -exec gzip {} \;
find /root/openclaw/workspace/memory/ -name "*.md.gz" -mtime +90 -delete
```

## Operational Runbook

### Service is Down

```bash
# 1. Check status
systemctl status openclaw.service

# 2. Check logs
journalctl -u openclaw -n 100 --no-pager

# 3. Restart
systemctl restart openclaw.service

# 4. If restart fails, check resources
free -h && df -h && top -bn1 | head -20

# 5. Nuclear option
systemctl reset-failed openclaw.service
systemctl start openclaw.service
```

### Memory Leak Suspected

```bash
# Track memory over time
watch -n 5 'ps aux --sort=-%mem | head -10'

# Check for zombie processes
ps aux | awk '$8=="Z"'

# Restart with clean state
systemctl restart openclaw.service
```

### Disk Full

```bash
# Find large files
du -sh /root/openclaw/workspace/* | sort -rh | head -20

# Clean old logs
journalctl --vacuum-size=500M

# Clean Docker
docker system prune -f
```

## Uptime Targets

| Metric | Target |
|--------|--------|
| Gateway uptime | 99.9% (< 8.7h downtime/year) |
| Heartbeat regularity | ±30s of schedule |
| Alert response | < 5 minutes (auto-restart) |
| Recovery time | < 30 seconds (normal), < 5 minutes (crash loop) |
