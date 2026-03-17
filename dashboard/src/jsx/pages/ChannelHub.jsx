import React, { useState } from 'react';
import { Card, Row, Col, Badge, Button, Form, Table } from 'react-bootstrap';

const MOCK_CHANNELS = [
  { id: 'whatsapp', name: 'WhatsApp', type: 'messaging', status: 'connected', messages: 1247, lastActivity: '2m ago', icon: '💬' },
  { id: 'discord', name: 'Discord', type: 'messaging', status: 'connected', messages: 893, lastActivity: '5m ago', icon: '🎮' },
  { id: 'telegram', name: 'Telegram', type: 'messaging', status: 'connected', messages: 456, lastActivity: '12m ago', icon: '✈️' },
  { id: 'slack', name: 'Slack', type: 'messaging', status: 'disconnected', messages: 234, lastActivity: '2h ago', icon: '💼' },
  { id: 'email-gmail', name: 'Gmail', type: 'email', status: 'connected', messages: 678, lastActivity: '8m ago', icon: '📧' },
  { id: 'twitter', name: 'X.com', type: 'social', status: 'connected', messages: 345, lastActivity: '15m ago', icon: '🐦' },
  { id: 'github', name: 'GitHub', type: 'dev', status: 'connected', messages: 567, lastActivity: '3m ago', icon: '🐙' },
  { id: 'linkedin', name: 'LinkedIn', type: 'social', status: 'idle', messages: 89, lastActivity: '1d ago', icon: '💼' },
  { id: 'sms', name: 'SMS', type: 'messaging', status: 'connected', messages: 45, lastActivity: '30m ago', icon: '📱' },
  { id: 'voice', name: 'Voice Calls', type: 'voice', status: 'idle', messages: 12, lastActivity: '3h ago', icon: '📞' },
  { id: 'n8n', name: 'n8n Webhooks', type: 'automation', status: 'connected', messages: 2345, lastActivity: '1m ago', icon: '⚡' },
  { id: 'api', name: 'REST API', type: 'dev', status: 'connected', messages: 8901, lastActivity: '10s ago', icon: '🔌' },
];

const STATUS_COLORS = {
  connected: 'success',
  disconnected: 'danger',
  idle: 'warning',
};

const ChannelHub = () => {
  const [channels] = useState(MOCK_CHANNELS);
  const [typeFilter, setTypeFilter] = useState('all');

  const types = [...new Set(channels.map(c => c.type))];
  const filtered = typeFilter === 'all' ? channels : channels.filter(c => c.type === typeFilter);
  const connectedCount = channels.filter(c => c.status === 'connected').length;
  const totalMessages = channels.reduce((s, c) => s + c.messages, 0);

  return (
    <>
      <div className="page-titles">
        <h4>Channel Hub — 40 Adapters</h4>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
          <li className="breadcrumb-item active">Channels</li>
        </ol>
      </div>

      <Row className="mb-4">
        <Col xl={3} sm={6}>
          <Card className="shadow-card"><Card.Body className="text-center">
            <h2 className="text-mohini-blue">40</h2><p className="mb-0">Total Adapters</p>
          </Card.Body></Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="shadow-card"><Card.Body className="text-center">
            <h2 className="text-success">{connectedCount}</h2><p className="mb-0">Connected</p>
          </Card.Body></Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="shadow-card"><Card.Body className="text-center">
            <h2 className="text-mohini-gold">{totalMessages.toLocaleString()}</h2><p className="mb-0">Total Messages</p>
          </Card.Body></Card>
        </Col>
        <Col xl={3} sm={6}>
          <Card className="shadow-card"><Card.Body className="text-center">
            <h2 className="text-mohini-pink">{types.length}</h2><p className="mb-0">Channel Types</p>
          </Card.Body></Card>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Form.Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={{ maxWidth: '300px' }}>
            <option value="all">All Types</option>
            {types.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </Form.Select>
        </Card.Body>
      </Card>

      <Row>
        {filtered.map((channel) => (
          <Col xl={3} md={4} sm={6} key={channel.id}>
            <Card className="shadow-card mb-4 text-center">
              <Card.Body>
                <div style={{ fontSize: '2.5rem' }}>{channel.icon}</div>
                <h5 className="mt-2 mb-1">{channel.name}</h5>
                <Badge bg={STATUS_COLORS[channel.status]} className="mb-2">{channel.status}</Badge>
                <p className="text-muted mb-1">{channel.messages.toLocaleString()} messages</p>
                <small className="text-muted">Last: {channel.lastActivity}</small>
                <div className="mt-3">
                  <Button size="sm" variant={channel.status === 'connected' ? 'outline-danger' : 'outline-success'}>
                    {channel.status === 'connected' ? 'Disconnect' : 'Connect'}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ChannelHub;
