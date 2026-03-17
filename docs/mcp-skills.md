# Model Context Protocol (MCP) Skills

## Overview

MCP is the protocol Mohini uses to extend her capabilities through modular, discoverable tool servers. Each MCP server exposes a set of tools that Mohini can invoke at runtime — file operations, system control, browser automation, custom integrations.

## How Mohini Uses MCP

```
┌─────────────────────┐
│     Mohini (LLM)     │
│   Claude Opus 4.6    │
└──────────┬──────────┘
           │ MCP Protocol (JSON-RPC over stdio)
           ▼
┌─────────────────────────────────────────┐
│          OpenClaw Gateway                │
│   Routes tool calls to MCP servers       │
├──────────┬──────────┬───────────────────┤
│ system-  │ chrome-  │  custom servers   │
│ control  │ control  │  (user-created)   │
└──────────┴──────────┴───────────────────┘
```

### Lifecycle

1. **Discovery** — On gateway start, OpenClaw reads `openclaw.json` → `plugins.entries` and `~/.config/openclaw/mcp-servers.json` to find registered MCP servers.
2. **Initialization** — Each server is spawned as a child process. The gateway sends `initialize` → server responds with capabilities and tool list.
3. **Tool Listing** — Tools are merged into Mohini's available tool set. She sees them alongside native tools.
4. **Invocation** — When Mohini calls a tool, the gateway routes the JSON-RPC `tools/call` request to the correct server.
5. **Response** — Server returns structured result. Gateway passes it back to Mohini.

## Skill Discovery

### Registered Servers

MCP servers are registered in two locations:

**1. `openclaw.json` (plugin entries)**
```json
{
  "plugins": {
    "entries": [
      {
        "type": "mcp",
        "name": "system-control",
        "command": "node",
        "args": ["/root/openclaw/workspace/mcp-servers/system-control/server.js"],
        "env": {}
      }
    ]
  }
}
```

**2. `~/.config/openclaw/mcp-servers.json`**
```json
{
  "system-control": {
    "command": "node",
    "args": ["/root/openclaw/workspace/mcp-servers/system-control/server.js"]
  }
}
```

### Auto-Discovery Pattern

Mohini can discover new skills by scanning directories:

```bash
# List all MCP servers
ls /root/openclaw/workspace/mcp-servers/

# Each server has:
# ├── server.js (or index.js)
# ├── package.json
# └── README.md (optional)
```

## Skill Execution

### Tool Call Flow

```
Mohini decides to use shell_exec
  → Gateway receives tool call
    → Routes to system-control MCP server
      → Server executes shell command
        → Returns stdout/stderr/exit code
          → Gateway returns to Mohini
            → Mohini processes result
```

### Example: Creating a New MCP Server

```javascript
// /root/openclaw/workspace/mcp-servers/my-tool/server.js
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-tool",
  version: "1.0.0",
});

server.tool(
  "my_custom_tool",
  "Description of what this tool does",
  {
    input: z.string().describe("Input parameter"),
  },
  async ({ input }) => {
    // Tool logic here
    return {
      content: [{ type: "text", text: `Result: ${input}` }],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
```

### Deployment Steps

1. Create server directory: `mkdir /root/openclaw/workspace/mcp-servers/<name>/`
2. Write `server.js` using `@modelcontextprotocol/sdk`
3. Run `npm init -y && npm install @modelcontextprotocol/sdk zod`
4. Register in `openclaw.json` under `plugins.entries`
5. Restart gateway: `openclaw gateway restart`

## Available MCP Servers

### system-control (Core)
**Path:** `/root/openclaw/workspace/mcp-servers/system-control/server.js`

Provides full system access:
- `shell_exec` / `shell_spawn` — Run commands
- `fs_read` / `fs_write` / `fs_edit` — File operations
- `fs_grep` / `fs_list` — Search and browse
- `process_list` / `process_kill` — Process management
- `claude_code` / `claude_code_interactive` — Invoke Claude Code
- `mcp_create_server` / `mcp_list_servers` — Self-extension
- `system_info` — CPU, RAM, disk, network stats
- `git` — Version control
- `cron_manage` — Scheduled tasks

## Security Sandbox

### Principles

1. **Process isolation** — Each MCP server runs as a separate process. Crash isolation is automatic.
2. **Capability scoping** — Servers only expose tools they're designed for. A "weather" server can't access the filesystem.
3. **No network by default** — Custom servers should not make outbound network calls unless explicitly designed for it.
4. **Credential separation** — API keys are passed via environment variables, not hardcoded. Each server gets only the credentials it needs.
5. **Audit trail** — All tool invocations are logged by the gateway with timestamps, inputs, and outputs.

### Security Checklist for New Servers

- [ ] Input validation on all parameters (use Zod schemas)
- [ ] No `eval()` or dynamic code execution on user input
- [ ] File operations scoped to allowed directories
- [ ] Network requests only to whitelisted domains
- [ ] Sensitive data never logged or returned in error messages
- [ ] Graceful error handling (no stack traces to client)

### Resource Limits

```bash
# Run MCP servers with resource limits (systemd)
[Service]
MemoryMax=512M
CPUQuota=50%
TimeoutStartSec=10
```

## Creating Custom Skills

### Skill Template

```bash
# Quick scaffold
mkdir -p /root/openclaw/workspace/mcp-servers/my-skill
cd /root/openclaw/workspace/mcp-servers/my-skill
npm init -y
npm install @modelcontextprotocol/sdk zod
```

### Conventions

- **Naming:** `kebab-case` for directory, `snake_case` for tool names
- **Description:** Every tool must have a clear, concise description
- **Parameters:** Use Zod schemas with `.describe()` on every field
- **Errors:** Return structured error messages, never throw unhandled exceptions
- **Idempotency:** Tools should be safe to retry

### Testing

```bash
# Test MCP server directly
echo '{"jsonrpc":"2.0","method":"tools/list","id":1}' | node server.js
```
