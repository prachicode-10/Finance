import React, { useState } from 'react';
import { Search, Grid, List, Sparkles, BookOpen, Brain } from 'lucide-react';
import { COURSES_DATA } from '../data/mockData';
import AIFlashcard from '../components/AIFlashcard';

const VideoLibrary = () => {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Extract all items from courses
    const allItems = COURSES_DATA.flatMap(course =>
        course.modules.map(module => ({
            ...module,
            courseName: course.title,
            courseId: course.id
        }))
    );

    // Filter items
    const filteredItems = allItems.filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.courseId === selectedCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const categories = [
        { id: 'all', label: 'All Knowledge' },
        ...COURSES_DATA.map(course => ({ id: course.id, label: course.title }))
    ];

    return (
        <div style={{ padding: '2rem', minHeight: '100vh', background: 'var(--bg-dark)' }}>
            <header style={{ marginBottom: '3rem' }}>
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={20} className="text-primary" />
                    <span className="text-xs font-black uppercase tracking-[0.4em] text-primary">Neural Knowledge Deck</span>
                </div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'white' }}>Finance Flashcards</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxW: '800px' }}>
                    Access an interactive library of AI-summarized financial concepts. Click any card to reveal the deep-dive insight.
                </p>
            </header>

            {/* Controls */}
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    {/* Search */}
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search concepts (e.g. Stocks, RSI, AI)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-primary/50 transition-colors"
                        />
                    </div>

                    {/* View Toggle */}
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all duration-300 font-bold text-sm ${viewMode === 'grid' ? 'bg-primary border-primary text-black' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                        >
                            <Grid size={16} /> Grid
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all duration-300 font-bold text-sm ${viewMode === 'list' ? 'bg-primary border-primary text-black' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                        >
                            <List size={16} /> List
                        </button>
                    </div>
                </div>

                {/* Category Filter */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-5 py-2 rounded-full border text-xs font-black uppercase tracking-widest transition-all duration-300 ${selectedCategory === cat.id ? 'bg-secondary border-secondary text-white' : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10'}`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Items Display */}
            {filteredItems.length === 0 ? (
                <div className="glass-card flex flex-col items-center justify-center p-20 text-center">
                    <Brain size={48} className="text-white/10 mb-4" />
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>No insights found matching your search. Try different keywords.</p>
                </div>
            ) : (
                <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                    {filteredItems.map((item) => (
                        <AIFlashcard
                            key={item.id}
                            title={item.title}
                            summary={item.aiSummary}
                            content={item.content}
                            category={item.courseName}
                        />
                    ))}
                </div>
            )}

            {/* Footer Stats */}
            <div style={{ marginTop: '5rem', padding: '3rem 2rem', textAlign: 'center', borderTop: '1px solid var(--card-border)' }}>
                <div className="flex justify-center gap-12 text-center">
                    <div>
                        <div className="text-2xl font-black text-white">{filteredItems.length}</div>
                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Active Cards</div>
                    </div>
                    <div>
                        <div className="text-2xl font-black text-white">{COURSES_DATA.length}</div>
                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Knowledge Streams</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoLibrary;
