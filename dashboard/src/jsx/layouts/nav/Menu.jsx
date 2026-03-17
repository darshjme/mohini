export const MenuList = [
    {
        title: 'Dashboard',
        iconStyle: <i className="flaticon-dashboard" />,
        to: 'dashboard',
    },
    {
        title: 'Shadow Army',
        iconStyle: <i className="flaticon-user-1" />,
        to: 'agent-orchestration',
    },
    {
        title: 'Memory',
        iconStyle: <i className="flaticon-database" />,
        to: 'memory-explorer',
    },
    {
        title: 'Skills',
        iconStyle: <i className="flaticon-app" />,
        to: 'skill-registry',
    },
    {
        title: 'Hands',
        iconStyle: <i className="flaticon-settings" />,
        to: 'hands-monitor',
    },
    {
        title: 'Channels',
        iconStyle: <i className="flaticon-chat" />,
        to: 'channel-hub',
    },
    {
        title: 'n8n Workflows',
        iconStyle: <i className="flaticon-connection" />,
        classsChange: 'mm-collapse',
        content: [
            { title: 'Active Workflows', to: 'workflows-active' },
            { title: 'Workflow Editor', to: 'workflows-editor' },
            { title: 'Execution Logs', to: 'workflows-logs' },
        ]
    },
    {
        title: 'System Health',
        iconStyle: <i className="flaticon-heart" />,
        classsChange: 'mm-collapse',
        content: [
            { title: 'Overview', to: 'system-overview' },
            { title: 'API Keys', to: 'acount-apikeys' },
            { title: 'Logs', to: 'account-logs' },
            { title: 'Settings', to: 'account-settings' },
        ]
    },
]
