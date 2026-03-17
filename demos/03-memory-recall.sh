#!/usr/bin/env bash
# 🎬 Demo 03: Memory Recall — Persistent Context Across Sessions
# Shows how Mohini maintains memory across restarts.
set -euo pipefail

BOLD='\033[1m'
CYAN='\033[36m'
GREEN='\033[32m'
YELLOW='\033[33m'
DIM='\033[2m'
RESET='\033[0m'

echo -e "${BOLD}${CYAN}═══════════════════════════════════════════${RESET}"
echo -e "${BOLD}  🪷 MOHINI — Memory: Never Forget${RESET}"
echo -e "${CYAN}═══════════════════════════════════════════${RESET}"
echo

# Simulate memory layers
echo -e "${BOLD}Memory Architecture:${RESET}"
echo -e "  ┌─────────────────────────────────────────────┐"
echo -e "  │  Layer 1: Daily Logs (memory/YYYY-MM-DD.md) │"
echo -e "  │  Layer 2: Long-term  (MEMORY.md)            │"
echo -e "  │  Layer 3: Vector DB  (LanceDB embeddings)   │"
echo -e "  │  Layer 4: Core Files (SOUL.md, USER.md)     │"
echo -e "  └─────────────────────────────────────────────┘"
echo

# Simulate a memory store
echo -e "${YELLOW}[User]${RESET} \"Remember that the API deadline is March 20th.\""
sleep 0.5
echo -e "${GREEN}[Mohini]${RESET} Storing to daily log + long-term memory..."
sleep 0.5
echo -e "  ${DIM}→ memory/2026-03-17.md: \"API deadline: March 20th\"${RESET}"
echo -e "  ${DIM}→ MEMORY.md: Updated project deadlines section${RESET}"
echo

# Simulate session restart
echo -e "${YELLOW}--- Session restart (context wiped) ---${RESET}"
sleep 1
echo

# Simulate recall
echo -e "${YELLOW}[User]${RESET} \"When is the API deadline?\""
sleep 0.5
echo -e "${GREEN}[Mohini]${RESET} Searching memory layers..."
echo -e "  ${DIM}→ Reading memory/2026-03-17.md...${RESET}"
echo -e "  ${DIM}→ Reading MEMORY.md...${RESET}"
sleep 0.5
echo -e "${GREEN}[Mohini]${RESET} \"The API deadline is March 20th. You told me earlier today.\""
echo

echo -e "${CYAN}Key insight: Files survive restarts. \"Mental notes\" don't.${RESET}"
echo -e "${CYAN}Text > Brain. Always write it down. 📝${RESET}"
