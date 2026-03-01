import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    BarChart,
    Map as MapIcon,
    Target,
    Zap,
    TrendingUp,
    ArrowRight,
    ShieldAlert,
    ArrowUpRight,
    Database
} from 'lucide-react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Radar, PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ArcElement);

const RiskAnalytics = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('geographic');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab && ['geographic', 'temporal', 'probabilistic'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [location]);

    const radarData = {
        labels: ['Potholes', 'Power Outage', 'Water Supply', 'Sanitation', 'Street Lights', 'Emergency'],
        datasets: [{
            label: 'Issue Density per Sector (Avg 30d)',
            data: [65, 59, 90, 81, 56, 40],
            fill: true,
            backgroundColor: 'rgba(14, 165, 233, 0.2)',
            borderColor: '#0ea5e9',
            pointBackgroundColor: '#0ea5e9',
            pointBorderColor: '#fff',
        }]
    };

    const polarData = {
        labels: ['West Zone', 'East Zone', 'Downtown', 'Industrial Park', 'Suburbia'],
        datasets: [{
            label: 'Infrastructure Failure Probability',
            data: [11, 16, 25, 32, 14],
            backgroundColor: [
                '#ef444433',
                '#f59e0b33',
                '#6366f133',
                '#10b98133',
                '#0ea5e933'
            ],
            borderWidth: 1,
            borderColor: '#ffffff11'
        }]
    };

    return (
        <div className="animate-fade-in flex flex-col gap-10 w-full">
            <header className="flex justify-between items-center w-full">
                <div style={{ maxWidth: '65%' }}>
                    <h1 style={{ fontSize: '2.25rem', lineHeight: 1.2 }}>Predictive Risk Intelligence</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>Forecasting infrastructure failure with geographic clustering and temporal frequency models.</p>
                </div>
                <div className="flex glass p-1 rounded-xl" style={{ border: '1px solid var(--border)' }}>
                    {['geographic', 'temporal', 'probabilistic'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="btn flex"
                            style={{
                                padding: '0.6rem 1.2rem',
                                fontSize: '0.85rem',
                                textTransform: 'capitalize',
                                background: activeTab === tab ? 'var(--primary)' : 'transparent',
                                color: activeTab === tab ? 'white' : 'var(--text-muted)',
                                borderRadius: '8px',
                                border: 'none',
                                minWidth: '110px',
                                justifyContent: 'center'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </header>

            {/* Hero Analytics Section */}
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className="glass-card glass">
                    <div className="flex justify-between" style={{ marginBottom: '1.5rem' }}>
                        <div className="flex">
                            <Target color="var(--primary)" size={18} />
                            <h3>Infrastructure Severity Radar</h3>
                        </div>
                        <span className="badge badge-high">High Alert</span>
                    </div>
                    <div style={{ height: 350, display: 'grid', placeItems: 'center' }}>
                        <Radar data={radarData} options={{ maintainAspectRatio: false, scales: { r: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { display: false } } } }} />
                    </div>
                </div>

                <div className="glass-card glass">
                    <div className="flex justify-between" style={{ marginBottom: '1.5rem' }}>
                        <div className="flex">
                            <Zap color="var(--warning)" size={18} />
                            <h3>Probabilistic Risk Matrix</h3>
                        </div>
                        <span className="badge badge-medium">Predictive</span>
                    </div>
                    <div style={{ height: 350, display: 'grid', placeItems: 'center' }}>
                        <PolarArea data={polarData} options={{ maintainAspectRatio: false, scales: { r: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { display: false } } } }} />
                    </div>
                </div>
            </div>

            {/* Detailed Insights */}
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {/* Risk Signal Card 1 */}
                <div className="glass-card glass flex flex-col gap-4">
                    <div className="flex" style={{ color: 'var(--danger)' }}>
                        <ShieldAlert size={20} />
                        <div style={{ fontWeight: 700 }}>Signal Detection: Temporal Spike</div>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        The Downtown sector has shown a <strong>42% increase</strong> in reported water pipe leakages over the last 14 days. Suggests underlying water main degradation.
                    </p>
                    <div style={{ height: 6, background: 'var(--surface-alt)', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: '82%', height: '100%', background: 'var(--danger)', boxShadow: '0 0 10px var(--danger)' }}></div>
                    </div>
                    <div className="flex justify-between" style={{ fontSize: '0.75rem' }}>
                        <span>Failure Probability</span>
                        <span style={{ fontWeight: 700 }}>82.4%</span>
                    </div>
                    <button className="btn btn-primary" style={{ height: 'fit-content', justifyContent: 'center', marginTop: '0.5rem' }}>
                        Deploy Inspection Unit <ArrowRight size={14} />
                    </button>
                </div>

                {/* Risk Signal Card 2 */}
                <div className="glass-card glass flex flex-col gap-4">
                    <div className="flex" style={{ color: 'var(--success)' }}>
                        <Database size={20} />
                        <div style={{ fontWeight: 700 }}>Anomaly Analysis: Resolved Pattern</div>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Proactive maintenance in the Industrial Park has decreased electricity outage frequency by <strong>15.6%</strong> compared to predicted baseline.
                    </p>
                    <div style={{ height: 6, background: 'var(--surface-alt)', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: '35%', height: '100%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)' }}></div>
                    </div>
                    <div className="flex justify-between" style={{ fontSize: '0.75rem' }}>
                        <span>Outage Risk Elevation</span>
                        <span style={{ fontWeight: 700 }}>35.1%</span>
                    </div>
                    <button className="btn btn-ghost" style={{ height: 'fit-content', justifyContent: 'center', marginTop: '0.5rem' }}>
                        Archive Insights <Database size={14} />
                    </button>
                </div>

                {/* Predictive Cluster Dashboard */}
                <div className="glass-card glass flex flex-col gap-4">
                    <div className="flex" style={{ color: 'var(--accent)' }}>
                        <MapIcon size={20} />
                        <div style={{ fontWeight: 700 }}>Geographic Clustering</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        {[
                            { zone: 'Cluster 24 (North Shore)', risk: 'High', color: 'var(--danger)' },
                            { zone: 'Cluster 12 (Civic Plaza)', risk: 'Critical', color: 'var(--danger)' },
                            { zone: 'Cluster 05 (Hilltop)', risk: 'Medium', color: 'var(--warning)' }
                        ].map((c, i) => (
                            <div key={i} className="flex justify-between p-2" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 6 }}>
                                <span style={{ fontSize: '0.8rem' }}>{c.zone}</span>
                                <div className="flex" style={{ color: c.color, fontSize: '0.8rem', fontWeight: 600 }}>
                                    {c.risk} <ArrowUpRight size={14} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex p-3" style={{ background: 'var(--surface-alt)', borderRadius: 8, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <TrendingUp size={14} style={{ marginRight: 8 }} /> Multi-factor regression model updated 12m ago.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiskAnalytics;
