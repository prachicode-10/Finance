import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { DollarSign, ShieldAlert, TrendingUp, Briefcase } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/mockData';

const COLORS = ['#00ffa3', '#6366f1', '#ffab00', '#ff4d4d', '#94a3b8'];

const PortfolioAnalyzer = () => {
    const chartData = PORTFOLIO_DATA.assets.map(asset => ({
        name: asset.symbol,
        value: asset.allocation
    }));

    const perfData = PORTFOLIO_DATA.assets.map(asset => ({
        name: asset.symbol,
        gain: ((asset.currentPrice - asset.avgPrice) / asset.avgPrice * 100).toFixed(1)
    }));

    return (
        <div className="portfolio-analyzer">
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Portfolio Intelligence</h1>
                <p style={{ color: 'var(--text-muted)' }}>Deep dive into your asset allocation and risk profile.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
                <div className="glass-card">
                    <h3 style={{ marginBottom: '1.5rem' }}>Asset Allocation</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: 'var(--bg-dark)', border: '1px solid var(--card-border)', borderRadius: '8px' }}
                                    itemStyle={{ color: 'white' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '1rem' }}>
                        {PORTFOLIO_DATA.assets.map((asset, index) => (
                            <div key={asset.symbol} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: COLORS[index % COLORS.length] }}></div>
                                <span style={{ color: 'var(--text-muted)' }}>{asset.symbol} ({asset.allocation}%)</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card">
                    <h3 style={{ marginBottom: '1.5rem' }}>Performance by Asset (%)</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={perfData}>
                                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
                                <YAxis stroke="var(--text-muted)" fontSize={12} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ background: 'var(--bg-dark)', border: '1px solid var(--card-border)', borderRadius: '8px' }}
                                />
                                <Bar dataKey="gain" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <h3 style={{ marginBottom: '1.5rem' }}>Risk Summary</h3>
            <div className="stat-grid">
                <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-green)' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <ShieldAlert color="var(--accent-green)" />
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Beta Coefficient</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>1.05</div>
                        </div>
                    </div>
                </div>
                <div className="glass-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <Briefcase color="var(--primary)" />
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Diversification Score</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>82/100</div>
                        </div>
                    </div>
                </div>
                <div className="glass-card" style={{ borderLeft: '4px solid var(--secondary)' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <TrendingUp color="var(--secondary)" />
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Expected Annual Return</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>14.2%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioAnalyzer;
