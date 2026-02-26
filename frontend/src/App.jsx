import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import LearningCenter from './pages/LearningCenter';
import AIPredictionPlayground from './pages/AIPredictionPlayground';
import MarketSentiment from './pages/MarketSentiment';
import PortfolioAnalyzer from './pages/PortfolioAnalyzer';
import AIFinancialAdvisor from './pages/AIFinancialAdvisor';
import LandingPage from './pages/LandingPage';

import Auth from './pages/Auth';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authState, setAuthState] = useState('landing'); // 'landing', 'auth', 'authenticated'
  const [user, setUser] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'learning':
        return <LearningCenter />;
      case 'prediction':
        return <AIPredictionPlayground />;
      case 'news':
        return <MarketSentiment />;
      case 'portfolio':
        return <PortfolioAnalyzer />;
      case 'advisor':
        return <AIFinancialAdvisor />;
      default:
        return <Dashboard />;
    }
  };

  if (authState === 'landing') {
    return <LandingPage onStart={() => setAuthState('auth')} />;
  }

  if (authState === 'auth') {
    return (
      <Auth
        onLogin={(name) => {
          setUser(name);
          setAuthState('authenticated');
        }}
      />
    );
  }

  return (
    <div className="dashboard-layout">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={() => {
          setAuthState('landing');
          setActiveTab('dashboard');
        }}
      />
      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              {user ? user[0].toUpperCase() : 'U'}
            </div>
            <span>{user || 'User'}</span>
          </div>
        </header>
        {renderContent()}
      </main>

      {/* Floating AI Bubble for simple interaction */}
      <div className="ai-advisor-minified" onClick={() => setActiveTab('advisor')}>
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <path d="M12 7c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3z"></path>
        </svg>
      </div>
    </div>
  );
}

export default App;
