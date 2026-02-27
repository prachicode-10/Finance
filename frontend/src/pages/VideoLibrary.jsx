import React, { useState } from 'react';
import { Play, ExternalLink, Download, Search, Filter, Grid, List } from 'lucide-react';
import { COURSES_DATA } from '../data/mockData';

const VideoLibrary = () => {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Extract all videos from courses
    const allVideos = COURSES_DATA.flatMap(course =>
        course.modules.map(module => ({
            ...module,
            courseName: course.title,
            courseId: course.id
        }))
    );

    // Filter videos
    const filteredVideos = allVideos.filter(video => {
        const matchesCategory = selectedCategory === 'all' || video.courseId === selectedCategory;
        const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const categories = [
        { id: 'all', label: 'All Videos' },
        ...COURSES_DATA.map(course => ({ id: course.id, label: course.title }))
    ];

    return (
        <div style={{ padding: '2rem', minHeight: '100vh', background: 'var(--bg-dark)' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'white' }}>Finance Video Library</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>Access comprehensive, publicly available video tutorials on investing, trading, and AI finance.</p>
            </header>

            {/* Controls */}
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    {/* Search */}
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search videos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.8rem 0.8rem 0.8rem 40px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--card-border)',
                                color: 'white',
                                borderRadius: '8px',
                                fontSize: '0.95rem'
                            }}
                        />
                    </div>

                    {/* View Toggle */}
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                            onClick={() => setViewMode('grid')}
                            style={{
                                padding: '0.8rem 1rem',
                                background: viewMode === 'grid' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: viewMode === 'grid' ? 'black' : 'white',
                                border: '1px solid var(--card-border)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontWeight: '600'
                            }}
                        >
                            <Grid size={16} /> Grid
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            style={{
                                padding: '0.8rem 1rem',
                                background: viewMode === 'list' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: viewMode === 'list' ? 'black' : 'white',
                                border: '1px solid var(--card-border)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontWeight: '600'
                            }}
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
                            style={{
                                padding: '0.6rem 1.2rem',
                                background: selectedCategory === cat.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                color: selectedCategory === cat.id ? 'black' : 'white',
                                border: '1px solid var(--card-border)',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.9rem',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Videos Display */}
            {filteredVideos.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    <p style={{ fontSize: '1.1rem' }}>No videos found matching your search.</p>
                </div>
            ) : (
                <div style={{
                    display: viewMode === 'grid'
                        ? 'grid'
                        : 'flex',
                    gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : undefined,
                    flexDirection: viewMode === 'list' ? 'column' : undefined,
                    gap: '1.5rem'
                }}>
                    {filteredVideos.map((video, idx) => (
                        viewMode === 'grid' ? (
                            <div key={video.id} className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                {/* Thumbnail */}
                                <div style={{
                                    position: 'relative',
                                    paddingBottom: '56.25%',
                                    height: 0,
                                    background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(0,255,163,0.1))',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Play size={48} color="var(--primary)" fill="var(--primary)" opacity={0.8} />
                                    </div>
                                </div>

                                {/* Info */}
                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                        {video.courseName}
                                    </div>
                                    <h3 style={{ marginBottom: '0.8rem', color: 'white', fontSize: '1rem' }}>{video.title}</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', flex: 1, lineHeight: '1.5' }}>
                                        {video.content.substring(0, 120)}...
                                    </p>
                                    <a
                                        href={video.videoUrl.replace('/embed/', '/watch?v=')}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            padding: '0.8rem',
                                            background: 'var(--primary)',
                                            color: 'black',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <ExternalLink size={16} /> Watch on YouTube
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div key={video.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                {/* Thumbnail */}
                                <div style={{
                                    minWidth: '180px',
                                    width: '180px',
                                    height: '101px',
                                    background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(0,255,163,0.1))',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                }}>
                                    <Play size={32} color="var(--primary)" fill="var(--primary)" opacity={0.8} />
                                </div>

                                {/* Info */}
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                                        {video.courseName}
                                    </div>
                                    <h3 style={{ marginBottom: '0.5rem', color: 'white', fontSize: '1.1rem' }}>{video.title}</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.5' }}>
                                        {video.content.substring(0, 150)}...
                                    </p>
                                </div>

                                {/* Action */}
                                <a
                                    href={video.videoUrl.replace('/embed/', '/watch?v=')}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        background: 'var(--primary)',
                                        color: 'black',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    <ExternalLink size={16} /> Watch
                                </a>
                            </div>
                        )
                    ))}
                </div>
            )}

            {/* Footer Stats */}
            <div style={{ marginTop: '3rem', padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: '0.9rem' }}>
                    Showing {filteredVideos.length} of {allVideos.length} videos • All content is publicly available on YouTube
                </p>
            </div>
        </div>
    );
};

export default VideoLibrary;
