import React, { useState } from 'react';
import { Newspaper, MessageCircle, BarChart, Info, Search, Loader2 } from 'lucide-react';
import { AIService } from '../services/aiService';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5001';

const MarketSentiment = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [newsResults, setNewsResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState({
        overall: 'Neutral',
        score: '0.00',
        summary: 'Enter a stock ticker to analyze market sentiment.'
    });

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm) return;

        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/news/${searchTerm}`);
            const apiNews = response.data.slice(0, 5); // Take top 5

            // For each article, fetch sentiment score from backend
            const realNews = await Promise.all(apiNews.map(async (item, index) => {
                let score = 0;
                let impact = `Analyzing market implications for ${item.title}...`;
                try {
                    const sentimentResponse = await axios.get(`${API_BASE_URL}/analyze/${encodeURIComponent(item.title)}`);
                    score = sentimentResponse.data.score;
                    impact = sentimentResponse.data.sentiment === "Positive" ? "Positive outlook indicated." : sentimentResponse.data.sentiment === "Negative" ? "Caution advised." : "Neutral impact expected.";
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

            setNewsResults(realNews);

            // Get overall summary using the updated AIService
            const newSummary = await AIService.getSentimentAnalysis(realNews);
            setSummary(newSummary);
        } catch (error) {
            console.error("Error fetching news:", error);
            alert("Could not connect to backend. Make sure the Flask server is running at http://127.0.0.1:5001");
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
