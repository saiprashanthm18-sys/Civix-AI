import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Settings,
    Shield,
    Bell,
    Database,
    Clock,
    CheckCircle,
    AlertCircle,
    Truck,
    Activity
} from 'lucide-react';

const Operations = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('units');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab && ['units', 'health', 'schedules'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [location]);

    const tasks = [
        { id: 1, type: 'Maintenance', unit: 'Rapid Response A', status: 'On Site', task: 'Pothole Repair - Zone 4' },
        { id: 2, type: 'Inspection', unit: 'Drone Unit 02', status: 'In Progress', task: 'Bridge Structural Scan' },
        { id: 3, type: 'Emergency', unit: 'Water Tech Delta', status: 'Dispatched', task: 'Main Pipe Burst Restoration' },
    ];

    return (
        <div className="animate-fade-in flex flex-col gap-8 w-full">
            <header className="flex justify-between items-center w-full">
                <div style={{ maxWidth: '65%' }}>
                    <h1 style={{ fontSize: '2.25rem', lineHeight: 1.2 }}>Operational Command Center</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>Management of field units, maintenance schedules, and automated resource dispatch.</p>
                </div>
                <div className="flex glass p-1 rounded-xl" style={{ border: '1px solid var(--border)' }}>
                    {[
                        { id: 'units', label: 'Field Units', icon: <Truck size={14} /> },
                        { id: 'health', label: 'System Health', icon: <Activity size={14} /> },
                        { id: 'schedules', label: 'Schedules', icon: <Clock size={14} /> }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="btn flex items-center gap-2"
                            style={{
                                padding: '0.6rem 1.2rem',
                                fontSize: '0.85rem',
                                background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                                color: activeTab === tab.id ? 'white' : 'var(--text-muted)',
                                borderRadius: '8px',
                                border: 'none',
                                minWidth: '130px',
                                justifyContent: 'center'
                            }}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </header>

            <div className="grid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
                <div className="glass-card glass flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                        <Shield color="var(--primary)" size={18} />
                        <h3>Active Mission Control</h3>
                    </div>

                    <table className="w-full" style={{ borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                                <th style={{ padding: '1rem' }}>Unit ID</th>
                                <th style={{ padding: '1rem' }}>Asset Type</th>
                                <th style={{ padding: '1rem' }}>Active Task</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((t) => (
                                <tr key={t.id} style={{ borderBottom: '1px solid var(--border)', background: activeTab === 'units' ? 'rgba(14, 165, 233, 0.02)' : 'transparent' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>{t.unit}</td>
                                    <td style={{ padding: '1rem' }}>{t.type}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{t.task}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span className="badge" style={{ background: 'var(--surface-alt)', color: 'var(--primary)' }}>{t.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="glass-card glass flex flex-col gap-4" style={{ borderLeft: activeTab === 'health' ? '4px solid var(--primary)' : 'none' }}>
                        <div className="flex items-center gap-2">
                            <Database color="var(--primary)" size={18} />
                            <h3>Infrastructure Lifecycle</h3>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between" style={{ fontSize: '0.8rem' }}>
                                    <span>System Health Index</span>
                                    <span style={{ color: 'var(--success)', fontWeight: 700 }}>94.2%</span>
                                </div>
                                <div style={{ height: 6, background: 'var(--surface-alt)', borderRadius: 3, overflow: 'hidden' }}>
                                    <div style={{ width: '94%', height: '100%', background: 'var(--success)' }}></div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between" style={{ fontSize: '0.8rem' }}>
                                    <span>Resolved SLA Compliance</span>
                                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>88.5%</span>
                                </div>
                                <div style={{ height: 6, background: 'var(--surface-alt)', borderRadius: 3, overflow: 'hidden' }}>
                                    <div style={{ width: '88%', height: '100%', background: 'var(--primary)' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card glass flex flex-col gap-4" style={{ borderLeft: activeTab === 'schedules' ? '4px solid var(--warning)' : 'none' }}>
                        <div className="flex items-center gap-2">
                            <Clock color="var(--warning)" size={18} />
                            <h3>Upcoming Maintenance</h3>
                        </div>
                        {[
                            { icon: <CheckCircle size={14} />, label: 'Zone 2 Sewer Inspection', time: 'Tomorrow 09:00' },
                            { icon: <AlertCircle size={14} />, label: 'Power Grid Calibration', time: 'Wed 14:30' }
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between p-3" style={{ background: 'var(--surface-alt)', borderRadius: 8 }}>
                                <div className="flex gap-2">
                                    {item.icon}
                                    <span style={{ fontSize: '0.85rem' }}>{item.label}</span>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Operations;
