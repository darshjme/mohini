#!/usr/bin/env bash
# Mohini Watchdog — self-healing health monitor with redundant checks
# Runs as systemd service. Checks every 60s. Auto-recovers crashed services.
set -u

DAEMON_URL="http://127.0.0.1:4200"
GATEWAY_URL="http://127.0.0.1:3009"
HEARTBEAT_FILE="/root/.mohini/workspaces/assistant/HEARTBEAT.md"
CHECK_INTERVAL=60
MAX_CONSECUTIVE_FAILS=3
REBUILD_COOLDOWN=600  # 10 min cooldown between rebuilds

# Counters for consecutive failures
daemon_fails=0
gateway_fails=0
whatsapp_fails=0
ollama_fails=0
last_rebuild=0

log() { echo "[watchdog $(date '+%H:%M:%S')] $*"; }

check_service() {
  local name="$1"
  systemctl is-active --quiet "$name" 2>/dev/null
}

restart_service() {
  local name="$1"
  log "RESTART: $name"
  systemctl restart "$name" 2>/dev/null
  sleep 3
  if check_service "$name"; then
    log "OK: $name recovered"
    return 0
  else
    log "FAIL: $name did not recover after restart"
    return 1
  fi
}

check_http() {
  local url="$1"
  local timeout="${2:-5}"
  curl -sf --max-time "$timeout" "$url" >/dev/null 2>&1
}

check_daemon() {
  # Layer 1: systemd service status
  if ! check_service "mohini-daemon"; then
    log "WARN: mohini-daemon service not active"
    restart_service "mohini-daemon"
    return $?
  fi

  # Layer 2: HTTP health endpoint
  if ! check_http "$DAEMON_URL/api/health"; then
    ((daemon_fails++))
    log "WARN: daemon health check failed ($daemon_fails/$MAX_CONSECUTIVE_FAILS)"
    if [ "$daemon_fails" -ge "$MAX_CONSECUTIVE_FAILS" ]; then
      log "CRIT: daemon unresponsive for $daemon_fails checks — restarting"
      restart_service "mohini-daemon"
      daemon_fails=0
      # Gateway depends on daemon, restart it too after a delay
      sleep 5
      restart_service "mohini-gateway"
    fi
    return 1
  fi

  # Layer 3: Verify agents are loaded
  local agent_count
  agent_count=$(curl -sf --max-time 5 "$DAEMON_URL/api/agents" 2>/dev/null | grep -o '"id"' | wc -l)
  if [ "$agent_count" -eq 0 ]; then
    log "WARN: no agents loaded — daemon may need restart"
    ((daemon_fails++))
    if [ "$daemon_fails" -ge 2 ]; then
      restart_service "mohini-daemon"
      daemon_fails=0
    fi
    return 1
  fi

  daemon_fails=0
  return 0
}

check_gateway() {
  # Layer 1: systemd service status
  if ! check_service "mohini-gateway"; then
    log "WARN: mohini-gateway service not active"
    restart_service "mohini-gateway"
    return $?
  fi

  # Layer 2: HTTP health endpoint
  if ! check_http "$GATEWAY_URL/health"; then
    ((gateway_fails++))
    log "WARN: gateway health check failed ($gateway_fails/$MAX_CONSECUTIVE_FAILS)"
    if [ "$gateway_fails" -ge "$MAX_CONSECUTIVE_FAILS" ]; then
      log "CRIT: gateway unresponsive — restarting"
      restart_service "mohini-gateway"
      gateway_fails=0
    fi
    return 1
  fi

  gateway_fails=0
  return 0
}

check_whatsapp() {
  local status
  status=$(curl -sf --max-time 5 "$GATEWAY_URL/health" 2>/dev/null)
  if [ -z "$status" ]; then
    return 1  # gateway itself is down, handled by check_gateway
  fi

  local connected
  connected=$(echo "$status" | grep -o '"connected":true')
  if [ -z "$connected" ]; then
    ((whatsapp_fails++))
    log "WARN: WhatsApp disconnected ($whatsapp_fails/$MAX_CONSECUTIVE_FAILS)"
    if [ "$whatsapp_fails" -ge "$MAX_CONSECUTIVE_FAILS" ]; then
      log "CRIT: WhatsApp disconnected for $whatsapp_fails checks — restarting gateway"
      restart_service "mohini-gateway"
      whatsapp_fails=0
    fi
    return 1
  fi

  whatsapp_fails=0
  return 0
}

check_ollama() {
  if ! check_http "http://localhost:11434/api/tags"; then
    ((ollama_fails++))
    if [ "$ollama_fails" -ge 2 ]; then
      log "WARN: Ollama down — restarting"
      systemctl restart ollama 2>/dev/null
      ollama_fails=0
    fi
    return 1
  fi
  ollama_fails=0
  return 0
}

check_binary() {
  # Self-healing: if binary is missing or corrupt, rebuild
  local binary="/opt/src/mohini_5.0/mohini/target/release/mohini"
  if [ ! -x "$binary" ]; then
    local now
    now=$(date +%s)
    if [ $((now - last_rebuild)) -lt "$REBUILD_COOLDOWN" ]; then
      log "WARN: binary missing but rebuild cooldown active"
      return 1
    fi
    log "CRIT: binary missing — rebuilding"
    cd /opt/src/mohini_5.0/mohini && cargo build --release --bin mohini 2>&1 | tail -3
    last_rebuild=$(date +%s)
    if [ -x "$binary" ]; then
      log "OK: binary rebuilt successfully"
      restart_service "mohini-daemon"
    else
      log "FAIL: rebuild failed"
    fi
  fi
  return 0
}

update_heartbeat() {
  local daemon_ok="$1"
  local gateway_ok="$2"
  local wa_ok="$3"
  local ollama_ok="$4"
  local now
  now=$(date -u '+%Y-%m-%dT%H:%M:%SZ')

  cat > "$HEARTBEAT_FILE" <<HEARTBEAT
# Heartbeat
- Last check: $now
- Daemon: $([ "$daemon_ok" = "0" ] && echo "running" || echo "DOWN")
- Gateway: $([ "$gateway_ok" = "0" ] && echo "running" || echo "DOWN")
- WhatsApp: $([ "$wa_ok" = "0" ] && echo "connected" || echo "DISCONNECTED")
- Ollama: $([ "$ollama_ok" = "0" ] && echo "running" || echo "DOWN")
- Watchdog: active (PID $$)
HEARTBEAT
}

# ---------------------------------------------------------------------------
# Main loop
# ---------------------------------------------------------------------------
log "Starting Mohini watchdog (PID $$)"
log "Monitoring: daemon ($DAEMON_URL), gateway ($GATEWAY_URL), WhatsApp, Ollama"

while true; do
  check_binary

  d_rc=0; g_rc=0; w_rc=0; o_rc=0
  check_daemon  || d_rc=$?
  check_gateway || g_rc=$?
  check_whatsapp || w_rc=$?
  check_ollama  || o_rc=$?

  update_heartbeat "$d_rc" "$g_rc" "$w_rc" "$o_rc"

  if [ "$d_rc" -eq 0 ] && [ "$g_rc" -eq 0 ] && [ "$w_rc" -eq 0 ]; then
    : # All good, silent
  fi

  sleep "$CHECK_INTERVAL"
done
