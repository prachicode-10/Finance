import React, { useState } from 'react';
import { TrendingUp, User, Lock, Mail, ArrowRight } from 'lucide-react';

const Auth = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && password) {
            onLogin(name);
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
