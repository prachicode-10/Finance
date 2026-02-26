import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart3, PieChart as PieIcon, Wallet } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MOCK_STOCKS, USER_PORTFOLIOS } from '../data/mockData';
import { AIService } from '../services/aiService';

const Dashboard = ({ user }) => {
    const sentiment = AIService.getSentimentAnalysis();

    // Determine which portfolio to show based on the logged-in user
    const username = user?.username || user || 'Default';

    // Virtual Portfolio Generator (ensures EVERY name gets unique values)
    const getDynamicPortfolio = (name, role) => {
        const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        // Use role-based baseline if available, otherwise 'Default'
        const baseline = USER_PORTFOLIOS[role] || USER_PORTFOLIOS['Default'];

        // Deterministic variation based on name
        const balanceVariance = (hash * 137) % 15000;
        const pnlVariance = ((hash * 7) % 80) / 10 - 4; // -4% to +4%

        return {
            ...baseline,
            totalBalance: baseline.totalBalance + balanceVariance,
            pnlPercentage: Number((baseline.pnlPercentage + pnlVariance).toFixed(1)),
        };
    };

    const userPortfolio = USER_PORTFOLIOS[username] || getDynamicPortfolio(username, user?.role);

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
                        <Wallet size={20} color="var(--primary)" />
                    </div>
                    <h2 style={{ fontSize: '1.8rem' }}>${userPortfolio.totalBalance.toLocaleString()}</h2>
                    <span style={{ color: 'var(--accent-green)', fontSize: '0.9rem', fontWeight: '600' }}>
                        +{userPortfolio.pnlPercentage}% This Month
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
                        Score: {sentiment.score}
                    </span>
                </div>

                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Total Assets</span>
                        <BarChart3 size={20} color="#ffab00" />
                    </div>
                    <h2 style={{ fontSize: '1.8rem' }}>{userPortfolio.assets.length}</h2>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Spanning 4 Sectors
                    </span>
                </div>
            </div>

            {user?.tasks && user.tasks.length > 0 && (
                <div className="glass-card" style={{ marginTop: '1.5rem', padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
                        Assigned Tasks
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                        {user.tasks.map(task => (
                            <div key={task.id} style={{
                                padding: '1rem',
                                borderRadius: '12px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--card-border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{task.title}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: #{task.id}</div>
                                </div>
                                <span style={{
                                    padding: '4px 10px',
                                    borderRadius: '20px',
                                    fontSize: '0.7rem',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    background: task.status === 'completed' ? 'rgba(0, 230, 118, 0.1)' : task.status === 'in-progress' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 171, 0, 0.1)',
                                    color: task.status === 'completed' ? 'var(--accent-green)' : task.status === 'in-progress' ? 'var(--secondary)' : '#ffab00'
                                }}>
                                    {task.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '1.5rem', marginTop: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <PieIcon size={18} color="var(--primary)" /> Portfolio Allocation
                    </h3>
                    <div style={{ height: '240px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={userPortfolio.assets}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="allocation"
                                    nameKey="symbol"
                                >
                                    {userPortfolio.assets.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={['var(--primary)', 'var(--secondary)', '#ffab00', 'var(--accent-green)'][index % 4]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px' }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Current Holdings</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)', color: 'var(--text-muted)' }}>
                                <th style={{ padding: '0.8rem' }}>Asset</th>
                                <th style={{ padding: '0.8rem' }}>Shares</th>
                                <th style={{ padding: '0.8rem' }}>Avg Price</th>
                                <th style={{ padding: '0.8rem' }}>Price</th>
                                <th style={{ padding: '0.8rem', textAlign: 'right' }}>P/L</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userPortfolio.assets.map((asset) => {
                                const profit = (asset.currentPrice - asset.avgPrice) * asset.shares;
                                const isProfit = profit >= 0;
                                return (
                                    <tr key={asset.symbol} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                        <td style={{ padding: '0.8rem', fontWeight: '600' }}>{asset.symbol}</td>
                                        <td style={{ padding: '0.8rem' }}>{asset.shares}</td>
                                        <td style={{ padding: '0.8rem' }}>${asset.avgPrice.toLocaleString()}</td>
                                        <td style={{ padding: '0.8rem' }}>${asset.currentPrice.toLocaleString()}</td>
                                        <td style={{ padding: '0.8rem', textAlign: 'right', color: isProfit ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                                            {isProfit ? '+' : ''}${profit.toLocaleString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
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
                        {userPortfolio.recentTransactions.map(tx => (
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
