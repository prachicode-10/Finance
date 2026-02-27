import React, { useState } from 'react';
import { Newspaper, BarChart, Info, Search, Loader2, TrendingUp, TrendingDown, AlertCircle, PieChart } from 'lucide-react';
import { AIService } from '../services/aiService';
import { STOCK_SENTIMENTS, MOCK_STOCKS } from '../data/mockData';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001';

const MarketSentiment = () => {
    const [selectedStock, setSelectedStock] = useState(STOCK_SENTIMENTS[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newsResults, setNewsResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [useRealNews, setUseRealNews] = useState(false);
    const [error, setError] = useState(null);

    React.useEffect(() => {
        handleStockSelect(STOCK_SENTIMENTS[0]);
    }, []);

    const handleStockSelect = async (stock) => {
        setSelectedStock(stock);
        setNewsResults([]);
        setUseRealNews(false);

        // Optionally fetch real news for this stock
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/news/${stock.symbol}`);
            const apiNews = Array.isArray(response.data) ? response.data.slice(0, 5) : [];

            if (apiNews.length === 0) {
                // Backend returned empty or error handled as empty
                setLoading(false);
                return;
            }

            const realNews = await Promise.all(apiNews.map(async (item, index) => {
                let score = 0;
                let impact = `Analyzing market implications...`;
                try {
                    const sentimentResponse = await axios.get(`${API_BASE_URL}/analyze/${encodeURIComponent(item.title)}`);
                    score = sentimentResponse.data.score;
                    impact = sentimentResponse.data.sentiment === "Positive" ? "Positive outlook indicated." :
                        sentimentResponse.data.sentiment === "Negative" ? "Caution advised." : "Neutral impact expected.";
                } catch (err) {
                    console.error("Error analyzing news sentiment", err);
                }
                return {
                    id: `real-${index}`,
                    title: item.title,
                    url: item.url,
                    source: item.source,
                    time: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : 'Recent',
                    score: score.toFixed(2),
                    impact: impact
                };
            }));

            if (realNews.length > 0) {
                setNewsResults(realNews);
                setUseRealNews(true);
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            setError("Could not connect to live news feed. Displaying regional analysis.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm) return;

        const found = STOCK_SENTIMENTS.find(s => s.symbol === searchTerm.toUpperCase());
        if (found) {
            handleStockSelect(found);
            setSearchTerm('');
        }
    };

    const getSentimentColor = (sentiment) => {
        if (sentiment === 'Bullish') return 'var(--accent-green)';
        if (sentiment === 'Bearish') return 'var(--accent-red)';
        return 'var(--secondary)';
    };

    const getSentimentIcon = (trend) => {
        if (trend === 'up') return <TrendingUp size={24} color="var(--accent-green)" />;
        if (trend === 'down') return <TrendingDown size={24} color="var(--accent-red)" />;
        return <BarChart size={24} color="var(--secondary)" />;
    };

    const getStrengthBar = (score) => {
        const normalized = Math.abs(score);
        return normalized * 100;
    };

    return (
        <div className="market-sentiment">
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Market Sentiment Analyzer</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Real-time sentiment analysis and AI-driven stock predictions</p>

                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
                    <div className="input-group" style={{ marginBottom: 0, flex: 1, maxWidth: '400px' }}>
                        <input
                            type="text"
                            placeholder="Search stock ticker (e.g., NVDA, AAPL)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
                            style={{ width: '100%', padding: '0.6rem 1rem' }}
                        />
                    </div>
                    <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Search size={18} /> Search
                    </button>
                    <button
                        type="button"
                        onClick={async () => {
                            try {
                                const res = await axios.get(`${API_BASE_URL}/api/health`);
                                alert(`Backend Status: ${res.data.status}\nMessage: ${res.data.service}`);
                            } catch (err) {
                                alert(`Connection Failed: ${err.message}`);
                            }
                        }}
                        style={{
                            padding: '0.6rem 1rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '8px',
                            color: 'var(--text-muted)',
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                        }}
                    >
                        Check Connection
                    </button>
                </form>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
                {/* Sidebar: Stock List */}
                <div>
                    <h3 style={{ marginBottom: '1rem', fontSize: '0.95rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '600' }}>
                        Tracked Stocks
                    </h3>
                    <div style={{ display: 'grid', gap: '0.8rem' }}>
                        {STOCK_SENTIMENTS.map(stock => (
                            <button
                                key={stock.symbol}
                                onClick={() => handleStockSelect(stock)}
                                style={{
                                    padding: '1rem',
                                    background: selectedStock.symbol === stock.symbol ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.02)',
                                    border: selectedStock.symbol === stock.symbol ? '1px solid var(--primary)' : '1px solid var(--card-border)',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.2s ease',
                                    color: 'white'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <strong style={{ fontSize: '0.95rem' }}>{stock.symbol}</strong>
                                    {getSentimentIcon(stock.trend)}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                    {stock.name}
                                </div>
                                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: getSentimentColor(stock.sentiment) }}>
                                    {stock.sentiment}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                                    Score: {stock.score.toFixed(2)}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div>
                    {selectedStock && (
                        <>
                            {/* Header Card */}
                            <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '2rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--card-border)' }}>
                                    {/* Stock Info */}
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                                            {getSentimentIcon(selectedStock.trend)}
                                            <div>
                                                <h2 style={{ fontSize: '1.8rem', margin: 0 }}>{selectedStock.symbol}</h2>
                                                <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>{selectedStock.name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sentiment Score */}
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>SENTIMENT SCORE</div>
                                        <div style={{ fontSize: '2.5rem', fontWeight: '700', color: getSentimentColor(selectedStock.sentiment), marginBottom: '0.25rem' }}>
                                            {selectedStock.score.toFixed(2)}
                                        </div>
                                        <div style={{ fontSize: '1rem', fontWeight: '600', color: getSentimentColor(selectedStock.sentiment) }}>
                                            {selectedStock.sentiment}
                                        </div>
                                    </div>
                                </div>

                                {/* Analysis Text */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.8rem' }}>
                                        <Info size={18} color="var(--primary)" />
                                        <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>AI Analysis</span>
                                    </div>
                                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                                        {selectedStock.analysis}
                                    </p>
                                </div>

                                {/* Sentiment Strength Meter */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Sentiment Strength</span>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedStock.strength}</span>
                                    </div>
                                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{
                                            width: `${getStrengthBar(selectedStock.score)}%`,
                                            height: '100%',
                                            background: `linear-gradient(90deg, ${selectedStock.score < 0 ? 'var(--accent-red)' : 'var(--accent-green)'}, ${selectedStock.score < 0 ? 'var(--accent-red)' : 'var(--accent-green)'})`
                                        }} />
                                    </div>
                                </div>
                            </div>

                            {/* Prediction Box */}
                            <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1.5rem', background: selectedStock.trend === 'up' ? 'rgba(0, 230, 118, 0.08)' : selectedStock.trend === 'down' ? 'rgba(255, 77, 77, 0.08)' : 'rgba(99, 102, 241, 0.08)', border: `2px solid ${getSentimentColor(selectedStock.sentiment)}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ padding: '1rem', background: getSentimentColor(selectedStock.sentiment), borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {selectedStock.trend === 'up' ? (
                                            <TrendingUp size={32} color="white" />
                                        ) : selectedStock.trend === 'down' ? (
                                            <TrendingDown size={32} color="white" />
                                        ) : (
                                            <BarChart size={32} color="white" />
                                        )}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>PRICE PREDICTION</div>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0, color: getSentimentColor(selectedStock.sentiment) }}>
                                            {selectedStock.prediction}
                                        </h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0.5rem 0 0 0' }}>
                                            Based on current market sentiment analysis
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* News Breakdown */}
                            <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
                                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <PieChart size={20} /> Sentiment Breakdown
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                    {/* Positive */}
                                    <div style={{ padding: '1rem', background: 'rgba(0, 230, 118, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--accent-green)' }}>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: '600' }}>Positive</div>
                                        <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--accent-green)' }}>
                                            {selectedStock.positiveNews}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                            {((selectedStock.positiveNews / selectedStock.newsCount) * 100).toFixed(0)}% of news
                                        </div>
                                    </div>

                                    {/* Neutral */}
                                    <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--secondary)' }}>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: '600' }}>Neutral</div>
                                        <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--secondary)' }}>
                                            {selectedStock.neutralNews}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                            {((selectedStock.neutralNews / selectedStock.newsCount) * 100).toFixed(0)}% of news
                                        </div>
                                    </div>

                                    {/* Negative */}
                                    <div style={{ padding: '1rem', background: 'rgba(255, 77, 77, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--accent-red)' }}>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: '600' }}>Negative</div>
                                        <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--accent-red)' }}>
                                            {selectedStock.negativeNews}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                            {((selectedStock.negativeNews / selectedStock.newsCount) * 100).toFixed(0)}% of news
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* News Results */}
                            {newsResults.length > 0 && (
                                <>
                                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Newspaper size={20} /> Latest News for {selectedStock.symbol}
                                    </h3>
                                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                                        {newsResults.map(news => (
                                            <div key={news.id} className="glass-card">
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{news.source} • {news.time}</div>
                                                    <div style={{
                                                        padding: '0.4rem 0.8rem',
                                                        background: news.score > 0 ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 77, 77, 0.1)',
                                                        color: news.score > 0 ? 'var(--accent-green)' : 'var(--accent-red)',
                                                        borderRadius: '6px',
                                                        fontSize: '0.8rem',
                                                        fontWeight: '600'
                                                    }}>
                                                        Score: {news.score}
                                                    </div>
                                                </div>
                                                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                                                    <a href={news.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                                        {news.title}
                                                    </a>
                                                </h4>
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
                                </>
                            )}

                            {!useRealNews && !loading && (
                                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                    {error ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                                            <AlertCircle color="var(--accent-red)" />
                                            <p style={{ fontSize: '0.95rem' }}>{error}</p>
                                        </div>
                                    ) : (
                                        <p style={{ fontSize: '0.95rem' }}>No news articles found for {selectedStock.symbol}. Ensure the Flask backend is healthy.</p>
                                    )}
                                </div>
                            )}

                            {loading && (
                                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                    <Loader2 className="animate-spin" size={32} style={{ margin: '0 auto 1rem auto' }} />
                                    <p>AI is scouring market sources...</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MarketSentiment;
