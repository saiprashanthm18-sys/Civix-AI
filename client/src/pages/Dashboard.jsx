import React, { useState, useEffect } from 'react';
import {
    AlertTriangle,
    CheckCircle,
    Activity,
    MapPin,
    TrendingUp,
    ArrowRight,
    MoreHorizontal
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Dashboard = () => {
    // Mock Data for Demo
    const stats = [
        { label: 'Active Reports', val: 124, icon: <AlertTriangle color="#ef4444" />, trend: '+12% from last week' },
        { label: 'Avg Priority', val: '68/100', icon: <Activity color="#0ea5e9" />, trend: 'Increasing' },
        { label: 'Resolved (30d)', val: 412, icon: <CheckCircle color="#10b981" />, trend: 'Stable' },
    ];

    const recentIssues = [
        { id: 1, title: 'Road Pothole (Large)', category: 'Pothole', location: '7th Ave, Downtown', priority: 'High', status: 'In Progress' },
        { id: 2, title: 'Water Leakage (Burst Pipe)', category: 'Water', location: 'Elm St, Westside', priority: 'Critical', status: 'Reported' },
        { id: 3, title: 'Flickering Street Light', category: 'Utility', location: 'Park Lane', priority: 'Low', status: 'Assigned' },
        { id: 4, title: 'Blocked Drainage System', category: 'Sanitation', location: 'Market Sq.', priority: 'Medium', status: 'In Progress' },
    ];

    const chartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                fill: true,
                label: 'Complaint Volume',
                data: [22, 18, 35, 42, 28, 45, 38],
                borderColor: '#0ea5e9',
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                tension: 0.4,
            },
            {
                label: 'Resolution Rate',
                data: [15, 22, 20, 25, 30, 28, 35],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="flex flex-col gap-8 w-full">
            <header className="flex justify-between items-center w-full">
                <div style={{ maxWidth: '60%' }}>
                    <h1 style={{ fontSize: '2.25rem', lineHeight: 1.2 }}>Civic Intelligence Overview</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>Real-time monitoring of city infrastructure reports and automated orchestration.</p>
                </div>
                <button className="btn btn-primary" style={{ flexShrink: 0 }}>
                    <TrendingUp size={18} /> View Multi-Agent Reports
                </button>
            </header>

            {/* Stats Section */}
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {stats.map((s, idx) => (
                    <div key={idx} className="glass-card glass flex justify-between items-center" style={{ padding: '1.75rem' }}>
                        <div className="flex flex-col gap-1">
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>{s.label}</span>
                            <span style={{ fontSize: '2rem', fontWeight: 800 }}>{s.val}</span>
                            <span style={{ fontSize: '0.8rem', color: s.label.includes('Resolved') ? 'var(--success)' : (s.label.includes('Reports') ? 'var(--danger)' : 'var(--primary)') }}>{s.trend}</span>
                        </div>
                        <div style={{ background: 'var(--surface-alt)', padding: '1rem', borderRadius: '12px' }}>{s.icon}</div>
                    </div>
                ))}
            </div>

            <div className="grid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
                {/* Analytics Card */}
                <div className="glass-card glass flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h3>Complaint Temporal Trends</h3>
                        <div className="flex" style={{ gap: '0.5rem' }}>
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#0ea5e9' }}></div>
                            <span style={{ fontSize: '0.75rem' }}>Reports</span>
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }}></div>
                            <span style={{ fontSize: '0.75rem' }}>Resolved</span>
                        </div>
                    </div>
                    <div style={{ height: 280 }}>
                        <Line
                            data={chartData}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                                    x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Priority Assignment List */}
                <div className="glass-card glass">
                    <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
                        <h3>High Priority Dispatch</h3>
                        <button className="btn btn-ghost" style={{ padding: '0.25rem', border: 'none' }}><MoreHorizontal /></button>
                    </div>
                    <div className="flex flex-col gap-3">
                        {recentIssues.map((issue) => (
                            <div key={issue.id} className="flex justify-between p-3" style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{issue.title}</div>
                                    <div className="flex" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                                        <MapPin size={12} /> {issue.location}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span className={`badge badge-${issue.priority.toLowerCase() === 'critical' ? 'high' : issue.priority.toLowerCase()}`}>
                                        {issue.priority}
                                    </span>
                                    <div style={{ fontSize: '0.7rem', marginTop: 4, color: 'var(--primary)' }}>{issue.status} <ArrowRight size={10} /></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Lower section with a dummy map placeholder */}
            <div className="glass-card glass" style={{ minHeight: 400 }}>
                <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                    <div>
                        <h3>Geospatial Risk Clustering</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Identifying high-frequency failure zones using spatial density analytics.</p>
                    </div>
                    <button className="btn btn-primary" style={{ height: 'fit-content' }}>Go to Live Map</button>
                </div>
                <div className="map-container" style={{ position: 'relative', display: 'grid', placeItems: 'center', background: '#1e293b' }}>
                    <div style={{ position: 'absolute', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={48} opacity={0.2} />
                        <span>Simulation Map Active (London, City Centre)</span>
                    </div>
                    {/* Visual simulation of dots on a dark background */}
                    <div style={{ width: '100%', height: '100%', opacity: 0.15, backgroundImage: 'radial-gradient(var(--border) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                    {/* Pulsing Risk Points (Visual Only) */}
                    <div style={{ position: 'absolute', top: '30%', left: '40%', width: 12, height: 12, background: 'var(--danger)', borderRadius: '50%', boxShadow: '0 0 15px var(--danger)', animation: 'pulse 2s infinite' }}></div>
                    <div style={{ position: 'absolute', top: '60%', left: '70%', width: 10, height: 10, background: 'var(--warning)', borderRadius: '50%', boxShadow: '0 0 10px var(--warning)', animation: 'pulse 3s infinite' }}></div>
                    <div style={{ position: 'absolute', top: '45%', left: '55%', width: 14, height: 14, background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 20px var(--primary)', animation: 'pulse 2.5s infinite' }}></div>

                    <style>
                        {`
                @keyframes pulse {
                  0% { transform: scale(1); opacity: 1; }
                  50% { transform: scale(1.5); opacity: 0.5; }
                  100% { transform: scale(1); opacity: 1; }
                }
              `}
                    </style>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
