#!/usr/bin/env bash
# 🎬 Demo 05: Self-Healing — Auto-Restart & Error Recovery
# Shows Mohini's resilience: the chat never stops.
set -euo pipefail

BOLD='\033[1m'
CYAN='\033[36m'
GREEN='\033[32m'
YELLOW='\033[33m'
RED='\033[31m'
RESET='\033[0m'

echo -e "${BOLD}${CYAN}═══════════════════════════════════════════${RESET}"
echo -e "${BOLD}  🪷 MOHINI — Self-Healing: Never Die${RESET}"
echo -e "${CYAN}═══════════════════════════════════════════${RESET}"
echo

echo -e "${BOLD}Principle:${RESET} Error ≠ death. API fails? Retry. Tool breaks? Fallback."
echo -e "          Context limit? Spawn sub-agent. Nothing kills this conversation."
echo

# Scenario 1: API failure
echo -e "${BOLD}── Scenario 1: API Rate Limit ──${RESET}"
echo -e "${RED}  ✗ Claude Opus API: 429 Too Many Requests${RESET}"
sleep 0.5
echo -e "${YELLOW}  ↻ Retrying with exponential backoff (2s)...${RESET}"
sleep 0.5
echo -e "${RED}  ✗ Still rate limited${RESET}"
sleep 0.5
echo -e "${YELLOW}  ⤵ Falling back to Haiku (lighter model)...${RESET}"
sleep 0.5
echo -e "${GREEN}  ✓ Haiku responding. Chat continues uninterrupted.${RESET}"
echo

# Scenario 2: Service crash
echo -e "${BOLD}── Scenario 2: Gateway Crash ──${RESET}"
echo -e "${RED}  ✗ OpenClaw gateway process died (OOM)${RESET}"
sleep 0.5
echo -e "${YELLOW}  ↻ systemd detected exit, restarting (Restart=always)...${RESET}"
sleep 0.5
echo -e "${GREEN}  ✓ Gateway back online in 3 seconds${RESET}"
echo -e "${GREEN}  ✓ Heartbeat resumed, no messages lost (queue persisted)${RESET}"
echo

# Scenario 3: Context overflow
echo -e "${BOLD}── Scenario 3: Context Limit ──${RESET}"
echo -e "${YELLOW}  ⚠ Context window 95% full (190K/200K tokens)${RESET}"
sleep 0.5
echo -e "${YELLOW}  ↻ Compaction triggered: summarizing conversation...${RESET}"
sleep 0.5
echo -e "${GREEN}  ✓ Compacted to 40K tokens. Core context preserved.${RESET}"
echo -e "${GREEN}  ✓ Reading memory files to restore state...${RESET}"
sleep 0.5
echo -e "${GREEN}  ✓ Fully operational. User sees no interruption.${RESET}"
echo

echo -e "${CYAN}┌─────────────────────────────────────────────┐${RESET}"
echo -e "${CYAN}│  Self-healing layers:                       │${RESET}"
echo -e "${CYAN}│  1. Model fallback (Opus → Sonnet → Haiku)  │${RESET}"
echo -e "${CYAN}│  2. systemd auto-restart (Restart=always)   │${RESET}"
echo -e "${CYAN}│  3. Context compaction (auto-summarize)     │${RESET}"
echo -e "${CYAN}│  4. Heartbeat monitoring (every 10 min)     │${RESET}"
echo -e "${CYAN}│  5. File-based memory (survives restarts)   │${RESET}"
echo -e "${CYAN}└─────────────────────────────────────────────┘${RESET}"
echo
echo -e "${BOLD}${GREEN}The chat never stops. Ever. 🪷${RESET}"
