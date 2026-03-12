#!/usr/bin/env node
'use strict';

const http = require('node:http');
const { randomUUID } = require('node:crypto');

// ---------------------------------------------------------------------------
// Config from environment
// ---------------------------------------------------------------------------
const fs = require('node:fs');
const path = require('node:path');

const PORT = parseInt(process.env.WHATSAPP_GATEWAY_PORT || '3009', 10);
const MOHINI_URL = (process.env.MOHINI_URL || 'http://127.0.0.1:4200').replace(/\/+$/, '');
const DEFAULT_AGENT = process.env.MOHINI_DEFAULT_AGENT || 'assistant';
const OWNER_PHONE = process.env.OWNER_PHONE || '+47227493949570';

// ---------------------------------------------------------------------------
// Agent routing — map @mentions to agent IDs (populated on startup)
// ---------------------------------------------------------------------------
const AGENT_ALIASES = {
  '@designer': 'gsd-designer',
  '@design': 'gsd-designer',
  '@gsd': 'gsd-designer',
  '@marketer': 'marketing-strategist',
  '@marketing': 'marketing-strategist',
  '@market': 'marketing-strategist',
  '@mohini': null,    // null = use DEFAULT_AGENT
  '@assistant': null,
};

// Cache: agent name → agent UUID (populated from /api/agents)
const agentIdCache = {};

async function resolveAgentId(nameOrId) {
  // If it's already a UUID, return it
  if (/^[0-9a-f-]{36}$/.test(nameOrId)) return nameOrId;
  // Check cache
  if (agentIdCache[nameOrId]) return agentIdCache[nameOrId];
  // Fetch from API
  try {
    const agents = await fetchJson(`${MOHINI_URL}/api/agents`);
    if (Array.isArray(agents)) {
      for (const a of agents) {
        agentIdCache[a.name] = a.id;
      }
    }
  } catch (e) {
    console.error('[gateway] Failed to fetch agents:', e.message);
  }
  return agentIdCache[nameOrId] || nameOrId;
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    http.get({ hostname: u.hostname, port: u.port, path: u.pathname, timeout: 5000 }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => { try { resolve(JSON.parse(body)); } catch { reject(new Error('Bad JSON')); } });
    }).on('error', reject);
  });
}

// Parse agent mention from message: "@designer fix the logo" → { agent: "gsd-designer", text: "fix the logo" }
function parseAgentMention(text) {
  if (!text) return { agent: null, text };
  const match = text.match(/^(@\w+)\s*([\s\S]*)/);
  if (match) {
    const alias = match[1].toLowerCase();
    if (alias in AGENT_ALIASES) {
      return {
        agent: AGENT_ALIASES[alias],  // null means default
        text: match[2].trim() || match[1],  // if no text after mention, send the mention itself
      };
    }
  }
  return { agent: null, text };
}

// ---------------------------------------------------------------------------
// Access control — only allowed phone numbers can interact with Mohini
// ---------------------------------------------------------------------------
const ACL_FILE = path.join(__dirname, 'acl.json');

function loadAcl() {
  try {
    if (fs.existsSync(ACL_FILE)) {
      const data = JSON.parse(fs.readFileSync(ACL_FILE, 'utf8'));
      return {
        enabled: data.enabled !== false,              // default: enabled
        mode: data.mode || 'allowlist',               // 'allowlist' or 'blocklist'
        allowlist: new Set(data.allowlist || []),      // phone numbers like "+1234567890"
        superusers: new Set(data.superusers || []),    // phone numbers with admin command access
        blocklist: new Set(data.blocklist || []),
        deny_message: data.deny_message || '',        // optional message to send to blocked users (empty = silent)
      };
    }
  } catch (e) {
    console.error('[gateway] Failed to load ACL:', e.message);
  }
  // Default: ACL disabled (open to all) until configured
  return { enabled: false, mode: 'allowlist', allowlist: new Set(), superusers: new Set(), blocklist: new Set(), deny_message: '' };
}

function saveAcl(acl) {
  const data = {
    enabled: acl.enabled,
    mode: acl.mode,
    allowlist: [...acl.allowlist],
    superusers: [...acl.superusers],
    blocklist: [...acl.blocklist],
    deny_message: acl.deny_message,
  };
  fs.writeFileSync(ACL_FILE, JSON.stringify(data, null, 2) + '\n');
}

let acl = loadAcl();

function isAllowed(phone) {
  if (!acl.enabled) return true;
  if (acl.mode === 'blocklist') {
    return !acl.blocklist.has(phone);
  }
  // allowlist mode (default)
  return acl.allowlist.has(phone);
}

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let sock = null;          // Baileys socket
let sessionId = '';       // current session identifier
let qrDataUrl = '';       // latest QR code as data:image/png;base64,...
let connStatus = 'disconnected'; // disconnected | qr_ready | connected
let qrExpired = false;
let statusMessage = 'Not started';
let reconnectAttempt = 0; // exponential backoff counter
const MAX_RECONNECT_DELAY = 60_000; // cap at 60s

// LID → phone number cache (WhatsApp v6 uses @lid JIDs instead of @s.whatsapp.net)
const lidToPhone = new Map();

// ---------------------------------------------------------------------------
// Baileys connection
// ---------------------------------------------------------------------------
async function startConnection() {
  // Dynamic imports — Baileys is ESM-only in v6+
  const baileys = await import('@whiskeysockets/baileys');
  const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = baileys;
  const { downloadMediaMessage } = baileys;
  const QRCode = (await import('qrcode')).default || await import('qrcode');
  const pino = (await import('pino')).default || await import('pino');

  const logger = pino({ level: 'warn' });
  const authDir = require('node:path').join(__dirname, 'auth_store');

  const { state, saveCreds } = await useMultiFileAuthState(
    require('node:path').join(__dirname, 'auth_store')
  );
  const { version } = await fetchLatestBaileysVersion();

  sessionId = randomUUID();
  qrDataUrl = '';
  qrExpired = false;
  connStatus = 'disconnected';
  statusMessage = 'Connecting...';

  sock = makeWASocket({
    version,
    auth: state,
    logger,
    printQRInTerminal: true,
    browser: ['Mohini', 'Desktop', '1.0.0'],
  });

  // Save credentials whenever they update
  sock.ev.on('creds.update', saveCreds);

  // Map LID → real phone number when WhatsApp shares it
  sock.ev.on('chats.phoneNumberShare', ({ lid, jid }) => {
    if (lid && jid) {
      const lidUser = lid.replace(/@.*$/, '');
      const phone = '+' + jid.replace(/@.*$/, '');
      lidToPhone.set(lidUser, phone);
      console.log(`[gateway] LID mapping: ${lidUser} → ${phone}`);
    }
  });

  // Connection state changes (QR code, connected, disconnected)
  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      // New QR code generated — convert to data URL
      try {
        qrDataUrl = await QRCode.toDataURL(qr, { width: 256, margin: 2 });
        connStatus = 'qr_ready';
        qrExpired = false;
        statusMessage = 'Scan this QR code with WhatsApp → Linked Devices';
        console.log('[gateway] QR code ready — waiting for scan');
      } catch (err) {
        console.error('[gateway] QR generation failed:', err.message);
      }
    }

    if (connection === 'close') {
      const statusCode = lastDisconnect?.error?.output?.statusCode;
      const reason = lastDisconnect?.error?.output?.payload?.message || 'unknown';
      console.log(`[gateway] Connection closed: ${reason} (${statusCode})`);

      if (statusCode === DisconnectReason.loggedOut) {
        // User logged out from phone — clear auth and stop (truly non-recoverable)
        connStatus = 'disconnected';
        statusMessage = 'Logged out. Generate a new QR code to reconnect.';
        qrDataUrl = '';
        sock = null;
        reconnectAttempt = 0;
        // Remove auth store so next connect gets a fresh QR
        const fs = require('node:fs');
        const path = require('node:path');
        const authPath = path.join(__dirname, 'auth_store');
        if (fs.existsSync(authPath)) {
          fs.rmSync(authPath, { recursive: true, force: true });
        }
      } else {
        // All other disconnect reasons are recoverable — reconnect with backoff
        // Covers: restartRequired(515), timedOut(408), connectionClosed(428),
        // connectionLost(408), connectionReplaced(440), badSession(500), etc.
        reconnectAttempt++;
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempt - 1), MAX_RECONNECT_DELAY);
        console.log(`[gateway] Reconnecting in ${delay}ms (attempt ${reconnectAttempt})...`);
        statusMessage = `Reconnecting (attempt ${reconnectAttempt})...`;
        connStatus = 'disconnected';
        setTimeout(() => startConnection(), delay);
      }
    }

    if (connection === 'open') {
      connStatus = 'connected';
      qrExpired = false;
      qrDataUrl = '';
      reconnectAttempt = 0;
      statusMessage = 'Connected to WhatsApp';
      console.log('[gateway] Connected to WhatsApp!');
    }
  });

  // Incoming messages → forward to Mohini
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    for (const msg of messages) {
      // Skip messages from self and status broadcasts
      if (msg.key.fromMe) continue;
      if (msg.key.remoteJid === 'status@broadcast') continue;

      const sender = msg.key.remoteJid || '';
      const content = msg.message;
      if (!content) continue;

      // Extract phone number from JID
      // Baileys v6 uses LID JIDs (@lid) which are internal IDs, not real phone numbers.
      // The real phone JID is in msg.key.senderPn (e.g. "919001009040@s.whatsapp.net")
      // or msg.key.participantPn for group messages.
      let phone;
      const isLid = sender.endsWith('@lid');
      if (isLid) {
        // Try to get real phone from senderPn / participantPn
        const pnJid = msg.key.senderPn || msg.key.participantPn || '';
        if (pnJid) {
          phone = '+' + pnJid.replace(/@.*$/, '');
          // Cache LID → phone mapping for future use
          lidToPhone.set(sender.replace(/@.*$/, ''), phone);
        } else {
          // Check our cache
          const lidUser = sender.replace(/@.*$/, '');
          phone = lidToPhone.get(lidUser) || ('+' + lidUser);
        }
      } else {
        phone = '+' + sender.replace(/@.*$/, '');
      }
      const pushName = msg.pushName || phone;

      // ---------------------------------------------------------------
      // Admin commands (superusers only, processed before ACL check)
      // ---------------------------------------------------------------
      const rawText = content.conversation || content.extendedTextMessage?.text || '';
      const isSuperuser = acl.superusers.has(phone) || phone === OWNER_PHONE;
      if (isSuperuser && rawText.startsWith('/')) {
        const adminResult = await handleAdminCommand(rawText.trim(), sender, phone);
        if (adminResult) {
          // Admin command was handled — send response and skip normal processing
          if (sock) await sock.sendMessage(sender, { text: adminResult }).catch(() => {});
          continue;
        }
      }

      // ---------------------------------------------------------------
      // Access control — reject unauthorized senders
      // ---------------------------------------------------------------
      if (!isAllowed(phone)) {
        console.log(`[gateway] BLOCKED message from ${pushName} (${phone}) — not in allowlist`);
        if (acl.deny_message && sock) {
          await sock.sendMessage(sender, { text: acl.deny_message }).catch(() => {});
        }
        continue;
      }

      // ---------------------------------------------------------------
      // Detect media messages
      // ---------------------------------------------------------------
      const MEDIA_TYPES = {
        imageMessage:    { mime: 'image/jpeg',       ext: 'jpg',  label: 'image'    },
        videoMessage:    { mime: 'video/mp4',        ext: 'mp4',  label: 'video'    },
        audioMessage:    { mime: 'audio/ogg',        ext: 'ogg',  label: 'audio'    },
        documentMessage: { mime: 'application/octet-stream', ext: 'bin', label: 'document' },
        stickerMessage:  { mime: 'image/webp',       ext: 'webp', label: 'sticker'  },
      };

      let mediaType = null;   // key from MEDIA_TYPES
      let mediaInfo = null;   // the sub-message object (e.g. content.imageMessage)
      for (const [key, info] of Object.entries(MEDIA_TYPES)) {
        if (content[key]) {
          mediaType = key;
          mediaInfo = content[key];
          break;
        }
      }

      // Extract text: plain text, extended text, or media caption
      const text = content.conversation
        || content.extendedTextMessage?.text
        || mediaInfo?.caption
        || '';

      // If there is no text AND no media, skip
      if (!text && !mediaType) continue;

      // ---------------------------------------------------------------
      // Handle media: download, upload to Mohini, build attachments
      // ---------------------------------------------------------------
      const attachments = [];

      if (mediaType && mediaInfo) {
        const info = MEDIA_TYPES[mediaType];
        const actualMime = mediaInfo.mimetype || info.mime;
        const filename = mediaInfo.fileName
          || `whatsapp_${info.label}_${Date.now()}.${extensionFromMime(actualMime, info.ext)}`;

        console.log(`[gateway] Incoming ${info.label} from ${pushName} (${phone}), mime=${actualMime}, file=${filename}`);

        try {
          // Download media buffer from WhatsApp servers
          const buffer = await downloadMediaMessage(msg, 'buffer', {});
          console.log(`[gateway] Downloaded ${info.label}: ${buffer.length} bytes`);

          // Upload to Mohini's upload endpoint
          const uploadResult = await uploadToMohini(buffer, actualMime, filename);
          if (uploadResult) {
            attachments.push({
              file_id: uploadResult.file_id,
              filename: uploadResult.filename,
              content_type: uploadResult.content_type,
            });
            console.log(`[gateway] Uploaded ${info.label} to Mohini: file_id=${uploadResult.file_id}`);
          }
        } catch (err) {
          console.error(`[gateway] Failed to download/upload ${info.label}:`, err.message);
          // Continue — we'll still forward the text/caption if any
        }
      }

      // Build the message text to forward
      const messageText = text
        || (mediaType ? `[${MEDIA_TYPES[mediaType].label}]` : '');

      if (!messageText && attachments.length === 0) continue;

      console.log(`[gateway] Incoming from ${pushName} (${phone}): ${messageText.substring(0, 80)}${attachments.length ? ` [+${attachments.length} attachment(s)]` : ''}`);

      // Forward to Mohini agent
      try {
        // Show "typing..." indicator while Mohini processes
        if (sock) {
          await sock.sendPresenceUpdate('composing', sender);
        }

        // Keep typing indicator alive with periodic pings (WhatsApp auto-clears after ~25s)
        const typingInterval = setInterval(async () => {
          try {
            if (sock) await sock.sendPresenceUpdate('composing', sender);
          } catch (_) {}
        }, 20_000);

        // Agent routing — check for @mention prefix
        const parsed = parseAgentMention(messageText);
        const targetAgentName = parsed.agent || null;  // null = default
        const routedText = parsed.agent !== null ? parsed.text : messageText;
        let targetAgent = DEFAULT_AGENT;

        if (targetAgentName) {
          targetAgent = await resolveAgentId(targetAgentName);
          console.log(`[gateway] Routed to agent: ${targetAgentName} (${targetAgent})`);
        }

        // Smart model routing based on task complexity
        const tier = classifyComplexity(routedText, attachments);
        await switchModel(tier, targetAgent);

        // Try primary (Anthropic), fall back to Kimi K2 on failure
        let response;
        try {
          response = await forwardToMohini(routedText, phone, pushName, attachments, targetAgent);
        } catch (primaryErr) {
          console.log(`[gateway] Primary model failed (${primaryErr.message}), falling back to Kimi K2...`);
          await switchModel('kimi-k2', targetAgent);
          response = await forwardToMohini(routedText, phone, pushName, attachments, targetAgent);
          // Switch back to anthropic for next message
          await switchModel(tier, targetAgent).catch(() => {});
        }

        // Stop typing indicator
        clearInterval(typingInterval);
        if (sock) {
          await sock.sendPresenceUpdate('paused', sender).catch(() => {});
        }

        if (response && sock) {
          // Send agent response back to WhatsApp
          await sock.sendMessage(sender, { text: response });
          console.log(`[gateway] Replied to ${pushName}`);
        }
      } catch (err) {
        console.error(`[gateway] Forward/reply failed:`, err.message);
        // Clear typing on error too
        if (sock) {
          sock.sendPresenceUpdate('paused', sender).catch(() => {});
        }
      }
    }
  });
}

// ---------------------------------------------------------------------------
// Admin commands — owner can manage ACL and agents via WhatsApp
// ---------------------------------------------------------------------------
// Sync allowed users into Mohini agent workspaces so agents know who can interact
function syncUserToWorkspaces(phoneNumber, role, name) {
  const WORKSPACES_DIR = path.join(process.env.HOME || '/root', '.mohini', 'workspaces');
  try {
    if (!fs.existsSync(WORKSPACES_DIR)) return;
    const dirs = fs.readdirSync(WORKSPACES_DIR, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    for (const dir of dirs) {
      const userFile = path.join(WORKSPACES_DIR, dir, 'USER.md');
      if (!fs.existsSync(userFile)) continue;

      const content = fs.readFileSync(userFile, 'utf8');
      // Check if this phone is already in the file
      if (content.includes(phoneNumber)) continue;

      // Append the new user entry
      const entry = `- Phone: ${phoneNumber} | Role: ${role} | Name: ${name || 'Unknown'}\n`;
      fs.appendFileSync(userFile, entry);
      console.log(`[gateway] Synced user ${phoneNumber} to ${dir}/USER.md`);
    }
  } catch (e) {
    console.error(`[gateway] Failed to sync user to workspaces:`, e.message);
  }
}

// Remove user from all workspace USER.md files
function removeUserFromWorkspaces(phoneNumber) {
  const WORKSPACES_DIR = path.join(process.env.HOME || '/root', '.mohini', 'workspaces');
  try {
    if (!fs.existsSync(WORKSPACES_DIR)) return;
    const dirs = fs.readdirSync(WORKSPACES_DIR, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    for (const dir of dirs) {
      const userFile = path.join(WORKSPACES_DIR, dir, 'USER.md');
      if (!fs.existsSync(userFile)) continue;

      const content = fs.readFileSync(userFile, 'utf8');
      if (!content.includes(phoneNumber)) continue;

      // Remove lines containing this phone number
      const lines = content.split('\n').filter(line => !line.includes(phoneNumber));
      fs.writeFileSync(userFile, lines.join('\n'));
      console.log(`[gateway] Removed user ${phoneNumber} from ${dir}/USER.md`);
    }
  } catch (e) {
    console.error(`[gateway] Failed to remove user from workspaces:`, e.message);
  }
}

async function handleAdminCommand(text, sender, phone) {
  const parts = text.split(/\s+/);
  const cmd = parts[0].toLowerCase();

  // Check if the last arg is "su" — means grant superuser along with allow
  const hasSuFlag = parts[parts.length - 1]?.toLowerCase() === 'su' && parts.length > 2;

  switch (cmd) {
    case '/allow': {
      const phonesRaw = hasSuFlag ? parts.slice(1, -1) : parts.slice(1);
      const phones = phonesRaw.filter(p => p.startsWith('+'));
      if (phones.length === 0) return 'Usage: /allow +1234567890 [su]';
      for (const p of phones) {
        acl.allowlist.add(p);
        if (hasSuFlag) acl.superusers.add(p);
      }
      saveAcl(acl);
      // Sync to Mohini workspaces — agents now know these users
      for (const p of phones) {
        const role = hasSuFlag ? 'Superuser — full system permissions' : 'Allowed user';
        syncUserToWorkspaces(p, role);
      }
      const suLabel = hasSuFlag ? ' (+ superuser)' : '';
      console.log(`[gateway] ACL: ${phone} allowed ${phones.join(', ')}${suLabel}`);
      return `Allowed${suLabel}: ${phones.join(', ')}\nAllowlist: ${[...acl.allowlist].join(', ')}\nSuperusers: ${[...acl.superusers].join(', ')}`;
    }

    case '/deny':
    case '/remove':
    case '/block': {
      const phones = parts.slice(1).filter(p => p.startsWith('+'));
      if (phones.length === 0) return 'Usage: /deny +1234567890';
      for (const p of phones) {
        acl.allowlist.delete(p);
        acl.superusers.delete(p);
        if (acl.mode === 'blocklist') acl.blocklist.add(p);
        removeUserFromWorkspaces(p);
      }
      saveAcl(acl);
      console.log(`[gateway] ACL: ${phone} denied ${phones.join(', ')}`);
      return `Denied: ${phones.join(', ')}\nAllowlist: ${[...acl.allowlist].join(', ')}`;
    }

    case '/su': {
      const phones = parts.slice(1).filter(p => p.startsWith('+'));
      if (phones.length === 0) return 'Usage: /su +1234567890 — grant superuser privileges';
      for (const p of phones) {
        acl.allowlist.add(p);
        acl.superusers.add(p);
        syncUserToWorkspaces(p, 'Superuser — full system permissions');
      }
      saveAcl(acl);
      console.log(`[gateway] ACL: ${phone} granted su to ${phones.join(', ')}`);
      return `Superuser granted: ${phones.join(', ')}\nSuperusers: ${[...acl.superusers].join(', ')}`;
    }

    case '/rmsu': {
      const phones = parts.slice(1).filter(p => p.startsWith('+'));
      if (phones.length === 0) return 'Usage: /rmsu +1234567890 — revoke superuser privileges';
      for (const p of phones) acl.superusers.delete(p);
      saveAcl(acl);
      return `Superuser revoked: ${phones.join(', ')}\nSuperusers: ${[...acl.superusers].join(', ')}`;
    }

    case '/allowlist':
    case '/acl':
    case '/users': {
      const list = [...acl.allowlist];
      const sus = [...acl.superusers];
      return `ACL: ${acl.enabled ? 'enabled' : 'disabled'} (${acl.mode})\nAllowlist (${list.length}): ${list.join(', ') || '(empty)'}\nSuperusers (${sus.length}): ${sus.join(', ') || '(none)'}`;
    }

    case '/agents': {
      try {
        const agents = await fetchJson(`${MOHINI_URL}/api/agents`);
        if (!Array.isArray(agents) || agents.length === 0) return 'No agents found.';
        const lines = agents.map(a => `- *${a.name}* (${a.id.slice(0, 8)}...)`);
        return `Active agents:\n${lines.join('\n')}\n\nUse @designer, @marketer, or @mohini to route messages.`;
      } catch (e) {
        return `Failed to list agents: ${e.message}`;
      }
    }

    case '/status': {
      const health = await fetchJson(`${MOHINI_URL}/api/health`).catch(() => null);
      const connected = connStatus === 'connected';
      return `Mohini Status:\n- WhatsApp: ${connected ? 'connected' : connStatus}\n- Daemon: ${health ? 'running' : 'down'}\n- Model tier: ${currentTier}\n- ACL: ${acl.enabled ? 'enabled' : 'disabled'} (${[...acl.allowlist].length} allowed, ${[...acl.superusers].length} su)`;
    }

    case '/help': {
      return `*Mohini Admin Commands:*\n\n` +
        `/allow +number [su] — Add user (optionally as superuser)\n` +
        `/deny +number — Remove user + revoke su\n` +
        `/su +number — Grant superuser privileges\n` +
        `/rmsu +number — Revoke superuser privileges\n` +
        `/acl — View allowlist & superusers\n` +
        `/agents — List active agents\n` +
        `/status — System status\n` +
        `/help — This message\n\n` +
        `*Agent Routing:*\n` +
        `@designer <msg> — Harvard GSD design expert\n` +
        `@marketer <msg> — Harvard HBS marketing strategist\n` +
        `@mohini <msg> — Default assistant (or just send normally)`;
    }

    default:
      return null;  // Not an admin command — continue normal processing
  }
}

// ---------------------------------------------------------------------------
// Helper: extract file extension from MIME type
// ---------------------------------------------------------------------------
function extensionFromMime(mime, fallback) {
  const map = {
    'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif',
    'video/mp4': 'mp4', 'video/3gpp': '3gp',
    'audio/ogg': 'ogg', 'audio/mpeg': 'mp3', 'audio/mp4': 'm4a', 'audio/aac': 'aac',
    'audio/ogg; codecs=opus': 'ogg',
    'application/pdf': 'pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'text/plain': 'txt',
  };
  // Strip parameters (e.g. "audio/ogg; codecs=opus" → "audio/ogg")
  const base = mime.split(';')[0].trim();
  return map[mime] || map[base] || fallback || 'bin';
}

// ---------------------------------------------------------------------------
// Upload media buffer to Mohini's /api/agents/{id}/upload endpoint
// ---------------------------------------------------------------------------
function uploadToMohini(buffer, contentType, filename) {
  return new Promise((resolve, reject) => {
    const url = new URL(
      `${MOHINI_URL}/api/agents/${encodeURIComponent(DEFAULT_AGENT)}/upload`
    );

    const req = http.request(
      {
        hostname: url.hostname,
        port: url.port || 4200,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': contentType,
          'Content-Length': buffer.length,
          'X-Filename': filename,
        },
        timeout: 30_000,
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(body));
            } catch {
              reject(new Error(`Upload returned invalid JSON: ${body.substring(0, 200)}`));
            }
          } else {
            reject(new Error(`Upload failed (${res.statusCode}): ${body.substring(0, 200)}`));
          }
        });
      },
    );

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Mohini upload timeout'));
    });
    req.write(buffer);
    req.end();
  });
}

// ---------------------------------------------------------------------------
// Forward incoming message to Mohini API, return agent response
// ---------------------------------------------------------------------------
function forwardToMohini(text, phone, pushName, attachments, agentId) {
  const agent = agentId || DEFAULT_AGENT;
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      message: text,
      attachments: attachments || [],
      metadata: {
        channel: 'whatsapp',
        sender: phone,
        sender_name: pushName,
      },
    });

    const url = new URL(`${MOHINI_URL}/api/agents/${encodeURIComponent(agent)}/message`);

    const req = http.request(
      {
        hostname: url.hostname,
        port: url.port || 4200,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
        timeout: 300_000, // LLM calls can be slow, especially with PDF/media context
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            const data = JSON.parse(body);
            // The /api/agents/{id}/message endpoint returns { response: "..." }
            resolve(data.response || data.message || data.text || '');
          } catch {
            resolve(body.trim() || '');
          }
        });
      },
    );

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Mohini API timeout'));
    });
    req.write(payload);
    req.end();
  });
}

// ---------------------------------------------------------------------------
// Smart model routing — pick Haiku/Sonnet/Opus based on task complexity
// ---------------------------------------------------------------------------
const MODEL_MAP = {
  'haiku':   { provider: 'anthropic', model: 'claude-haiku-4-5-20251001' },
  'sonnet':  { provider: 'anthropic', model: 'claude-sonnet-4-20250514' },
  'opus':    { provider: 'anthropic', model: 'claude-opus-4-20250514' },
  'kimi-k2': { provider: 'nvidia',   model: 'moonshotai/kimi-k2-instruct' },
};

let currentTier = 'haiku';

function classifyComplexity(text, attachments) {
  const lower = (text || '').toLowerCase();
  const len = lower.length;
  const hasAttachments = attachments && attachments.length > 0;

  // Opus — deep analysis, coding, multi-step reasoning, long documents
  const opusPatterns = [
    /\b(implement|architect|design|refactor|debug|analyze in detail|write.*code|build.*system)\b/,
    /\b(compare.*and.*contrast|evaluate|critique|comprehensive|thorough|in-depth)\b/,
    /\b(step.by.step|multi.step|complex|advanced|research)\b/,
    /\b(create.*plan|strategy|proposal|specification|technical.*doc)\b/,
  ];
  if (opusPatterns.some(p => p.test(lower)) || (hasAttachments && len > 200) || len > 1000) {
    return 'opus';
  }

  // Sonnet — moderate tasks, summaries, explanations, creative writing
  const sonnetPatterns = [
    /\b(explain|summarize|describe|translate|rewrite|improve|suggest|help.*with)\b/,
    /\b(write|draft|compose|create|generate)\b/,
    /\b(how.*does|what.*is|why.*does|can.*you)\b/,
    /\b(list|outline|review|check)\b/,
  ];
  if (sonnetPatterns.some(p => p.test(lower)) || hasAttachments || len > 200) {
    return 'sonnet';
  }

  // Haiku — quick replies, greetings, simple questions, short messages
  return 'haiku';
}

function switchModel(tier, agentId) {
  const agent = agentId || DEFAULT_AGENT;
  const target = MODEL_MAP[tier];
  if (!target) return Promise.resolve();
  if (tier === currentTier) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(target);
    const url = new URL(
      `${MOHINI_URL}/api/agents/${encodeURIComponent(agent)}/model`
    );
    const req = http.request({
      hostname: url.hostname,
      port: url.port || 4200,
      path: url.pathname,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
      timeout: 5000,
    }, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => {
        if (res.statusCode === 200) {
          const prev = currentTier;
          currentTier = tier;
          console.log(`[gateway] Model switched: ${prev} → ${tier} (${target.provider}/${target.model})`);
        }
        resolve();
      });
    });
    req.on('error', (e) => { console.error(`[gateway] Model switch failed:`, e.message); resolve(); });
    req.on('timeout', () => { req.destroy(); resolve(); });
    req.write(payload);
    req.end();
  });
}

// ---------------------------------------------------------------------------
// Send a message via Baileys (called by Mohini for outgoing)
// ---------------------------------------------------------------------------
async function sendMessage(to, text) {
  if (!sock || connStatus !== 'connected') {
    throw new Error('WhatsApp not connected');
  }

  // Normalize phone → JID: "+1234567890" → "1234567890@s.whatsapp.net"
  const jid = to.replace(/^\+/, '').replace(/@.*$/, '') + '@s.whatsapp.net';

  await sock.sendMessage(jid, { text });
}

// ---------------------------------------------------------------------------
// HTTP server
// ---------------------------------------------------------------------------
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function jsonResponse(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
    'Access-Control-Allow-Origin': '*',
  });
  res.end(body);
}

const server = http.createServer(async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const path = url.pathname;

  try {
    // POST /login/start — start Baileys connection, return QR
    if (req.method === 'POST' && path === '/login/start') {
      // If already connected, just return success
      if (connStatus === 'connected') {
        return jsonResponse(res, 200, {
          qr_data_url: '',
          session_id: sessionId,
          message: 'Already connected to WhatsApp',
          connected: true,
        });
      }

      // Start a new connection (resets any existing)
      await startConnection();

      // Wait briefly for QR to generate (Baileys emits it quickly)
      let waited = 0;
      while (!qrDataUrl && connStatus !== 'connected' && waited < 15_000) {
        await new Promise((r) => setTimeout(r, 300));
        waited += 300;
      }

      return jsonResponse(res, 200, {
        qr_data_url: qrDataUrl,
        session_id: sessionId,
        message: statusMessage,
        connected: connStatus === 'connected',
      });
    }

    // GET /login/status — poll for connection status
    if (req.method === 'GET' && path === '/login/status') {
      return jsonResponse(res, 200, {
        connected: connStatus === 'connected',
        message: statusMessage,
        expired: qrExpired,
      });
    }

    // POST /message/send — send outgoing message via Baileys
    if (req.method === 'POST' && path === '/message/send') {
      const body = await parseBody(req);
      const { to, text } = body;

      if (!to || !text) {
        return jsonResponse(res, 400, { error: 'Missing "to" or "text" field' });
      }

      await sendMessage(to, text);
      return jsonResponse(res, 200, { success: true, message: 'Sent' });
    }

    // GET /health — health check
    if (req.method === 'GET' && path === '/health') {
      return jsonResponse(res, 200, {
        status: 'ok',
        connected: connStatus === 'connected',
        session_id: sessionId || null,
      });
    }

    // =====================================================================
    // Access Control List (ACL) management endpoints
    // =====================================================================

    // GET /acl — view current ACL config
    if (req.method === 'GET' && path === '/acl') {
      return jsonResponse(res, 200, {
        enabled: acl.enabled,
        mode: acl.mode,
        allowlist: [...acl.allowlist],
        superusers: [...acl.superusers],
        blocklist: [...acl.blocklist],
        deny_message: acl.deny_message,
      });
    }

    // PUT /acl — replace entire ACL config
    if (req.method === 'PUT' && path === '/acl') {
      const body = await parseBody(req);
      if (body.enabled !== undefined) acl.enabled = !!body.enabled;
      if (body.mode) acl.mode = body.mode;
      if (Array.isArray(body.allowlist)) acl.allowlist = new Set(body.allowlist);
      if (Array.isArray(body.blocklist)) acl.blocklist = new Set(body.blocklist);
      if (body.deny_message !== undefined) acl.deny_message = body.deny_message;
      saveAcl(acl);
      console.log(`[gateway] ACL updated: enabled=${acl.enabled} mode=${acl.mode} allowlist=[${[...acl.allowlist]}] blocklist=[${[...acl.blocklist]}]`);
      return jsonResponse(res, 200, { status: 'ok', ...body });
    }

    // POST /acl/allow — add phone number(s) to allowlist
    if (req.method === 'POST' && path === '/acl/allow') {
      const body = await parseBody(req);
      const phones = Array.isArray(body.phones) ? body.phones : (body.phone ? [body.phone] : []);
      for (const p of phones) acl.allowlist.add(p);
      saveAcl(acl);
      console.log(`[gateway] ACL: added to allowlist: ${phones.join(', ')}`);
      return jsonResponse(res, 200, { status: 'ok', allowlist: [...acl.allowlist] });
    }

    // POST /acl/deny — remove phone number(s) from allowlist (or add to blocklist)
    if (req.method === 'POST' && path === '/acl/deny') {
      const body = await parseBody(req);
      const phones = Array.isArray(body.phones) ? body.phones : (body.phone ? [body.phone] : []);
      for (const p of phones) {
        acl.allowlist.delete(p);
        if (acl.mode === 'blocklist') acl.blocklist.add(p);
      }
      saveAcl(acl);
      console.log(`[gateway] ACL: denied: ${phones.join(', ')}`);
      return jsonResponse(res, 200, { status: 'ok', allowlist: [...acl.allowlist], blocklist: [...acl.blocklist] });
    }

    // DELETE /acl/allow — remove phone from allowlist
    if (req.method === 'DELETE' && path === '/acl/allow') {
      const body = await parseBody(req);
      const phones = Array.isArray(body.phones) ? body.phones : (body.phone ? [body.phone] : []);
      for (const p of phones) acl.allowlist.delete(p);
      saveAcl(acl);
      return jsonResponse(res, 200, { status: 'ok', allowlist: [...acl.allowlist] });
    }

    // 404
    jsonResponse(res, 404, { error: 'Not found' });
  } catch (err) {
    console.error(`[gateway] ${req.method} ${path} error:`, err.message);
    jsonResponse(res, 500, { error: err.message });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[gateway] WhatsApp Web gateway listening on http://127.0.0.1:${PORT}`);
  console.log(`[gateway] Mohini URL: ${MOHINI_URL}`);
  console.log(`[gateway] Default agent: ${DEFAULT_AGENT}`);

  // Auto-connect if credentials already exist from a previous session
  const fs = require('node:fs');
  const path = require('node:path');
  const credsPath = path.join(__dirname, 'auth_store', 'creds.json');
  if (fs.existsSync(credsPath)) {
    console.log('[gateway] Found existing credentials — auto-connecting...');
    startConnection().catch((err) => {
      console.error('[gateway] Auto-connect failed:', err.message);
      statusMessage = 'Auto-connect failed. Use POST /login/start to retry.';
    });
  } else {
    console.log('[gateway] No credentials found. Waiting for POST /login/start to begin QR flow...');
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n[gateway] Shutting down...');
  if (sock) sock.end();
  server.close(() => process.exit(0));
});

process.on('SIGTERM', () => {
  if (sock) sock.end();
  server.close(() => process.exit(0));
});
