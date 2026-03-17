import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Badge, Button, Table, ProgressBar, Modal, Form } from 'react-bootstrap';
import mohiniAPI from '../../api/mohini-api';

const STATUS_COLORS = {
  running: 'success',
  idle: 'secondary',
  error: 'danger',
  spawning: 'warning',
  completed: 'info',
};

const MOCK_AGENTS = [
  { id: 'sa-001', name: 'Research Colonel', model: 'claude-opus-4', status: 'running', task: 'Market analysis for fintech', uptime: '2h 14m', tokens: 45200 },
  { id: 'sa-002', name: 'Code General', model: 'claude-opus-4', status: 'running', task: 'Building REST API', uptime: '1h 38m', tokens: 89100 },
  { id: 'sa-003', name: 'Scout Soldier', model: 'gemini-flash', status: 'idle', task: 'Awaiting orders', uptime: '45m', tokens: 12300 },
  { id: 'sa-004', name: 'Design Colonel', model: 'claude-sonnet', status: 'completed', task: 'UI mockups delivered', uptime: '3h 02m', tokens: 67800 },
  { id: 'sa-005', name: 'Test Soldier', model: 'haiku', status: 'error', task: 'E2E tests failed — retry queued', uptime: '22m', tokens: 8900 },
];

const AgentOrchestration = () => {
  const [agents, setAgents] = useState(MOCK_AGENTS);
  const [showSpawn, setShowSpawn] = useState(false);
  const [spawnConfig, setSpawnConfig] = useState({ task: '', model: 'claude-opus-4', priority: 'colonel' });

  const activeCount = agents.filter(a => a.status === 'running').length;
  const totalTokens = agents.reduce((sum, a) => sum + a.tokens, 0);

  const handleSpawn = () => {
    const newAgent = {
      id: `sa-${String(agents.length + 1).padStart(3, '0')}`,
      name: `Agent ${agents.length + 1}`,
      model: spawnConfig.model,
      status: 'spawning',
      task: spawnConfig.task,
      uptime: '0m',
      tokens: 0,
    };
    setAgents([newAgent, ...agents]);
    setShowSpawn(false);
    setSpawnConfig({ task: '', model: 'claude-opus-4', priority: 'colonel' });
  };

  const handleKill = (id) => {
    setAgents(agents.filter(a => a.id !== id));
  };

  return (
    <>
      <div className="page-titles">
        <h4>Shadow Army Command Center</h4>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
          <li className="breadcrumb-item active">Shadow Army</li>
        </ol>
      </div>

      <Row className="mb-4">
        <Col xl={3} sm={6}>
          <Card className="shadow-card">
            <Card.Body className="text-center">
              <h2 className="text-mohini-blue">{agents.length}</h2>
              <p className="mb-0">Total Agents</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="shadow-card">
            <Card.Body className="text-center">
              <h2 className="text-success">{activeCount}</h2>
              <p className="mb-0">Active</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="shadow-card">
            <Card.Body className="text-center">
              <h2 className="text-mohini-gold">{(totalTokens / 1000).toFixed(1)}K</h2>
              <p className="mb-0">Tokens Used</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="shadow-card">
            <Card.Body className="text-center">
              <Button variant="primary" onClick={() => setShowSpawn(true)} className="btn-mohini">
                🪷 ARISE — Spawn Agent
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Header>
          <Card.Title>Shadow Soldiers</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table responsive hover className="table-mohini">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Model</th>
                <th>Status</th>
                <th>Task</th>
                <th>Uptime</th>
                <th>Tokens</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id}>
                  <td><code>{agent.id}</code></td>
                  <td><strong>{agent.name}</strong></td>
                  <td><Badge bg="dark">{agent.model}</Badge></td>
                  <td><Badge bg={STATUS_COLORS[agent.status]}>{agent.status}</Badge></td>
                  <td>{agent.task}</td>
                  <td>{agent.uptime}</td>
                  <td>{agent.tokens.toLocaleString()}</td>
                  <td>
                    <Button size="sm" variant="outline-warning" className="me-1">Steer</Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleKill(agent.id)}>Kill</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showSpawn} onHide={() => setShowSpawn(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>🪷 ARISE — Spawn New Agent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={spawnConfig.task}
                onChange={(e) => setSpawnConfig({ ...spawnConfig, task: e.target.value })}
                placeholder="Describe the mission for this shadow soldier..." />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Model</Form.Label>
              <Form.Select value={spawnConfig.model}
                onChange={(e) => setSpawnConfig({ ...spawnConfig, model: e.target.value })}>
                <option value="claude-opus-4">Claude Opus 4 (General)</option>
                <option value="claude-sonnet">Claude Sonnet (Colonel)</option>
                <option value="gemini-flash">Gemini Flash (Soldier)</option>
                <option value="haiku">Haiku (Scout)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rank</Form.Label>
              <Form.Select value={spawnConfig.priority}
                onChange={(e) => setSpawnConfig({ ...spawnConfig, priority: e.target.value })}>
                <option value="general">General (Heavy-duty)</option>
                <option value="colonel">Colonel (Mid-tier)</option>
                <option value="soldier">Soldier (Quick recon)</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSpawn(false)}>Cancel</Button>
          <Button variant="primary" className="btn-mohini" onClick={handleSpawn} disabled={!spawnConfig.task}>
            ARISE 🪷
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AgentOrchestration;
