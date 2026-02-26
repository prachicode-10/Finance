const PORTFOLIO_DATA = {
    totalBalance: 125400.00,
    pnl: 12450.50,
    pnlPercentage: 11.2,
    assets: [
        { symbol: 'NVDA', shares: 50, avgPrice: 420.00, currentPrice: 785.12, allocation: 35 },
        { symbol: 'AAPL', shares: 200, avgPrice: 150.00, currentPrice: 182.31, allocation: 25 },
        { symbol: 'MSFT', shares: 80, avgPrice: 310.00, currentPrice: 405.20, allocation: 30 },
        { symbol: 'CASH', shares: 1, avgPrice: 12540.00, currentPrice: 12540.00, allocation: 10 },
    ],
    recentTransactions: [
        { id: 1, type: 'Buy', symbol: 'NVDA', amount: 12000.50, date: '2026-02-24', status: 'Completed' },
        { id: 2, type: 'Sell', symbol: 'AAPL', amount: 4500.00, date: '2026-02-22', status: 'Completed' },
        { id: 3, type: 'Buy', symbol: 'MSFT', amount: 8200.00, date: '2026-02-20', status: 'Completed' },
        { id: 4, type: 'Deposit', symbol: 'USD', amount: 50000.00, date: '2026-02-15', status: 'Completed' },
    ]
};

// Educational Data
const COURSES_DATA = [
    {
        id: 'basics',
        title: 'Financial Foundations',
        description: 'Master the core concepts of investing, risk management, and market mechanics to build long-term wealth.',
        icon: 'book-open',
        modules: [
            { id: 'm1', title: 'Understanding Stocks & Bonds', videoUrl: 'https://www.youtube.com/embed/N6uE9_W7z84', content: 'Stocks represent ownership (equity) in a company, offering potential for capital appreciation and dividends. Bonds are debt instruments where you lend money to governments or corporations in exchange for periodic interest payments. Balancing these two is the cornerstone of traditional investing.' },
            { id: 'm2', title: 'The Power of Compounding', videoUrl: 'https://www.youtube.com/embed/fzu9_hH_Hxk', content: 'Compounding is the process where the value of an investment increases because the earnings on an investment, both capital gains and interest, earn interest as time passes. Starting early is more important than the amount invested due to the exponential nature of time-weighted returns.' },
            { id: 'm3', title: 'Modern Portfolio Theory', videoUrl: 'https://www.youtube.com/embed/7VpI5P6iS2g', content: 'MPT suggests that it is not enough to look at the expected risk and return of one particular stock. By investing in more than one stock, an investor can reap the benefits of diversification — chief among them is a reduction in the riskiness of the portfolio.' },
            { id: 'm4', title: 'Inflation & Purchasing Power', videoUrl: 'https://www.youtube.com/embed/nW6shQ3y5X4', content: 'Inflation reduces the value of your cash over time. To grow wealth, your investment returns must exceed the rate of inflation. Real returns = Nominal Returns - Inflation Rate. Understanding this helps in choosing assets like stocks or real estate that historically outpace inflation.' }
        ],
        quizIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    {
        id: 'advanced',
        title: 'Advanced Trading Strategies',
        description: 'Master technical analysis, options, and complex market sentiment indicators used by professional traders.',
        icon: 'trending-up',
        modules: [
            { id: 'a1', title: 'Technical Indicators Deep-Dive', videoUrl: 'https://www.youtube.com/embed/fAclVIdV2Hw', content: 'Learn to use RSI (Relative Strength Index) to identify overbought/oversold conditions, MACD for momentum shifts, and Bollinger Bands for volatility breakouts. Technical analysis assumes that price action reflects all known information and tends to move in patterns.' },
            { id: 'a2', title: 'Options: The Greeks & Volatility', videoUrl: 'https://www.youtube.com/embed/7PM4rq06zRI', content: 'Options allow for non-linear returns. Delta measures price sensitivity, Gamma measures Delta\'s sensitivity, and Theta measures time decay. Understanding the "Greeks" is essential for hedging risk or leveraging positions effectively in volatile markets.' },
            { id: 'a3', title: 'Market Sentiment & Order Flow', videoUrl: 'https://www.youtube.com/embed/9vNMc_s3_vE', content: 'Order flow analysis looks at the actual buy/sell orders hitting the tape. By understanding where large institutional blocks are being placed, retail traders can align themselves with "Smart Money" movements rather than fighting the trend.' },
            { id: 'a4', title: 'Risk Management & Position Sizing', videoUrl: 'https://www.youtube.com/embed/v9qW8cT1_v8', content: 'The most important rule in trading is capital preservation. Learn the 1% rule (never risking more than 1% of equity on a single trade) and how to use Kelly Criterion and other statistical methods to determine optimal position sizes.' }
        ],
        quizIds: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    },
    {
        id: 'ai-finance',
        title: 'AI in Modern Finance',
        description: 'Explore how AI, Machine Learning, and Big Data are reshaping the global investment landscape.',
        icon: 'brain',
        modules: [
            { id: 'ai1', title: 'Machine Learning Models', videoUrl: 'https://www.youtube.com/embed/qvY97Rshh48', content: 'Modern quants use Random Forests, Gradient Boosting, and LSTMs (Long Short-Term Memory) to process sequential time-series data. These models can find non-linear correlations that human analysts might miss in massive datasets.' },
            { id: 'ai2', title: 'NLP & News Sentiment', videoUrl: 'https://www.youtube.com/embed/X2vAab_SotY', content: 'Natural Language Processing allows computers to "read" millions of news articles and tweets per second. By assigning sentiment scores to text, AI can predict market reactions to news events before they are even fully understood by humans.' },
            { id: 'ai3', title: 'Reinforcement Learning Agents', videoUrl: 'https://www.youtube.com/embed/i3899P_54oY', content: 'In RL, an AI agent learns to trade by being rewarded for profitable moves and penalized for losses. Over millions of simulated trades, the agent develops strategies for execution, market making, and portfolio rebalancing autonomously.' },
            { id: 'ai4', title: 'The Future of Fintech', videoUrl: 'https://www.youtube.com/embed/YpXjP_u-4W4', content: 'From Decentralized Finance (DeFi) to automated AI-advisors, the friction of traditional banking is being removed. Stay ahead by understanding how blockchain and AI converge to create a more transparent and efficient financial system.' }
        ],
        quizIds: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    }
];

const QUIZ_DATA = [
    // Financial Foundations (IDs 1-10)
    {
        id: 1,
        question: "What is a 'Stop-Loss' order used for?",
        options: ["To automatically buy a stock at a lower price", "To limit a loss on a security position", "To stop trading for the day", "To lend money to a broker"],
        answer: 1,
        explanation: "A stop-loss order is designed to limit an investor's loss on a security position by automatically selling the security when it reaches a certain price."
    },
    {
        id: 2,
        question: "Which of these is considered a 'Low Risk' investment?",
        options: ["Cryptocurrency", "Penny Stocks", "Government Bonds", "Venture Capital"],
        answer: 2,
        explanation: "Government bonds are generally considered low risk because they are backed by the government's ability to tax its citizens."
    },
    {
        id: 3,
        question: "What does the P/E ratio stand for?",
        options: ["Pricing and Equity", "Profit / Expense", "Price-to-Earnings", "Portfolio Efficiency"],
        answer: 2,
        explanation: "The Price-to-Earnings ratio is the ratio for valuing a company that measures its current share price relative to its per-share earnings."
    },
    {
        id: 4,
        question: "What is diversification in a portfolio?",
        options: ["Buying only high-growth stocks", "Spreading investments across various assets", "Selling all stocks for cash", "Investing only in one sector"],
        answer: 1,
        explanation: "Diversification involves spreading your investments across different asset classes and sectors to reduce overall risk."
    },
    {
        id: 5,
        question: "What is a Dividend?",
        options: ["A loan given to a company", "A fee paid to a broker", "A portion of company profits paid to shareholders", "A tax on stock sales"],
        answer: 2,
        explanation: "Dividends are payments made by a corporation to its shareholders out of its after-tax profits."
    },
    {
        id: 6,
        question: "What is the difference between a Bull and Bear market?",
        options: ["Bulls are slow, Bears are fast", "Bull means rising prices, Bear means falling prices", "Bull is for crypto, Bear is for stocks", "There is no difference"],
        answer: 1,
        explanation: "A bull market is characterized by rising prices and optimism, while a bear market sees falling prices and pessimism."
    },
    {
        id: 7,
        question: "What is inflation?",
        options: ["The increase in stock prices", "The decrease in purchasing power of money", "The growth of a company", "A type of insurance"],
        answer: 1,
        explanation: "Inflation is the rate at which the general level of prices for goods and services is rising and, consequently, purchasing power is falling."
    },
    {
        id: 8,
        question: "Which asset is generally most liquid?",
        options: ["Real Estate", "Fine Art", "Cash", "Private Equity"],
        answer: 2,
        explanation: "Liquidity refers to how quickly an asset can be converted to cash. Cash is the most liquid asset."
    },
    {
        id: 9,
        question: "What is 'Market Capitalization'?",
        options: ["Total assets of a company", "Total debt of a company", "Total value of all a company's shares", "The company's yearly revenue"],
        answer: 2,
        explanation: "Market Cap is calculated by multiplying the number of a company's outstanding shares by its current stock price."
    },
    {
        id: 10,
        question: "What is an ETF?",
        options: ["Electronic Trading Fund", "Exchange-Traded Fund", "Equity Transfer Form", "Every-day Trading Fund"],
        answer: 1,
        explanation: "An Exchange-Traded Fund (ETF) is a type of security that tracks an index, sector, or commodity, but which can be purchased or sold on a stock exchange the same as a regular stock."
    },
    // Advanced Trading Strategies (IDs 11-20)
    {
        id: 11,
        question: "What does RSI stand for in Technical Analysis?",
        options: ["Real Stock Index", "Relative Strength Index", "Return Scale Indicator", "Risk Standard Index"],
        answer: 1,
        explanation: "RSI is a momentum indicator that measures the magnitude of recent price changes to evaluate overbought or oversold conditions."
    },
    {
        id: 12,
        question: "In Options trading, what is 'Theta'?",
        options: ["Price sensitivity to volatility", "Price sensitivity to time decay", "Price sensitivity to interest rates", "Price sensitivity to the underlying stock"],
        answer: 1,
        explanation: "Theta represents the rate of decline in the value of an option due to the passage of time."
    },
    {
        id: 13,
        question: "What is a 'Short Squeeze'?",
        options: ["A decrease in stock volume", "A rapid increase in price forcing short sellers to buy", "A slow decline in price", "A merger between two companies"],
        answer: 1,
        explanation: "A short squeeze happens when a heavily shorted stock rapidly increases in price, forcing short sellers to buy shares to cover their positions, further driving price up."
    },
    {
        id: 14,
        question: "What is 'Fibonacci Retracement' used for?",
        options: ["Predicting company earnings", "Identifying potential support and resistance levels", "Calculating taxes", "Measuring market volatility"],
        answer: 1,
        explanation: "Technicians use Fibonacci levels to identify areas where a stock's price might stall or reverse trend."
    },
    {
        id: 15,
        question: "What is an 'Iron Condor'?",
        options: ["A high-risk penny stock", "An options strategy with limited risk and profit", "A type of gold investment", "A market crash scenario"],
        answer: 1,
        explanation: "The iron condor is a neutral options strategy that uses four different contracts to profit from low volatility."
    },
    {
        id: 16,
        question: "What is 'Volume' in trading?",
        options: ["The price of the stock", "The number of shares traded in a period", "The size of the company", "The speed of the internet connection"],
        answer: 1,
        explanation: "Volume represents the total number of shares or contracts traded for a specified security or the entire market during a given period."
    },
    {
        id: 17,
        question: "What is a 'Candlestick Chart'?",
        options: ["A chart showing heat maps", "A price chart showing open, high, low, and close", "A chart of energy stocks", "A table of historical data"],
        answer: 1,
        explanation: "Candlestick charts show the market's open, high, low, and close price for a specific time period in a visual format."
    },
    {
        id: 18,
        question: "What does 'Delta' measure in options?",
        options: ["Time decay", "Volatility change", "The rate of change in an option's price relative to the underlying asset", "Interest rate impact"],
        answer: 2,
        explanation: "Delta measures the expected move in an option's price per $1 move in the underlying security."
    },
    {
        id: 19,
        question: "What is 'Arbitrage'?",
        options: ["Buying and holding for 10 years", "Selling a stock at a loss", "Simultaneous purchase and sale to profit from price differences", "A type of insurance policy"],
        answer: 2,
        explanation: "Arbitrage involves exploiting price differences of the same asset in different markets to lock in a risk-free profit."
    },
    {
        id: 20,
        question: "What is a 'Margin Call'?",
        options: ["A call to buy more stocks", "A broker's demand for additional funds because of losses", "A phone call from a CEO", "A type of dividend payment"],
        answer: 1,
        explanation: "A margin call occurs when the value of an investor's margin account falls below the broker's required amount."
    },

    // AI in Modern Finance (IDs 21-30)
    {
        id: 21,
        question: "What is 'NLP' used for in AI Finance?",
        options: ["Neural Level Processing", "Natural Language Processing for news sentiment", "Net Loss Prevention", "Numerical Logic Programming"],
        answer: 1,
        explanation: "Natural Language Processing (NLP) is used to analyze news, social media, and earnings reports to gauge market sentiment."
    },
    {
        id: 22,
        question: "What is 'High-Frequency Trading' (HFT)?",
        options: ["Trading once a month", "Automated trading at extremely high speeds", "Trading with high leverage", "Trading only the most popular stocks"],
        answer: 1,
        explanation: "HFT is an algorithmic trading platform that executes a large number of orders in fractions of a second."
    },
    {
        id: 23,
        question: "What is a 'Neural Network' in stock prediction?",
        options: ["A group of brokers", "A computer system modeled on the human brain", "A network of fiber optic cables", "A social media platform"],
        answer: 1,
        explanation: "Neural networks are AI systems capable of learning complex patterns in historical market data to predict future movements."
    },
    {
        id: 24,
        question: "What is 'Sentiment Analysis'?",
        options: ["Determining the emotional tone of text data", "Analyzing the health of a company", "Predicting the weather's impact on stocks", "Measuring the price of an asset"],
        answer: 0,
        explanation: "Sentiment analysis uses AI to categorize text as positive, negative, or neutral to understand investor mood."
    },
    {
        id: 25,
        question: "What is 'Overfitting' in a trading model?",
        options: ["When a model is too small", "When a model works too well on historical data but fails on new data", "When a model is too expensive to run", "When a model replaces all humans"],
        answer: 1,
        explanation: "Overfitting occurs when an AI model learns the 'noise' in historical data rather than the actual patterns, making it useless for live trading."
    },
    {
        id: 26,
        question: "What is 'Reinforcement Learning'?",
        options: ["Teaching AI through rewards and penalties", "Manually entering data", "Reading books to the AI", "Restarting the model every day"],
        answer: 0,
        explanation: "Reinforcement learning allows an AI agent to learn optimal trading strategies by interacting with the market and receiving feedback."
    },
    {
        id: 27,
        question: "What is a 'Quant'?",
        options: ["A type of cryptocurrency", "A specialist who uses math and coding for finance", "A quantity of gold", "A quality control officer"],
        answer: 1,
        explanation: "Quants (Quantitative Analysts) use mathematical and statistical methods to design and implement trading strategies."
    },
    {
        id: 28,
        question: "What is 'Big Data' in finance?",
        options: ["Very large files", "Extremely large data sets analyzed computationally", "A big company like Google", "High-cost data"],
        answer: 1,
        explanation: "Big data involves processing massive amounts of structured and unstructured information to uncover market trends."
    },
    {
        id: 29,
        question: "What is an 'Algorithm'?",
        options: ["A type of rhythm", "A set of rules to be followed in calculations", "A CEO's secret plan", "A database system"],
        answer: 1,
        explanation: "In finance, an algorithm is a programmed set of instructions for executing a trade or analyzing data."
    },
    {
        id: 30,
        question: "What is 'Predictive Analytics'?",
        options: ["Looking at the past", "Using data and AI to predict future outcomes", "Guessing what will happen", "Drawing charts manually"],
        answer: 1,
        explanation: "Predictive analytics uses statistical techniques and machine learning to make predictions about future market events."
    }
];

// --- Dashboard Logic ---
const MOCK_STOCKS = [
    { symbol: 'NVDA', name: 'NVIDIA Corp', price: 785.12, changePercent: 2.45, trend: 'up' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: 197.58, changePercent: -1.2, trend: 'down' },
    { symbol: 'AAPL', name: 'Apple Inc.', price: 182.31, changePercent: 0.85, trend: 'up' }
];

function initDashboard() {
    const container = document.getElementById('trending-stocks');
    if (!container) return;

    MOCK_STOCKS.forEach(stock => {
        const card = document.createElement('div');
        card.className = 'glass-card';
        card.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem;';
        card.innerHTML = `
            <div style="display: flex; gap: 1rem; align-items: center">
                <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.05); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 700">
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
                    ${stock.changePercent > 0 ? '+' : ''}${stock.changePercent}%
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function handleLogin(event) {
    event.preventDefault();
    const name = document.getElementById('login-name').value;
    localStorage.setItem('finUser', JSON.stringify({ name, email: name.toLowerCase() + '@example.com' }));
    window.location.href = '/dashboard';
}

document.addEventListener('DOMContentLoaded', initDashboard);
