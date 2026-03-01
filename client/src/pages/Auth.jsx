import React, { useState } from 'react';
import {
    Mail,
    Lock,
    User as UserIcon,
    ArrowRight,
    ShieldCheck,
    Globe,
    Zap
} from 'lucide-react';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="animate-fade-in flex flex-col items-center justify-center min-h-[80vh] w-full">
            <div className="glass-card glass" style={{ width: '100%', maxWidth: 450, padding: '2.5rem' }}>
                <div className="flex flex-col items-center gap-3" style={{ marginBottom: '2rem' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'grid', placeItems: 'center', boxShadow: '0 0 20px var(--primary-glow)' }}>
                        <Zap size={32} color="white" />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{isLogin ? 'Officer Login' : 'Citizen Registration'}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>
                        {isLogin
                            ? 'Access the Civic Issue Orchestration Engine dashboard.'
                            : 'Join CIVIX AI to report and monitor infrastructure issues in your city.'}
                    </p>
                </div>

                <form className="flex flex-col gap-5">
                    {!isLogin && (
                        <div className="flex flex-col gap-2">
                            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Full Name</label>
                            <div className="flex p-3 glass" style={{ background: 'var(--surface-alt)', borderRadius: 8 }}>
                                <UserIcon size={18} color="var(--primary)" />
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    style={{ background: 'transparent', border: 'none', color: 'var(--text)', outline: 'none', width: '100%', marginLeft: '0.75rem' }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Email Address</label>
                        <div className="flex p-3 glass" style={{ background: 'var(--surface-alt)', borderRadius: 8 }}>
                            <Mail size={18} color="var(--primary)" />
                            <input
                                type="email"
                                placeholder="admin@civix.ai"
                                style={{ background: 'transparent', border: 'none', color: 'var(--text)', outline: 'none', width: '100%', marginLeft: '0.75rem' }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Password</label>
                        <div className="flex p-3 glass" style={{ background: 'var(--surface-alt)', borderRadius: 8 }}>
                            <Lock size={18} color="var(--primary)" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                style={{ background: 'transparent', border: 'none', color: 'var(--text)', outline: 'none', width: '100%', marginLeft: '0.75rem' }}
                            />
                        </div>
                    </div>

                    <button type="button" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                        {isLogin ? 'Authenticate Access' : 'Create Account'} <ArrowRight size={18} />
                    </button>
                </form>

                <div className="flex flex-col gap-6" style={{ marginTop: '2rem' }}>
                    <div style={{ textAlign: 'center', fontSize: '0.85rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>{isLogin ? "Don't have an account?" : "Already have an account?"} </span>
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', outline: 'none' }}
                        >
                            {isLogin ? 'Register as Citizen' : 'Login to Dashboard'}
                        </button>
                    </div>

                    <div className="flex flex-col gap-3" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                        <div className="flex" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            <ShieldCheck size={14} /> 256-bit AES Encryption Active
                        </div>
                        <div className="flex" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            <Globe size={14} /> Verified Municipal Gateway
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
