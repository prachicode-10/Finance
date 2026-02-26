import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { AIService } from '../services/aiService';

const AIFinancialAdvisor = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I'm your AI Financial Advisor. I can help you analyze your portfolio, understand market sentiment, or give you insights on specific stocks. What's on your mind today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await AIService.getAdvisorResponse(input);
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting right now." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="ai-advisor" style={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
            <header style={{ marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Sparkles color="var(--primary)" /> AI Financial Advisor
                </h1>
                <p style={{ color: 'var(--text-muted)' }}>Personalized insights powered by simulated neural intelligence.</p>
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
                            }}>
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
                                Thinking...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
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
                            outline: 'none'
                        }}
                    />
                    <button type="submit" className="btn-primary" style={{ padding: '0.8rem' }}>
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIFinancialAdvisor;
