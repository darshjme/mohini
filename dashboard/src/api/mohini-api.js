/**
 * Mohini API Client
 * Handles all communication with the Mohini backend.
 * Real backend integration comes later — these are placeholder calls.
 */

const API_BASE = import.meta.env.VITE_MOHINI_API_URL || 'http://localhost:18789/api';
const WS_BASE = import.meta.env.VITE_MOHINI_WS_URL || 'ws://localhost:18789/ws';

class MohiniAPI {
  constructor() {
    this.baseURL = API_BASE;
    this.wsURL = WS_BASE;
    this.ws = null;
    this.listeners = new Map();
  }

  // ─── HTTP Helpers ───────────────────────────────────────────────

  async _fetch(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = localStorage.getItem('mohini_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`[MohiniAPI] ${endpoint}:`, error);
      throw error;
    }
  }

  async get(endpoint) {
    return this._fetch(endpoint, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this._fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this._fetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async del(endpoint) {
    return this._fetch(endpoint, { method: 'DELETE' });
  }

  // ─── Agents / Shadow Army ──────────────────────────────────────

  async getAgents() {
    return this.get('/agents');
  }

  async getAgent(id) {
    return this.get(`/agents/${id}`);
  }

  async spawnAgent(config) {
    return this.post('/agents/spawn', config);
  }

  async killAgent(id) {
    return this.del(`/agents/${id}`);
  }

  async steerAgent(id, message) {
    return this.post(`/agents/${id}/steer`, { message });
  }

  async getAgentLogs(id, limit = 100) {
    return this.get(`/agents/${id}/logs?limit=${limit}`);
  }

  // ─── Memory ────────────────────────────────────────────────────

  async getMemories(query = '', limit = 50) {
    const params = new URLSearchParams({ query, limit: String(limit) });
    return this.get(`/memory?${params}`);
  }

  async storeMemory(text, category = 'fact', importance = 0.7) {
    return this.post('/memory', { text, category, importance });
  }

  async deleteMemory(id) {
    return this.del(`/memory/${id}`);
  }

  async searchMemory(query, limit = 10) {
    return this.post('/memory/search', { query, limit });
  }

  // ─── Skills ────────────────────────────────────────────────────

  async getSkills() {
    return this.get('/skills');
  }

  async getSkill(name) {
    return this.get(`/skills/${name}`);
  }

  async executeSkill(name, params = {}) {
    return this.post(`/skills/${name}/execute`, params);
  }

  // ─── Channels ──────────────────────────────────────────────────

  async getChannels() {
    return this.get('/channels');
  }

  async getChannel(id) {
    return this.get(`/channels/${id}`);
  }

  async toggleChannel(id, enabled) {
    return this.put(`/channels/${id}`, { enabled });
  }

  // ─── Hands (Autonomous Workers) ────────────────────────────────

  async getHands() {
    return this.get('/hands');
  }

  async getHand(name) {
    return this.get(`/hands/${name}`);
  }

  async triggerHand(name, params = {}) {
    return this.post(`/hands/${name}/trigger`, params);
  }

  async getHandLogs(name, limit = 50) {
    return this.get(`/hands/${name}/logs?limit=${limit}`);
  }

  // ─── System ────────────────────────────────────────────────────

  async getSystemHealth() {
    return this.get('/system/health');
  }

  async getSystemMetrics() {
    return this.get('/system/metrics');
  }

  async getWorkflows() {
    return this.get('/workflows');
  }

  // ─── WebSocket (Real-time Updates) ─────────────────────────────

  connect() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) return;

    this.ws = new WebSocket(this.wsURL);

    this.ws.onopen = () => {
      console.log('[MohiniAPI] WebSocket connected');
      this._emit('connected', {});
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this._emit(data.type, data.payload);
      } catch (e) {
        console.warn('[MohiniAPI] Invalid WS message:', event.data);
      }
    };

    this.ws.onclose = () => {
      console.log('[MohiniAPI] WebSocket disconnected, reconnecting in 5s...');
      this._emit('disconnected', {});
      setTimeout(() => this.connect(), 5000);
    };

    this.ws.onerror = (error) => {
      console.error('[MohiniAPI] WebSocket error:', error);
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    const cbs = this.listeners.get(event);
    if (cbs) {
      this.listeners.set(event, cbs.filter(cb => cb !== callback));
    }
  }

  _emit(event, data) {
    const cbs = this.listeners.get(event) || [];
    cbs.forEach(cb => cb(data));
  }
}

// Singleton instance
const mohiniAPI = new MohiniAPI();
export default mohiniAPI;
