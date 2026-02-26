import React from 'react';
import { Newspaper, MessageCircle, BarChart, Info } from 'lucide-react';
import { MOCK_NEWS } from '../data/mockData';
import { AIService } from '../services/aiService';

const MarketSentiment = () => {
    const summary = AIService.getSentimentAnalysis();

    return (
        <div className="market-sentiment">
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Market Sentiment Analyzer</h1>
                <p style={{ color: 'var(--text-muted)' }}>Real-time news processing and sentiment impact scoring.</p>
            </header>

            <div className="glass-card" style={{ marginBottom: '2.5rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', padding: '1rem 2rem', borderRight: '1px solid var(--card-border)' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Overall Sentiment</div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: summary.overall === 'Bullish' ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                        {summary.overall}
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                        <BarChart size={20} color="var(--secondary)" />
                        <span style={{ fontWeight: '600' }}>AI Impact Summary</span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{summary.summary}</p>
                </div>
            </div>

            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Newspaper size={20} /> Latest Impact News
            </h3>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {MOCK_NEWS.map(news => (
                    <div key={news.id} className="glass-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{news.source} • {news.time}</div>
                            <div className={`badge ${news.score > 0 ? 'badge-success' : 'badge-danger'}`}>
                                Score: {news.score}
                            </div>
                        </div>
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{news.title}</h4>
                        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: '3px solid var(--primary)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <Info size={18} style={{ marginTop: '2px' }} />
                            <div>
                                <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>AI Insight</span>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{news.impact}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarketSentiment;
