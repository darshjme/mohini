# Mohini Dashboard — Architecture & Integration Guide 🪷

## Architecture Overview

```
dashboard/
├── src/
│   ├── api/
│   │   └── mohini-api.js          # Singleton API client (REST + WebSocket)
│   ├── assets/
│   │   ├── css/
│   │   │   └── mohini-theme.css   # Custom dark theme overrides
│   │   ├── images/                # Icons, logos
│   │   └── scss/                  # Base SCSS from WorldNIC
│   ├── context/
│   │   └── ThemeContext.jsx       # Theme state (dark mode, sidebar, etc.)
│   ├── jsx/
│   │   ├── layouts/
│   │   │   ├── nav/
│   │   │   │   ├── Menu.jsx       # Sidebar menu definition (customized)
│   │   │   │   └── NavHader.jsx   # Top nav header
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── AgentOrchestration.jsx   # Shadow army command center
│   │   │   ├── MemoryExplorer.jsx       # Vector memory browser
│   │   │   ├── SkillRegistry.jsx        # 104 skills catalog
│   │   │   ├── HandsMonitor.jsx         # Autonomous hands status
│   │   │   ├── ChannelHub.jsx           # 40 channel adapters
│   │   │   └── dashboard/               # Original dashboard pages
│   │   └── route/
│   │       └── index.jsx          # All routes (original + Mohini)
│   ├── store/                     # Redux store, actions, reducers
│   └── main.jsx                   # Entry point (imports mohini-theme.css)
├── index.html                     # Branded title + dark mode defaults
├── package.json                   # name: mohini-dashboard
├── vite.config.js
└── README.md
```

## API Integration

### REST Endpoints

The `mohini-api.js` client expects these backend endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/agents` | List all active agents |
| POST | `/api/agents/spawn` | Spawn a new sub-agent |
| DELETE | `/api/agents/:id` | Kill an agent |
| POST | `/api/agents/:id/steer` | Send steering message |
| GET | `/api/memory` | List memories (query + pagination) |
| POST | `/api/memory/search` | Semantic vector search |
| POST | `/api/memory` | Store new memory |
| GET | `/api/skills` | List all skills |
| POST | `/api/skills/:name/execute` | Execute a skill |
| GET | `/api/channels` | List channel adapters |
| PUT | `/api/channels/:id` | Toggle channel on/off |
| GET | `/api/hands` | List autonomous hands |
| POST | `/api/hands/:name/trigger` | Trigger a hand |
| GET | `/api/system/health` | System health metrics |

### WebSocket Events

Connect to `ws://host:18789/ws` for real-time updates:

| Event | Payload | Description |
|-------|---------|-------------|
| `agent.spawned` | `{ id, name, model }` | New agent created |
| `agent.completed` | `{ id, result }` | Agent finished task |
| `agent.error` | `{ id, error }` | Agent encountered error |
| `memory.stored` | `{ id, text, category }` | New memory saved |
| `hand.phase_change` | `{ name, phase }` | Hand moved to next phase |
| `channel.status` | `{ id, status }` | Channel connect/disconnect |
| `system.metrics` | `{ cpu, ram, disk }` | System health update |

### Authentication

```js
// Set token after login
localStorage.setItem('mohini_token', 'your-jwt-token');

// API client automatically includes it in Authorization header
```

## Component Structure

### Custom Pages

Each Mohini page follows this pattern:

1. **Mock data** at the top (replace with API calls later)
2. **Stats cards** row showing key metrics
3. **Main content** (table, grid, or cards)
4. **Actions** (spawn, search, filter, trigger)

### Connecting to Real Backend

Replace mock data with API calls:

```jsx
// Before (mock)
const [agents, setAgents] = useState(MOCK_AGENTS);

// After (real)
const [agents, setAgents] = useState([]);
useEffect(() => {
  mohiniAPI.getAgents().then(setAgents).catch(console.error);
}, []);
```

## Customization

### Adding New Pages

1. Create `src/jsx/pages/YourPage.jsx`
2. Import in `src/jsx/route/index.jsx`
3. Add route entry to the `menu` array
4. Add sidebar entry in `src/jsx/layouts/nav/Menu.jsx`

### Modifying Theme

Edit `src/assets/css/mohini-theme.css` for color overrides.
CSS variables are defined in `:root` — change there for global effect.

### Adding API Endpoints

Extend `src/api/mohini-api.js` with new methods following the existing pattern.

## Build & Deploy

```bash
# Development
npm run dev          # http://localhost:5173

# Production
npm run build        # Outputs to dist/
npm run preview      # Preview production build

# Deploy dist/ to:
# - Nginx (serve static files)
# - Caddy (reverse proxy)
# - Vercel/Netlify (drag & drop)
# - Docker (nginx:alpine + COPY dist/)
```
