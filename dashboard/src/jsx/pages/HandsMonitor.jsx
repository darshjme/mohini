import React, { useState } from 'react';
import { Card, Row, Col, Badge, Button, Table, ProgressBar } from 'react-bootstrap';

const MOCK_HANDS = [
  { name: 'Researcher', status: 'active', phase: 'ANALYZE', progress: 65, currentTask: 'Competitive analysis for SaaS market', lastRun: '2 min ago', totalRuns: 156, successRate: 94 },
  { name: 'Collector', status: 'active', phase: 'COLLECT', progress: 40, currentTask: 'Scraping product listings from 12 sites', lastRun: '5 min ago', totalRuns: 89, successRate: 91 },
  { name: 'Lead-Gen', status: 'idle', phase: 'READY', progress: 0, currentTask: 'Awaiting trigger', lastRun: '1h ago', totalRuns: 34, successRate: 88 },
  { name: 'Clip', status: 'active', phase: 'SYNTHESIZE', progress: 80, currentTask: 'Generating highlight reel from 3 videos', lastRun: '12 min ago', totalRuns: 23, successRate: 96 },
  { name: 'Publisher', status: 'inactive', phase: 'OFFLINE', progress: 0, currentTask: 'Disabled by admin', lastRun: '2d ago', totalRuns: 67, successRate: 85 },
  { name: 'Monitor', status: 'active', phase: 'DELIVER', progress: 95, currentTask: 'System health report generation', lastRun: '30s ago', totalRuns: 1204, successRate: 99 },
  { name: 'Outreach', status: 'idle', phase: 'READY', progress: 0, currentTask: 'Queued: Email campaign batch', lastRun: '45m ago', totalRuns: 45, successRate: 82 },
  { name: 'Auditor', status: 'active', phase: 'REFLECT', progress: 90, currentTask: 'Security audit on 3 repos', lastRun: '8 min ago', totalRuns: 112, successRate: 97 },
];

const PHASE_COLORS = {
  INIT: 'secondary', RESEARCH: 'info', COLLECT: 'primary', ANALYZE: 'warning',
  SYNTHESIZE: 'mohini-gold', DELIVER: 'success', REFLECT: 'mohini-pink',
  READY: 'light', OFFLINE: 'dark',
};

const STATUS_ICONS = {
  active: '🟢', idle: '🟡', inactive: '🔴',
};

const HandsMonitor = () => {
  const [hands] = useState(MOCK_HANDS);
  const activeCount = hands.filter(h => h.status === 'active').length;

  return (
    <>
      <div className="page-titles">
        <h4>Autonomous Hands — Worker Status</h4>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
          <li className="breadcrumb-item active">Hands</li>
        </ol>
      </div>

      <Row className="mb-4">
        <Col xl={3} sm={6}>
          <Card className="shadow-card"><Card.Body className="text-center">
            <h2 className="text-mohini-blue">{hands.length}</h2><p className="mb-0">Total Hands</p>
          </Card.Body></Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="shadow-card"><Card.Body className="text-center">
            <h2 className="text-success">{activeCount}</h2><p className="mb-0">Active Now</p>
          </Card.Body></Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="shadow-card"><Card.Body className="text-center">
            <h2 className="text-mohini-gold">{hands.reduce((s, h) => s + h.totalRuns, 0).toLocaleString()}</h2><p className="mb-0">Total Runs</p>
          </Card.Body></Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="shadow-card"><Card.Body className="text-center">
            <h2 className="text-mohini-pink">{Math.round(hands.reduce((s, h) => s + h.successRate, 0) / hands.length)}%</h2><p className="mb-0">Avg Success</p>
          </Card.Body></Card>
        </Col>
      </Row>

      <Row>
        {hands.map((hand) => (
          <Col xl={6} key={hand.name}>
            <Card className="shadow-card mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{STATUS_ICONS[hand.status]} {hand.name}</h5>
                <Badge bg={hand.status === 'active' ? 'success' : hand.status === 'idle' ? 'warning' : 'secondary'}>
                  {hand.status.toUpperCase()}
                </Badge>
              </Card.Header>
              <Card.Body>
                <p className="text-muted mb-2">{hand.currentTask}</p>
                <div className="d-flex justify-content-between mb-1">
                  <span>Phase: <Badge bg="dark">{hand.phase}</Badge></span>
                  <span>{hand.progress}%</span>
                </div>
                <ProgressBar now={hand.progress} variant="info" className="mb-3" style={{ height: '8px' }} />
                <Row className="text-center">
                  <Col><small className="text-muted">Runs</small><br /><strong>{hand.totalRuns}</strong></Col>
                  <Col><small className="text-muted">Success</small><br /><strong>{hand.successRate}%</strong></Col>
                  <Col><small className="text-muted">Last Run</small><br /><strong>{hand.lastRun}</strong></Col>
                </Row>
                <div className="mt-3 d-flex gap-2">
                  <Button size="sm" variant="outline-primary">Trigger</Button>
                  <Button size="sm" variant="outline-info">Logs</Button>
                  {hand.status === 'active' && <Button size="sm" variant="outline-danger">Stop</Button>}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HandsMonitor;
