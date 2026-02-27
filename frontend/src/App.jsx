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
import VideoLibrary from './pages/VideoLibrary';

import Auth from './pages/Auth';
import { USER_PORTFOLIOS, USER_PORTFOLIO_STATS } from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authState, setAuthState] = useState('landing'); // 'landing', 'auth', 'authenticated'
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState(null);

  // utility for deriving an initial portfolio from the mock data
  const initializePortfolio = (userObj) => {
    if (!userObj) return null;
    const username = userObj.username || userObj;
    let base = USER_PORTFOLIOS[username];

    // Look up stats for this user ID
    const stats = USER_PORTFOLIO_STATS.find(s => s.id === userObj.id || s.username === username);

    if (!base) {
      // fallback recreation of dynamic portfolio from Dashboard logic
      const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const roleBase = USER_PORTFOLIOS[userObj.role] || USER_PORTFOLIOS['Default'];
      const balanceVariance = (hash * 137) % 15000;
      const pnlVariance = ((hash * 7) % 80) / 10 - 4;

      base = {
        ...roleBase,
        totalBalance: roleBase.totalBalance + balanceVariance,
        pnlPercentage: Number((roleBase.pnlPercentage + pnlVariance).toFixed(1)),
      };
    }

    // Merge stat-specific data if found
    if (stats) {
      base = {
        ...base,
        investedMoney: stats.invested_money,
        spentOnStocks: stats.spent_on_stocks,
        pnl: stats.gains_loss,
        personality: stats.personality || (userObj.role === 'admin' ? 'Risk Taker' : 'Balanced'),
        totalBalance: stats.invested_money + stats.gains_loss
      };

      if (base.investedMoney > 0) {
        base.pnlPercentage = Number((base.pnl / base.investedMoney * 100).toFixed(1));
      }
    } else {
      // DEFAULT MONEY = 53000
      base.investedMoney = 53000;
      base.pnl = base.pnl || 0;
      base.totalBalance = 53000 + base.pnl;
      base.spentOnStocks = base.spentOnStocks || (base.assets ? base.assets.reduce((acc, a) => acc + (a.symbol !== 'CASH' ? a.shares * a.avgPrice : 0), 0) : 0);
      base.personality = base.personality || (userObj.role === 'admin' ? 'Risk Taker' : 'Balanced');
    }

    setPortfolio(base);
    return base;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} portfolio={portfolio} onNavigate={setActiveTab} />;
      case 'learning':
        return <LearningCenter />;
      case 'videos':
        return <VideoLibrary />;
      case 'prediction':
        return <AIPredictionPlayground />;
      case 'news':
        return <MarketSentiment />;
      case 'portfolio':
        return <PortfolioAnalyzer user={user} portfolio={portfolio} setPortfolio={setPortfolio} />;
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
        onLogin={(userObj) => {
          setUser(userObj);
          initializePortfolio(userObj);
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
          setPortfolio(null);
          setUser(null);
        }}
      />
      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              {user ? (user.username ? user.username[0].toUpperCase() : 'U') : 'U'}
            </div>
            <span>{user ? (user.username || 'User') : 'User'}</span>
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
