#!/usr/bin/env bash
# 🎬 Demo 04: n8n Workflow Orchestration
# Shows Mohini triggering and monitoring n8n workflows.
set -euo pipefail

BOLD='\033[1m'
CYAN='\033[36m'
GREEN='\033[32m'
YELLOW='\033[33m'
MAGENTA='\033[35m'
RESET='\033[0m'

echo -e "${BOLD}${CYAN}═══════════════════════════════════════════${RESET}"
echo -e "${BOLD}  🪷 MOHINI — n8n Workflow Orchestration${RESET}"
echo -e "${CYAN}═══════════════════════════════════════════${RESET}"
echo

echo -e "${BOLD}Scenario:${RESET} New lead arrives → auto-qualify → notify Darshan"
echo

# Step 1: Webhook trigger
echo -e "${MAGENTA}[n8n]${RESET} Webhook received: new contact form submission"
echo -e "  ${YELLOW}├─${RESET} Name: Acme Corp"
echo -e "  ${YELLOW}├─${RESET} Email: cto@acme.com"
echo -e "  ${YELLOW}└─${RESET} Message: \"Need AI integration for our platform\""
sleep 1

# Step 2: Mohini processes
echo
echo -e "${GREEN}[Mohini]${RESET} n8n webhook triggered my lead-qualification flow"
sleep 0.5
echo -e "  ${YELLOW}├─${RESET} Step 1: Enrich lead data (company size, revenue)..."
sleep 0.5
echo -e "  ${YELLOW}├─${RESET} Step 2: Score lead (budget signals, urgency)..."
sleep 0.5
echo -e "  ${YELLOW}├─${RESET} Step 3: Draft personalized response..."
sleep 0.5
echo -e "  ${YELLOW}└─${RESET} Step 4: Notify Darshan via WhatsApp"
sleep 0.5

# Step 3: Result
echo
echo -e "${GREEN}[Mohini → WhatsApp]${RESET}"
echo -e "  ┌──────────────────────────────────────────┐"
echo -e "  │ 🔥 Hot Lead: Acme Corp                   │"
echo -e "  │ Score: 8.5/10 (enterprise, urgent need)   │"
echo -e "  │ Revenue: ~\$50M | Team: 200+               │"
echo -e "  │ Drafted response ready for your approval.  │"
echo -e "  └──────────────────────────────────────────┘"
echo

echo -e "${CYAN}This flow runs via n8n webhooks + OpenClaw agent API.${RESET}"
echo -e "${CYAN}No human intervention needed until approval step.${RESET}"
