#!/usr/bin/env bash
# 🎬 Demo 01: ARISE — Spawn a Single Agent
# Shows how Mohini spawns a sub-agent for a task.
set -euo pipefail

BOLD='\033[1m'
CYAN='\033[36m'
GREEN='\033[32m'
YELLOW='\033[33m'
RESET='\033[0m'

echo -e "${BOLD}${CYAN}═══════════════════════════════════════════${RESET}"
echo -e "${BOLD}  🪷 MOHINI — ARISE: Spawn a Single Agent${RESET}"
echo -e "${CYAN}═══════════════════════════════════════════${RESET}"
echo

# Simulate the ARISE command
echo -e "${YELLOW}[Supreme Commander]${RESET} Incoming task: 'Research quantum computing breakthroughs 2026'"
sleep 1

echo -e "${BOLD}${GREEN}▸ ARISE!${RESET} Spawning shadow soldier..."
sleep 0.5

echo -e "  ┌──────────────────────────────────────┐"
echo -e "  │ Agent ID:    soldier-research-7a3f    │"
echo -e "  │ Model:       claude-opus-4-6          │"
echo -e "  │ Task:        Quantum computing survey │"
echo -e "  │ Rank:        Colonel (mid-tier)       │"
echo -e "  │ Status:      🟢 ACTIVE                │"
echo -e "  └──────────────────────────────────────┘"
sleep 1

echo
echo -e "${YELLOW}[soldier-research-7a3f]${RESET} Searching web for latest papers..."
sleep 1
echo -e "${YELLOW}[soldier-research-7a3f]${RESET} Found 12 relevant sources. Synthesizing..."
sleep 1
echo -e "${YELLOW}[soldier-research-7a3f]${RESET} Report complete. Returning to shadow."
echo
echo -e "${GREEN}✅ Agent completed. Result delivered to Supreme Commander.${RESET}"
echo
echo -e "${CYAN}In production, this uses the OpenClaw sub-agent API:${RESET}"
echo -e "  openclaw agent spawn --task 'Research quantum computing' --model opus"
echo
echo -e "${BOLD}Shadow army grows with each kill. 🗡️${RESET}"
