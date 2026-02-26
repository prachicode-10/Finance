import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { DollarSign, ShieldAlert, TrendingUp, TrendingDown, Briefcase, ShoppingCart } from 'lucide-react';
import { PORTFOLIO_DATA, USER_PORTFOLIO_STATS, USER_PORTFOLIOS, MOCK_STOCKS } from '../data/mockData';

const COLORS = ['#00ffa3', '#6366f1', '#ffab00', '#ff4d4d', '#94a3b8'];

const PortfolioAnalyzer = ({ user, portfolio, setPortfolio }) => {
    const username = user?.username || 'user01'; // Fallback to user01 if no user active

    // We use a local state initialized from the dataset so the UI immediately reacts to trades
    const initialStats = USER_PORTFOLIO_STATS.find(u => u.username === username) || {
        id: null,
        username,
        invested_money: 0,
        spent_on_stocks: 0,
        performance: 'positive',
        gains_loss: 0,
        assets_allocations: {}
    };
    const [portfolioStats, setPortfolioStats] = useState(initialStats);

    // refresh stats if user changes (e.g. new login while component remains mounted)
    useEffect(() => {
        const stats = USER_PORTFOLIO_STATS.find(u => u.username === username);
        if (stats) setPortfolioStats(stats);
    }, [username]);

    // Trade UI State
    const [tradeStock, setTradeStock] = useState(MOCK_STOCKS[0]);
    const [tradeQuantity, setTradeQuantity] = useState(1);
    const [tradeAction, setTradeAction] = useState('buy'); // 'buy' or 'sell'

    const chartData = Object.entries(portfolioStats.assets_allocations).map(([key, value]) => ({
        name: key.replace('_', ' ').toUpperCase(),
        value: value
    }));

    // Generating some synthetic mock data based on the real portfolio allocations to power the bar chart UI
    const perfData = Object.keys(portfolioStats.assets_allocations).map(key => ({
        name: key.replace('_', ' ').toUpperCase(),
        gain: portfolioStats.performance === 'positive' ? (Math.random() * 10 + 2).toFixed(1) : (Math.random() * -7 - 1).toFixed(1)
    }));

    const executeTrade = (e) => {
        e.preventDefault();

        const currentPrice = tradeStock.price;
        const tradeValue = currentPrice * tradeQuantity;

        let newStats = { ...portfolioStats };
        let newAllocations = { ...newStats.assets_allocations };

        if (tradeAction === 'buy') {
            // Deduct from cash if available, else just increase invested/spent
            if (newAllocations.cash && newAllocations.cash > 0 && tradeValue < newStats.invested_money * (newAllocations.cash / 100)) {
                // Logic to rebalance if extremely precise math is needed.
                // For mock purposes: simply increase stock allocation and decrease cash proportionately
                newAllocations.stocks = Math.min(100, (newAllocations.stocks || 0) + 5);
                newAllocations.cash = Math.max(0, newAllocations.cash - 5);
            } else {
                // Fresh investment
                newStats.invested_money += tradeValue;
            }
            newStats.spent_on_stocks += tradeValue;

        } else if (tradeAction === 'sell') {
            // Sell logic
            newStats.spent_on_stocks = Math.max(0, newStats.spent_on_stocks - tradeValue);

            // Generate some random gain/loss from this sell explicitly
            const tradeProfit = tradeValue * (Math.random() * 0.2 - 0.05); // -5% to +15%
            newStats.gains_loss += tradeProfit;

            // Adjust performance visual class
            newStats.performance = newStats.gains_loss >= 0 ? 'positive' : 'negative';

            // Shift some stock allocation back to cash
            newAllocations.stocks = Math.max(0, (newAllocations.stocks || 0) - 5);
            newAllocations.cash = (newAllocations.cash || 0) + 5;
        }

        newStats.assets_allocations = newAllocations;

        // Update local state to trigger render
        setPortfolioStats(newStats);

        // Update global portfolio stats so navigating away and back persists it
        const userIndex = USER_PORTFOLIO_STATS.findIndex(u => u.username === username);
        if (userIndex !== -1) {
            USER_PORTFOLIO_STATS[userIndex] = newStats;
        }

        // also update the more detailed portfolio object if parent gave us a setter
        if (setPortfolio) {
            setPortfolio(prev => {
                const updated = prev ? { ...prev } : { ...PORTFOLIO_DATA };
                // prepare a transaction record
                const record = {
                    id: Date.now(),
                    type: tradeAction === 'buy' ? 'Buy' : 'Sell',
                    symbol: tradeStock.symbol,
                    amount: tradeValue,
                    date: new Date().toISOString().slice(0, 10),
                    status: 'Completed'
                };
                updated.recentTransactions = [record, ...(updated.recentTransactions || [])];
                // adjust asset list
                let asset = updated.assets.find(a => a.symbol === tradeStock.symbol);
                if (tradeAction === 'buy') {
                    if (asset) {
                        const totalCost = asset.avgPrice * asset.shares + tradeValue;
                        const newShares = asset.shares + tradeQuantity;
                        asset.avgPrice = totalCost / newShares;
                        asset.shares = newShares;
                        asset.currentPrice = tradeStock.price;
                    } else {
                        updated.assets.push({ symbol: tradeStock.symbol, shares: tradeQuantity, avgPrice: tradeStock.price, currentPrice: tradeStock.price, allocation: 0 });
                    }
                } else { // sell
                    if (asset) {
                        asset.shares = Math.max(0, asset.shares - tradeQuantity);
                        asset.currentPrice = tradeStock.price;
                    }
                }
                updated.totalBalance = updated.assets.reduce((sum, a) => sum + a.currentPrice * a.shares, 0);
                // sync global map
                USER_PORTFOLIOS[username] = updated;
                return updated;
            });
        }

        // Reset form
        setTradeQuantity(1);
    };

    return (
        <div className="portfolio-analyzer">
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Portfolio Intelligence</h1>
                <p style={{ color: 'var(--text-muted)' }}>Deep dive into your asset allocation and risk profile.</p>
            </header>

            {portfolio && (
                <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
                    <strong>Current Balance:</strong> ${portfolio.totalBalance.toLocaleString()}&nbsp;•&nbsp;
                    <strong>Assets:</strong> {portfolio.assets.length}&nbsp;•&nbsp;
                    <strong>Transactions:</strong> {portfolio.recentTransactions.length}
                </div>
            )}

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
                        {chartData.map((asset, index) => (
                            <div key={asset.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: COLORS[index % COLORS.length] }}></div>
                                <span style={{ color: 'var(--text-muted)' }}>{asset.name} ({asset.value}%)</span>
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

            <h3 style={{ marginBottom: '1.5rem' }}>Fund Overview</h3>
            <div className="stat-grid">
                <div className="glass-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <Briefcase color="var(--primary)" />
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Money Invested</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>${portfolioStats.invested_money.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
                <div className="glass-card" style={{ borderLeft: '4px solid var(--secondary)' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <DollarSign color="var(--secondary)" />
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Spent on Stocks</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: '700' }}>${portfolioStats.spent_on_stocks.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
                <div className="glass-card" style={{ borderLeft: portfolioStats.performance === 'positive' ? '4px solid var(--accent-green)' : '4px solid var(--accent-red)' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <TrendingUp color={portfolioStats.performance === 'positive' ? 'var(--accent-green)' : 'var(--accent-red)'} />
                        <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Gains/Loss</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: '700', color: portfolioStats.performance === 'positive' ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                                {portfolioStats.performance === 'positive' ? '+' : ''}${portfolioStats.gains_loss.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h3 style={{ marginBottom: '1.5rem', marginTop: '2.5rem' }}>Trading Desk</h3>
            <div className="glass-card" style={{ marginBottom: '2.5rem' }}>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    Execute mock trades here. Your portfolio overview balances and asset allocations will automatically recalculate.
                </p>
                <form onSubmit={executeTrade} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'end' }}>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Asset</label>
                        <select
                            value={tradeStock.symbol}
                            onChange={(e) => setTradeStock(MOCK_STOCKS.find(s => s.symbol === e.target.value))}
                            style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-dark)', border: '1px solid var(--card-border)', color: 'white', borderRadius: '8px' }}
                        >
                            {MOCK_STOCKS.map(s => (
                                <option key={s.symbol} value={s.symbol}>{s.name} ({s.symbol}) - ${s.price}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Action</label>
                        <select
                            value={tradeAction}
                            onChange={(e) => setTradeAction(e.target.value)}
                            style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-dark)', border: '1px solid var(--card-border)', color: 'white', borderRadius: '8px' }}
                        >
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Quantity (Shares)</label>
                        <input
                            type="number"
                            min="1"
                            value={tradeQuantity}
                            onChange={(e) => setTradeQuantity(parseInt(e.target.value) || 1)}
                            style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-dark)', border: '1px solid var(--card-border)', color: 'white', borderRadius: '8px' }}
                        />
                    </div>

                    <div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                            Estimated Total
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                            ${(tradeStock.price * tradeQuantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: tradeAction === 'buy' ? 'var(--primary)' : 'var(--accent-red)' }}
                    >
                        {tradeAction === 'buy' ? <ShoppingCart size={18} /> : <TrendingDown size={18} />}
                        Confirm {tradeAction.toUpperCase()}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default PortfolioAnalyzer;
