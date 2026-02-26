import React, { useState } from 'react';
import { TrendingUp, Brain, User, AlertCircle } from 'lucide-react';
import { MOCK_STOCKS } from '../data/mockData';
import { AIService } from '../services/aiService';

const AIPredictionPlayground = () => {
    const [selectedStock, setSelectedStock] = useState(MOCK_STOCKS[0]);
    const [userPrediction, setUserPrediction] = useState('');
    const [result, setResult] = useState(null);

    const handlePredict = (e) => {
        e.preventDefault();
        if (!userPrediction) return;
        const predictionResult = AIService.simulateStockPrediction(selectedStock.symbol, userPrediction);
        setResult(predictionResult);
    };

    return (
        <div className="prediction-playground">
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>AI Prediction Playground</h1>
                <p style={{ color: 'var(--text-muted)' }}>Test your market intuition against our AI algorithms.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="glass-card">
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <TrendingUp color="var(--primary)" /> Setup Your Prediction
                    </h3>

                    <form onSubmit={handlePredict}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Select Asset</label>
                            <select
                                value={selectedStock.symbol}
                                onChange={(e) => setSelectedStock(MOCK_STOCKS.find(s => s.symbol === e.target.value))}
                                style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-dark)', border: '1px solid var(--card-border)', color: 'white', borderRadius: '8px' }}
                            >
                                {MOCK_STOCKS.map(s => <option key={s.symbol} value={s.symbol}>{s.symbol} - {s.name}</option>)}
                            </select>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>What's your 24h prediction? (%)</label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="e.g. 1.5"
                                value={userPrediction}
                                onChange={(e) => setUserPrediction(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-dark)', border: '1px solid var(--card-border)', color: 'white', borderRadius: '8px' }}
                            />
                        </div>

                        <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                            Compare with AI
                        </button>
                    </form>
                </div>

                {result ? (
                    <div className="glass-card">
                        <h3 style={{ marginBottom: '1.5rem' }}>Simulation Results</h3>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><User size={18} /> Your Prediction</div>
                                <div style={{ fontWeight: '700', color: result.userPrediction > 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                                    {result.userPrediction}%
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '12px', border: '1px solid var(--secondary)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--secondary)' }}><Brain size={18} /> AI Prediction</div>
                                <div style={{ fontWeight: '700', color: result.aiPrediction > 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                                    {result.aiPrediction}%
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(0, 255, 163, 0.05)', borderRadius: '12px', border: '1px solid var(--primary)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}><Activity size={18} /> Real Result (Sim)</div>
                                <div style={{ fontWeight: '700', color: result.realResult > 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                                    {result.realResult}%
                                </div>
                            </div>

                            <div style={{ marginTop: '1rem', display: 'flex', gap: '12px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <AlertCircle size={20} style={{ flexShrink: 0 }} />
                                <p>{result.explanation}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <div>
                            <Brain size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                            <p>Predict a stock to see how <br /> you stack up against the AI.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIPredictionPlayground;
