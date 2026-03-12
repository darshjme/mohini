// Mohini Skills Page — LegacyImport/SkillHub ecosystem + local skills + MCP servers
'use strict';

function skillsPage() {
  return {
    tab: 'installed',
    skills: [],
    loading: true,
    loadError: '',

    // SkillHub state
    skillhubSearch: '',
    skillhubResults: [],
    skillhubBrowseResults: [],
    skillhubLoading: false,
    skillhubError: '',
    skillhubSort: 'trending',
    skillhubNextCursor: null,
    installingSlug: null,
    installResult: null,
    _searchTimer: null,
    _browseCache: {},    // { key: { ts, data } } client-side 60s cache
    _searchCache: {},

    // Skill detail modal
    skillDetail: null,
    detailLoading: false,
    showSkillCode: false,
    skillCode: '',
    skillCodeFilename: '',
    skillCodeLoading: false,

    // MCP servers
    mcpServers: [],
    mcpLoading: false,

    // Category definitions from the LegacyImport ecosystem
    categories: [
      { id: 'coding', name: 'Coding & IDEs' },
      { id: 'git', name: 'Git & GitHub' },
      { id: 'web', name: 'Web & Frontend' },
      { id: 'devops', name: 'DevOps & Cloud' },
      { id: 'browser', name: 'Browser & Automation' },
      { id: 'search', name: 'Search & Research' },
      { id: 'ai', name: 'AI & LLMs' },
      { id: 'data', name: 'Data & Analytics' },
      { id: 'productivity', name: 'Productivity' },
      { id: 'communication', name: 'Communication' },
      { id: 'media', name: 'Media & Streaming' },
      { id: 'notes', name: 'Notes & PKM' },
      { id: 'security', name: 'Security' },
      { id: 'cli', name: 'CLI Utilities' },
      { id: 'marketing', name: 'Marketing & Sales' },
      { id: 'finance', name: 'Finance' },
      { id: 'smart-home', name: 'Smart Home & IoT' },
      { id: 'docs', name: 'PDF & Documents' },
    ],

    runtimeBadge: function(rt) {
      var r = (rt || '').toLowerCase();
      if (r === 'python' || r === 'py') return { text: 'PY', cls: 'runtime-badge-py' };
      if (r === 'node' || r === 'nodejs' || r === 'js' || r === 'javascript') return { text: 'JS', cls: 'runtime-badge-js' };
      if (r === 'wasm' || r === 'webassembly') return { text: 'WASM', cls: 'runtime-badge-wasm' };
      if (r === 'prompt_only' || r === 'prompt' || r === 'promptonly') return { text: 'PROMPT', cls: 'runtime-badge-prompt' };
      return { text: r.toUpperCase().substring(0, 4), cls: 'runtime-badge-prompt' };
    },

    sourceBadge: function(source) {
      if (!source) return { text: 'Local', cls: 'badge-dim' };
      switch (source.type) {
        case 'skillhub': return { text: 'SkillHub', cls: 'badge-info' };
        case 'legacy_import': return { text: 'LegacyImport', cls: 'badge-info' };
        case 'bundled': return { text: 'Built-in', cls: 'badge-success' };
        default: return { text: 'Local', cls: 'badge-dim' };
      }
    },

    formatDownloads: function(n) {
      if (!n) return '0';
      if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
      if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
      return n.toString();
    },

    async loadSkills() {
      this.loading = true;
      this.loadError = '';
      try {
        var data = await MohiniAPI.get('/api/skills');
        this.skills = (data.skills || []).map(function(s) {
          return {
            name: s.name,
            description: s.description || '',
            version: s.version || '',
            author: s.author || '',
            runtime: s.runtime || 'unknown',
            tools_count: s.tools_count || 0,
            tags: s.tags || [],
            enabled: s.enabled !== false,
            source: s.source || { type: 'local' },
            has_prompt_context: !!s.has_prompt_context
          };
        });
      } catch(e) {
        this.skills = [];
        this.loadError = e.message || 'Could not load skills.';
      }
      this.loading = false;
    },

    async loadData() {
      await this.loadSkills();
    },

    // Debounced search — fires 350ms after user stops typing
    onSearchInput() {
      if (this._searchTimer) clearTimeout(this._searchTimer);
      var q = this.skillhubSearch.trim();
      if (!q) {
        this.skillhubResults = [];
        this.skillhubError = '';
        return;
      }
      var self = this;
      this._searchTimer = setTimeout(function() { self.searchSkillHub(); }, 350);
    },

    // SkillHub search
    async searchSkillHub() {
      if (!this.skillhubSearch.trim()) {
        this.skillhubResults = [];
        return;
      }
      this.skillhubLoading = true;
      this.skillhubError = '';
      try {
        var data = await MohiniAPI.get('/api/skillhub/search?q=' + encodeURIComponent(this.skillhubSearch.trim()) + '&limit=20');
        this.skillhubResults = data.items || [];
        if (data.error) this.skillhubError = data.error;
      } catch(e) {
        this.skillhubResults = [];
        this.skillhubError = e.message || 'Search failed';
      }
      this.skillhubLoading = false;
    },

    // Clear search and go back to browse
    clearSearch() {
      this.skillhubSearch = '';
      this.skillhubResults = [];
      this.skillhubError = '';
      if (this._searchTimer) clearTimeout(this._searchTimer);
    },

    // SkillHub browse by sort (with 60s client-side cache)
    async browseSkillHub(sort) {
      this.skillhubSort = sort || 'trending';
      var ckey = 'browse:' + this.skillhubSort;
      var cached = this._browseCache[ckey];
      if (cached && (Date.now() - cached.ts) < 60000) {
        this.skillhubBrowseResults = cached.data.items || [];
        this.skillhubNextCursor = cached.data.next_cursor || null;
        return;
      }
      this.skillhubLoading = true;
      this.skillhubError = '';
      this.skillhubNextCursor = null;
      try {
        var data = await MohiniAPI.get('/api/skillhub/browse?sort=' + this.skillhubSort + '&limit=20');
        this.skillhubBrowseResults = data.items || [];
        this.skillhubNextCursor = data.next_cursor || null;
        if (data.error) this.skillhubError = data.error;
        this._browseCache[ckey] = { ts: Date.now(), data: data };
      } catch(e) {
        this.skillhubBrowseResults = [];
        this.skillhubError = e.message || 'Browse failed';
      }
      this.skillhubLoading = false;
    },

    // SkillHub load more results
    async loadMoreSkillHub() {
      if (!this.skillhubNextCursor || this.skillhubLoading) return;
      this.skillhubLoading = true;
      try {
        var data = await MohiniAPI.get('/api/skillhub/browse?sort=' + this.skillhubSort + '&limit=20&cursor=' + encodeURIComponent(this.skillhubNextCursor));
        this.skillhubBrowseResults = this.skillhubBrowseResults.concat(data.items || []);
        this.skillhubNextCursor = data.next_cursor || null;
      } catch(e) {
        // silently fail on load more
      }
      this.skillhubLoading = false;
    },

    // Show skill detail
    async showSkillDetail(slug) {
      this.detailLoading = true;
      this.skillDetail = null;
      this.installResult = null;
      try {
        var data = await MohiniAPI.get('/api/skillhub/skill/' + encodeURIComponent(slug));
        this.skillDetail = data;
      } catch(e) {
        MohiniToast.error('Failed to load skill details');
      }
      this.detailLoading = false;
    },

    closeDetail() {
      this.skillDetail = null;
      this.installResult = null;
      this.showSkillCode = false;
      this.skillCode = '';
      this.skillCodeFilename = '';
    },

    async viewSkillCode(slug) {
      if (this.showSkillCode) {
        this.showSkillCode = false;
        return;
      }
      this.skillCodeLoading = true;
      try {
        var data = await MohiniAPI.get('/api/skillhub/skill/' + encodeURIComponent(slug) + '/code');
        this.skillCode = data.code || '';
        this.skillCodeFilename = data.filename || 'source';
        this.showSkillCode = true;
      } catch(e) {
        MohiniToast.error('Could not load skill source code');
      }
      this.skillCodeLoading = false;
    },

    // Install from SkillHub
    async installFromSkillHub(slug) {
      this.installingSlug = slug;
      this.installResult = null;
      try {
        var data = await MohiniAPI.post('/api/skillhub/install', { slug: slug });
        this.installResult = data;
        if (data.warnings && data.warnings.length > 0) {
          MohiniToast.success('Skill "' + data.name + '" installed with ' + data.warnings.length + ' warning(s)');
        } else {
          MohiniToast.success('Skill "' + data.name + '" installed successfully');
        }
        // Update installed state in detail modal if open
        if (this.skillDetail && this.skillDetail.slug === slug) {
          this.skillDetail.installed = true;
        }
        await this.loadSkills();
      } catch(e) {
        var msg = e.message || 'Install failed';
        if (msg.includes('already_installed')) {
          MohiniToast.error('Skill is already installed');
        } else if (msg.includes('SecurityBlocked')) {
          MohiniToast.error('Skill blocked by security scan');
        } else {
          MohiniToast.error('Install failed: ' + msg);
        }
      }
      this.installingSlug = null;
    },

    // Uninstall
    uninstallSkill: function(name) {
      var self = this;
      MohiniToast.confirm('Uninstall Skill', 'Uninstall skill "' + name + '"? This cannot be undone.', async function() {
        try {
          await MohiniAPI.post('/api/skills/uninstall', { name: name });
          MohiniToast.success('Skill "' + name + '" uninstalled');
          await self.loadSkills();
        } catch(e) {
          MohiniToast.error('Failed to uninstall skill: ' + e.message);
        }
      });
    },

    // Create prompt-only skill
    async createDemoSkill(skill) {
      try {
        await MohiniAPI.post('/api/skills/create', {
          name: skill.name,
          description: skill.description,
          runtime: 'prompt_only',
          prompt_context: skill.prompt_context || skill.description
        });
        MohiniToast.success('Skill "' + skill.name + '" created');
        this.tab = 'installed';
        await this.loadSkills();
      } catch(e) {
        MohiniToast.error('Failed to create skill: ' + e.message);
      }
    },

    // Load MCP servers
    async loadMcpServers() {
      this.mcpLoading = true;
      try {
        var data = await MohiniAPI.get('/api/mcp/servers');
        this.mcpServers = data;
      } catch(e) {
        this.mcpServers = { configured: [], connected: [], total_configured: 0, total_connected: 0 };
      }
      this.mcpLoading = false;
    },

    // Category search on SkillHub
    searchCategory: function(cat) {
      this.skillhubSearch = cat.name;
      this.searchSkillHub();
    },

    // Quick start skills (prompt-only, zero deps)
    quickStartSkills: [
      { name: 'code-review-guide', description: 'Adds code review best practices and checklist to agent context.', prompt_context: 'You are an expert code reviewer. When reviewing code:\n1. Check for bugs and logic errors\n2. Evaluate code style and readability\n3. Look for security vulnerabilities\n4. Suggest performance improvements\n5. Verify error handling\n6. Check test coverage' },
      { name: 'writing-style', description: 'Configurable writing style guide for content generation.', prompt_context: 'Follow these writing guidelines:\n- Use clear, concise language\n- Prefer active voice over passive voice\n- Keep paragraphs short (3-4 sentences)\n- Use bullet points for lists\n- Maintain consistent tone throughout' },
      { name: 'api-design', description: 'REST API design patterns and conventions.', prompt_context: 'When designing REST APIs:\n- Use nouns for resources, not verbs\n- Use HTTP methods correctly (GET, POST, PUT, DELETE)\n- Return appropriate status codes\n- Use pagination for list endpoints\n- Version your API\n- Document all endpoints' },
      { name: 'security-checklist', description: 'OWASP-aligned security review checklist.', prompt_context: 'Security review checklist (OWASP aligned):\n- Input validation on all user inputs\n- Output encoding to prevent XSS\n- Parameterized queries to prevent SQL injection\n- Authentication and session management\n- Access control checks\n- CSRF protection\n- Security headers\n- Error handling without information leakage' },
    ],

    // Check if skill is installed by slug
    isSkillInstalled: function(slug) {
      return this.skills.some(function(s) {
        return s.source && s.source.type === 'skillhub' && s.source.slug === slug;
      });
    },

    // Check if skill is installed by name
    isSkillInstalledByName: function(name) {
      return this.skills.some(function(s) { return s.name === name; });
    },
  };
}
