import React from 'react';
import {
    LayoutDashboard,
    GraduationCap,
    TrendingUp,
    Newspaper,
    PieChart,
    MessageSquare,
    Settings,
    LogOut
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'learning', label: 'Learning Center', icon: <GraduationCap size={20} /> },
        { id: 'prediction', label: 'AI Playground', icon: <TrendingUp size={20} /> },
        { id: 'news', label: 'Market Sentiment', icon: <Newspaper size={20} /> },
        { id: 'portfolio', label: 'Portfolio', icon: <PieChart size={20} /> },
        { id: 'advisor', label: 'AI Advisor', icon: <MessageSquare size={20} /> },
    ];

    return (
        <aside className="sidebar">
            <div className="logo" style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp /> FIN-AI
                </h2>
            </div>

            <nav style={{ flex: 1 }}>
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(item.id)}
                    >
                        {item.icon}
                        {item.label}
                    </div>
                ))}
            </nav>

            <div className="sidebar-footer" style={{ marginTop: 'auto', borderTop: '1px solid var(--card-border)', paddingTop: '1.5rem' }}>
                <div className="nav-item">
                    <Settings size={20} /> Settings
                </div>
                <div className="nav-item" style={{ color: 'var(--accent-red)' }} onClick={onLogout}>
                    <LogOut size={20} /> Logout
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
