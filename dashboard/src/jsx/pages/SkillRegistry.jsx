import React, { useState } from 'react';
import { Card, Row, Col, Badge, Button, Form, InputGroup } from 'react-bootstrap';

const MOCK_SKILLS = [
  { name: 'coding-agent', category: 'Development', description: 'Delegate coding tasks to Codex, Claude Code, or Pi agents', status: 'active', executions: 342, avgTime: '4.2m' },
  { name: 'gemini', category: 'AI/LLM', description: 'Gemini CLI for one-shot Q&A, summaries, generation', status: 'active', executions: 189, avgTime: '12s' },
  { name: 'github', category: 'Development', description: 'GitHub operations via gh CLI: issues, PRs, CI runs', status: 'active', executions: 276, avgTime: '8s' },
  { name: 'weather', category: 'Utility', description: 'Current weather and forecasts via wttr.in', status: 'active', executions: 45, avgTime: '3s' },
  { name: 'nano-banana-pro', category: 'Creative', description: 'Generate or edit images via Gemini 3 Pro', status: 'active', executions: 67, avgTime: '15s' },
  { name: 'skill-creator', category: 'Meta', description: 'Create or update AgentSkills', status: 'active', executions: 12, avgTime: '2.1m' },
  { name: 'tmux', category: 'System', description: 'Remote-control tmux sessions', status: 'active', executions: 98, avgTime: '5s' },
  { name: 'video-frames', category: 'Media', description: 'Extract frames or clips from videos via ffmpeg', status: 'active', executions: 23, avgTime: '30s' },
  { name: 'html-to-figma', category: 'Design', description: 'Convert HTML/CSS to Figma designs', status: 'active', executions: 8, avgTime: '45s' },
  { name: 'voice-call-agent', category: 'Communication', description: 'Real-time AI voice phone calls', status: 'inactive', executions: 5, avgTime: '3.5m' },
  { name: 'researcher', category: 'Hands', description: 'Deep research with multi-phase playbook', status: 'active', executions: 156, avgTime: '8.2m' },
  { name: 'lead-gen', category: 'Hands', description: 'Lead generation and outreach', status: 'active', executions: 34, avgTime: '12m' },
];

const CATEGORY_COLORS = {
  Development: '#4A90D9',
  'AI/LLM': '#E8729A',
  Utility: '#D4A843',
  Creative: '#9B59B6',
  Meta: '#3498DB',
  System: '#2ECC71',
  Media: '#E74C3C',
  Design: '#F39C12',
  Communication: '#1ABC9C',
  Hands: '#8E44AD',
};

const SkillRegistry = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = [...new Set(MOCK_SKILLS.map(s => s.category))];
  const filtered = MOCK_SKILLS.filter(s => {
    const matchesSearch = !search || s.name.includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'all' || s.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <>
      <div className="page-titles">
        <h4>Skill Registry — 104 Skills Catalog</h4>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
          <li className="breadcrumb-item active">Skills</li>
        </ol>
      </div>

      <Row className="mb-4">
        <Col xl={3} sm={6}>
          <Card className="shadow-card"><Card.Body className="text-center">
            <h2 className="text-mohini-blue">104</h2><p className="mb-0">Total Skills</p>
          </Card.Body></Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="shadow-card"><Card.Body className="text-center">
            <h2 className="text-success">{MOCK_SKILLS.filter(s => s.status === 'active').length}</h2><p className="mb-0">Active</p>
          </Card.Body></Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="shadow-card"><Card.Body className="text-center">
            <h2 className="text-mohini-gold">{categories.length}</h2><p className="mb-0">Categories</p>
          </Card.Body></Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="shadow-card"><Card.Body className="text-center">
            <h2 className="text-mohini-pink">{MOCK_SKILLS.reduce((s, sk) => s + sk.executions, 0).toLocaleString()}</h2><p className="mb-0">Total Executions</p>
          </Card.Body></Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={8}>
              <InputGroup>
                <Form.Control placeholder="Search skills..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <Button variant="primary" className="btn-mohini">Search</Button>
              </InputGroup>
            </Col>
            <Col md={4}>
              <Form.Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="all">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row>
        {filtered.map((skill) => (
          <Col xl={4} md={6} key={skill.name}>
            <Card className="shadow-card mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="mb-0"><code>/{skill.name}</code></h5>
                  <Badge bg={skill.status === 'active' ? 'success' : 'secondary'}>{skill.status}</Badge>
                </div>
                <p className="text-muted mb-3">{skill.description}</p>
                <div className="d-flex justify-content-between">
                  <Badge style={{ backgroundColor: CATEGORY_COLORS[skill.category] }}>{skill.category}</Badge>
                  <span className="text-muted">{skill.executions} runs · avg {skill.avgTime}</span>
                </div>
                <Button size="sm" variant="outline-primary" className="mt-3 w-100">Execute</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default SkillRegistry;
