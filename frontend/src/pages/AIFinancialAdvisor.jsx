import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { AIService } from '../services/aiService';

const AIFinancialAdvisor = ({ user, portfolio }) => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: `Hello ${user?.username || 'Investor'}! I'm your fine-tuned AI Financial Advisor. I've analyzed your ${portfolio?.personality || 'Balanced'} profile and your $${(portfolio?.totalBalance || 0).toLocaleString()} portfolio. How can I assist your strategy today?` }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const quickActions = [
        { label: "Analyze my risk", query: "Can you analyze my portfolio risk?" },
        { label: "Check balance", query: "How much money do I have?" },
        { label: "Top suggestions", query: "What are your top stock recommendations for me?" },
        { label: "Market news", query: "What's the current market sentiment?" }
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (e, customQuery) => {
        if (e) e.preventDefault();
        const query = customQuery || input;
        if (!query.trim()) return;

        const userMessage = { role: 'user', content: query };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            // Pass the context (user and portfolio) to the AI service
            const response = await AIService.getAdvisorResponse(query, {
                personality: portfolio?.personality,
                portfolio: portfolio
            });
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to my neural core right now. Please try again." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="ai-advisor" style={{ height: 'calc(100vh - 180px)', display: 'flex', flexDirection: 'column' }}>
            <header style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Sparkles color="var(--primary)" /> AI Financial Advisor
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Fine-tuned intelligence specifically calibrated for your <strong>{portfolio?.personality}</strong> strategy.</p>
                </div>
                <div style={{ padding: '8px 16px', background: 'rgba(0, 255, 163, 0.1)', borderRadius: '20px', fontSize: '0.8rem', color: 'var(--accent-green)', border: '1px solid rgba(0, 255, 163, 0.2)', fontWeight: '600' }}>
                    NEURAL CORE v2.0 ACTIVE
                </div>
            </header>

            <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', overflow: 'hidden' }}>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem' }}>
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: 'flex',
                                gap: '12px',
                                maxWidth: '85%',
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
                            }}
                        >
                            <div style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: msg.role === 'user' ? 'var(--secondary)' : 'rgba(255,255,255,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                border: '1px solid var(--card-border)'
                            }}>
                                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} color="var(--primary)" />}
                            </div>
                            <div style={{
                                padding: '1rem',
                                borderRadius: '16px',
                                background: msg.role === 'user' ? 'var(--secondary)' : 'rgba(255,255,255,0.03)',
                                fontSize: '0.95rem',
                                lineHeight: '1.5',
                                border: '1px solid var(--card-border)',
                                borderTopRightRadius: msg.role === 'user' ? '4px' : '16px',
                                borderTopLeftRadius: msg.role === 'user' ? '16px' : '4px',
                                position: 'relative'
                            }}>
                                {msg.role === 'assistant' && (
                                    <div style={{ position: 'absolute', top: '-10px', right: '10px', background: 'var(--primary)', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', color: 'black', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '700' }}>
                                        <Sparkles size={10} /> AI INSIGHT
                                    </div>
                                )}
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div style={{ display: 'flex', gap: '12px', maxWidth: '85%' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Bot size={18} color="var(--primary)" />
                            </div>
                            <div style={{ padding: '0.8rem 1.2rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                Searching neural knowledge base...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', scrollbarWidth: 'none' }}>
                    {quickActions.map(action => (
                        <button
                            key={action.label}
                            onClick={() => handleSend(null, action.query)}
                            style={{
                                padding: '6px 12px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '20px',
                                color: 'var(--text-muted)',
                                fontSize: '0.8rem',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => { e.target.style.background = 'rgba(255,255,255,0.1)'; e.target.style.borderColor = 'var(--primary)'; }}
                            onMouseOut={(e) => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.borderColor = 'var(--card-border)'; }}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px', paddingTop: '1rem', borderTop: '1px solid var(--card-border)' }}>
                    <input
                        type="text"
                        placeholder="Ask about market sentiment, top performers, or risk analysis..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '0.8rem 1.2rem',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--card-border)',
                            color: 'white',
                            borderRadius: '12px',
                            outline: 'none focus:border-var(--primary)'
                        }}
                    />
                    <button type="submit" className="btn-primary" style={{ padding: '0.8rem', borderRadius: '12px' }}>
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIFinancialAdvisor;
