#!/usr/bin/env bash
# 🎬 Demo 02: Shadow Army — Multi-Agent Parallel Execution
# Shows Mohini's wave-based orchestration pattern.
set -euo pipefail

BOLD='\033[1m'
CYAN='\033[36m'
GREEN='\033[32m'
YELLOW='\033[33m'
RED='\033[31m'
MAGENTA='\033[35m'
RESET='\033[0m'

echo -e "${BOLD}${CYAN}═══════════════════════════════════════════${RESET}"
echo -e "${BOLD}  🪷 MOHINI — Shadow Army: Multi-Agent Swarm${RESET}"
echo -e "${CYAN}═══════════════════════════════════════════${RESET}"
echo

echo -e "${BOLD}${MAGENTA}[Supreme Commander Mohini]${RESET} Task: Build a REST API for invoicing"
echo -e "  Deploying 4-wave shadow army..."
echo

# Wave 1: Research
echo -e "${BOLD}── Wave 1: RECON ──${RESET}"
for agent in "scout-arch-01:Architecture analysis" "scout-deps-02:Dependency audit" "scout-api-03:API pattern research"; do
  IFS=: read -r id task <<< "$agent"
  echo -e "  ${GREEN}▸ ARISE!${RESET} ${YELLOW}[$id]${RESET} $task"
  sleep 0.3
done
sleep 1
echo -e "  ${GREEN}✅ Wave 1 complete — 3 agents returned intel${RESET}"
echo

# Wave 2: Build
echo -e "${BOLD}── Wave 2: BUILD ──${RESET}"
for agent in "builder-routes-01:Route handlers" "builder-models-02:Data models" "builder-auth-03:Auth middleware" "builder-valid-04:Validation layer" "builder-tests-05:Test suite"; do
  IFS=: read -r id task <<< "$agent"
  echo -e "  ${GREEN}▸ ARISE!${RESET} ${YELLOW}[$id]${RESET} $task"
  sleep 0.3
done
sleep 1
echo -e "  ${GREEN}✅ Wave 2 complete — 5 agents shipped code${RESET}"
echo

# Wave 3: QA
echo -e "${BOLD}── Wave 3: QA ──${RESET}"
for agent in "qa-unit-01:Unit tests pass" "qa-integ-02:Integration tests pass" "qa-sec-03:Security audit clean"; do
  IFS=: read -r id task <<< "$agent"
  echo -e "  ${GREEN}▸ ARISE!${RESET} ${YELLOW}[$id]${RESET} $task"
  sleep 0.3
done
sleep 1
echo -e "  ${GREEN}✅ Wave 3 complete — all gates passed${RESET}"
echo

# Wave 4: Ship
echo -e "${BOLD}── Wave 4: SHIP ──${RESET}"
echo -e "  ${GREEN}▸ ARISE!${RESET} ${YELLOW}[shipper-01]${RESET} Deploy + document"
sleep 1
echo -e "  ${GREEN}✅ Wave 4 complete — deployed to production${RESET}"
echo

echo -e "${BOLD}${CYAN}┌─────────────────────────────────────┐${RESET}"
echo -e "${BOLD}${CYAN}│  Total agents: 12                   │${RESET}"
echo -e "${BOLD}${CYAN}│  Waves: 4 (Recon→Build→QA→Ship)     │${RESET}"
echo -e "${BOLD}${CYAN}│  Time: ~3 minutes (vs 3 hours solo) │${RESET}"
echo -e "${BOLD}${CYAN}│  Status: 🟢 ALL RETURNED TO SHADOW  │${RESET}"
echo -e "${BOLD}${CYAN}└─────────────────────────────────────┘${RESET}"
echo
echo -e "${MAGENTA}\"I say ARISE and they come to life. They complete. They return to shadow.\"${RESET}"
