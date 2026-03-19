<p align="center">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 180" width="800" height="180">
  <defs>
    <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0d1117"/>
      <stop offset="50%" style="stop-color:#131920"/>
      <stop offset="100%" style="stop-color:#161b22"/>
    </linearGradient>
    <linearGradient id="heroText" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#58A6FF">
        <animate attributeName="stop-color" values="#58A6FF;#7B61FF;#6E40C9;#58A6FF" dur="6s" repeatCount="indefinite"/>
      </stop>
      <stop offset="50%" style="stop-color:#6E40C9">
        <animate attributeName="stop-color" values="#6E40C9;#58A6FF;#7B61FF;#6E40C9" dur="6s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" style="stop-color:#58A6FF">
        <animate attributeName="stop-color" values="#58A6FF;#6E40C9;#58A6FF;#7B61FF" dur="6s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>
    <linearGradient id="heroGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#58A6FF" stop-opacity="0.15">
        <animate attributeName="stop-opacity" values="0.1;0.25;0.1" dur="4s" repeatCount="indefinite"/>
      </stop>
      <stop offset="50%" style="stop-color:#6E40C9" stop-opacity="0.08"/>
      <stop offset="100%" style="stop-color:#58A6FF" stop-opacity="0.15">
        <animate attributeName="stop-opacity" values="0.15;0.05;0.15" dur="4s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>
    <filter id="titleGlow">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="softGlow">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="800" height="180" rx="12" fill="url(#heroBg)"/>
  <!-- Ambient glow bar -->
  <rect x="200" y="55" width="400" height="60" rx="30" fill="url(#heroGlow)" filter="url(#softGlow)"/>
  <!-- Neural network constellation - left cluster -->
  <circle cx="65" cy="35" r="2.5" fill="#58A6FF" opacity="0.35"><animate attributeName="opacity" values="0.15;0.6;0.15" dur="3.2s" repeatCount="indefinite"/><animate attributeName="r" values="2;3.5;2" dur="3.2s" repeatCount="indefinite"/></circle>
  <circle cx="130" cy="22" r="1.8" fill="#58A6FF" opacity="0.25"><animate attributeName="opacity" values="0.1;0.5;0.1" dur="4.1s" repeatCount="indefinite"/><animate attributeName="r" values="1.5;2.8;1.5" dur="4.1s" repeatCount="indefinite"/></circle>
  <circle cx="95" cy="65" r="2" fill="#7B61FF" opacity="0.3"><animate attributeName="opacity" values="0.2;0.55;0.2" dur="2.8s" repeatCount="indefinite"/><animate attributeName="r" values="1.8;3;1.8" dur="2.8s" repeatCount="indefinite"/></circle>
  <circle cx="55" cy="90" r="1.5" fill="#58A6FF" opacity="0.2"><animate attributeName="opacity" values="0.1;0.45;0.1" dur="5s" repeatCount="indefinite"/></circle>
  <circle cx="160" cy="55" r="2.2" fill="#6E40C9" opacity="0.28"><animate attributeName="opacity" values="0.15;0.5;0.15" dur="3.6s" repeatCount="indefinite"/><animate attributeName="r" values="2;3.2;2" dur="3.6s" repeatCount="indefinite"/></circle>
  <line x1="65" y1="35" x2="130" y2="22" stroke="#58A6FF" stroke-width="0.5" opacity="0.12"/>
  <line x1="65" y1="35" x2="95" y2="65" stroke="#7B61FF" stroke-width="0.5" opacity="0.1"/>
  <line x1="130" y1="22" x2="160" y2="55" stroke="#6E40C9" stroke-width="0.5" opacity="0.1"/>
  <line x1="95" y1="65" x2="55" y2="90" stroke="#58A6FF" stroke-width="0.5" opacity="0.08"/>
  <line x1="95" y1="65" x2="160" y2="55" stroke="#6E40C9" stroke-width="0.5" opacity="0.1"/>
  <!-- Neural network constellation - right cluster -->
  <circle cx="735" cy="30" r="2" fill="#6E40C9" opacity="0.3"><animate attributeName="opacity" values="0.1;0.55;0.1" dur="3.8s" repeatCount="indefinite"/><animate attributeName="r" values="1.5;3;1.5" dur="3.8s" repeatCount="indefinite"/></circle>
  <circle cx="690" cy="55" r="2.5" fill="#7B61FF" opacity="0.35"><animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.9s" repeatCount="indefinite"/><animate attributeName="r" values="2;3.5;2" dur="2.9s" repeatCount="indefinite"/></circle>
  <circle cx="745" cy="70" r="1.8" fill="#58A6FF" opacity="0.25"><animate attributeName="opacity" values="0.15;0.5;0.15" dur="4.4s" repeatCount="indefinite"/><animate attributeName="r" values="1.5;2.8;1.5" dur="4.4s" repeatCount="indefinite"/></circle>
  <circle cx="660" cy="28" r="1.5" fill="#6E40C9" opacity="0.2"><animate attributeName="opacity" values="0.1;0.4;0.1" dur="5.2s" repeatCount="indefinite"/></circle>
  <circle cx="710" cy="95" r="2" fill="#6E40C9" opacity="0.28"><animate attributeName="opacity" values="0.12;0.48;0.12" dur="3.4s" repeatCount="indefinite"/><animate attributeName="r" values="1.8;3;1.8" dur="3.4s" repeatCount="indefinite"/></circle>
  <line x1="735" y1="30" x2="690" y2="55" stroke="#7B61FF" stroke-width="0.5" opacity="0.12"/>
  <line x1="735" y1="30" x2="745" y2="70" stroke="#58A6FF" stroke-width="0.5" opacity="0.1"/>
  <line x1="690" y1="55" x2="660" y2="28" stroke="#6E40C9" stroke-width="0.5" opacity="0.1"/>
  <line x1="690" y1="55" x2="710" y2="95" stroke="#6E40C9" stroke-width="0.5" opacity="0.08"/>
  <line x1="745" y1="70" x2="710" y2="95" stroke="#6E40C9" stroke-width="0.5" opacity="0.1"/>
  <!-- Bottom scattered dots -->
  <circle cx="180" cy="145" r="1.5" fill="#58A6FF" opacity="0.18"><animate attributeName="opacity" values="0.08;0.35;0.08" dur="4.8s" repeatCount="indefinite"/></circle>
  <circle cx="350" cy="158" r="1.2" fill="#6E40C9" opacity="0.15"><animate attributeName="opacity" values="0.05;0.3;0.05" dur="5.5s" repeatCount="indefinite"/></circle>
  <circle cx="480" cy="162" r="1.4" fill="#7B61FF" opacity="0.18"><animate attributeName="opacity" values="0.1;0.32;0.1" dur="4.2s" repeatCount="indefinite"/></circle>
  <circle cx="620" cy="150" r="1.5" fill="#58A6FF" opacity="0.15"><animate attributeName="opacity" values="0.08;0.28;0.08" dur="5.8s" repeatCount="indefinite"/></circle>
  <!-- Title -->
  <text x="400" y="82" text-anchor="middle" font-family="'SF Pro Display','Inter','Segoe UI',Helvetica,Arial,sans-serif" font-size="58" font-weight="800" fill="url(#heroText)" filter="url(#titleGlow)" letter-spacing="12">MOHINI</text>
  <!-- Subtitle -->
  <text x="400" y="116" text-anchor="middle" font-family="'SF Pro Display','Inter','Segoe UI',Helvetica,Arial,sans-serif" font-size="15" fill="#8b949e" font-weight="500" letter-spacing="5">THE AGENT OPERATING SYSTEM</text>
  <!-- Tagline -->
  <text x="400" y="150" text-anchor="middle" font-family="'SF Pro Text','Inter','Segoe UI',Helvetica,Arial,sans-serif" font-size="11.5" fill="#6e7681" letter-spacing="1.2">One binary. 104 skills. 40 channels. 188 models. Zero downtime.</text>
</svg>
</p>

<p align="center">
  <a href="https://github.com/darshjme/mohini/actions"><img src="https://img.shields.io/github/actions/workflow/status/darshjme/mohini/ci.yml?branch=main&style=flat-square&logo=github&label=build" alt="Build Status" /></a>
  <a href="https://crates.io/crates/mohini-cli"><img src="https://img.shields.io/crates/v/mohini-cli?style=flat-square&logo=rust&label=crates.io" alt="Crates.io" /></a>
  <a href="#license"><img src="https://img.shields.io/badge/license-Apache--2.0%20%2F%20MIT-blue?style=flat-square" alt="License" /></a>
  <img src="https://img.shields.io/badge/rust-1.75%2B-orange?style=flat-square&logo=rust" alt="Rust 1.75+" />
  <img src="https://img.shields.io/badge/tests-2%2C285%2B%20passing-brightgreen?style=flat-square" alt="Tests" />
  <img src="https://img.shields.io/badge/clippy-0%20warnings-brightgreen?style=flat-square" alt="Clippy" />
</p>

<p align="center">
  <a href="#what-is-mohini">What is Mohini</a> &middot;
  <a href="#quick-start">Quick Start</a> &middot;
  <a href="#architecture">Architecture</a> &middot;
  <a href="#features">Features</a> &middot;
  <a href="#channel-adapters">Channels</a> &middot;
  <a href="#model-integrations">Models</a> &middot;
  <a href="#contributing">Contributing</a>
</p>

---

## What is Mohini

Mohini is a single Rust binary that turns AI models into autonomous agents capable of acting in the real world -- browsing the web, managing files, sending messages across 40 platforms, executing sandboxed code, and orchestrating multi-agent workflows with zero human intervention.

Fourteen crates compile to one static binary with no runtime dependencies. Deploy it on bare metal, Docker, Kubernetes, or a Raspberry Pi. It self-heals on crash, hot-reloads configuration, and falls back across 188 models from every major provider without dropping a single message.

---

<p align="center">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 60" width="800" height="60">
  <defs>
    <linearGradient id="statCardBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1a2332"/>
      <stop offset="100%" style="stop-color:#131a24"/>
    </linearGradient>
  </defs>
  <!-- Card 1: Skills -->
  <rect x="8" y="5" width="185" height="50" rx="10" fill="url(#statCardBg)" stroke="#58A6FF" stroke-width="1" opacity="0.9"/>
  <rect x="28" y="20" width="20" height="20" rx="4" fill="none" stroke="#58A6FF" stroke-width="1.3"/>
  <path d="M33 30 L36 33 L43 26" stroke="#58A6FF" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="58" y="26" font-family="'SF Pro Display','Inter',sans-serif" font-size="18" font-weight="700" fill="#e6edf3">104</text>
  <text x="58" y="42" font-family="'SF Pro Text','Inter',sans-serif" font-size="11" fill="#8b949e">Skills</text>
  <!-- Card 2: Channels -->
  <rect x="205" y="5" width="185" height="50" rx="10" fill="url(#statCardBg)" stroke="#3FB950" stroke-width="1" opacity="0.9"/>
  <rect x="225" y="20" width="20" height="20" rx="4" fill="none" stroke="#3FB950" stroke-width="1.3"/>
  <path d="M230 25 L240 25 M230 30 L238 30 M230 35 L236 35" stroke="#3FB950" stroke-width="1.3" fill="none" stroke-linecap="round"/>
  <text x="255" y="26" font-family="'SF Pro Display','Inter',sans-serif" font-size="18" font-weight="700" fill="#e6edf3">40</text>
  <text x="255" y="42" font-family="'SF Pro Text','Inter',sans-serif" font-size="11" fill="#8b949e">Channels</text>
  <!-- Card 3: Models -->
  <rect x="402" y="5" width="185" height="50" rx="10" fill="url(#statCardBg)" stroke="#6E40C9" stroke-width="1" opacity="0.9"/>
  <rect x="422" y="20" width="20" height="20" rx="4" fill="none" stroke="#6E40C9" stroke-width="1.3"/>
  <circle cx="432" cy="30" r="4" fill="none" stroke="#6E40C9" stroke-width="1.2"/>
  <circle cx="432" cy="30" r="1.5" fill="#6E40C9"/>
  <text x="452" y="26" font-family="'SF Pro Display','Inter',sans-serif" font-size="18" font-weight="700" fill="#e6edf3">188</text>
  <text x="452" y="42" font-family="'SF Pro Text','Inter',sans-serif" font-size="11" fill="#8b949e">Models</text>
  <!-- Card 4: Tests -->
  <rect x="599" y="5" width="193" height="50" rx="10" fill="url(#statCardBg)" stroke="#F0883E" stroke-width="1" opacity="0.9"/>
  <rect x="619" y="20" width="20" height="20" rx="4" fill="none" stroke="#F0883E" stroke-width="1.3"/>
  <path d="M625 30 L628 33 L633 26" stroke="#F0883E" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="649" y="26" font-family="'SF Pro Display','Inter',sans-serif" font-size="18" font-weight="700" fill="#e6edf3">2,285+</text>
  <text x="649" y="42" font-family="'SF Pro Text','Inter',sans-serif" font-size="11" fill="#8b949e">Tests</text>
</svg>
</p>

---

## Why Mohini

| | |
|---|---|
| **One Binary, Infinite Reach** | 14 Rust crates compile to a single static binary. No Python. No Node. No dependency hell. Drop it on any Linux box, macOS machine, or container and it runs. 40 channels, 188 models, 104 skills -- all included, all ready. |
| **Agents That Survive Anything** | Context overflow triggers compaction. Rate limits trigger model fallback. Process crash triggers systemd restart. Config change triggers hot reload. The conversation never stops. |
| **Parallel Intelligence at Scale** | Spawn ten sub-agents in parallel, each with its own mission. Fan-out, fan-in, chain of command. What takes a human a week, Mohini does in an hour. WASM-sandboxed skill execution keeps everything safe. |

---

## Quick Start

### Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Rust | 1.75+ | `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs \| sh` |
| C toolchain | gcc / clang | Ubuntu: `sudo apt install build-essential pkg-config libssl-dev` |
| | | macOS: `xcode-select --install` |

### Build from Source

```bash
git clone https://github.com/darshjme/mohini.git
cd mohini
cargo build --release
./target/release/mohini
```

### Docker

```bash
docker run -d \
  --name mohini \
  -v ./mohini.toml:/app/mohini.toml \
  -v ./agents:/app/agents \
  -v ./data:/app/data \
  -p 4200:4200 \
  darshjme/mohini:latest
```

### Your First Agent

Create `agents/my-first-agent/agent.toml`:

```toml
[agent]
id = "my-agent"
name = "My First Agent"
model = "anthropic/claude-sonnet-4-5"
thinking = "low"

[agent.instructions]
preamble = """
You are a focused agent. No fluff. Just results.
"""

[agent.bindings]
channels = ["whatsapp:direct:+1234567890"]
```

Start Mohini and send a WhatsApp message to the configured number. Your agent awakens.

---

## Architecture

<p align="center">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300" width="800" height="300">
  <defs>
    <linearGradient id="archBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0d1117"/>
      <stop offset="100%" style="stop-color:#161b22"/>
    </linearGradient>
    <filter id="archShadow">
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000" flood-opacity="0.3"/>
    </filter>
    <linearGradient id="kernelStroke" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#58A6FF"/>
      <stop offset="100%" style="stop-color:#6E40C9"/>
    </linearGradient>
  </defs>
  <rect width="800" height="300" rx="12" fill="url(#archBg)"/>
  <!-- Legend -->
  <rect x="30" y="12" width="10" height="10" rx="2" fill="#58A6FF" opacity="0.6"/>
  <text x="44" y="21" font-family="'SF Pro Text','Inter',sans-serif" font-size="9" fill="#8b949e">Core</text>
  <rect x="80" y="12" width="10" height="10" rx="2" fill="#3FB950" opacity="0.6"/>
  <text x="94" y="21" font-family="'SF Pro Text','Inter',sans-serif" font-size="9" fill="#8b949e">I/O</text>
  <rect x="118" y="12" width="10" height="10" rx="2" fill="#6E40C9" opacity="0.6"/>
  <text x="132" y="21" font-family="'SF Pro Text','Inter',sans-serif" font-size="9" fill="#8b949e">Interface</text>
  <rect x="188" y="12" width="10" height="10" rx="2" fill="#F0883E" opacity="0.6"/>
  <text x="202" y="21" font-family="'SF Pro Text','Inter',sans-serif" font-size="9" fill="#8b949e">Extension</text>
  <!-- Center: Kernel -->
  <rect x="310" y="120" width="180" height="55" rx="10" fill="#0d1117" stroke="url(#kernelStroke)" stroke-width="2" filter="url(#archShadow)"/>
  <text x="400" y="145" text-anchor="middle" font-family="'SF Mono','Fira Code',monospace" font-size="13" font-weight="700" fill="#58A6FF">mohini-kernel</text>
  <text x="400" y="163" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="9" fill="#6e7681">Orchestration Engine</text>
  <!-- Top row: Core crates -->
  <rect x="30" y="40" width="145" height="45" rx="8" fill="#0d1117" stroke="#58A6FF" stroke-width="1.2"/>
  <text x="102" y="60" text-anchor="middle" font-family="'SF Mono',monospace" font-size="10" font-weight="600" fill="#58A6FF">mohini-types</text>
  <text x="102" y="74" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="8" fill="#6e7681">Shared Types + Config</text>
  <rect x="195" y="40" width="145" height="45" rx="8" fill="#0d1117" stroke="#58A6FF" stroke-width="1.2"/>
  <text x="267" y="60" text-anchor="middle" font-family="'SF Mono',monospace" font-size="10" font-weight="600" fill="#58A6FF">mohini-memory</text>
  <text x="267" y="74" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="8" fill="#6e7681">SQLite + Qdrant</text>
  <rect x="460" y="40" width="145" height="45" rx="8" fill="#0d1117" stroke="#58A6FF" stroke-width="1.2"/>
  <text x="532" y="60" text-anchor="middle" font-family="'SF Mono',monospace" font-size="10" font-weight="600" fill="#58A6FF">mohini-runtime</text>
  <text x="532" y="74" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="8" fill="#6e7681">Agent Loop + Tools</text>
  <rect x="625" y="40" width="145" height="45" rx="8" fill="#0d1117" stroke="#3FB950" stroke-width="1.2"/>
  <text x="697" y="60" text-anchor="middle" font-family="'SF Mono',monospace" font-size="10" font-weight="600" fill="#3FB950">mohini-wire</text>
  <text x="697" y="74" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="8" fill="#6e7681">MMP Protocol</text>
  <!-- Middle row: I/O crates -->
  <rect x="30" y="130" width="145" height="45" rx="8" fill="#0d1117" stroke="#3FB950" stroke-width="1.2"/>
  <text x="102" y="150" text-anchor="middle" font-family="'SF Mono',monospace" font-size="10" font-weight="600" fill="#3FB950">mohini-channels</text>
  <text x="102" y="164" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="8" fill="#6e7681">40 Adapters</text>
  <rect x="625" y="130" width="145" height="45" rx="8" fill="#0d1117" stroke="#3FB950" stroke-width="1.2"/>
  <text x="697" y="150" text-anchor="middle" font-family="'SF Mono',monospace" font-size="10" font-weight="600" fill="#3FB950">mohini-api</text>
  <text x="697" y="164" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="8" fill="#6e7681">REST / WS / SSE</text>
  <!-- Bottom row: Interface + Extension crates -->
  <rect x="30" y="215" width="125" height="45" rx="8" fill="#0d1117" stroke="#6E40C9" stroke-width="1.2"/>
  <text x="92" y="235" text-anchor="middle" font-family="'SF Mono',monospace" font-size="10" font-weight="600" fill="#6E40C9">mohini-cli</text>
  <text x="92" y="249" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="8" fill="#6e7681">CLI Entry Point</text>
  <rect x="170" y="215" width="125" height="45" rx="8" fill="#0d1117" stroke="#F0883E" stroke-width="1.2"/>
  <text x="232" y="235" text-anchor="middle" font-family="'SF Mono',monospace" font-size="10" font-weight="600" fill="#F0883E">mohini-skills</text>
  <text x="232" y="249" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="8" fill="#6e7681">104 Bundled Skills</text>
  <rect x="310" y="215" width="125" height="45" rx="8" fill="#0d1117" stroke="#F0883E" stroke-width="1.2"/>
  <text x="372" y="235" text-anchor="middle" font-family="'SF Mono',monospace" font-size="10" font-weight="600" fill="#F0883E">mohini-hands</text>
  <text x="372" y="249" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="8" fill="#6e7681">Autonomous Workers</text>
  <rect x="450" y="215" width="125" height="45" rx="8" fill="#0d1117" stroke="#F0883E" stroke-width="1.2"/>
  <text x="512" y="235" text-anchor="middle" font-family="'SF Mono',monospace" font-size="10" font-weight="600" fill="#F0883E">mohini-extensions</text>
  <text x="512" y="249" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="8" fill="#6e7681">Credential Vault</text>
  <rect x="590" y="215" width="125" height="45" rx="8" fill="#0d1117" stroke="#6E40C9" stroke-width="1.2"/>
  <text x="652" y="235" text-anchor="middle" font-family="'SF Mono',monospace" font-size="10" font-weight="600" fill="#6E40C9">mohini-desktop</text>
  <text x="652" y="249" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="8" fill="#6e7681">Tauri 2.0 App</text>
  <rect x="730" y="215" width="55" height="45" rx="8" fill="#0d1117" stroke="#6E40C9" stroke-width="1" opacity="0.7"/>
  <text x="757" y="238" text-anchor="middle" font-family="'SF Mono',monospace" font-size="7" font-weight="600" fill="#6E40C9">migrate</text>
  <text x="757" y="250" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="7" fill="#6e7681">Schema</text>
  <!-- Connection lines -->
  <line x1="102" y1="85" x2="380" y2="120" stroke="#58A6FF" stroke-width="0.8" opacity="0.35"/>
  <line x1="267" y1="85" x2="390" y2="120" stroke="#58A6FF" stroke-width="0.8" opacity="0.35"/>
  <line x1="532" y1="85" x2="420" y2="120" stroke="#58A6FF" stroke-width="0.8" opacity="0.35"/>
  <line x1="697" y1="85" x2="450" y2="120" stroke="#3FB950" stroke-width="0.8" opacity="0.35"/>
  <line x1="175" y1="150" x2="310" y2="148" stroke="#3FB950" stroke-width="0.8" opacity="0.35"/>
  <line x1="625" y1="152" x2="490" y2="148" stroke="#3FB950" stroke-width="0.8" opacity="0.35"/>
  <line x1="92" y1="215" x2="360" y2="175" stroke="#6E40C9" stroke-width="0.8" opacity="0.35"/>
  <line x1="232" y1="215" x2="375" y2="175" stroke="#F0883E" stroke-width="0.8" opacity="0.35"/>
  <line x1="372" y1="215" x2="400" y2="175" stroke="#F0883E" stroke-width="0.8" opacity="0.35"/>
  <line x1="512" y1="215" x2="430" y2="175" stroke="#F0883E" stroke-width="0.8" opacity="0.35"/>
  <line x1="652" y1="215" x2="445" y2="175" stroke="#6E40C9" stroke-width="0.8" opacity="0.35"/>
</svg>
</p>

Mohini is composed of **14 Rust crates** that compile into a single static binary:

| Crate | Purpose |
|-------|---------|
| `mohini-kernel` | Orchestration engine -- workflow scheduling, RBAC, heartbeat, cron, hot-reload |
| `mohini-runtime` | Agent loop, LLM drivers, 53 built-in tools, WASM sandbox, MCP client/server |
| `mohini-types` | Shared types, configuration, errors, manifest signing (Ed25519) |
| `mohini-memory` | SQLite + Qdrant vector memory, usage tracking, JSONL mirroring |
| `mohini-api` | Axum REST/WS/SSE server, 76 endpoints, 14-page SPA dashboard |
| `mohini-channels` | 40 messaging adapters with auth, rate limiting, media handling |
| `mohini-wire` | MMP wire protocol -- TCP P2P with HMAC-SHA256 mutual authentication |
| `mohini-skills` | Skill registry + 104 bundled skills, prompt injection scanning |
| `mohini-hands` | 8 autonomous hands (persistent background workers) |
| `mohini-extensions` | Extension system, AES-256-GCM credential vault, OAuth2 PKCE |
| `mohini-cli` | CLI entry point with daemon auto-detect |
| `mohini-desktop` | Tauri 2.0 native desktop application |
| `mohini-migrate` | Migration engine from other agent frameworks |

### Key Architectural Patterns

- **`KernelHandle` trait** -- Defined in `mohini-runtime`, implemented on `MohiniKernel` in `mohini-kernel`. Avoids circular crate dependencies while enabling inter-agent tools.
- **Capability-based security** -- Every agent operation is checked against granted capabilities before execution.
- **Daemon detection** -- The CLI checks `~/.mohini/daemon.json` and pings the health endpoint. If a daemon is running, commands use HTTP; otherwise, they boot an in-process kernel.
- **Shared memory** -- Cross-agent KV namespace via a fixed UUID for inter-agent state sharing.

---

## Features

<details>
<summary><strong>Core Engine</strong></summary>
<br>

- **14 Rust crates** -- Modular, zero-copy architecture. Each crate compiles independently.
- **104 bundled skills** + 109 community skills across 30 categories. WASM-sandboxed execution.
- **53 built-in tools** -- File I/O, web fetch, shell exec, code analysis, image processing, audio transcription.
- **Dual-backend vector memory** -- SQLite (embedded, zero-config) or Qdrant (production-scale ANN search).
- **2,285+ tests** -- Every commit validated. Zero clippy warnings enforced in CI.

</details>

<details>
<summary><strong>Memory Architecture</strong></summary>
<br>

<p align="center">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 150" width="800" height="150">
  <defs>
    <linearGradient id="memBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0d1117"/>
      <stop offset="100%" style="stop-color:#161b22"/>
    </linearGradient>
    <marker id="memArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#8b949e"/>
    </marker>
  </defs>
  <rect width="800" height="150" rx="12" fill="url(#memBg)"/>
  <!-- Tier 1: Hot Cache -->
  <rect x="40" y="35" width="200" height="80" rx="10" fill="#0d1117" stroke="#F85149" stroke-width="1.5"/>
  <text x="140" y="60" text-anchor="middle" font-family="'SF Pro Display','Inter',sans-serif" font-size="14" font-weight="700" fill="#F85149">Hot Cache</text>
  <text x="140" y="78" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="10" fill="#8b949e">Redis</text>
  <text x="140" y="94" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="9" fill="#6e7681">L1 Context Window</text>
  <text x="140" y="108" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="8" fill="#484f58">Active conversation + compaction</text>
  <!-- Arrow 1 -->
  <line x1="240" y1="65" x2="290" y2="65" stroke="#8b949e" stroke-width="1.2" marker-end="url(#memArrow)"/>
  <text x="265" y="58" text-anchor="middle" font-family="'SF Mono','Fira Code',monospace" font-size="8" fill="#3FB950">boost</text>
  <line x1="290" y1="82" x2="240" y2="82" stroke="#8b949e" stroke-width="1.2" marker-end="url(#memArrow)"/>
  <text x="265" y="96" text-anchor="middle" font-family="'SF Mono','Fira Code',monospace" font-size="8" fill="#58A6FF">recall</text>
  <!-- Tier 2: Vector Store -->
  <rect x="295" y="35" width="210" height="80" rx="10" fill="#0d1117" stroke="#6E40C9" stroke-width="1.5"/>
  <text x="400" y="60" text-anchor="middle" font-family="'SF Pro Display','Inter',sans-serif" font-size="14" font-weight="700" fill="#6E40C9">Vector Store</text>
  <text x="400" y="78" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="10" fill="#8b949e">Qdrant</text>
  <text x="400" y="94" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="9" fill="#6e7681">L2 Semantic Memory</text>
  <text x="400" y="108" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="8" fill="#484f58">Embedding vectors + cosine similarity</text>
  <!-- Arrow 2 -->
  <line x1="505" y1="65" x2="555" y2="65" stroke="#8b949e" stroke-width="1.2" marker-end="url(#memArrow)"/>
  <text x="530" y="58" text-anchor="middle" font-family="'SF Mono','Fira Code',monospace" font-size="8" fill="#F0883E">compact</text>
  <line x1="555" y1="82" x2="505" y2="82" stroke="#8b949e" stroke-width="1.2" marker-end="url(#memArrow)"/>
  <text x="530" y="96" text-anchor="middle" font-family="'SF Mono','Fira Code',monospace" font-size="8" fill="#58A6FF">recall</text>
  <!-- Tier 3: Persistent KB -->
  <rect x="560" y="35" width="200" height="80" rx="10" fill="#0d1117" stroke="#58A6FF" stroke-width="1.5"/>
  <text x="660" y="60" text-anchor="middle" font-family="'SF Pro Display','Inter',sans-serif" font-size="14" font-weight="700" fill="#58A6FF">Persistent KB</text>
  <text x="660" y="78" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="10" fill="#8b949e">SQLite</text>
  <text x="660" y="94" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="9" fill="#6e7681">L3 Long-Term Memory</text>
  <text x="660" y="108" text-anchor="middle" font-family="'SF Pro Text','Inter',sans-serif" font-size="8" fill="#484f58">JSONL mirroring + access boosting</text>
</svg>
</p>

- **L1 Context Window** -- Active conversation with automatic compaction when limits are reached.
- **L2 Semantic Memory** -- Embedding vectors with cosine similarity retrieval via Qdrant.
- **L3 Long-Term Memory** -- Persistent knowledge base in SQLite with JSONL mirroring and access-count boosting.
- **Auto-decay** -- Old memories fade unless frequently accessed. Recalled memories stay fresh.

</details>

<details>
<summary><strong>Shadow Spawning (Multi-Agent Orchestration)</strong></summary>
<br>

- **Fan-out / Fan-in** -- Spawn N sub-agents in parallel, aggregate results when all complete.
- **Chain of Command** -- Hierarchical agent delegation with mission handoff and knowledge base inheritance.
- **Lifecycle management** -- Agents spawn with a mission, execute, report, and self-terminate.
- **MMP Protocol** -- Distributed multi-agent coordination across the network via TCP with HMAC-SHA256 mutual auth.

</details>

<details>
<summary><strong>Autonomous Hands</strong></summary>
<br>

Persistent workers that run independently until their mission completes:

| Hand | Purpose |
|------|---------|
| Researcher | Deep web research with source citations |
| Browser | Headless Chrome automation and scraping |
| Trader | Market data analysis and signal detection |
| Collector | Data aggregation and ETL pipelines |
| Predictor | Time-series forecasting engine |
| Lead-Gen | Sales prospecting and enrichment |
| Clip | Video and audio processing workflows |

</details>

<details>
<summary><strong>Self-Healing</strong></summary>
<br>

- **Process crash** -- systemd restarts within 5 seconds. Sessions reconnect. No message loss.
- **Context overflow** -- Automatic compaction. Conversation continues with summarized history.
- **Model rate limit** -- Transparent fallback to alternate models. Response quality degrades gracefully, never stops.
- **Config change** -- Hot reload without restart. Zero downtime.

</details>

<details>
<summary><strong>WASM Skills</strong></summary>
<br>

Skills execute in a WASM sandbox with fine-grained capability grants. Each skill declares its required permissions in a manifest, and the runtime enforces them at execution time.

- 104 bundled skills + 109 community contributions across 30 categories
- Ed25519 manifest signing for supply chain integrity
- Prompt injection scanning on all skill outputs
- Hot-loadable without process restart

</details>

<details>
<summary><strong>Developer Experience</strong></summary>
<br>

- **Web dashboard** -- Alpine.js SPA at `localhost:4200`. 14 pages. No React bloat.
- **A2UI Canvas** -- Interactive visual canvas for agent output.
- **Voice wake** -- Configurable wake word detection.
- **Media pipeline** -- MIME detection, image optimization (WebP), audio transcription (Whisper).
- **OpenAI-compatible API** -- Drop-in `/v1/chat/completions` endpoint.

</details>

---

## Channel Adapters

Mohini ships with 40 channel adapters for real-time bidirectional messaging:

| Category | Channels |
|----------|----------|
| **Messaging** | WhatsApp, Telegram, Signal, iMessage, Facebook Messenger, Viber, LINE, WeChat |
| **Team Chat** | Discord, Slack, Microsoft Teams, Google Chat, Mattermost, Rocket.Chat, Zulip |
| **Social** | X (Twitter), Reddit, LinkedIn, Instagram, Mastodon, Bluesky |
| **Email** | SMTP/IMAP, Gmail, Outlook |
| **Developer** | Matrix, IRC, GitHub, GitLab |
| **Voice** | Twilio, Vonage |
| **Web** | WebSocket gateway, REST webhook, SSE |
| **Custom** | Bring your own adapter via the `ChannelAdapter` trait |

Each adapter handles authentication, rate limiting, message formatting, and media attachments natively.

---

## Model Integrations

Mohini's model catalog supports 188 models across all major providers:

| Provider | Models |
|----------|--------|
| **Anthropic** | Claude Opus 4.6, Claude Sonnet 4.5, Claude Haiku 4 |
| **OpenAI** | GPT-4o, o1, o3, GPT-4 Turbo |
| **Google** | Gemini 3 Pro, Gemini 2 Flash, Gemini 2 Pro |
| **Meta** | Llama 3.3 70B, Llama 3.1 405B |
| **Mistral** | Mistral Large, Mixtral 8x22B, Codestral |
| **NVIDIA NIM** | Nemotron, community models |
| **Groq** | Ultra-fast inference for Llama, Mixtral |
| **Local** | Ollama, vLLM, LM Studio, llama.cpp |

Multi-model routing with automatic fallback. If your primary model rate-limits, Mohini transparently switches to the next available provider.

---

## Configuration

Mohini is configured via `mohini.toml`:

```toml
[runtime]
default_model = "anthropic/claude-opus-4-6"
fallback_model = "groq/llama-3.3-70b-versatile"
thinking = "low"
max_agents = 100

[memory]
backend = "sqlite"
decay_rate = 0.95
embedding_model = "sentence-transformers/all-MiniLM-L6-v2"

[channels]
whatsapp = { enabled = true, phone = "+1234567890" }
telegram = { enabled = true, token = "..." }
discord  = { enabled = true, token = "..." }

[hands]
researcher = { enabled = true, max_concurrent = 5 }
browser    = { enabled = true, headless = true }
```

See `mohini.toml.example` for the full reference.

---

## Production Deployment

### systemd

```ini
[Unit]
Description=Mohini Agent OS
After=network.target

[Service]
Type=simple
User=mohini
WorkingDirectory=/opt/mohini
ExecStart=/opt/mohini/bin/mohini
Restart=always
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mohini
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: mohini
        image: darshjme/mohini:latest
        env:
        - name: MOHINI_CONFIG
          value: /config/mohini.toml
        volumeMounts:
        - name: config
          mountPath: /config
```

Rolling updates. Self-healing restarts. Zero-downtime deployments.

---

## Philosophy

> Ship fast. Build systems that survive without you.

Mohini is built on a small number of principles held without compromise:

**Competence over ceremony.** No aspirational documentation. No performative commit messages. Production-grade code, zero-downtime deployments, and self-healing infrastructure. That is how quality is demonstrated.

**The chat never stops.** Context limits trigger compaction. Rate limits trigger fallback models. Server crashes trigger restarts. Nothing kills the conversation.

**Write everything down.** Memory does not survive restarts. Files do. Every decision, every lesson, every failure is documented and persistent.

**Parallel execution.** Ten sub-agents in parallel beats one agent running sequentially. If a human does it in a week, Mohini does it in an hour.

---

## Contributing

```bash
git clone https://github.com/darshjme/mohini.git
cd mohini

# Build
cargo build --workspace

# Test (2,285+ tests must pass)
cargo test --workspace

# Lint (zero warnings enforced)
cargo clippy --workspace --all-targets -- -D warnings

# Format
cargo fmt --all
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide, including how to add new channel adapters, tools, and agent templates.

---

## Roadmap

- [x] v0.1 -- Core agent runtime + 40 channels
- [x] v0.2 -- Vector memory + skill system
- [x] v0.3 -- Autonomous Hands + MMP protocol
- [ ] v0.4 -- Mobile app (iOS / Android) + voice mode
- [ ] v0.5 -- Multi-tenant SaaS mode
- [ ] v1.0 -- Production-hardened release

---

## License

Dual-licensed under your choice of:

- [Apache License, Version 2.0](LICENSE-APACHE)
- [MIT License](LICENSE-MIT)

---

<p align="center">
  <sub>Built by <a href="https://darshj.me">Darshankumar Joshi</a></sub>
</p>
