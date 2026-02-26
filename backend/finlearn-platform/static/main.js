/**
 * AI Finance Platform - Core Logic (static/main.js)
 */

// Mock Data (Consistent with React frontend)
const MOCK_STOCKS = [
    { symbol: 'NVDA', name: 'NVIDIA Corp', price: 785.12, changePercent: 2.45, trend: 'up' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: 197.58, changePercent: -1.2, trend: 'down' },
    { symbol: 'AAPL', name: 'Apple Inc.', price: 182.31, changePercent: 0.85, trend: 'up' }
];

const PORTFOLIO_DATA = {
    totalBalance: 125400.00,
    assets: 12,
    pnl: 12450.50
};

// --- Dashboard Logic ---
function initDashboard() {
    const stockContainer = document.getElementById('trending-stocks');
    if (!stockContainer) return;

    MOCK_STOCKS.forEach(stock => {
        const card = document.createElement('div');
        card.className = 'glass-card';
        card.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; margin-bottom: 1rem;';
        card.innerHTML = `
            <div style="display: flex; gap: 1rem; alignItems: center">
                <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.05); borderRadius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 700">
                    ${stock.symbol[0]}
                </div>
                <div>
                    <div style="font-weight: 600">${stock.symbol}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted)">${stock.name}</div>
                </div>
            </div>
            <div style="text-align: right">
                <div style="font-weight: 600">$${stock.price}</div>
                <div style="color: ${stock.trend === 'up' ? 'var(--accent-green)' : 'var(--accent-red)'}; font-size: 0.85rem;">
                    ${stock.changePercent}%
                </div>
            </div>
        `;
        stockContainer.appendChild(card);
    });
}

// --- Auth Logic ---
function handleLogin(event) {
    event.preventDefault();
    const name = document.getElementById('login-name').value;
    if (!name) return;

    localStorage.setItem('finUser', JSON.stringify({ name, email: name.toLowerCase() + '@example.com' }));
    window.location.href = '/dashboard';
}

// --- Initialize Components on DOM Load ---
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});
