import React, { useState } from 'react';
import { TrendingUp, User, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { USER_ACCOUNTS } from '../data/mockData';

const Auth = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (name && password) {
            try {
                const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
                const response = await fetch(`${API_BASE_URL}/api/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: name, password })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    onLogin(data.user);
                } else {
                    setError(data.error || 'Authentication failed');
                }
            } catch (err) {
                console.error("Login error:", err);

                // fall back to client-side mock auth if backend isn't reachable
                const mockUser = USER_ACCOUNTS.find(
                    u => (u.username === name || u.email === name) && u.password === password
                );

                if (mockUser) {
                    console.warn("Backend unreachable, using mock credentials");
                    onLogin({
                        id: mockUser.id,
                        username: mockUser.username,
                        role: mockUser.role,
                        tasks: mockUser.tasks.map((t, i) => ({
                            id: i + 100,
                            title: typeof t === 'string' ? t : (t.title || 'Task'),
                            status: typeof t === 'string' ? 'pending' : (t.status || 'pending')
                        }))
                    });
                } else {
                    setError('Invalid username or password');
                }
            }
        } else {
            setError('Please enter both username and password');
        }
    };

    return (
        <div className="auth-page">
            <div className="glass-card auth-card">
                <div className="auth-header">
                    <div className="logo" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
                        <TrendingUp color="var(--primary)" /> <span>FIN-AI</span>
                    </div>
                    <h1>{isLogin ? 'Welcome Back' : 'Join FIN-AI'}</h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        {isLogin ? 'Enter your credentials to access your dashboard' : 'Start your financial intelligence journey today'}
                    </p>
                    {error && (
                        <div style={{ marginTop: '1rem', padding: '0.8rem', background: 'rgba(255, 77, 77, 0.1)', color: 'var(--accent-red)', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin && (
                        <div className="input-group">
                            <label><Mail size={18} /> Email Address</label>
                            <input type="email" placeholder="email@example.com" />
                        </div>
                    )}
                    <div className="input-group">
                        <label><User size={18} /> {isLogin ? 'Username or Email' : 'Full Name'}</label>
                        <input
                            type="text"
                            placeholder={isLogin ? "Enter your name" : "Your full name"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label><Lock size={18} /> Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
                    </button>
                </form>

                <div className="auth-footer">
                    <p style={{ color: 'var(--text-muted)' }}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                        <span onClick={() => setIsLogin(!isLogin)} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
