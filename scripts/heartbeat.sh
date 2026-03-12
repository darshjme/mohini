#!/usr/bin/env bash
# Mohini 5-minute heartbeat — monitors and auto-restarts services
# Run: nohup bash scripts/heartbeat.sh &

set -u
INTERVAL=300  # 5 minutes
AGENT_ID="1d257a26-33e0-4d1f-b807-ed66e78c923f"
HEARTBEAT_FILE="/root/.mohini/workspaces/assistant/HEARTBEAT.md"
MOHINI_DIR="/opt/src/mohini_5.0/mohini"

log() { echo "[heartbeat $(date -u +%Y-%m-%dT%H:%M:%SZ)] $*"; }

while true; do
    NOW=$(date -u +%Y-%m-%dT%H:%M:%SZ)
    daemon_ok=false
    gateway_ok=false

    # Check daemon
    if curl -sf --max-time 5 http://127.0.0.1:4200/api/health >/dev/null 2>&1; then
        daemon_ok=true
    else
        log "WARN: Daemon down — restarting..."
        env -u CLAUDECODE -u CLAUDE_CODE_ENTRYPOINT nohup "$MOHINI_DIR/target/release/mohini" start > /tmp/mohini-daemon.log 2>&1 &
        sleep 6
        if curl -sf --max-time 5 http://127.0.0.1:4200/api/health >/dev/null 2>&1; then
            daemon_ok=true
            log "Daemon restarted successfully"
        else
            log "ERROR: Daemon failed to restart"
        fi
    fi

    # Check WhatsApp gateway
    if curl -sf --max-time 5 http://127.0.0.1:3009/health >/dev/null 2>&1; then
        gateway_ok=true
    else
        log "WARN: Gateway down — restarting..."
        MOHINI_URL=http://127.0.0.1:4200 MOHINI_DEFAULT_AGENT="$AGENT_ID" \
            nohup node "$MOHINI_DIR/packages/whatsapp-gateway/index.js" > /tmp/whatsapp-gateway.log 2>&1 &
        sleep 5
        if curl -sf --max-time 5 http://127.0.0.1:3009/health >/dev/null 2>&1; then
            gateway_ok=true
            log "Gateway restarted successfully"
        else
            log "ERROR: Gateway failed to restart"
        fi
    fi

    # Check WhatsApp connection status
    wa_connected=false
    wa_status=$(curl -sf --max-time 5 http://127.0.0.1:3009/login/status 2>/dev/null)
    if echo "$wa_status" | grep -q '"connected":true'; then
        wa_connected=true
    fi

    # Update HEARTBEAT.md
    cat > "$HEARTBEAT_FILE" <<EOF
# Heartbeat

## Status
- **State:** Running
- **Uptime mode:** 24/7 persistent agent
- **Heartbeat interval:** 5 minutes
- **Daemon:** $([ "$daemon_ok" = true ] && echo "✅ healthy" || echo "❌ down")
- **Gateway:** $([ "$gateway_ok" = true ] && echo "✅ healthy" || echo "❌ down")
- **WhatsApp:** $([ "$wa_connected" = true ] && echo "✅ connected" || echo "⚠️ disconnected")

## Services
| Service | URL | Status |
|---------|-----|--------|
| Mohini API | http://127.0.0.1:4200 | $([ "$daemon_ok" = true ] && echo "UP" || echo "DOWN") |
| WhatsApp GW | http://127.0.0.1:3009 | $([ "$gateway_ok" = true ] && echo "UP" || echo "DOWN") |

## Agent
- **ID:** $AGENT_ID
- **Model:** Claude Sonnet (Claude Code CLI)
- **Channels:** WhatsApp (Baileys Web), HTTP API

## Capabilities
- Text conversations (WhatsApp + API)
- PDF reading (pdftotext extraction)
- Image understanding
- Document processing
- Typing indicator on WhatsApp while processing
- Auto-reconnect on disconnect
- Memory persistence across sessions
- Auto-restart on service failure (heartbeat watchdog)

## Last Heartbeat
$NOW
EOF

    log "OK — daemon=$daemon_ok gateway=$gateway_ok whatsapp=$wa_connected"
    sleep "$INTERVAL"
done
