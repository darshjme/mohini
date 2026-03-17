import React, { useState } from 'react';
import { Card, Row, Col, Badge, Button, Table, Form, InputGroup } from 'react-bootstrap';

const MOCK_MEMORIES = [
  { id: 'm-001', text: 'Darshan prefers direct communication, no fluff', category: 'preference', importance: 0.9, created: '2026-03-15', source: 'whatsapp' },
  { id: 'm-002', text: 'SSH access to MacBook Pro confirmed working via Tailscale', category: 'fact', importance: 0.8, created: '2026-03-14', source: 'system' },
  { id: 'm-003', text: 'Het Vyas task in progress — deadline pending', category: 'fact', importance: 0.7, created: '2026-03-16', source: 'whatsapp' },
  { id: 'm-004', text: 'Brahmand CLI v1.1.0 ready for npm publish', category: 'entity', importance: 0.85, created: '2026-02-22', source: 'github' },
  { id: 'm-005', text: 'Maa (Asha Joshi) is sacred — always prioritize her calls', category: 'decision', importance: 1.0, created: '2026-02-22', source: 'darshan' },
];

const CATEGORY_COLORS = {
  preference: 'info',
  fact: 'primary',
  decision: 'warning',
  entity: 'success',
  other: 'secondary',
};

const MemoryExplorer = () => {
  const [memories, setMemories] = useState(MOCK_MEMORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filtered = memories.filter(m => {
    const matchesSearch = !searchQuery || m.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || m.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: memories.length,
    preferences: memories.filter(m => m.category === 'preference').length,
    facts: memories.filter(m => m.category === 'fact').length,
    decisions: memories.filter(m => m.category === 'decision').length,
  };

  return (
    <>
      <div className="page-titles">
        <h4>Memory Explorer — Vector DB Browser</h4>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
          <li className="breadcrumb-item active">Memory</li>
        </ol>
      </div>

      <Row className="mb-4">
        <Col xl={3} sm={6}>
          <Card className="shadow-card"><Card.Body className="text-center">
            <h2 className="text-mohini-blue">{stats.total}</h2><p className="mb-0">Total Memories</p>
          </Card.Body></Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="shadow-card"><Card.Body className="text-center">
            <h2 className="text-info">{stats.preferences}</h2><p className="mb-0">Preferences</p>
          </Card.Body></Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="shadow-card"><Card.Body className="text-center">
            <h2 className="text-mohini-gold">{stats.facts}</h2><p className="mb-0">Facts</p>
          </Card.Body></Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="shadow-card"><Card.Body className="text-center">
            <h2 className="text-warning">{stats.decisions}</h2><p className="mb-0">Decisions</p>
          </Card.Body></Card>
        </Col>
      </Row>

      <Card>
        <Card.Header>
          <Card.Title>Semantic Search</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={8}>
              <InputGroup>
                <Form.Control placeholder="Search memories (semantic + keyword)..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <Button variant="primary" className="btn-mohini">🔍 Search</Button>
              </InputGroup>
            </Col>
            <Col md={4}>
              <Form.Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="all">All Categories</option>
                <option value="preference">Preferences</option>
                <option value="fact">Facts</option>
                <option value="decision">Decisions</option>
                <option value="entity">Entities</option>
              </Form.Select>
            </Col>
          </Row>

          <Table responsive hover className="table-mohini">
            <thead>
              <tr>
                <th>Memory</th>
                <th>Category</th>
                <th>Importance</th>
                <th>Source</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((memory) => (
                <tr key={memory.id}>
                  <td style={{ maxWidth: '400px' }}>{memory.text}</td>
                  <td><Badge bg={CATEGORY_COLORS[memory.category]}>{memory.category}</Badge></td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="progress" style={{ width: '60px', height: '8px' }}>
                        <div className="progress-bar bg-mohini-gold" style={{ width: `${memory.importance * 100}%` }} />
                      </div>
                      <span className="ms-2">{memory.importance}</span>
                    </div>
                  </td>
                  <td><Badge bg="dark">{memory.source}</Badge></td>
                  <td>{memory.created}</td>
                  <td>
                    <Button size="sm" variant="outline-danger">Forget</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default MemoryExplorer;
