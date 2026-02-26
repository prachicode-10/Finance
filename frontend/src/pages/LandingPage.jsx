import React from 'react';
import { TrendingUp, Brain, Shield, Zap, ArrowRight, Sparkles } from 'lucide-react';

const LandingPage = ({ onStart }) => {
    return (
        <div className="landing-page">
            <nav className="landing-nav">
                <div className="logo">
                    <TrendingUp color="var(--primary)" /> <span>FIN-AI</span>
                </div>
                <div className="nav-links">
                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                    <button className="btn-outline" onClick={onStart}>Sign In</button>
                    <button className="btn-primary" onClick={onStart}>Get Started</button>
                </div>
            </nav>

            <section className="hero">
                <div className="hero-content">
                    <div className="badge-ai">
                        <Sparkles size={14} /> powered by bro
                    </div>
                    <h1>Master Your Assets with <span className="gradient-text">AI Precision</span></h1>
                    <p>
                        Experience the future of finance. Learn, predict, and analyze markets
                        with our integrated AI intelligence system. Scalable, secure, and smart.
                    </p>
                    <div className="hero-btns">
                        <button className="btn-primary btn-lg" onClick={onStart}>
                            Enter Platform <ArrowRight size={20} />
                        </button>
                        <button className="btn-outline btn-lg">View Demo</button>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="glass-card floating-card-1">
                        <TrendingUp size={32} color="var(--primary)" />
                        <div>
                            <small>Market Sentiment</small>
                            <h3>Bullish +8.2%</h3>
                        </div>
                    </div>
                    <div className="glass-card floating-card-2">
                        <Brain size={32} color="var(--secondary)" />
                        <div>
                            <small>AI Prediction</small>
                            <h3>Target $820.00</h3>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="features-section">
                <h2 className="section-title">Everything you need to <span className="gradient-text">succeed</span></h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="icon-box"><Zap size={24} /></div>
                        <h3>Real-time Alerts</h3>
                        <p>Get instant sentiment indicators and market news updates as they happen.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-box"><Brain size={24} /></div>
                        <h3>AI Advisor</h3>
                        <p>24/7 financial guidance powered by our deep-learning advisor engine.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-box"><Shield size={24} /></div>
                        <h3>Portfolio Safety</h3>
                        <p>Advanced risk analysis and diversification scores to keep your wealth safe.</p>
                    </div>
                </div>
            </section>

            <footer className="landing-footer">
                <p>&copy; 2026 AI Finance Education & Investment Intelligence System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
