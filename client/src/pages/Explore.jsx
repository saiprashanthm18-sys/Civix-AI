import React from 'react';
import {
    Maximize2,
    Layers,
    Navigation,
    Filter,
    Plus,
    Search,
    ChevronRight,
    MapPin,
    AlertTriangle
} from 'lucide-react';

const Explore = () => {
    const mapIssues = [
        { id: 1, title: 'Major Pothole', lat: '40%', lng: '35%', type: 'pothole', severity: 'high' },
        { id: 2, title: 'Water Leak', lat: '65%', lng: '72%', type: 'water', severity: 'critical' },
        { id: 3, title: 'Power Failure', lat: '25%', lng: '60%', type: 'power', severity: 'medium' },
    ];

    return (
        <div className="animate-fade-in flex flex-col gap-6 w-full h-[calc(100vh-6rem)]">
            <header className="flex justify-between items-center w-full">
                <div>
                    <h1 style={{ fontSize: '2.25rem', lineHeight: 1.2 }}>Interactive Municipal Map</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Spatial distribution of active citizen reports and predictive zones.</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-ghost"><Filter size={18} /> Layer Filters</button>
                    <button className="btn btn-primary"><Plus size={18} /> Add Marker</button>
                </div>
            </header>

            <div className="flex-1 glass relative overflow-hidden rounded-2xl border border-[var(--border)]">
                {/* Mock Map Background */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: '#0f172a',
                    backgroundImage: 'radial-gradient(var(--border) 1.5px, transparent 0)',
                    backgroundSize: '40px 40px',
                    opacity: 0.4
                }}></div>

                {/* Map UI Elements */}
                <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10 }}>
                    <div className="glass p-2 flex gap-2" style={{ background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                        <div className="flex p-2 bg-[var(--surface-alt)] rounded-lg">
                            <Search size={18} color="var(--text-muted)" />
                            <input
                                placeholder="Search coordinates or addresses..."
                                style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', paddingLeft: '0.5rem', width: '250px' }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 10 }} className="flex flex-col gap-2">
                    <button className="glass p-3" style={{ background: 'var(--surface)' }}><Maximize2 size={20} /></button>
                    <button className="glass p-3" style={{ background: 'var(--surface)' }}><Layers size={20} /></button>
                    <button className="glass p-3" style={{ background: 'var(--surface)' }}><Navigation size={20} color="var(--primary)" fill="var(--primary)" /></button>
                </div>

                {/* Issues on Map */}
                {mapIssues.map((issue) => (
                    <div key={issue.id} style={{ position: 'absolute', top: issue.lat, left: issue.lng, zIndex: 5 }}>
                        <div
                            className="animate-bounce"
                            style={{
                                cursor: 'pointer',
                                color: issue.severity === 'critical' ? 'var(--danger)' : 'var(--warning)',
                                filter: `drop-shadow(0 0 10px ${issue.severity === 'critical' ? 'var(--danger)' : 'var(--warning)'})`
                            }}
                        >
                            <MapPin size={32} />
                        </div>

                        {/* Simple hover card simulation */}
                        <div className="glass-card glass" style={{ position: 'absolute', bottom: '40px', left: '20px', width: '180px', padding: '0.75rem', fontSize: '0.8rem' }}>
                            <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{issue.title}</div>
                            <div className="flex justify-between">
                                <span style={{ color: 'var(--text-muted)' }}>Status: Active</span>
                                <ChevronRight size={14} />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Legend */}
                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', zIndex: 10 }} className="glass p-4 flex gap-6">
                    <div className="flex items-center gap-2">
                        <div style={{ width: 12, height: 12, background: 'var(--danger)', borderRadius: '50%' }}></div>
                        <span style={{ fontSize: '0.75rem' }}>Critical Failure</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div style={{ width: 12, height: 12, background: 'var(--warning)', borderRadius: '50%' }}></div>
                        <span style={{ fontSize: '0.75rem' }}>High Priority</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div style={{ width: 12, height: 12, background: 'var(--primary)', borderRadius: '50%' }}></div>
                        <span style={{ fontSize: '0.75rem' }}>Routine Case</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explore;
