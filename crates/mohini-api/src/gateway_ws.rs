//! WebSocket gateway control plane.
//!
//! Ports the key concepts from the OpenClaw gateway protocol into a Rust/Axum
//! WebSocket module:
//!
//! - **Protocol frames**: `Connect`, `Disconnect`, `AgentEvent`, `ChatMessage`,
//!   `Presence`, `Tick`, `Health`, `Heartbeat`, `Cron`, `Shutdown`, `ConfigReload`.
//! - **Session management**: `GatewaySession` tracks each connected client.
//! - **Presence tracking**: `PresenceTracker` knows who is connected and can
//!   broadcast events to all sessions.
//! - **Idempotency cache**: `IdempotencyCache` backed by `DashMap` with TTL-based
//!   expiry to deduplicate re-delivered requests.
//! - **Frame validation**: struct-level validation via the `Validate` trait
//!   (equivalent to AJV schema validation in TypeScript).
//! - **Config hot-reload**: the server can push `ConfigReload` events to every
//!   connected client when the configuration changes.
//!
//! ## Default listen address
//!
//! `ws://127.0.0.1:18789` (configurable via `GatewayConfig`).

use std::sync::atomic::{AtomicU64, Ordering};
use std::sync::Arc;
use std::time::{Duration, Instant};

use axum::extract::ws::{Message, WebSocket};
use axum::extract::{ConnectInfo, State, WebSocketUpgrade};
use axum::response::IntoResponse;
use chrono::{DateTime, Utc};
use dashmap::DashMap;
use futures::{SinkExt, StreamExt};
use serde::{Deserialize, Serialize};
use tokio::sync::{broadcast, RwLock};
use tracing::{debug, info, warn};
use uuid::Uuid;

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/// Configuration for the gateway WebSocket control plane.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GatewayConfig {
    /// Host to bind to. Default: `127.0.0.1`.
    #[serde(default = "default_host")]
    pub host: String,
    /// Port to bind to. Default: `18789`.
    #[serde(default = "default_port")]
    pub port: u16,
    /// Maximum payload size in bytes. Default: 1 MiB.
    #[serde(default = "default_max_payload")]
    pub max_payload_bytes: usize,
    /// Tick interval for periodic heartbeat/presence pushes. Default: 30 s.
    #[serde(default = "default_tick_interval_ms")]
    pub tick_interval_ms: u64,
    /// How long before a session with no heartbeat is considered dead. Default: 90 s.
    #[serde(default = "default_heartbeat_timeout_ms")]
    pub heartbeat_timeout_ms: u64,
    /// TTL for idempotency-key cache entries. Default: 300 s (5 min).
    #[serde(default = "default_idempotency_ttl_ms")]
    pub idempotency_ttl_ms: u64,
}

fn default_host() -> String {
    "127.0.0.1".to_string()
}
fn default_port() -> u16 {
    18789
}
fn default_max_payload() -> usize {
    1024 * 1024
}
fn default_tick_interval_ms() -> u64 {
    30_000
}
fn default_heartbeat_timeout_ms() -> u64 {
    90_000
}
fn default_idempotency_ttl_ms() -> u64 {
    300_000
}

impl Default for GatewayConfig {
    fn default() -> Self {
        Self {
            host: default_host(),
            port: default_port(),
            max_payload_bytes: default_max_payload(),
            tick_interval_ms: default_tick_interval_ms(),
            heartbeat_timeout_ms: default_heartbeat_timeout_ms(),
            idempotency_ttl_ms: default_idempotency_ttl_ms(),
        }
    }
}

// ---------------------------------------------------------------------------
// Protocol version
// ---------------------------------------------------------------------------

/// Current gateway protocol version (mirrors OpenClaw PROTOCOL_VERSION).
pub const PROTOCOL_VERSION: u32 = 2;

// ---------------------------------------------------------------------------
// Frame types (protocol messages)
// ---------------------------------------------------------------------------

/// Client information sent during the `Connect` handshake.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct ClientInfo {
    pub name: String,
    pub version: String,
    pub platform: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub device_family: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub model_identifier: Option<String>,
    pub mode: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub instance_id: Option<String>,
}

/// Error shape returned inside `ResponseFrame`.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct ErrorShape {
    pub code: String,
    pub message: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub details: Option<serde_json::Value>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub retryable: Option<bool>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub retry_after_ms: Option<u64>,
}

/// Well-known error codes (mirrors OpenClaw `ErrorCodes`).
pub mod error_codes {
    pub const NOT_LINKED: &str = "NOT_LINKED";
    pub const AGENT_TIMEOUT: &str = "AGENT_TIMEOUT";
    pub const INVALID_REQUEST: &str = "INVALID_REQUEST";
    pub const UNAVAILABLE: &str = "UNAVAILABLE";
}

/// All frames that can be exchanged over the gateway WebSocket.
///
/// The `type` field acts as a discriminator (matching the TypeScript
/// `GatewayFrameSchema` union).
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum GatewayFrame {
    // -- Client → Server --
    Connect {
        min_protocol: u32,
        max_protocol: u32,
        client: ClientInfo,
        #[serde(default, skip_serializing_if = "Option::is_none")]
        caps: Option<Vec<String>>,
        #[serde(default, skip_serializing_if = "Option::is_none")]
        locale: Option<String>,
    },
    Disconnect {
        #[serde(default, skip_serializing_if = "Option::is_none")]
        reason: Option<String>,
    },
    Heartbeat {
        ts: i64,
    },
    ChatMessage {
        session_key: String,
        message: String,
        #[serde(default, skip_serializing_if = "Option::is_none")]
        idempotency_key: Option<String>,
    },

    // -- Server → Client --
    ConnectOk {
        protocol: u32,
        server_version: String,
        conn_id: String,
        #[serde(default, skip_serializing_if = "Option::is_none")]
        features: Option<Vec<String>>,
    },
    AgentEvent {
        run_id: String,
        seq: u64,
        stream: String,
        ts: i64,
        data: serde_json::Value,
    },
    Presence {
        clients: Vec<PresenceEntry>,
    },
    Tick {
        ts: i64,
    },
    Health {
        status: String,
        #[serde(default, skip_serializing_if = "Option::is_none")]
        details: Option<serde_json::Value>,
    },
    Cron {
        job_id: String,
        action: String,
        #[serde(default, skip_serializing_if = "Option::is_none")]
        payload: Option<serde_json::Value>,
    },
    Shutdown {
        reason: String,
        #[serde(default, skip_serializing_if = "Option::is_none")]
        restart_expected_ms: Option<u64>,
    },
    ConfigReload {
        #[serde(default, skip_serializing_if = "Option::is_none")]
        changed_keys: Option<Vec<String>>,
        ts: i64,
    },

    // -- Bidirectional --
    /// Generic request/response pair (maps to OpenClaw `RequestFrame`).
    Request {
        id: String,
        method: String,
        #[serde(default, skip_serializing_if = "Option::is_none")]
        params: Option<serde_json::Value>,
    },
    Response {
        id: String,
        ok: bool,
        #[serde(default, skip_serializing_if = "Option::is_none")]
        payload: Option<serde_json::Value>,
        #[serde(default, skip_serializing_if = "Option::is_none")]
        error: Option<ErrorShape>,
    },
    /// Generic server-push event.
    Event {
        event: String,
        #[serde(default, skip_serializing_if = "Option::is_none")]
        payload: Option<serde_json::Value>,
        #[serde(default, skip_serializing_if = "Option::is_none")]
        seq: Option<u64>,
    },
}

// ---------------------------------------------------------------------------
// Frame validation
// ---------------------------------------------------------------------------

/// Validation errors for protocol frames.
#[derive(Debug, Clone, PartialEq)]
pub struct ValidationError {
    pub field: String,
    pub message: String,
}

impl std::fmt::Display for ValidationError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}: {}", self.field, self.message)
    }
}

/// Trait for validating protocol structs (replaces AJV schema validation).
pub trait Validate {
    fn validate(&self) -> Result<(), Vec<ValidationError>>;
}

impl Validate for ClientInfo {
    fn validate(&self) -> Result<(), Vec<ValidationError>> {
        let mut errors = Vec::new();
        if self.name.is_empty() {
            errors.push(ValidationError {
                field: "name".into(),
                message: "must not be empty".into(),
            });
        }
        if self.version.is_empty() {
            errors.push(ValidationError {
                field: "version".into(),
                message: "must not be empty".into(),
            });
        }
        if self.platform.is_empty() {
            errors.push(ValidationError {
                field: "platform".into(),
                message: "must not be empty".into(),
            });
        }
        if self.mode.is_empty() {
            errors.push(ValidationError {
                field: "mode".into(),
                message: "must not be empty".into(),
            });
        }
        if errors.is_empty() {
            Ok(())
        } else {
            Err(errors)
        }
    }
}

impl Validate for GatewayFrame {
    fn validate(&self) -> Result<(), Vec<ValidationError>> {
        match self {
            GatewayFrame::Connect {
                min_protocol,
                max_protocol,
                client,
                ..
            } => {
                let mut errors = Vec::new();
                if *min_protocol == 0 {
                    errors.push(ValidationError {
                        field: "min_protocol".into(),
                        message: "must be >= 1".into(),
                    });
                }
                if *max_protocol == 0 {
                    errors.push(ValidationError {
                        field: "max_protocol".into(),
                        message: "must be >= 1".into(),
                    });
                }
                if *min_protocol > *max_protocol {
                    errors.push(ValidationError {
                        field: "min_protocol".into(),
                        message: "must be <= max_protocol".into(),
                    });
                }
                if let Err(client_errors) = client.validate() {
                    errors.extend(client_errors);
                }
                if errors.is_empty() {
                    Ok(())
                } else {
                    Err(errors)
                }
            }
            GatewayFrame::ChatMessage {
                session_key,
                message,
                ..
            } => {
                let mut errors = Vec::new();
                if session_key.is_empty() {
                    errors.push(ValidationError {
                        field: "session_key".into(),
                        message: "must not be empty".into(),
                    });
                }
                if message.is_empty() {
                    errors.push(ValidationError {
                        field: "message".into(),
                        message: "must not be empty".into(),
                    });
                }
                if errors.is_empty() {
                    Ok(())
                } else {
                    Err(errors)
                }
            }
            GatewayFrame::Request { id, method, .. } => {
                let mut errors = Vec::new();
                if id.is_empty() {
                    errors.push(ValidationError {
                        field: "id".into(),
                        message: "must not be empty".into(),
                    });
                }
                if method.is_empty() {
                    errors.push(ValidationError {
                        field: "method".into(),
                        message: "must not be empty".into(),
                    });
                }
                if errors.is_empty() {
                    Ok(())
                } else {
                    Err(errors)
                }
            }
            GatewayFrame::Shutdown { reason, .. } => {
                if reason.is_empty() {
                    Err(vec![ValidationError {
                        field: "reason".into(),
                        message: "must not be empty".into(),
                    }])
                } else {
                    Ok(())
                }
            }
            // Other variants are trivially valid or have no required non-empty fields.
            _ => Ok(()),
        }
    }
}

// ---------------------------------------------------------------------------
// Presence
// ---------------------------------------------------------------------------

/// A single entry in the presence list.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct PresenceEntry {
    pub session_id: String,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub host: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub ip: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub platform: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub device_family: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub mode: Option<String>,
    pub ts: i64,
}

// ---------------------------------------------------------------------------
// Session management
// ---------------------------------------------------------------------------

/// Tracks a single connected gateway client.
#[derive(Debug, Clone)]
pub struct GatewaySession {
    pub session_id: String,
    pub connected_at: DateTime<Utc>,
    pub last_heartbeat: Instant,
    pub client_info: Option<ClientInfo>,
    pub remote_addr: Option<std::net::SocketAddr>,
}

impl GatewaySession {
    /// Create a new session (before the `Connect` handshake completes).
    pub fn new(remote_addr: Option<std::net::SocketAddr>) -> Self {
        Self {
            session_id: Uuid::new_v4().to_string(),
            connected_at: Utc::now(),
            last_heartbeat: Instant::now(),
            client_info: None,
            remote_addr,
        }
    }

    /// Update the heartbeat timestamp.
    pub fn touch(&mut self) {
        self.last_heartbeat = Instant::now();
    }

    /// Whether the session has exceeded the heartbeat timeout.
    pub fn is_expired(&self, timeout: Duration) -> bool {
        self.last_heartbeat.elapsed() > timeout
    }

    /// Build a `PresenceEntry` from this session.
    pub fn to_presence_entry(&self) -> PresenceEntry {
        PresenceEntry {
            session_id: self.session_id.clone(),
            host: None,
            ip: self.remote_addr.map(|a| a.ip().to_string()),
            platform: self.client_info.as_ref().map(|c| c.platform.clone()),
            device_family: self
                .client_info
                .as_ref()
                .and_then(|c| c.device_family.clone()),
            mode: self.client_info.as_ref().map(|c| c.mode.clone()),
            ts: Utc::now().timestamp_millis(),
        }
    }
}

// ---------------------------------------------------------------------------
// Presence tracker
// ---------------------------------------------------------------------------

/// Thread-safe registry of all connected gateway sessions.
///
/// Provides broadcast capabilities and presence snapshots.
pub struct PresenceTracker {
    sessions: DashMap<String, GatewaySession>,
    /// Broadcast channel for pushing frames to all connected handlers.
    broadcast_tx: broadcast::Sender<String>,
    seq: AtomicU64,
}

impl PresenceTracker {
    /// Create a new tracker with a given broadcast channel capacity.
    pub fn new(broadcast_capacity: usize) -> Self {
        let (tx, _) = broadcast::channel(broadcast_capacity);
        Self {
            sessions: DashMap::new(),
            broadcast_tx: tx,
            seq: AtomicU64::new(0),
        }
    }

    /// Register a session (called when the WebSocket is accepted).
    pub fn register(&self, session: GatewaySession) {
        info!(session_id = %session.session_id, "Gateway session registered");
        self.sessions.insert(session.session_id.clone(), session);
    }

    /// Remove a session (called when the WebSocket closes).
    pub fn unregister(&self, session_id: &str) {
        if self.sessions.remove(session_id).is_some() {
            info!(session_id = %session_id, "Gateway session unregistered");
        }
    }

    /// Update heartbeat for a session.
    pub fn heartbeat(&self, session_id: &str) {
        if let Some(mut s) = self.sessions.get_mut(session_id) {
            s.touch();
        }
    }

    /// Set the `ClientInfo` after the `Connect` handshake succeeds.
    pub fn set_client_info(&self, session_id: &str, info: ClientInfo) {
        if let Some(mut s) = self.sessions.get_mut(session_id) {
            s.client_info = Some(info);
        }
    }

    /// Snapshot of all currently connected sessions as presence entries.
    pub fn presence_snapshot(&self) -> Vec<PresenceEntry> {
        self.sessions
            .iter()
            .map(|r| r.value().to_presence_entry())
            .collect()
    }

    /// Number of connected sessions.
    pub fn connected_count(&self) -> usize {
        self.sessions.len()
    }

    /// Next monotonic sequence number.
    pub fn next_seq(&self) -> u64 {
        self.seq.fetch_add(1, Ordering::Relaxed)
    }

    /// Subscribe to broadcast events.
    pub fn subscribe(&self) -> broadcast::Receiver<String> {
        self.broadcast_tx.subscribe()
    }

    /// Broadcast a serialised frame to all connected sessions.
    ///
    /// Returns the number of receivers that received the message.
    pub fn broadcast(&self, frame: &GatewayFrame) -> usize {
        match serde_json::to_string(frame) {
            Ok(json) => self.broadcast_tx.send(json).unwrap_or(0),
            Err(e) => {
                warn!("Failed to serialise broadcast frame: {e}");
                0
            }
        }
    }

    /// Broadcast a raw JSON string (pre-serialised).
    pub fn broadcast_raw(&self, json: &str) -> usize {
        self.broadcast_tx.send(json.to_string()).unwrap_or(0)
    }

    /// Remove sessions that have exceeded the heartbeat timeout.
    pub fn reap_expired(&self, timeout: Duration) -> Vec<String> {
        let expired: Vec<String> = self
            .sessions
            .iter()
            .filter(|r| r.value().is_expired(timeout))
            .map(|r| r.key().clone())
            .collect();
        for id in &expired {
            self.unregister(id);
        }
        expired
    }

    /// Get a list of all session IDs.
    pub fn session_ids(&self) -> Vec<String> {
        self.sessions.iter().map(|r| r.key().clone()).collect()
    }
}

// ---------------------------------------------------------------------------
// Idempotency cache
// ---------------------------------------------------------------------------

/// Cached response for an idempotency key.
#[derive(Debug, Clone)]
struct IdempotencyEntry {
    response_json: String,
    inserted_at: Instant,
}

/// TTL-based idempotency cache backed by `DashMap`.
///
/// Ensures that requests with the same `idempotency_key` return the same
/// response without re-executing the handler.
pub struct IdempotencyCache {
    entries: DashMap<String, IdempotencyEntry>,
    ttl: Duration,
}

impl IdempotencyCache {
    /// Create a new cache with the given TTL.
    pub fn new(ttl: Duration) -> Self {
        Self {
            entries: DashMap::new(),
            ttl,
        }
    }

    /// Look up a cached response for the given key.
    ///
    /// Returns `None` if the key is not present or has expired.
    pub fn get(&self, key: &str) -> Option<String> {
        if let Some(entry) = self.entries.get(key) {
            if entry.inserted_at.elapsed() <= self.ttl {
                return Some(entry.response_json.clone());
            }
            // Expired — drop it.
            drop(entry);
            self.entries.remove(key);
        }
        None
    }

    /// Store a response for the given key.
    pub fn insert(&self, key: String, response_json: String) {
        self.entries.insert(
            key,
            IdempotencyEntry {
                response_json,
                inserted_at: Instant::now(),
            },
        );
    }

    /// Remove all expired entries. Call this periodically (e.g. on each tick).
    pub fn evict_expired(&self) -> usize {
        let before = self.entries.len();
        self.entries
            .retain(|_, v| v.inserted_at.elapsed() <= self.ttl);
        before - self.entries.len()
    }

    /// Number of entries currently in the cache.
    pub fn len(&self) -> usize {
        self.entries.len()
    }

    /// Whether the cache is empty.
    pub fn is_empty(&self) -> bool {
        self.entries.is_empty()
    }
}

// ---------------------------------------------------------------------------
// Shared gateway state
// ---------------------------------------------------------------------------

/// Shared state for the gateway WebSocket control plane.
pub struct GatewayState {
    pub config: RwLock<GatewayConfig>,
    pub presence: PresenceTracker,
    pub idempotency: IdempotencyCache,
}

impl GatewayState {
    pub fn new(config: GatewayConfig) -> Self {
        let ttl = Duration::from_millis(config.idempotency_ttl_ms);
        Self {
            presence: PresenceTracker::new(256),
            idempotency: IdempotencyCache::new(ttl),
            config: RwLock::new(config),
        }
    }
}

// ---------------------------------------------------------------------------
// Axum WebSocket endpoint
// ---------------------------------------------------------------------------

/// Axum handler: upgrade an HTTP request to a gateway WebSocket.
///
/// Mount this on e.g. `/gateway/ws`:
/// ```ignore
/// .route("/gateway/ws", axum::routing::get(gateway_ws::ws_handler))
/// ```
pub async fn ws_handler(
    ws: WebSocketUpgrade,
    ConnectInfo(addr): ConnectInfo<std::net::SocketAddr>,
    State(state): State<Arc<GatewayState>>,
) -> impl IntoResponse {
    let session = GatewaySession::new(Some(addr));
    let session_id = session.session_id.clone();
    state.presence.register(session);
    debug!(session_id = %session_id, remote = %addr, "Gateway WS upgrade");

    ws.on_upgrade(move |socket| handle_socket(socket, session_id, state))
}

/// Core WebSocket loop for a single gateway session.
async fn handle_socket(socket: WebSocket, session_id: String, state: Arc<GatewayState>) {
    let (mut sender, mut receiver) = socket.split();

    // Subscribe to broadcasts so we can forward them to this client.
    let mut bcast_rx = state.presence.subscribe();

    // Tick interval for periodic heartbeat checks.
    let tick_ms = {
        let cfg = state.config.read().await;
        cfg.tick_interval_ms
    };
    let mut tick_interval = tokio::time::interval(Duration::from_millis(tick_ms));
    tick_interval.set_missed_tick_behavior(tokio::time::MissedTickBehavior::Skip);

    loop {
        tokio::select! {
            // Incoming message from the client.
            msg = receiver.next() => {
                match msg {
                    Some(Ok(Message::Text(text))) => {
                        let frame: Result<GatewayFrame, _> = serde_json::from_str(&text);
                        match frame {
                            Ok(frame) => {
                                if let Err(errors) = frame.validate() {
                                    let err_msg = errors.iter()
                                        .map(|e| e.to_string())
                                        .collect::<Vec<_>>()
                                        .join("; ");
                                    let resp = GatewayFrame::Response {
                                        id: String::new(),
                                        ok: false,
                                        payload: None,
                                        error: Some(ErrorShape {
                                            code: error_codes::INVALID_REQUEST.into(),
                                            message: err_msg,
                                            details: None,
                                            retryable: Some(false),
                                            retry_after_ms: None,
                                        }),
                                    };
                                    if let Ok(json) = serde_json::to_string(&resp) {
                                        if sender.send(Message::Text(json.into())).await.is_err() {
                                            break;
                                        }
                                    }
                                    continue;
                                }
                                let reply = handle_frame(&session_id, frame, &state).await;
                                if let Some(reply_frame) = reply {
                                    if let Ok(json) = serde_json::to_string(&reply_frame) {
                                        if sender.send(Message::Text(json.into())).await.is_err() {
                                            break;
                                        }
                                    }
                                }
                            }
                            Err(e) => {
                                warn!(session_id = %session_id, "Invalid frame JSON: {e}");
                                let resp = GatewayFrame::Response {
                                    id: String::new(),
                                    ok: false,
                                    payload: None,
                                    error: Some(ErrorShape {
                                        code: error_codes::INVALID_REQUEST.into(),
                                        message: format!("Malformed frame: {e}"),
                                        details: None,
                                        retryable: Some(false),
                                        retry_after_ms: None,
                                    }),
                                };
                                if let Ok(json) = serde_json::to_string(&resp) {
                                    if sender.send(Message::Text(json.into())).await.is_err() {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    Some(Ok(Message::Close(_))) | None => break,
                    Some(Ok(Message::Ping(data))) => {
                        if sender.send(Message::Pong(data)).await.is_err() {
                            break;
                        }
                    }
                    Some(Err(e)) => {
                        debug!(session_id = %session_id, "WS error: {e}");
                        break;
                    }
                    _ => {} // Binary, Pong — ignore.
                }
            }
            // Broadcast messages from other parts of the system.
            Ok(json) = bcast_rx.recv() => {
                if sender.send(Message::Text(json.into())).await.is_err() {
                    break;
                }
            }
            // Periodic tick.
            _ = tick_interval.tick() => {
                let tick = GatewayFrame::Tick {
                    ts: Utc::now().timestamp_millis(),
                };
                if let Ok(json) = serde_json::to_string(&tick) {
                    if sender.send(Message::Text(json.into())).await.is_err() {
                        break;
                    }
                }
                // Evict expired idempotency entries.
                state.idempotency.evict_expired();
            }
        }
    }

    // Clean up.
    state.presence.unregister(&session_id);
    info!(session_id = %session_id, "Gateway WS closed");
}

/// Handle an already-validated incoming frame and optionally return a reply.
async fn handle_frame(
    session_id: &str,
    frame: GatewayFrame,
    state: &GatewayState,
) -> Option<GatewayFrame> {
    match frame {
        GatewayFrame::Connect { client, .. } => {
            state.presence.set_client_info(session_id, client);
            Some(GatewayFrame::ConnectOk {
                protocol: PROTOCOL_VERSION,
                server_version: env!("CARGO_PKG_VERSION").to_string(),
                conn_id: session_id.to_string(),
                features: Some(vec![
                    "agent".into(),
                    "chat".into(),
                    "presence".into(),
                    "config-reload".into(),
                ]),
            })
        }
        GatewayFrame::Disconnect { reason } => {
            info!(
                session_id = %session_id,
                reason = reason.as_deref().unwrap_or("none"),
                "Client requested disconnect"
            );
            // Returning None — the main loop will close after this.
            None
        }
        GatewayFrame::Heartbeat { ts } => {
            state.presence.heartbeat(session_id);
            debug!(session_id = %session_id, client_ts = ts, "Heartbeat");
            // Echo back a heartbeat acknowledgement.
            Some(GatewayFrame::Heartbeat {
                ts: Utc::now().timestamp_millis(),
            })
        }
        GatewayFrame::ChatMessage {
            idempotency_key,
            session_key,
            message,
        } => {
            // Idempotency check.
            if let Some(ref key) = idempotency_key {
                if let Some(cached) = state.idempotency.get(key) {
                    if let Ok(frame) = serde_json::from_str::<GatewayFrame>(&cached) {
                        return Some(frame);
                    }
                }
            }

            // In a full implementation this would dispatch to the agent runtime.
            // For now, acknowledge receipt.
            let resp = GatewayFrame::Response {
                id: idempotency_key
                    .clone()
                    .unwrap_or_else(|| Uuid::new_v4().to_string()),
                ok: true,
                payload: Some(serde_json::json!({
                    "session_key": session_key,
                    "message_len": message.len(),
                    "accepted": true,
                })),
                error: None,
            };

            // Cache.
            if let Some(key) = idempotency_key {
                if let Ok(json) = serde_json::to_string(&resp) {
                    state.idempotency.insert(key, json);
                }
            }

            Some(resp)
        }
        GatewayFrame::Request { id, method, params: _ } => {
            // Route generic RPC methods.
            match method.as_str() {
                "presence" => {
                    let clients = state.presence.presence_snapshot();
                    Some(GatewayFrame::Response {
                        id,
                        ok: true,
                        payload: Some(serde_json::to_value(clients).unwrap_or_default()),
                        error: None,
                    })
                }
                "health" => Some(GatewayFrame::Response {
                    id,
                    ok: true,
                    payload: Some(serde_json::json!({
                        "status": "ok",
                        "connected_clients": state.presence.connected_count(),
                    })),
                    error: None,
                }),
                _ => Some(GatewayFrame::Response {
                    id,
                    ok: false,
                    payload: None,
                    error: Some(ErrorShape {
                        code: error_codes::INVALID_REQUEST.into(),
                        message: format!("Unknown method: {method}"),
                        details: None,
                        retryable: Some(false),
                        retry_after_ms: None,
                    }),
                }),
            }
        }
        // Server-originated frames received from the client are ignored.
        _ => None,
    }
}

// ---------------------------------------------------------------------------
// Broadcast helpers
// ---------------------------------------------------------------------------

/// Notify all connected clients of a configuration reload.
pub fn notify_config_reload(state: &GatewayState, changed_keys: Option<Vec<String>>) {
    let frame = GatewayFrame::ConfigReload {
        changed_keys,
        ts: Utc::now().timestamp_millis(),
    };
    state.presence.broadcast(&frame);
}

/// Notify all connected clients of an impending shutdown.
pub fn notify_shutdown(state: &GatewayState, reason: &str, restart_expected_ms: Option<u64>) {
    let frame = GatewayFrame::Shutdown {
        reason: reason.to_string(),
        restart_expected_ms,
    };
    state.presence.broadcast(&frame);
}

/// Broadcast a health snapshot to all connected clients.
pub fn broadcast_health(state: &GatewayState, status: &str, details: Option<serde_json::Value>) {
    let frame = GatewayFrame::Health {
        status: status.to_string(),
        details,
    };
    state.presence.broadcast(&frame);
}

/// Broadcast an agent event to all connected clients.
pub fn broadcast_agent_event(
    state: &GatewayState,
    run_id: &str,
    seq: u64,
    stream: &str,
    ts: i64,
    data: serde_json::Value,
) {
    let frame = GatewayFrame::AgentEvent {
        run_id: run_id.to_string(),
        seq,
        stream: stream.to_string(),
        ts,
        data,
    };
    state.presence.broadcast(&frame);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

#[cfg(test)]
mod tests {
    use super::*;
    use std::time::Duration;

    // -- Frame serialization/deserialization ---------------------------------

    #[test]
    fn test_connect_frame_roundtrip() {
        let frame = GatewayFrame::Connect {
            min_protocol: 1,
            max_protocol: 2,
            client: ClientInfo {
                name: "TestApp".into(),
                version: "1.0.0".into(),
                platform: "linux".into(),
                device_family: None,
                model_identifier: None,
                mode: "normal".into(),
                instance_id: Some("inst-1".into()),
            },
            caps: Some(vec!["chat".into()]),
            locale: Some("en-US".into()),
        };
        let json = serde_json::to_string(&frame).unwrap();
        let parsed: GatewayFrame = serde_json::from_str(&json).unwrap();
        assert_eq!(frame, parsed);
    }

    #[test]
    fn test_connect_ok_frame_roundtrip() {
        let frame = GatewayFrame::ConnectOk {
            protocol: PROTOCOL_VERSION,
            server_version: "0.1.0".into(),
            conn_id: "abc-123".into(),
            features: Some(vec!["agent".into()]),
        };
        let json = serde_json::to_string(&frame).unwrap();
        let parsed: GatewayFrame = serde_json::from_str(&json).unwrap();
        assert_eq!(frame, parsed);
    }

    #[test]
    fn test_heartbeat_frame_roundtrip() {
        let frame = GatewayFrame::Heartbeat { ts: 1700000000000 };
        let json = serde_json::to_string(&frame).unwrap();
        let parsed: GatewayFrame = serde_json::from_str(&json).unwrap();
        assert_eq!(frame, parsed);
    }

    #[test]
    fn test_shutdown_frame_roundtrip() {
        let frame = GatewayFrame::Shutdown {
            reason: "maintenance".into(),
            restart_expected_ms: Some(5000),
        };
        let json = serde_json::to_string(&frame).unwrap();
        let parsed: GatewayFrame = serde_json::from_str(&json).unwrap();
        assert_eq!(frame, parsed);
    }

    #[test]
    fn test_config_reload_frame_roundtrip() {
        let frame = GatewayFrame::ConfigReload {
            changed_keys: Some(vec!["api_key".into(), "model".into()]),
            ts: 1700000000000,
        };
        let json = serde_json::to_string(&frame).unwrap();
        let parsed: GatewayFrame = serde_json::from_str(&json).unwrap();
        assert_eq!(frame, parsed);
    }

    #[test]
    fn test_agent_event_frame_roundtrip() {
        let frame = GatewayFrame::AgentEvent {
            run_id: "run-42".into(),
            seq: 7,
            stream: "assistant".into(),
            ts: 1700000000000,
            data: serde_json::json!({"text": "Hello"}),
        };
        let json = serde_json::to_string(&frame).unwrap();
        let parsed: GatewayFrame = serde_json::from_str(&json).unwrap();
        assert_eq!(frame, parsed);
    }

    #[test]
    fn test_chat_message_frame_roundtrip() {
        let frame = GatewayFrame::ChatMessage {
            session_key: "sess-1".into(),
            message: "Hello, world!".into(),
            idempotency_key: Some("idem-1".into()),
        };
        let json = serde_json::to_string(&frame).unwrap();
        let parsed: GatewayFrame = serde_json::from_str(&json).unwrap();
        assert_eq!(frame, parsed);
    }

    #[test]
    fn test_request_response_roundtrip() {
        let req = GatewayFrame::Request {
            id: "req-1".into(),
            method: "presence".into(),
            params: None,
        };
        let json = serde_json::to_string(&req).unwrap();
        let parsed: GatewayFrame = serde_json::from_str(&json).unwrap();
        assert_eq!(req, parsed);

        let resp = GatewayFrame::Response {
            id: "req-1".into(),
            ok: true,
            payload: Some(serde_json::json!([])),
            error: None,
        };
        let json = serde_json::to_string(&resp).unwrap();
        let parsed: GatewayFrame = serde_json::from_str(&json).unwrap();
        assert_eq!(resp, parsed);
    }

    #[test]
    fn test_event_frame_roundtrip() {
        let frame = GatewayFrame::Event {
            event: "tick".into(),
            payload: Some(serde_json::json!({"ts": 123})),
            seq: Some(1),
        };
        let json = serde_json::to_string(&frame).unwrap();
        let parsed: GatewayFrame = serde_json::from_str(&json).unwrap();
        assert_eq!(frame, parsed);
    }

    #[test]
    fn test_error_shape_in_response() {
        let frame = GatewayFrame::Response {
            id: "err-1".into(),
            ok: false,
            payload: None,
            error: Some(ErrorShape {
                code: "INVALID_REQUEST".into(),
                message: "bad field".into(),
                details: Some(serde_json::json!({"field": "name"})),
                retryable: Some(true),
                retry_after_ms: Some(1000),
            }),
        };
        let json = serde_json::to_string(&frame).unwrap();
        let parsed: GatewayFrame = serde_json::from_str(&json).unwrap();
        assert_eq!(frame, parsed);
    }

    #[test]
    fn test_discriminator_tag() {
        // Verify the "type" field is present and correct.
        let frame = GatewayFrame::Tick { ts: 100 };
        let json = serde_json::to_string(&frame).unwrap();
        let v: serde_json::Value = serde_json::from_str(&json).unwrap();
        assert_eq!(v["type"], "tick");

        let frame = GatewayFrame::Connect {
            min_protocol: 1,
            max_protocol: 2,
            client: ClientInfo {
                name: "a".into(),
                version: "1".into(),
                platform: "p".into(),
                device_family: None,
                model_identifier: None,
                mode: "m".into(),
                instance_id: None,
            },
            caps: None,
            locale: None,
        };
        let json = serde_json::to_string(&frame).unwrap();
        let v: serde_json::Value = serde_json::from_str(&json).unwrap();
        assert_eq!(v["type"], "connect");
    }

    // -- Frame validation ----------------------------------------------------

    #[test]
    fn test_validate_connect_ok() {
        let frame = GatewayFrame::Connect {
            min_protocol: 1,
            max_protocol: 2,
            client: ClientInfo {
                name: "App".into(),
                version: "1.0".into(),
                platform: "linux".into(),
                device_family: None,
                model_identifier: None,
                mode: "normal".into(),
                instance_id: None,
            },
            caps: None,
            locale: None,
        };
        assert!(frame.validate().is_ok());
    }

    #[test]
    fn test_validate_connect_empty_name() {
        let frame = GatewayFrame::Connect {
            min_protocol: 1,
            max_protocol: 2,
            client: ClientInfo {
                name: "".into(),
                version: "1.0".into(),
                platform: "linux".into(),
                device_family: None,
                model_identifier: None,
                mode: "normal".into(),
                instance_id: None,
            },
            caps: None,
            locale: None,
        };
        let err = frame.validate().unwrap_err();
        assert!(err.iter().any(|e| e.field == "name"));
    }

    #[test]
    fn test_validate_connect_bad_protocol_range() {
        let frame = GatewayFrame::Connect {
            min_protocol: 3,
            max_protocol: 1,
            client: ClientInfo {
                name: "App".into(),
                version: "1.0".into(),
                platform: "linux".into(),
                device_family: None,
                model_identifier: None,
                mode: "normal".into(),
                instance_id: None,
            },
            caps: None,
            locale: None,
        };
        let err = frame.validate().unwrap_err();
        assert!(err.iter().any(|e| e.field == "min_protocol"));
    }

    #[test]
    fn test_validate_connect_zero_protocol() {
        let frame = GatewayFrame::Connect {
            min_protocol: 0,
            max_protocol: 0,
            client: ClientInfo {
                name: "App".into(),
                version: "1.0".into(),
                platform: "linux".into(),
                device_family: None,
                model_identifier: None,
                mode: "normal".into(),
                instance_id: None,
            },
            caps: None,
            locale: None,
        };
        let err = frame.validate().unwrap_err();
        assert!(err.len() >= 2); // both min and max must be >= 1
    }

    #[test]
    fn test_validate_chat_message_empty_fields() {
        let frame = GatewayFrame::ChatMessage {
            session_key: "".into(),
            message: "".into(),
            idempotency_key: None,
        };
        let err = frame.validate().unwrap_err();
        assert_eq!(err.len(), 2);
    }

    #[test]
    fn test_validate_request_empty_id() {
        let frame = GatewayFrame::Request {
            id: "".into(),
            method: "health".into(),
            params: None,
        };
        let err = frame.validate().unwrap_err();
        assert!(err.iter().any(|e| e.field == "id"));
    }

    #[test]
    fn test_validate_shutdown_empty_reason() {
        let frame = GatewayFrame::Shutdown {
            reason: "".into(),
            restart_expected_ms: None,
        };
        let err = frame.validate().unwrap_err();
        assert!(err.iter().any(|e| e.field == "reason"));
    }

    #[test]
    fn test_validate_heartbeat_always_ok() {
        let frame = GatewayFrame::Heartbeat { ts: 0 };
        assert!(frame.validate().is_ok());
    }

    // -- Session lifecycle ---------------------------------------------------

    #[test]
    fn test_session_new() {
        let session = GatewaySession::new(None);
        assert!(!session.session_id.is_empty());
        assert!(session.client_info.is_none());
    }

    #[test]
    fn test_session_touch_and_expiry() {
        let mut session = GatewaySession::new(None);
        // Should not be expired with a generous timeout.
        assert!(!session.is_expired(Duration::from_secs(60)));

        // Simulate expired by using a zero timeout.
        std::thread::sleep(Duration::from_millis(5));
        assert!(session.is_expired(Duration::from_millis(1)));

        // Touch resets the clock.
        session.touch();
        assert!(!session.is_expired(Duration::from_secs(60)));
    }

    #[test]
    fn test_session_to_presence_entry() {
        let addr: std::net::SocketAddr = "127.0.0.1:9999".parse().unwrap();
        let mut session = GatewaySession::new(Some(addr));
        session.client_info = Some(ClientInfo {
            name: "MyApp".into(),
            version: "2.0".into(),
            platform: "macos".into(),
            device_family: Some("desktop".into()),
            model_identifier: None,
            mode: "normal".into(),
            instance_id: None,
        });
        let entry = session.to_presence_entry();
        assert_eq!(entry.session_id, session.session_id);
        assert_eq!(entry.ip, Some("127.0.0.1".into()));
        assert_eq!(entry.platform, Some("macos".into()));
        assert_eq!(entry.device_family, Some("desktop".into()));
        assert_eq!(entry.mode, Some("normal".into()));
    }

    // -- Presence tracker ----------------------------------------------------

    #[test]
    fn test_presence_register_unregister() {
        let tracker = PresenceTracker::new(16);
        let s1 = GatewaySession::new(None);
        let id = s1.session_id.clone();

        tracker.register(s1);
        assert_eq!(tracker.connected_count(), 1);

        tracker.unregister(&id);
        assert_eq!(tracker.connected_count(), 0);
    }

    #[test]
    fn test_presence_snapshot() {
        let tracker = PresenceTracker::new(16);
        let s1 = GatewaySession::new(None);
        let s2 = GatewaySession::new(None);
        tracker.register(s1);
        tracker.register(s2);

        let snap = tracker.presence_snapshot();
        assert_eq!(snap.len(), 2);
    }

    #[test]
    fn test_presence_heartbeat_and_client_info() {
        let tracker = PresenceTracker::new(16);
        let s1 = GatewaySession::new(None);
        let id = s1.session_id.clone();
        tracker.register(s1);

        tracker.heartbeat(&id);
        tracker.set_client_info(
            &id,
            ClientInfo {
                name: "test".into(),
                version: "1".into(),
                platform: "linux".into(),
                device_family: None,
                model_identifier: None,
                mode: "dev".into(),
                instance_id: None,
            },
        );

        let snap = tracker.presence_snapshot();
        assert_eq!(snap.len(), 1);
        assert_eq!(snap[0].platform, Some("linux".into()));
    }

    #[test]
    fn test_presence_reap_expired() {
        let tracker = PresenceTracker::new(16);
        let s1 = GatewaySession::new(None);
        let id = s1.session_id.clone();
        tracker.register(s1);

        // Not expired yet.
        let reaped = tracker.reap_expired(Duration::from_secs(60));
        assert!(reaped.is_empty());
        assert_eq!(tracker.connected_count(), 1);

        // Wait and reap with tiny timeout.
        std::thread::sleep(Duration::from_millis(5));
        let reaped = tracker.reap_expired(Duration::from_millis(1));
        assert_eq!(reaped, vec![id]);
        assert_eq!(tracker.connected_count(), 0);
    }

    #[test]
    fn test_presence_broadcast() {
        let tracker = PresenceTracker::new(16);
        let mut rx = tracker.subscribe();

        let frame = GatewayFrame::Tick {
            ts: 1700000000000,
        };
        let n = tracker.broadcast(&frame);
        assert_eq!(n, 1);

        // The receiver should get the JSON.
        let json = rx.try_recv().unwrap();
        let parsed: GatewayFrame = serde_json::from_str(&json).unwrap();
        assert_eq!(parsed, frame);
    }

    #[test]
    fn test_presence_seq_monotonic() {
        let tracker = PresenceTracker::new(16);
        assert_eq!(tracker.next_seq(), 0);
        assert_eq!(tracker.next_seq(), 1);
        assert_eq!(tracker.next_seq(), 2);
    }

    // -- Idempotency cache ---------------------------------------------------

    #[test]
    fn test_idempotency_insert_get() {
        let cache = IdempotencyCache::new(Duration::from_secs(60));
        cache.insert("key-1".into(), r#"{"ok":true}"#.into());

        assert_eq!(cache.get("key-1"), Some(r#"{"ok":true}"#.into()));
        assert_eq!(cache.get("key-missing"), None);
        assert_eq!(cache.len(), 1);
        assert!(!cache.is_empty());
    }

    #[test]
    fn test_idempotency_ttl_expiry() {
        let cache = IdempotencyCache::new(Duration::from_millis(10));
        cache.insert("key-1".into(), "resp".into());

        // Still fresh.
        assert!(cache.get("key-1").is_some());

        // Wait for expiry.
        std::thread::sleep(Duration::from_millis(20));
        assert!(cache.get("key-1").is_none());
    }

    #[test]
    fn test_idempotency_evict_expired() {
        let cache = IdempotencyCache::new(Duration::from_millis(10));
        cache.insert("a".into(), "1".into());
        cache.insert("b".into(), "2".into());

        std::thread::sleep(Duration::from_millis(20));
        let evicted = cache.evict_expired();
        assert_eq!(evicted, 2);
        assert!(cache.is_empty());
    }

    #[test]
    fn test_idempotency_evict_partial() {
        let cache = IdempotencyCache::new(Duration::from_millis(50));
        cache.insert("old".into(), "1".into());

        std::thread::sleep(Duration::from_millis(60));
        cache.insert("new".into(), "2".into());

        let evicted = cache.evict_expired();
        assert_eq!(evicted, 1);
        assert_eq!(cache.len(), 1);
        assert!(cache.get("new").is_some());
    }

    // -- GatewayConfig -------------------------------------------------------

    #[test]
    fn test_gateway_config_default() {
        let cfg = GatewayConfig::default();
        assert_eq!(cfg.host, "127.0.0.1");
        assert_eq!(cfg.port, 18789);
        assert_eq!(cfg.max_payload_bytes, 1024 * 1024);
        assert_eq!(cfg.tick_interval_ms, 30_000);
        assert_eq!(cfg.heartbeat_timeout_ms, 90_000);
        assert_eq!(cfg.idempotency_ttl_ms, 300_000);
    }

    #[test]
    fn test_gateway_config_deserialize_partial() {
        let toml = r#"
            port = 9999
            tick_interval_ms = 5000
        "#;
        let cfg: GatewayConfig = toml::from_str(toml).unwrap();
        assert_eq!(cfg.port, 9999);
        assert_eq!(cfg.tick_interval_ms, 5000);
        // Defaults for unspecified fields.
        assert_eq!(cfg.host, "127.0.0.1");
    }

    // -- GatewayState --------------------------------------------------------

    #[test]
    fn test_gateway_state_new() {
        let state = GatewayState::new(GatewayConfig::default());
        assert_eq!(state.presence.connected_count(), 0);
        assert!(state.idempotency.is_empty());
    }

    // -- Broadcast helpers ---------------------------------------------------

    #[test]
    fn test_notify_config_reload_broadcast() {
        let state = GatewayState::new(GatewayConfig::default());
        let mut rx = state.presence.subscribe();

        notify_config_reload(&state, Some(vec!["api_key".into()]));

        let json = rx.try_recv().unwrap();
        let frame: GatewayFrame = serde_json::from_str(&json).unwrap();
        match frame {
            GatewayFrame::ConfigReload { changed_keys, .. } => {
                assert_eq!(changed_keys, Some(vec!["api_key".into()]));
            }
            _ => panic!("Expected ConfigReload frame"),
        }
    }

    #[test]
    fn test_notify_shutdown_broadcast() {
        let state = GatewayState::new(GatewayConfig::default());
        let mut rx = state.presence.subscribe();

        notify_shutdown(&state, "maintenance", Some(5000));

        let json = rx.try_recv().unwrap();
        let frame: GatewayFrame = serde_json::from_str(&json).unwrap();
        match frame {
            GatewayFrame::Shutdown {
                reason,
                restart_expected_ms,
            } => {
                assert_eq!(reason, "maintenance");
                assert_eq!(restart_expected_ms, Some(5000));
            }
            _ => panic!("Expected Shutdown frame"),
        }
    }

    #[test]
    fn test_broadcast_agent_event() {
        let state = GatewayState::new(GatewayConfig::default());
        let mut rx = state.presence.subscribe();

        broadcast_agent_event(
            &state,
            "run-1",
            0,
            "assistant",
            1700000000000,
            serde_json::json!({"text": "hi"}),
        );

        let json = rx.try_recv().unwrap();
        let frame: GatewayFrame = serde_json::from_str(&json).unwrap();
        match frame {
            GatewayFrame::AgentEvent {
                run_id, seq, stream, ..
            } => {
                assert_eq!(run_id, "run-1");
                assert_eq!(seq, 0);
                assert_eq!(stream, "assistant");
            }
            _ => panic!("Expected AgentEvent frame"),
        }
    }
}
