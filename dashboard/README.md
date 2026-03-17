# Mohini — Agent OS Dashboard 🪷

A production-grade React dashboard for the Mohini Agent OS. Built on the WorldNIC admin template with custom Mohini branding and AI-specific pages.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file in the dashboard root:

```env
VITE_MOHINI_API_URL=http://localhost:18789/api
VITE_MOHINI_WS_URL=ws://localhost:18789/ws
```

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_MOHINI_API_URL` | `http://localhost:18789/api` | Mohini backend REST API |
| `VITE_MOHINI_WS_URL` | `ws://localhost:18789/ws` | WebSocket for real-time updates |

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/dashboard` | System overview with key metrics |
| Shadow Army | `/agent-orchestration` | Spawn, monitor, steer, kill sub-agents |
| Memory | `/memory-explorer` | Vector DB browser with semantic search |
| Skills | `/skill-registry` | 104 skills catalog with execution |
| Hands | `/hands-monitor` | 8 autonomous worker status |
| Channels | `/channel-hub` | 40 channel adapter management |

## Tech Stack

- **React 19** + **Vite 6**
- **React Bootstrap** for UI components
- **React Router 7** for routing
- **Redux** for state management
- **Recharts** for data visualization
- **SCSS** + custom Mohini CSS theme

## Branding

| Token | Value | Usage |
|-------|-------|-------|
| Mohini Blue | `#4A90D9` | Primary actions, links |
| Divine Gold | `#D4A843` | Highlights, active states |
| Lotus Pink | `#E8729A` | Accents, notifications |
| Dark BG | `#0D1117` | Background |

Theme overrides: `src/assets/css/mohini-theme.css`

## API Integration

API client: `src/api/mohini-api.js`

Currently uses placeholder data. To connect to a real backend:

1. Set `VITE_MOHINI_API_URL` to your Mohini backend
2. The API client handles auth tokens via `localStorage.mohini_token`
3. WebSocket auto-reconnects on disconnect

## Production Build

```bash
npm run build
# Output: dist/
```

Deploy `dist/` to any static hosting (Nginx, Caddy, Vercel, etc.).

## Development

```bash
npm run dev      # Start dev server (hot reload)
npm run sass     # Watch SCSS changes
npm run lint     # Run ESLint
```

## License

MIT — Part of the Mohini Agent OS project.
