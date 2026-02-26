import React, { useState } from 'react';
import { Newspaper, MessageCircle, BarChart, Info, Search, Loader2 } from 'lucide-react';
import { MOCK_NEWS } from '../data/mockData';
import { AIService } from '../services/aiService';
import axios from 'axios';

const MarketSentiment = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [newsResults, setNewsResults] = useState(MOCK_NEWS);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState(AIService.getSentimentAnalysis());

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm) return;

        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:5000/news/${searchTerm}`);
            const realNews = response.data.map((item, index) => ({
                id: `real-${index}`,
                title: item.title,
                url: item.url,
                source: item.source,
                time: 'Just now',
                // Simulate sentiment logic for real news
                score: (Math.random() * 2 - 1).toFixed(2),
                impact: "Analyzing market implications based on real-time data flow..."
            }));

            setNewsResults(realNews);
            // Re-calculate mock summary based on new results
            const avgScore = realNews.reduce((acc, curr) => acc + parseFloat(curr.score), 0) / realNews.length;
            setSummary({
                overall: avgScore > 0 ? 'Bullish' : 'Bearish',
                score: avgScore.toFixed(2),
                summary: `The market shows a ${avgScore > 0 ? 'positive' : 'negative'} trend for ${searchTerm} based on recent developments.`
            });
        } catch (error) {
            console.error("Error fetching news:", error);
            alert("Could not connect to backend. Make sure the Flask server is running at http://127.0.0.1:5000");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="market-sentiment">
            <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Market Sentiment Analyzer</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Fetch real-time news from our Python backend.</p>
                </div>

                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <input
                            type="text"
                            placeholder="Enter stock ticker (e.g. TSLA)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
                            style={{ width: '250px', padding: '0.6rem 1rem' }}
                        />
                    </div>
                    <button type="submit" className="btn-primary" disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                        Analyze
                    </button>
                </form>
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
                <Newspaper size={20} /> Latest Impact News {searchTerm && `for ${searchTerm}`}
            </h3>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {newsResults.length > 0 ? (
                    newsResults.map(news => (
                        <div key={news.id} className="glass-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{news.source} • {news.time}</div>
                                <div className={`badge ${news.score > 0 ? 'badge-success' : 'badge-danger'}`}>
                                    Score: {news.score}
                                </div>
                            </div>
                            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
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
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        No news found. Enter a ticker symbol above to fetch data.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarketSentiment;
