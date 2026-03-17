# 📸 Screenshots Guide

Instructions for capturing screenshots to showcase Mohini in the README and docs.

## What to Capture

### 1. Terminal Demos
| Screenshot | Description | Filename |
|-----------|-------------|----------|
| Agent spawn | Output of `01-spawn-agent.sh` | `screenshots/demo-spawn.png` |
| Shadow army | Output of `02-multi-agent.sh` | `screenshots/demo-army.png` |
| Memory recall | Output of `03-memory-recall.sh` | `screenshots/demo-memory.png` |
| Self-healing | Output of `05-self-healing.sh` | `screenshots/demo-healing.png` |

### 2. Dashboard
| Screenshot | Description | Filename |
|-----------|-------------|----------|
| Main dashboard | OpenClaw dashboard overview | `screenshots/dashboard-main.png` |
| Agent list | Active/completed sub-agents | `screenshots/dashboard-agents.png` |
| Memory view | Memory files and vector DB | `screenshots/dashboard-memory.png` |

### 3. Architecture
| Screenshot | Description | Filename |
|-----------|-------------|----------|
| System diagram | Full architecture overview | `screenshots/architecture.png` |
| n8n workflow | Workflow editor with Mohini nodes | `screenshots/n8n-workflow.png` |

## Where to Save

All screenshots go in: `public/screenshots/`

```bash
mkdir -p public/screenshots
```

## How to Capture

### Terminal Screenshots (Recommended: Clean Look)

**Option A — asciinema + svg-term (best quality):**
```bash
# Record
asciinema rec /tmp/demo.cast -c "bash demos/01-spawn-agent.sh"

# Convert to SVG (clean, scalable)
npx svg-term-cli --in /tmp/demo.cast --out public/screenshots/demo-spawn.svg \
  --window --padding 20 --width 80 --height 24
```

**Option B — Manual screenshot:**
1. Set terminal to dark theme (Dracula, One Dark, or similar)
2. Font: JetBrains Mono or Fira Code, 14pt
3. Window size: 80×24 characters minimum
4. Run the demo script
5. Screenshot with: `Cmd+Shift+4` (macOS) or `gnome-screenshot -a` (Linux)
6. Crop to terminal window only (no desktop background)

**Option C — iTerm2 (macOS):**
1. Shell → Export Text as → Save as PNG

### Dashboard Screenshots
1. Open `http://localhost:18790` in browser
2. Use browser DevTools → Device toolbar → set to 1280×800
3. Screenshot with `Cmd+Shift+S` (full page) or browser extension

### Tips for Clean Screenshots
- **Dark terminal theme** — looks professional in README
- **No personal data visible** — redact paths, keys, usernames if needed
- **Consistent sizing** — all terminal screenshots same dimensions
- **Retina/2x** — capture at 2x resolution for crisp display
- **Add subtle shadow** — use ImageMagick: `convert input.png \( +clone -background black -shadow 60x10+0+5 \) +swap -background none -layers merge output.png`

## Using in README

```markdown
## Demo

![Agent Spawn](public/screenshots/demo-spawn.png)

![Shadow Army in Action](public/screenshots/demo-army.png)
```

Or with clickable GIFs (from asciinema recordings):
```markdown
[![Demo](public/screenshots/demo-spawn.svg)](https://asciinema.org/a/YOUR_ID)
```
