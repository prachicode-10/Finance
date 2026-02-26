import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart3 } from 'lucide-react';
import { MOCK_STOCKS, PORTFOLIO_DATA } from '../data/mockData';
import { AIService } from '../services/aiService';

const Dashboard = () => {
    const sentiment = AIService.getSentimentAnalysis();

    return (
        <div className="dashboard-view">
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Market Overview</h1>
                <p style={{ color: 'var(--text-muted)' }}>Welcome back, here's what's happening today.</p>
            </header>

            <div className="stat-grid">
                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Portfolio Balance</span>
                        <DollarSign size={20} color="var(--primary)" />
                    </div>
                    <h2 style={{ fontSize: '1.8rem' }}>${PORTFOLIO_DATA.totalBalance.toLocaleString()}</h2>
                    <span style={{ color: 'var(--accent-green)', fontSize: '0.9rem', fontWeight: '600' }}>
                        +{PORTFOLIO_DATA.pnlPercentage}% This Month
                    </span>
                </div>

                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>AI Market Sentiment</span>
                        <Activity size={20} color="var(--secondary)" />
                    </div>
                    <h2 style={{ fontSize: '1.8rem', color: sentiment.overall === 'Bullish' ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                        {sentiment.overall}
                    </h2>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Sentiment Score: {sentiment.score}
                    </span>
                </div>

                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Active Assets</span>
                        <BarChart3 size={20} color="#ffab00" />
                    </div>
                    <h2 style={{ fontSize: '1.8rem' }}>{PORTFOLIO_DATA.assets.length}</h2>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Spanning 4 Sectors
                    </span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '1.5rem', marginTop: '1.5rem' }}>
                <div className="dashboard-main-section">
                    <h3 style={{ marginBottom: '1.5rem' }}>Trending Stocks</h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {MOCK_STOCKS.map(stock => (
                            <div key={stock.symbol} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                                        {stock.symbol[0]}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600' }}>{stock.symbol}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{stock.name}</div>
                                    </div>
                                </div>

                                <div style={{ height: '30px', width: '80px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                                    {/* Mini chart placeholder */}
                                </div>

                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: '600' }}>${stock.price}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: stock.trend === 'up' ? 'var(--accent-green)' : 'var(--accent-red)', fontSize: '0.85rem' }}>
                                        {stock.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                        {stock.changePercent}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dashboard-side-section">
                    <h3 style={{ marginBottom: '1.5rem' }}>Recent Investments</h3>
                    <div className="glass-card" style={{ padding: '1.5rem', display: 'grid', gap: '1.2rem' }}>
                        {PORTFOLIO_DATA.recentTransactions.map(tx => (
                            <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        background: tx.type === 'Buy' ? 'rgba(0, 230, 118, 0.1)' : tx.type === 'Sell' ? 'rgba(255, 77, 77, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: tx.type === 'Buy' ? 'var(--accent-green)' : tx.type === 'Sell' ? 'var(--accent-red)' : 'var(--secondary)'
                                    }}>
                                        {tx.type === 'Buy' ? <TrendingUp size={18} /> : tx.type === 'Sell' ? <TrendingDown size={18} /> : <DollarSign size={18} />}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{tx.type} {tx.symbol}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tx.date}</div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{
                                        fontSize: '0.9rem',
                                        fontWeight: '700',
                                        color: tx.type === 'Buy' ? 'var(--accent-green)' : tx.type === 'Sell' ? 'var(--accent-red)' : 'white'
                                    }}>
                                        {tx.type === 'Sell' ? '+' : '-'}${tx.amount.toLocaleString()}
                                    </div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{tx.status}</div>
                                </div>
                            </div>
                        ))}
                        <button className="btn-outline" style={{ marginTop: '1rem', padding: '0.6rem', fontSize: '0.85rem' }}>View All History</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
