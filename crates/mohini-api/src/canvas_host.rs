//! A2UI canvas hosting for the Mohini Agent OS.
//!
//! Serves the interactive canvas framework at `GET /__mohini__/a2ui`,
//! manages active canvas sessions, and defines bridge message types
//! for iOS/Android WebKit message handlers.
//!
//! Ported from OpenClaw's `a2ui.ts` and `canvas-host/server.ts`.

use axum::{
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;
use uuid::Uuid;

// ---------------------------------------------------------------------------
// Route path constants
// ---------------------------------------------------------------------------

/// HTTP path for the A2UI canvas endpoint.
pub const A2UI_PATH: &str = "/__mohini__/a2ui";

/// HTTP path for the canvas host file server.
pub const CANVAS_HOST_PATH: &str = "/__mohini__/canvas";

/// WebSocket path for canvas live-reload.
pub const CANVAS_WS_PATH: &str = "/__mohini__/ws";

// ---------------------------------------------------------------------------
// Canvas commands
// ---------------------------------------------------------------------------

/// Commands that can be sent to an active canvas session.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum CanvasCommand {
    /// Push new HTML/content to the canvas.
    Push {
        /// Unique command id.
        id: String,
        /// HTML or text content to render.
        content: String,
    },
    /// Evaluate JavaScript in the canvas context.
    Eval {
        /// Unique command id.
        id: String,
        /// JavaScript source to execute.
        script: String,
    },
    /// Request a snapshot of the current canvas state.
    Snapshot {
        /// Unique command id.
        id: String,
    },
}

impl CanvasCommand {
    /// Return the command id.
    pub fn id(&self) -> &str {
        match self {
            Self::Push { id, .. } => id,
            Self::Eval { id, .. } => id,
            Self::Snapshot { id } => id,
        }
    }
}

// ---------------------------------------------------------------------------
// Bridge message types (iOS / Android WebKit messageHandlers)
// ---------------------------------------------------------------------------

/// Action sent from the native bridge (webkit messageHandler or Android JS interface).
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct BridgeUserAction {
    /// Unique action id.
    pub id: String,
    /// Action name (e.g. "hello", "photo").
    pub name: String,
    /// Originating surface id.
    #[serde(default)]
    pub surface_id: Option<String>,
    /// Source component identifier.
    #[serde(default)]
    pub source_component_id: Option<String>,
    /// Free-form context payload.
    #[serde(default)]
    pub context: Option<serde_json::Value>,
}

/// Status feedback sent back to the canvas after processing an action.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct BridgeActionStatus {
    /// Original action id.
    pub id: String,
    /// Whether the action succeeded.
    pub ok: bool,
    /// Optional error message.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub error: Option<String>,
}

/// Envelope for messages flowing through the native bridge.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum BridgeMessage {
    /// A user action from the canvas.
    UserAction(BridgeUserAction),
    /// Status feedback for a previous action.
    ActionStatus(BridgeActionStatus),
    /// A canvas command forwarded to the webview.
    Command(CanvasCommand),
}

// ---------------------------------------------------------------------------
// Canvas session state
// ---------------------------------------------------------------------------

/// Metadata for a single active canvas session.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CanvasSession {
    /// Unique session id.
    pub id: String,
    /// When the session was created.
    pub created_at: DateTime<Utc>,
    /// Whether live-reload is enabled for this session.
    pub live_reload: bool,
    /// Number of commands sent in this session.
    pub command_count: u64,
}

/// Thread-safe store of active canvas sessions.
#[derive(Debug, Clone)]
pub struct CanvasState {
    sessions: Arc<RwLock<HashMap<String, CanvasSession>>>,
}

impl Default for CanvasState {
    fn default() -> Self {
        Self::new()
    }
}

impl CanvasState {
    /// Create an empty canvas state.
    pub fn new() -> Self {
        Self {
            sessions: Arc::new(RwLock::new(HashMap::new())),
        }
    }

    /// Create a new session and return its id.
    pub async fn create_session(&self, live_reload: bool) -> String {
        let id = Uuid::new_v4().to_string();
        let session = CanvasSession {
            id: id.clone(),
            created_at: Utc::now(),
            live_reload,
            command_count: 0,
        };
        self.sessions.write().await.insert(id.clone(), session);
        id
    }

    /// Get a snapshot of a session by id.
    pub async fn get_session(&self, id: &str) -> Option<CanvasSession> {
        self.sessions.read().await.get(id).cloned()
    }

    /// List all active sessions.
    pub async fn list_sessions(&self) -> Vec<CanvasSession> {
        self.sessions.read().await.values().cloned().collect()
    }

    /// Remove a session.
    pub async fn remove_session(&self, id: &str) -> Option<CanvasSession> {
        self.sessions.write().await.remove(id)
    }

    /// Increment the command counter for a session.
    pub async fn record_command(&self, session_id: &str) {
        if let Some(session) = self.sessions.write().await.get_mut(session_id) {
            session.command_count += 1;
        }
    }
}

// ---------------------------------------------------------------------------
// Live-reload injection
// ---------------------------------------------------------------------------

/// The JavaScript bridge + WebSocket live-reload snippet injected before `</body>`.
const LIVE_RELOAD_SNIPPET: &str = r#"<script>
(() => {
  const actionHandlerName = "mohiniCanvasA2UIAction";
  function postToHost(payload) {
    try {
      const raw = typeof payload === "string" ? payload : JSON.stringify(payload);
      const iosHandler = globalThis.webkit?.messageHandlers?.[actionHandlerName];
      if (iosHandler && typeof iosHandler.postMessage === "function") {
        iosHandler.postMessage(raw);
        return true;
      }
      const androidHandler = globalThis[actionHandlerName];
      if (androidHandler && typeof androidHandler.postMessage === "function") {
        androidHandler.postMessage(raw);
        return true;
      }
    } catch {}
    return false;
  }
  function sendUserAction(userAction) {
    const id = (userAction && typeof userAction.id === "string" && userAction.id.trim())
      || (globalThis.crypto?.randomUUID?.() ?? String(Date.now()));
    const action = { ...userAction, id };
    return postToHost({ userAction: action });
  }
  globalThis.Mohini = globalThis.Mohini ?? {};
  globalThis.Mohini.postMessage = postToHost;
  globalThis.Mohini.sendUserAction = sendUserAction;

  try {
    const proto = location.protocol === "https:" ? "wss" : "ws";
    const ws = new WebSocket(proto + "://" + location.host + "/__mohini__/ws");
    ws.onmessage = (ev) => {
      if (String(ev.data || "") === "reload") location.reload();
    };
  } catch {}
})();
</script>"#;

/// Inject the live-reload / bridge snippet into an HTML page.
pub fn inject_canvas_live_reload(html: &str) -> String {
    let lower = html.to_lowercase();
    if let Some(idx) = lower.rfind("</body>") {
        let mut out = String::with_capacity(html.len() + LIVE_RELOAD_SNIPPET.len() + 2);
        out.push_str(&html[..idx]);
        out.push('\n');
        out.push_str(LIVE_RELOAD_SNIPPET);
        out.push('\n');
        out.push_str(&html[idx..]);
        out
    } else {
        format!("{html}\n{LIVE_RELOAD_SNIPPET}\n")
    }
}

// ---------------------------------------------------------------------------
// Default canvas HTML
// ---------------------------------------------------------------------------

/// Minimal default canvas HTML page.
fn default_canvas_html() -> &'static str {
    r#"<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Mohini Canvas</title>
<style>
  html, body { height: 100%; margin: 0; background: #111; color: #eee;
    font: 16px/1.5 system-ui, -apple-system, sans-serif; }
  .wrap { min-height: 100%; display: grid; place-items: center; padding: 24px; }
  .card { max-width: 640px; width: 100%; background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10); border-radius: 16px; padding: 24px; }
  h1 { margin: 0 0 8px; font-size: 22px; }
  .sub { opacity: 0.7; font-size: 13px; }
</style>
</head>
<body>
<div class="wrap">
  <div class="card">
    <h1>Mohini Canvas</h1>
    <p class="sub">A2UI interactive canvas — live reload enabled.</p>
  </div>
</div>
</body>
</html>"#
}

// ---------------------------------------------------------------------------
// Axum handler
// ---------------------------------------------------------------------------

/// Axum handler for `GET /__mohini__/a2ui`.
///
/// Serves the default canvas HTML with the live-reload bridge injected.
pub async fn handle_a2ui(
    State(state): State<Arc<CanvasState>>,
) -> Response {
    // Ensure there is at least one session.
    let sessions = state.list_sessions().await;
    if sessions.is_empty() {
        let _id = state.create_session(true).await;
    }

    let html = inject_canvas_live_reload(default_canvas_html());
    (
        StatusCode::OK,
        [
            ("content-type", "text/html; charset=utf-8"),
            ("cache-control", "no-store"),
        ],
        html,
    )
        .into_response()
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_canvas_command_serialization() {
        let push = CanvasCommand::Push {
            id: "c1".into(),
            content: "<h1>Hello</h1>".into(),
        };
        let json = serde_json::to_string(&push).unwrap();
        assert!(json.contains(r#""type":"push""#));
        let parsed: CanvasCommand = serde_json::from_str(&json).unwrap();
        assert_eq!(parsed, push);
    }

    #[test]
    fn test_eval_command_roundtrip() {
        let eval_cmd = CanvasCommand::Eval {
            id: "e1".into(),
            script: "console.log('hi')".into(),
        };
        let json = serde_json::to_string(&eval_cmd).unwrap();
        let parsed: CanvasCommand = serde_json::from_str(&json).unwrap();
        assert_eq!(parsed, eval_cmd);
    }

    #[test]
    fn test_snapshot_command_roundtrip() {
        let snap = CanvasCommand::Snapshot {
            id: "s1".into(),
        };
        let json = serde_json::to_string(&snap).unwrap();
        let parsed: CanvasCommand = serde_json::from_str(&json).unwrap();
        assert_eq!(parsed, snap);
    }

    #[test]
    fn test_bridge_user_action_serialization() {
        let action = BridgeUserAction {
            id: "a1".into(),
            name: "hello".into(),
            surface_id: Some("main".into()),
            source_component_id: None,
            context: Some(serde_json::json!({"t": 123})),
        };
        let json = serde_json::to_string(&action).unwrap();
        let parsed: BridgeUserAction = serde_json::from_str(&json).unwrap();
        assert_eq!(parsed, action);
    }

    #[test]
    fn test_bridge_message_variants() {
        let msg = BridgeMessage::ActionStatus(BridgeActionStatus {
            id: "x".into(),
            ok: true,
            error: None,
        });
        let json = serde_json::to_string(&msg).unwrap();
        assert!(json.contains(r#""type":"action_status""#));
        let parsed: BridgeMessage = serde_json::from_str(&json).unwrap();
        assert_eq!(parsed, msg);
    }

    #[test]
    fn test_inject_live_reload_before_body() {
        let html = "<html><body><p>hi</p></body></html>";
        let result = inject_canvas_live_reload(html);
        assert!(result.contains("mohiniCanvasA2UIAction"));
        assert!(result.contains("</body>"));
        // The snippet should appear before </body>
        let snippet_pos = result.find("mohiniCanvasA2UIAction").unwrap();
        let body_pos = result.rfind("</body>").unwrap();
        assert!(snippet_pos < body_pos);
    }

    #[test]
    fn test_inject_live_reload_no_body_tag() {
        let html = "<p>fragment</p>";
        let result = inject_canvas_live_reload(html);
        assert!(result.contains("mohiniCanvasA2UIAction"));
        assert!(result.starts_with("<p>fragment</p>"));
    }

    #[tokio::test]
    async fn test_canvas_state_crud() {
        let state = CanvasState::new();
        assert!(state.list_sessions().await.is_empty());

        let id = state.create_session(true).await;
        assert!(state.get_session(&id).await.is_some());
        assert_eq!(state.list_sessions().await.len(), 1);

        state.record_command(&id).await;
        let s = state.get_session(&id).await.unwrap();
        assert_eq!(s.command_count, 1);

        state.remove_session(&id).await;
        assert!(state.list_sessions().await.is_empty());
    }

    #[test]
    fn test_command_id_accessor() {
        let cmd = CanvasCommand::Push {
            id: "test-id".into(),
            content: String::new(),
        };
        assert_eq!(cmd.id(), "test-id");
    }
}
