import React, { useState } from 'react';
import {
    Camera,
    MapPin,
    Send,
    CheckCircle2,
    Search,
    AlertOctagon,
    Image as ImageIcon,
    Zap
} from 'lucide-react';

const IssueReport = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'pothole',
        address: '22 Baker Street, Central District'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center h-full animate-fade-in text-center p-8 bg-surface-alt rounded-xl glass">
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'grid', placeItems: 'center', marginBottom: '1.5rem' }}>
                    <CheckCircle2 size={48} color="var(--success)" />
                </div>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Submission Received!</h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: 450, marginBottom: '2rem' }}>
                    CIVIX AI has analyzed your report. A matching issue was found 35m away—your report has been merged to increase priority score from 42 to 68.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="btn btn-primary"
                >
                    Track Issue Status <Send size={16} />
                </button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <header>
                <h1 style={{ fontSize: '1.875rem' }}>Citizen Report Engine</h1>
                <p style={{ color: 'var(--text-muted)' }}>Submit geo-tagged infrastructure issues for automated orchestration.</p>
            </header>

            <div className="grid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
                <form onSubmit={handleSubmit} className="glass-card glass flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Report Category</label>
                        <select
                            style={{ background: '#1e293b', border: '1px solid var(--border)', padding: '0.8rem', outline: 'none', color: 'var(--text)', borderRadius: 8 }}
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="pothole">Road & Pothole Repair</option>
                            <option value="water_leak">Water Supply Leakage</option>
                            <option value="power_outage">Electrical & Power Failure</option>
                            <option value="waste_management">Sanitation & Waste</option>
                            <option value="street_light">Street Light Disruption</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Issue Description</label>
                        <textarea
                            placeholder="Describe the problem in detail (Our NLP engine will use this for duplicate detection)..."
                            required
                            style={{ background: '#1e293b', border: '1px solid var(--border)', padding: '1rem', outline: 'none', color: 'var(--text)', borderRadius: 8, height: 120, resize: 'none' }}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Visual Evidence (Photo Upload)</label>
                        <div style={{ border: '2px dashed var(--border)', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 12, cursor: 'pointer', background: 'rgba(255,255,255,0.02)' }}>
                            <Camera size={32} opacity={0.5} style={{ marginBottom: '0.5rem' }} />
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Drag & Drop or Multi-Select Images</span>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: '1rem', justifyContent: 'center' }}>
                        {loading ? <Zap className="animate-pulse" size={18} /> : <span>Submit AI-Orchestrated Report</span>}
                    </button>
                </form>

                <div className="flex flex-col gap-6">
                    {/* Sidebar Map Mini-Widget */}
                    <div className="glass-card glass flex flex-col gap-3">
                        <h3>Precise Geotagging</h3>
                        <div style={{ height: 200, background: '#1e293b', border: '1px solid var(--border)', borderRadius: 8, position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                                <MapPin size={28} color="var(--danger)" />
                            </div>
                            <div style={{ width: '100%', height: '100%', opacity: 0.1, backgroundImage: 'linear-gradient(45deg, #334155 25%, transparent 25%, transparent 50%, #334155 50%, #334155 75%, transparent 75%, transparent)' }}></div>
                        </div>
                        <div className="flex" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            <Search size={14} /> Detect Nearby Issues? <strong>(Enabled)</strong>
                        </div>
                    </div>

                    {/* Risk Warning Card */}
                    <div className="glass-card glass flex flex-col gap-2" style={{ borderLeft: '4px solid var(--warning)' }}>
                        <div className="flex" style={{ color: 'var(--warning)', fontWeight: 700 }}>
                            <AlertOctagon size={18} /> High Priority Awareness
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Your current location is within 150m of a "High Sensitivity" zone <strong>(St. Mary's Hospital)</strong>. New reports here are automatically assigned +25 Priority Score.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueReport;
