import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import IssueReport from './pages/IssueReport';
import RiskAnalytics from './pages/RiskAnalytics';
import Operations from './pages/Operations';
import Explore from './pages/Explore';
import Auth from './pages/Auth';
import {
  BarChart3,
  LayoutDashboard,
  MapPin,
  AlertCircle,
  User,
  LogOut,
  Activity,
  Zap
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/' },
    { icon: <MapPin size={20} />, label: 'Interactive Map', path: '/explore' },
    { icon: <AlertCircle size={20} />, label: 'Report Issue', path: '/report' },
    {
      icon: <BarChart3 size={20} />,
      label: 'Risk Analytics',
      path: '/analytics',
      subLinks: [
        { label: 'Geographic Clustering', path: '/analytics?tab=geographic' },
        { label: 'Temporal Spikes', path: '/analytics?tab=temporal' },
        { label: 'Risk Matrix', path: '/analytics?tab=probabilistic' }
      ]
    },
    {
      icon: <Activity size={20} />,
      label: 'Operations',
      path: '/ops',
      subLinks: [
        { label: 'Field Units', path: '/ops?tab=units' },
        { label: 'System Health', path: '/ops?tab=health' },
        { label: 'Schedules', path: '/ops?tab=schedules' }
      ]
    },
  ];

  return (
    <div className="sidebar animate-fade-in">
      <div className="brand flex" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
        <Zap fill="var(--primary)" size={28} style={{ color: 'var(--primary)' }} />
        <span>CIVIX AI</span>
      </div>

      <div className="flex flex-col gap-2" style={{ flex: 1 }}>
        {menuItems.map((item) => (
          <div key={item.path} className="flex flex-col gap-1">
            <Link
              to={item.path}
              className={`btn btn-ghost w-full`}
              style={{
                justifyContent: 'flex-start',
                background: location.pathname === item.path ? 'var(--surface-alt)' : 'transparent',
                color: location.pathname === item.path ? 'var(--primary)' : 'var(--text-muted)'
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
            {item.subLinks && (location.pathname === item.path || location.pathname.startsWith(item.path)) && (
              <div className="flex flex-col gap-1" style={{ paddingLeft: '2.5rem', marginBottom: '0.5rem' }}>
                {item.subLinks.map((sub) => (
                  <Link
                    key={sub.label}
                    to={sub.path}
                    className="btn btn-ghost"
                    style={{
                      justifyContent: 'flex-start',
                      fontSize: '0.8rem',
                      padding: '0.4rem 0.75rem',
                      border: 'none',
                      color: location.search.includes(sub.path.split('?')[1]) ? 'var(--primary)' : 'var(--text-muted)'
                    }}
                  >
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', marginRight: '0.5rem' }}></div>
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ marginTop: 'auto', background: 'var(--surface-alt)', border: '1px solid var(--border)' }}>
        <div className="flex gap-3" style={{ marginBottom: '1rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <User size={20} color="white" />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>Officer John</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Administrator</div>
          </div>
        </div>
        <button className="btn btn-ghost w-full" style={{ fontSize: '0.8rem', justifyContent: 'center', border: '1px solid var(--border)' }}>
          <LogOut size={16} /> Logout Access
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="container dashboard">
        <Sidebar />
        <main className="animate-fade-in" style={{ padding: '2rem 0' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/report" element={<IssueReport />} />
            <Route path="/analytics" element={<RiskAnalytics />} />
            <Route path="/ops" element={<Operations />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/auth" element={<Auth />} />
            {/* Fallback to Dashboard for demo */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
