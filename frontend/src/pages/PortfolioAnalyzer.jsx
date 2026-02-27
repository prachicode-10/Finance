import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { DollarSign, ShieldAlert, TrendingUp, Briefcase, Plus, Minus, Search, ArrowUpRight, ArrowDownRight, Wallet, History, Activity } from 'lucide-react';
import { PORTFOLIO_DATA, MOCK_STOCKS, MOCK_NEWS } from '../data/mockData';
import { AIService } from '../services/aiService';

const COLORS = ['#00ffa3', '#6366f1', '#ffab00', '#ff4d4d', '#94a3b8'];

const PortfolioAnalyzer = ({ user, portfolio, setPortfolio }) => {
    // Prefer passed portfolio, then fallback to mock data
    const activePortfolio = portfolio || PORTFOLIO_DATA;

    const [selectedStock, setSelectedStock] = React.useState(MOCK_STOCKS[0]);
    const [quantity, setQuantity] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [tradeMessage, setTradeMessage] = React.useState({ text: '', type: '' });
    const [sentiment, setSentiment] = useState({ overall: 'Loading...', score: 0 });

    useEffect(() => {
        const fetchSentiment = async () => {
            const data = await AIService.getSentimentAnalysis(MOCK_NEWS);
            setSentiment(data);
        };
        fetchSentiment();
    }, []);

    const chartData = activePortfolio.assets.map(asset => ({
        name: asset.symbol,
        value: asset.allocation
    }));

    const perfData = activePortfolio.assets.map(asset => ({
        name: asset.symbol,
        gain: asset.currentPrice && asset.avgPrice ? ((asset.currentPrice - asset.avgPrice) / asset.avgPrice * 100).toFixed(1) : 0
    }));

    const spentOnStocks = activePortfolio.spentOnStocks || activePortfolio.assets.reduce((acc, asset) => {
        if (assetIsCash(asset)) return acc;
        return acc + (asset.shares * asset.avgPrice);
    }, 0);

    const investedMoney = activePortfolio.investedMoney || (activePortfolio.totalBalance - activePortfolio.pnl);

    const handleTrade = (type) => {
        if (!selectedStock || quantity <= 0) return;

        const price = selectedStock.price;
        const totalCost = price * quantity;
        const cashAsset = activePortfolio.assets.find(a => assetIsCash(a));
        const currentCash = cashAsset ? cashAsset.currentPrice : (activePortfolio.totalBalance - (activePortfolio.spentOnStocks || 0));

        if (type === 'Buy' && currentCash < totalCost) {
            setTradeMessage({ text: `Insufficient balance! You need $${totalCost.toLocaleString()} but only have $${currentCash.toLocaleString()} available.`, type: 'error' });
            return;
        }

        const existingAssetIndex = activePortfolio.assets.findIndex(a => a.symbol === selectedStock.symbol);
        let updatedAssets = [...activePortfolio.assets];

        if (type === 'Buy') {
            if (existingAssetIndex >= 0) {
                const asset = updatedAssets[existingAssetIndex];
                const newShares = asset.shares + parseInt(quantity);
                const newAvgPrice = (asset.shares * asset.avgPrice + totalCost) / newShares;
                updatedAssets[existingAssetIndex] = { ...asset, shares: newShares, avgPrice: newAvgPrice };
            } else {
                updatedAssets.push({
                    symbol: selectedStock.symbol,
                    shares: parseInt(quantity),
                    avgPrice: price,
                    currentPrice: price,
                    allocation: 0 // Will recalculate
                });
            }
            // Deduct cash
            updateCash(updatedAssets, -totalCost);
        } else {
            // Sell
            if (existingAssetIndex < 0 || updatedAssets[existingAssetIndex].shares < quantity) {
                setTradeMessage({ text: 'Not enough shares to sell!', type: 'error' });
                return;
            }
            const asset = updatedAssets[existingAssetIndex];
            const newShares = asset.shares - parseInt(quantity);
            if (newShares === 0) {
                updatedAssets.splice(existingAssetIndex, 1);
            } else {
                updatedAssets[existingAssetIndex] = { ...asset, shares: newShares };
            }
            // Add cash
            updateCash(updatedAssets, totalCost);
        }

        // Recalculate allocations and total balance
        const newTotalValue = updatedAssets.reduce((acc, a) => acc + (a.shares * a.currentPrice), 0);
        updatedAssets = updatedAssets.map(a => ({
            ...a,
            allocation: Number(((a.shares * a.currentPrice) / newTotalValue * 100).toFixed(1))
        }));

        const newPnl = newTotalValue - investedMoney;

        const newPortfolio = {
            ...activePortfolio,
            totalBalance: newTotalValue,
            pnl: newPnl,
            pnlPercentage: Number((newPnl / investedMoney * 100).toFixed(1)),
            spentOnStocks: updatedAssets.reduce((acc, a) => acc + (assetIsCash(a) ? 0 : a.shares * a.avgPrice), 0),
            assets: updatedAssets,
            recentTransactions: [
                {
                    id: Date.now(),
                    type,
                    symbol: selectedStock.symbol,
                    amount: totalCost,
                    date: new Date().toISOString().split('T')[0],
                    status: 'Completed'
                },
                ...activePortfolio.recentTransactions
            ]
        };

        if (setPortfolio) {
            setPortfolio(newPortfolio);
        }
        setTradeMessage({ text: `Successfully ${type === 'Buy' ? 'bought' : 'sold'} ${quantity} shares of ${selectedStock.symbol}`, type: 'success' });
        setTimeout(() => setTradeMessage({ text: '', type: '' }), 3000);
    };

    const assetIsCash = (asset) => asset.symbol === 'CASH' || asset.symbol === 'USD';

    const updateCash = (assets, amount) => {
        const cashIndex = assets.findIndex(a => assetIsCash(a));
        if (cashIndex >= 0) {
            assets[cashIndex].shares = 1; // Cash always has 1 "share"
            assets[cashIndex].avgPrice += amount;
            assets[cashIndex].currentPrice += amount;
        } else if (amount > 0) {
            assets.push({ symbol: 'CASH', shares: 1, avgPrice: amount, currentPrice: amount, allocation: 0 });
        }
    };

    const filteredStocks = MOCK_STOCKS.filter(s =>
        s.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="portfolio-analyzer">
            <header style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Portfolio Intelligence</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Deep dive into your asset allocation and risk profile.</p>
                    </div>
                    {activePortfolio.personality && (
                        <div style={{
                            padding: '8px 16px',
                            background: 'rgba(99, 102, 241, 0.1)',
                            border: '1px solid var(--secondary)',
                            borderRadius: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'var(--secondary)',
                            fontWeight: '600',
                            fontSize: '0.9rem'
                        }}>
                            <ShieldAlert size={16} /> {activePortfolio.personality} Profile
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Activity: <span style={{ color: activePortfolio.recentTransactions.length > 5 ? 'var(--accent-green)' : 'var(--secondary)' }}>
                            {activePortfolio.recentTransactions.length > 5 ? 'High' : activePortfolio.recentTransactions.length > 0 ? 'Moderate' : 'Low'}
                        </span>
                    </div>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div className="glass-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Portfolio Balance</span>
                        <Wallet size={18} color="var(--primary)" />
                    </div>
                    <div style={{ fontSize: '1.6rem', fontWeight: '700' }}>${activePortfolio.totalBalance.toLocaleString()}</div>
                </div>
                <div className="glass-card" style={{ borderLeft: '4px solid var(--secondary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>AI Market Sentiment</span>
                        <Activity size={18} color="var(--secondary)" />
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: '700', color: sentiment.overall === 'Bullish' ? 'var(--accent-green)' : sentiment.overall === 'Bearish' ? 'var(--accent-red)' : 'white' }}>
                        {sentiment.overall}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Score: {sentiment.score}</div>
                </div>
                <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-green)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Assets</span>
                        <BarChart size={18} color="var(--accent-green)" />
                    </div>
                    <div style={{ fontSize: '1.6rem', fontWeight: '700' }}>{activePortfolio.assets.filter(a => !assetIsCash(a)).length}</div>
                </div>
                <div className="glass-card" style={{ borderLeft: '4px solid #ffab00' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Invested Capital</span>
                        <DollarSign size={18} color="#ffab00" />
                    </div>
                    <div style={{ fontSize: '1.6rem', fontWeight: '700' }}>${investedMoney.toLocaleString()}</div>
                </div>
                <div className="glass-card" style={{ borderLeft: '4px solid #f43f5e' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Spent on Stocks</span>
                        <Briefcase size={18} color="#f43f5e" />
                    </div>
                    <div style={{ fontSize: '1.6rem', fontWeight: '700' }}>${spentOnStocks.toLocaleString()}</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
                <div className="glass-card">
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <DollarSign size={20} color="var(--primary)" /> AI Trading Desk
                    </h3>

                    {tradeMessage.text && (
                        <div style={{
                            padding: '10px',
                            borderRadius: '8px',
                            marginBottom: '1rem',
                            fontSize: '0.85rem',
                            background: tradeMessage.type === 'success' ? 'rgba(0, 255, 163, 0.1)' : 'rgba(255, 77, 77, 0.1)',
                            color: tradeMessage.type === 'success' ? 'var(--accent-green)' : 'var(--accent-red)',
                            border: `1px solid ${tradeMessage.type === 'success' ? 'rgba(0, 255, 163, 0.2)' : 'rgba(255, 77, 77, 0.2)'}`
                        }}>
                            {tradeMessage.text}
                        </div>
                    )}

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Select Stock</label>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search stocks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px 10px 10px 36px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--card-border)',
                                    borderRadius: '8px',
                                    color: 'white'
                                }}
                            />
                        </div>
                        <div style={{
                            marginTop: '10px',
                            maxHeight: '150px',
                            overflowY: 'auto',
                            display: 'grid',
                            gap: '8px',
                            background: 'rgba(0,0,0,0.2)',
                            padding: '8px',
                            borderRadius: '8px'
                        }}>
                            {filteredStocks.map(stock => (
                                <div
                                    key={stock.symbol}
                                    onClick={() => setSelectedStock(stock)}
                                    style={{
                                        padding: '8px 12px',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        background: selectedStock?.symbol === stock.symbol ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <span>{stock.symbol} - {stock.name}</span>
                                    <span style={{ fontWeight: '700' }}>${stock.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Quantity</label>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--card-border)',
                                    borderRadius: '8px',
                                    color: 'white'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Estimated Total</label>
                            <div style={{ padding: '10px', fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary)' }}>
                                ${selectedStock ? (selectedStock.price * quantity).toLocaleString(undefined, { minimumFractionDigits: 2 }) : '0.00'}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Available Cash:</span>
                            <span style={{ fontWeight: '700', color: 'var(--accent-green)' }}>
                                ${(activePortfolio.assets.find(a => assetIsCash(a))?.currentPrice || (activePortfolio.totalBalance - (activePortfolio.spentOnStocks || 0))).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <button
                            className="btn-primary"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            onClick={() => handleTrade('Buy')}
                        >
                            <Plus size={18} /> Buy {selectedStock?.symbol}
                        </button>
                        <button
                            className="btn-outline"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1px solid var(--accent-red)', color: 'var(--accent-red)' }}
                            onClick={() => handleTrade('Sell')}
                        >
                            <Minus size={18} /> Sell {selectedStock?.symbol}
                        </button>
                    </div>
                </div>

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
                        {activePortfolio.assets.map((asset, index) => (
                            <div key={asset.symbol} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: COLORS[index % COLORS.length] }}></div>
                                <span style={{ color: 'var(--text-muted)' }}>{asset.symbol} ({asset.allocation}%)</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="glass-card" style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={20} color="var(--accent-green)" /> AI Recommendations for your {activePortfolio.personality} Profile
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {MOCK_STOCKS.filter(s => {
                        if (activePortfolio.personality === 'Risk Taker') return ['BTC', 'TSLA', 'ETH'].includes(s.symbol);
                        if (activePortfolio.personality === 'Aggressive') return ['NVDA', 'MSFT', 'TSLA'].includes(s.symbol);
                        if (activePortfolio.personality === 'Balanced') return ['AAPL', 'MSFT', 'VOO'].includes(s.symbol);
                        if (activePortfolio.personality === 'Conservative') return ['VOO', 'BND'].includes(s.symbol);
                        return true;
                    }).map(stock => (
                        <div key={stock.symbol} style={{
                            padding: '1.5rem',
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{stock.symbol}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{stock.name}</div>
                                </div>
                                <div style={{ fontWeight: '700', color: 'var(--primary)' }}>${stock.price}</div>
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                                {activePortfolio.personality === 'Risk Taker' ? 'High volatility asset with massive upside potential for your risk profile.' :
                                    activePortfolio.personality === 'Aggressive' ? 'Solid market leader with strong long-term growth fundamentals.' :
                                        activePortfolio.personality === 'Balanced' ? 'Reliable multi-sector stability to anchor your diversified strategy.' :
                                            'Low-volatility asset focused on preserving your capital and steady yields.'}
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedStock(stock);
                                    setSearchTerm(stock.symbol);
                                    window.scrollTo({ top: 300, behavior: 'smooth' });
                                }}
                                style={{
                                    marginTop: 'auto',
                                    padding: '10px',
                                    background: 'var(--primary)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'black',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s'
                                }}
                            >
                                ANALYZE & TRADE
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem', marginBottom: '2.5rem' }}>
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

                <div className="glass-card" style={{ overflowX: 'auto' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Your Holdings</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)', color: 'var(--text-muted)' }}>
                                <th style={{ padding: '0.8rem' }}>Asset</th>
                                <th style={{ padding: '0.8rem' }}>Shares</th>
                                <th style={{ padding: '0.8rem' }}>Avg Price</th>
                                <th style={{ padding: '0.8rem' }}>Current</th>
                                <th style={{ padding: '0.8rem', textAlign: 'right' }}>Total P/L</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activePortfolio.assets.filter(a => !assetIsCash(a)).map((asset) => {
                                const profitValue = (asset.currentPrice - asset.avgPrice) * asset.shares;
                                const isPositive = profitValue >= 0;
                                return (
                                    <tr key={asset.symbol} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                        <td style={{ padding: '0.8rem', fontWeight: '600' }}>{asset.symbol}</td>
                                        <td style={{ padding: '0.8rem' }}>{asset.shares}</td>
                                        <td style={{ padding: '0.8rem' }}>${asset.avgPrice.toFixed(2)}</td>
                                        <td style={{ padding: '0.8rem' }}>${asset.currentPrice.toFixed(2)}</td>
                                        <td style={{ padding: '0.8rem', textAlign: 'right', color: isPositive ? 'var(--accent-green)' : 'var(--accent-red)', fontWeight: '700' }}>
                                            {isPositive ? '+' : ''}${profitValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                <div className="glass-card">
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <History size={20} color="var(--secondary)" /> Recent Transactions
                    </h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {activePortfolio.recentTransactions.map(tx => (
                            <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', background: 'rgba(255,255,255,0.02)', borderRadius: '10px' }}>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <div style={{
                                        padding: '8px',
                                        borderRadius: '8px',
                                        background: tx.type === 'Buy' ? 'rgba(0, 255, 163, 0.1)' : tx.type === 'Sell' ? 'rgba(255, 77, 77, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                                        color: tx.type === 'Buy' ? 'var(--accent-green)' : tx.type === 'Sell' ? 'var(--accent-red)' : 'var(--secondary)'
                                    }}>
                                        {tx.type === 'Buy' ? <ArrowUpRight size={18} /> : tx.type === 'Sell' ? <ArrowDownRight size={18} /> : <DollarSign size={18} />}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{tx.type} {tx.symbol}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{tx.date}</div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: '700', color: tx.type === 'Buy' ? 'var(--accent-red)' : tx.type === 'Sell' ? 'var(--accent-green)' : 'white' }}>
                                        {tx.type === 'Buy' ? '-' : '+'}${tx.amount.toLocaleString()}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tx.status}</div>
                                </div>
                            </div>
                        ))}
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
        </div>
    );
};

export default PortfolioAnalyzer;
