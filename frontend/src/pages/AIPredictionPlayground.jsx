import React, { useState, useEffect } from 'react';
import { TrendingUp, Brain, User, AlertCircle, Activity, Target, ShieldAlert, Loader2, Link as LinkIcon } from 'lucide-react';
import { MOCK_STOCKS } from '../data/mockData';
import { AIService } from '../services/aiService';
import axios from 'axios';
import Chart from 'react-apexcharts';

const AIPredictionPlayground = () => {
    const [selectedStock, setSelectedStock] = useState(MOCK_STOCKS[0]);
    const [userPrediction, setUserPrediction] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [externalData, setExternalData] = useState(null);

    // Fetch external model data from the playground repo
    useEffect(() => {
        const fetchExternalData = async () => {
            try {
                // Targeting the raw data from the PratikRanjan4/playground repo
                // If data.json doesn't exist yet, we'll use a fallback but keep the structure
                const response = await axios.get('https://raw.githubusercontent.com/PratikRanjan4/playground/main/data.json');
                setExternalData(response.data);
            } catch (err) {
                console.log("External repo data.json not found, using service logic - awaiting user upload.");
            }
        };
        fetchExternalData();
    }, []);

    const handlePredict = (e) => {
        e.preventDefault();
        if (!userPrediction) return;

        setLoading(true);

        // Simulate a slight delay for "AI processing"
        setTimeout(() => {
            const predictionResult = AIService.simulateStockPrediction(selectedStock.symbol, userPrediction);

            // Integrate External Model Logic
            // If we have external data for this symbol, we use it for comparison
            const modelVal = externalData?.[selectedStock.symbol]?.prediction || predictionResult.aiPrediction;

            // Calculate Errors
            const userDelta = Math.abs(parseFloat(userPrediction) - parseFloat(predictionResult.realResult)).toFixed(2);
            const aiDelta = Math.abs(parseFloat(modelVal) - parseFloat(predictionResult.realResult)).toFixed(2);
            const intuitionError = Math.abs(parseFloat(userPrediction) - parseFloat(modelVal)).toFixed(2);

            // Precision score (higher is better)
            const precisionScore = Math.max(0, 100 - (intuitionError * 10)).toFixed(0);

            setResult({
                ...predictionResult,
                aiPrediction: modelVal,
                userDelta,
                aiDelta,
                intuitionError,
                precisionScore,
                userPrediction,
                isHighError: intuitionError > 2.0 // Error threshold for a "warning"
            });
            setLoading(false);
        }, 800);
    };

    const getCandleData = () => {
        // Base mock historical days on the current stock's price
        const lastClose = selectedStock.price || 150;

        // Generate previous days based on last close
        const d1 = lastClose * 0.98;
        const d2 = lastClose * 0.99;
        const d3 = lastClose * 0.975;
        const d4 = lastClose * 0.995;

        const data = [
            { x: new Date(Date.now() - 5 * 86400000).getTime(), y: [d1, d1 * 1.01, d1 * 0.99, d2] },
            { x: new Date(Date.now() - 4 * 86400000).getTime(), y: [d2, d2 * 1.02, d2 * 0.98, d3] },
            { x: new Date(Date.now() - 3 * 86400000).getTime(), y: [d3, d3 * 1.01, d3 * 0.99, d4] },
            { x: new Date(Date.now() - 2 * 86400000).getTime(), y: [d4, d4 * 1.005, d4 * 0.99, lastClose * 0.99] },
            { x: new Date(Date.now() - 1 * 86400000).getTime(), y: [lastClose * 0.99, lastClose * 1.01, lastClose * 0.98, lastClose] },
        ];

        if (result) {
            // Predict next day candle
            const predClose = lastClose * (1 + parseFloat(result.realResult) / 100);
            const userClose = lastClose * (1 + parseFloat(result.userPrediction) / 100);
            const aiClose = lastClose * (1 + parseFloat(result.aiPrediction) / 100);
            const high = Math.max(lastClose, predClose, userClose, aiClose) * 1.005;
            const low = Math.min(lastClose, predClose, userClose, aiClose) * 0.995;

            data.push({
                x: new Date(Date.now()).getTime(),
                y: [lastClose, high, low, predClose]
            });

            // Note: We avoid 'goals' here because ApexCharts candlesticks don't support them stably
        }

        return [{ name: 'Price', data }];
    };

    const candleOptions = {
        chart: { type: 'candlestick', background: 'transparent', toolbar: { show: false } },
        theme: { mode: 'dark' },
        xaxis: { type: 'datetime', labels: { style: { colors: '#888' } } },
        yaxis: { tooltip: { enabled: true }, labels: { style: { colors: '#888' } } },
        plotOptions: { candlestick: { colors: { upward: '#00ffa3', downward: '#ff4d4d' } } },
        grid: { borderColor: 'rgba(255,255,255,0.05)' },
        tooltip: { theme: 'dark' }
    };

    return (
        <div className="prediction-playground">
            <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>AI Prediction Playground</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Validate your intuition against Mathematical AI Models.</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', color: 'var(--secondary)', fontSize: '0.8rem', background: 'rgba(99, 102, 241, 0.1)', padding: '6px 12px', borderRadius: '20px', border: '1px solid var(--secondary)' }}>
                    <LinkIcon size={14} /> Linked to: PratikRanjan4/playground
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="glass-card">
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <TrendingUp color="var(--primary)" /> Prediction Parameters
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
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>24h Growth Prediction (%)</label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="e.g. 1.25"
                                value={userPrediction}
                                onChange={(e) => setUserPrediction(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', background: 'var(--bg-dark)', border: '1px solid var(--card-border)', color: 'white', borderRadius: '8px' }}
                            />
                        </div>

                        <button type="submit" className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <Target size={20} />}
                            {loading ? 'Processing Model...' : 'Calculate Precision'}
                        </button>
                    </form>
                </div>

                {result ? (
                    <div className="glass-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ margin: 0 }}>Accuracy Analysis</h3>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Precision Score</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: result.precisionScore > 80 ? 'var(--accent-green)' : result.precisionScore > 50 ? 'var(--secondary)' : 'var(--accent-red)' }}>
                                    {result.precisionScore}%
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gap: '1.2rem' }}>
                            {/* User Data */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><User size={18} color="var(--text-muted)" /> Your Intuition</div>
                                <div style={{ fontWeight: '700' }}>{result.userPrediction}%</div>
                            </div>

                            {/* AI Model Data (External Sync) */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '12px', border: '1px solid var(--secondary)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--secondary)' }}><Brain size={18} /> Model Prediction</div>
                                <div style={{ fontWeight: '700' }}>{result.aiPrediction}%</div>
                            </div>

                            {/* Error Delta */}
                            <div style={{ padding: '1rem', borderRadius: '12px', background: result.isHighError ? 'rgba(255, 77, 77, 0.05)' : 'rgba(255,255,255,0.02)', border: result.isHighError ? '1px solid var(--accent-red)' : '1px solid transparent' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Intuition Error (Delta)</span>
                                    <span style={{ fontWeight: '700', color: result.isHighError ? 'var(--accent-red)' : 'var(--accent-green)' }}>
                                        {result.intuitionError}%
                                    </span>
                                </div>
                                {result.isHighError && (
                                    <div style={{ display: 'flex', gap: '8px', color: 'var(--accent-red)', fontSize: '0.75rem', marginTop: '4px' }}>
                                        <ShieldAlert size={14} /> Your prediction deviates significantly from the model.
                                    </div>
                                )}
                            </div>

                            {/* Final Market Result */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(0, 255, 163, 0.05)', borderRadius: '12px', border: '1px solid var(--primary)', marginTop: '0.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)' }}><Activity size={18} /> Real Market Result</div>
                                <div style={{ fontWeight: '700' }}>{result.realResult}%</div>
                            </div>
                        </div>

                        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '12px', color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                            <AlertCircle size={32} style={{ flexShrink: 0, marginTop: '2px', opacity: 0.5 }} />
                            <p>Analysis: {result.explanation} Your intuition was {result.userDelta}% away from the actual result, while the model was {result.aiDelta}% away.</p>
                        </div>
                    </div>
                ) : (
                    <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <div>
                            <Brain size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                            <p>Select a stock and enter your prediction <br /> to run the mathematical comparison.</p>
                        </div>
                    </div>
                )}
            </div>

            {result && (
                <div className="glass-card" style={{ marginTop: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <TrendingUp color="var(--primary)" /> {selectedStock.symbol} Candlestick Projection (Real-time)
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                        Visualizing historical prices leading into the predicted market close. The final candle represents the predicted change window relative to your intuition.
                    </p>
                    <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <Chart options={candleOptions} series={getCandleData()} type="candlestick" height={350} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIPredictionPlayground;
