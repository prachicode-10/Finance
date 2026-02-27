export const MOCK_STOCKS = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 785.12, change: 12.45, changePercent: 1.61, trend: 'up' },
  { symbol: 'AAPL', name: 'Apple Inc', price: 182.31, change: -1.20, changePercent: -0.65, trend: 'down' },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 195.40, change: 5.60, changePercent: 2.95, trend: 'up' },
  { symbol: 'MSFT', name: 'Microsoft Corp', price: 405.20, change: 3.10, changePercent: 0.77, trend: 'up' },
  { symbol: 'BTC', name: 'Bitcoin', price: 52140.0, change: -450.0, changePercent: -0.85, trend: 'down' },
  { symbol: 'ETH', name: 'Ethereum', price: 2950.0, change: 45.0, changePercent: 1.55, trend: 'up' },
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', price: 462.15, change: 2.10, changePercent: 0.45, trend: 'up' },
  { symbol: 'BND', name: 'Vanguard Total Bond ETF', price: 72.40, change: -0.15, changePercent: -0.21, trend: 'down' },
];

// Stock Sentiment Analysis Data (for MarketSentiment.jsx)
export const STOCK_SENTIMENTS = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    sentiment: 'Bullish',
    score: 0.85,
    trend: 'up',
    prediction: 'Expected to rise',
    analysis: 'Strong AI demand and positive earnings outlook driving bullish sentiment across institutional investors.',
    newsCount: 12,
    positiveNews: 10,
    negativeNews: 1,
    neutralNews: 1,
    strength: 'Very Strong',
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc',
    sentiment: 'Bearish',
    score: -0.42,
    trend: 'down',
    prediction: 'Expected to decline',
    analysis: 'Market concerns over iPhone sales decline and regulatory pressures impacting investor confidence.',
    newsCount: 8,
    positiveNews: 2,
    negativeNews: 5,
    neutralNews: 1,
    strength: 'Moderate',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc',
    sentiment: 'Bullish',
    score: 0.68,
    trend: 'up',
    prediction: 'Expected to rise',
    analysis: 'Positive sentiment from new model announcements and strong quarterly guidance boosting investor optimism.',
    newsCount: 15,
    positiveNews: 11,
    negativeNews: 2,
    neutralNews: 2,
    strength: 'Strong',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp',
    sentiment: 'Bullish',
    score: 0.72,
    trend: 'up',
    prediction: 'Expected to rise',
    analysis: 'Azure cloud growth and AI integration in Office suite driving positive market sentiment.',
    newsCount: 9,
    positiveNews: 7,
    negativeNews: 1,
    neutralNews: 1,
    strength: 'Strong',
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    sentiment: 'Neutral',
    score: 0.05,
    trend: 'neutral',
    prediction: 'Consolidation expected',
    analysis: 'Mixed signals from regulatory developments and institutional adoption offsetting each other.',
    newsCount: 10,
    positiveNews: 5,
    negativeNews: 4,
    neutralNews: 1,
    strength: 'Balanced',
  },
];

export const MOCK_NEWS = [
  {
    id: 1,
    title: "Fed Signals Potential Rate Cuts by Mid-2024",
    source: "Financial Times",
    time: "2h ago",
    sentiment: "positive",
    score: 0.85,
    impact: "High interest in tech stocks expected."
  },
  {
    id: 2,
    title: "Global Supply Chain Disruptions Persist in Semiconductor Industry",
    source: "Reuters",
    time: "5h ago",
    sentiment: "negative",
    score: -0.65,
    impact: "Pressure on hardware manufacturers."
  },
  {
    id: 3,
    title: "NVIDIA Blows Past Earnings Estimates with AI Demand",
    source: "Bloomberg",
    time: "8h ago",
    sentiment: "positive",
    score: 0.95,
    impact: "AI sector set for massive rally."
  }
];

export const QUIZ_DATA = [
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

export const COURSES_DATA = [
  {
    id: 'basics',
    title: 'Financial Foundations',
    description: 'Master the core concepts of investing, risk management, and market mechanics to build long-term wealth.',
    icon: 'BookOpen',
    modules: [
      {
        id: 'm1',
        title: 'Understanding Stocks & Bonds',
        aiSummary: 'Stocks represent company ownership; Bonds represent debt. Stocks offer growth/dividends (high risk); Bonds offer interest (lower risk). A balanced mix is key.',
        diagramData: {
          nodes: [
            { id: 1, label: 'Capital', type: 'source' },
            { id: 2, label: 'Equity (Stocks)', type: 'asset' },
            { id: 3, label: 'Debt (Bonds)', type: 'asset' },
            { id: 4, label: 'Wealth Growth', type: 'result' }
          ],
          edges: [{ from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 4 }]
        },
        content: 'Stocks represent ownership (equity) in a company, offering potential for capital appreciation and dividends. Bonds are debt instruments where you lend money to governments or corporations in exchange for periodic interest payments. Balancing these two is the cornerstone of traditional investing.'
      },
      {
        id: 'm2',
        title: 'The Power of Compounding',
        aiSummary: 'Compounding is "interest on interest". Time is the most critical variable. Starting early, even with small amounts, creates exponential wealth growth over decades.',
        diagramData: {
          nodes: [
            { id: 1, label: 'Principal', type: 'source' },
            { id: 2, label: 'Reinvest Earnings', type: 'process' },
            { id: 3, label: 'Time Matrix', type: 'multiplier' },
            { id: 4, label: 'Exponential Curve', type: 'result' }
          ],
          edges: [{ from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }]
        },
        content: 'Compounding is the process where the value of an investment increases because the earnings on an investment, both capital gains and interest, earn interest as time passes. Starting early is more important than the amount invested due to the exponential nature of time-weighted returns.'
      },
      {
        id: 'm3',
        title: 'Modern Portfolio Theory',
        aiSummary: 'Diversification reduces risk without sacrificing returns. MPT optimizes assets based on their correlation, ensuring that "all eggs are NOT in one basket".',
        diagramData: {
          nodes: [
            { id: 1, label: 'Asset A', type: 'asset' },
            { id: 2, label: 'Asset B', type: 'asset' },
            { id: 3, label: 'Correlator', type: 'process' },
            { id: 4, label: 'Efficient Frontier', type: 'result' }
          ],
          edges: [{ from: 1, to: 3 }, { from: 2, to: 3 }, { from: 3, to: 4 }]
        },
        content: 'MPT suggests that it is not enough to look at the expected risk and return of one particular stock. By investing in more than one stock, an investor can reap the benefits of diversification — chief among them is a reduction in the riskiness of the portfolio.'
      },
      {
        id: 'm4',
        title: 'Inflation & Purchasing Power',
        aiSummary: 'Inflation is the hidden tax on cash. To build real wealth, your returns must beat the CPI (Inflation Rate). Stocks and Real Estate are historical hedges.',
        diagramData: {
          nodes: [
            { id: 1, label: 'Cash', type: 'source' },
            { id: 2, label: 'Inflation Filter', type: 'process' },
            { id: 3, label: 'Purchasing Power', type: 'result' },
            { id: 4, label: 'Real Yields', type: 'result' }
          ],
          edges: [{ from: 1, to: 2 }, { from: 2, to: 3 }, { from: 2, to: 4 }]
        },
        content: 'Inflation reduces the value of your cash over time. To grow wealth, your investment returns must exceed the rate of inflation. Real returns = Nominal Returns - Inflation Rate. Understanding this helps in choosing assets like stocks or real estate that historically outpace inflation.'
      }
    ],
    quizIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    id: 'advanced',
    title: 'Advanced Trading Strategies',
    description: 'Master technical analysis, options, and complex market sentiment indicators used by professional traders.',
    icon: 'TrendingUp',
    modules: [
      {
        id: 'a1',
        title: 'Technical Indicators',
        aiSummary: 'Technical indicators like RSI and MACD help identify trends and reversals. They provide mathematical filters for price volatility and market momentum.',
        diagramData: {
          nodes: [
            { id: 1, label: 'Price Action', type: 'source' },
            { id: 2, label: 'RSI Filter', type: 'process' },
            { id: 3, label: 'MACD Signal', type: 'process' },
            { id: 4, label: 'Entry/Exit', type: 'result' }
          ],
          edges: [{ from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 4 }]
        },
        content: 'Learn to use RSI (Relative Strength Index) to identify overbought/oversold conditions, MACD for momentum shifts, and Bollinger Bands for volatility breakouts.'
      },
      {
        id: 'a2',
        title: 'Options & Volatility',
        aiSummary: 'The Greeks (Delta, Theta, Vega) quantify risk in options. Theta decay is the passage of time, while Delta tracks price sensitivity. Essential for hedging.',
        diagramData: {
          nodes: [
            { id: 1, label: 'Underlying', type: 'source' },
            { id: 2, label: 'Delta', type: 'multiplier' },
            { id: 3, label: 'Theta', type: 'multiplier' },
            { id: 4, label: 'Premium Price', type: 'result' }
          ],
          edges: [{ from: 1, to: 2 }, { from: 2, to: 4 }, { from: 3, to: 4 }]
        },
        content: 'Options allow for non-linear returns. Understanding the "Greeks" is essential for hedging risk or leveraging positions effectively in volatile markets.'
      },
      {
        id: 'a3',
        title: 'Market Sentiment',
        aiSummary: 'Sentiment is the collective mood of investors. AI analyzes news and order flow to see where "Smart Money" is moving before retail traders react.',
        diagramData: {
          nodes: [
            { id: 1, label: 'News/Tweets', type: 'source' },
            { id: 2, label: 'NLP Engine', type: 'process' },
            { id: 3, label: 'Sentiment Score', type: 'multiplier' },
            { id: 4, label: 'Market Bias', type: 'result' }
          ],
          edges: [{ from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }]
        },
        content: 'Order flow analysis looks at the actual buy/sell orders hitting the tape. By understanding where large institutional blocks are being placed, retail traders can align themselves with "Smart Money" movements.'
      },
      {
        id: 'a4',
        title: 'Risk Management',
        aiSummary: 'Capital preservation is priority #1. The 1% rule ensures that no single loss can derail your portfolio. Position sizing is the ultimate survival skill.',
        diagramData: {
          nodes: [
            { id: 1, label: 'Account Equity', type: 'source' },
            { id: 2, label: '1% Rule', type: 'process' },
            { id: 3, label: 'Position Size', type: 'multiplier' },
            { id: 4, label: 'Stop Loss', type: 'result' }
          ],
          edges: [{ from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }]
        },
        content: 'The most important rule in trading is capital preservation. Learn the 1% rule and how to use Kelly Criterion and other statistical methods to determine optimal position sizes.'
      }
    ],
    quizIds: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  },
  {
    id: 'ai-finance',
    title: 'AI in Modern Finance',
    description: 'Explore how AI, Machine Learning, and Big Data are reshaping the global investment landscape.',
    icon: 'Brain',
    modules: [
      {
        id: 'ai1',
        title: 'Machine Learning Models',
        aiSummary: 'LSTMs and Gradient Boosting find hidden correlations in time-series data. AI doesn’t predict the future; it identifies repeating high-probability patterns.',
        diagramData: {
          nodes: [
            { id: 1, label: 'Time-Series Data', type: 'source' },
            { id: 2, label: 'Neural Layer', type: 'process' },
            { id: 3, label: 'Feature Extraction', type: 'process' },
            { id: 4, label: 'Prediction Output', type: 'result' }
          ],
          edges: [{ from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }]
        },
        content: 'Modern quants use Random Forests, Gradient Boosting, and LSTMs to process sequential time-series data.'
      },
      {
        id: 'ai2',
        title: 'NLP Sentiment Analysis',
        aiSummary: 'AI "reads" millions of signals per second. By quantifying language patterns, it can spot panic or euphoria across global markets long before humans.',
        diagramData: {
          nodes: [
            { id: 1, label: 'Unstructured Text', type: 'source' },
            { id: 2, label: 'Tokenization', type: 'process' },
            { id: 3, label: 'Context Weight', type: 'multiplier' },
            { id: 4, label: 'Sentiment Index', type: 'result' }
          ],
          edges: [{ from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }]
        },
        content: 'Natural Language Processing allows computers to "read" millions of news articles and tweets per second.'
      }
    ],
    quizIds: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  }
];

export const PORTFOLIO_DATA = {
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

// User-Specific Data Mapping
export const USER_ACCOUNTS = [
  { "id": 1, "username": "user01", "password": "pwdUser01!", "action": "login", "role": "employee", "tasks": ["Check inbox", "Update profile"] },
  { "id": 2, "username": "user02", "password": "pwdUser02!", "action": "login", "role": "employee", "tasks": ["Review code", "Fix bugs"] },
  { "id": 3, "username": "user03", "password": "pwdUser03!", "action": "login", "role": "employee", "tasks": ["Prepare presentation", "Attend meeting"] },
  { "id": 4, "username": "user04", "password": "pwdUser04!", "action": "login", "role": "employee", "tasks": ["Design UI", "Test components"] },
  { "id": 5, "username": "user05", "password": "pwdUser05!", "action": "login", "role": "admin", "tasks": ["Deploy app", "Monitor logs"] },
  { "id": 6, "username": "user06", "password": "pwdUser06!", "action": "login", "role": "employee", "tasks": ["Write docs", "Update wiki"] },
  { "id": 7, "username": "user07", "password": "pwdUser07!", "action": "login", "role": "employee", "tasks": ["Check emails", "Plan sprint"] },
  { "id": 8, "username": "user08", "password": "pwdUser08!", "action": "login", "role": "admin", "tasks": ["Fix CSS", "Push commits"] },
  { "id": 9, "username": "user09", "password": "pwdUser09!", "action": "login", "role": "employee", "tasks": ["Review PRs", "Merge branches"] },
  { "id": 10, "username": "user10", "password": "pwdUser10!", "action": "login", "role": "employee", "tasks": ["Test API", "Update endpoints"] },
  { "id": 11, "username": "user11", "password": "pwdUser11!", "action": "login", "role": "employee", "tasks": ["Optimize queries", "Backup DB"] },
  { "id": 12, "username": "user12", "password": "pwdUser12!", "action": "login", "role": "admin", "tasks": ["Create mockups", "Review UX"] },
  { "id": 13, "username": "user13", "password": "pwdUser13!", "action": "login", "role": "employee", "tasks": ["Configure server", "Check uptime"] },
  { "id": 14, "username": "user14", "password": "pwdUser14!", "action": "login", "role": "employee", "tasks": ["Write tests", "Run CI/CD"] },
  { "id": 15, "username": "user15", "password": "pwdUser15!", "action": "login", "role": "admin", "tasks": ["Update schema", "Validate data"] },
  { "id": 16, "username": "user16", "password": "pwdUser16!", "action": "login", "role": "employee", "tasks": ["Draft emails", "Schedule meeting"] },
  { "id": 17, "username": "user17", "password": "pwdUser17!", "action": "login", "role": "employee", "tasks": ["Analyze metrics", "Prepare report"] },
  { "id": 18, "username": "user18", "password": "pwdUser18!", "action": "login", "role": "admin", "tasks": ["Update tasks", "Check dashboard"] },
  { "id": 19, "username": "user19", "password": "pwdUser19!", "action": "login", "role": "employee", "tasks": ["Debug errors", "Push hotfix"] },
  { "id": 20, "username": "user20", "password": "pwdUser20!", "action": "login", "role": "employee", "tasks": ["Plan release", "Notify team"] }
];

export const USER_PORTFOLIOS = {
  'Pratik': {
    totalBalance: 306461983.50,
    pnl: 125538016.49,
    pnlPercentage: 40.9,
    assets: [
      { symbol: 'AAPL', shares: 1700, avgPrice: 180000.00, currentPrice: 271.75, allocation: 100 },
    ],
    recentTransactions: [
      { id: 1, type: 'Buy', symbol: 'AAPL', amount: 306000000.00, date: '2026-02-25', status: 'Completed' },
    ]
  },
  'Default': PORTFOLIO_DATA,
  'admin': {
    totalBalance: 500240.00,
    pnl: 45000.00,
    pnlPercentage: 9.8,
    assets: [
      { symbol: 'BTC', shares: 5, avgPrice: 42000.00, currentPrice: 52140.00, allocation: 50 },
      { symbol: 'ETH', shares: 50, avgPrice: 2200.00, currentPrice: 2950.00, allocation: 50 },
    ],
    recentTransactions: [
      { id: 1, type: 'Buy', symbol: 'BTC', amount: 210000.00, date: '2026-02-24', status: 'Completed' },
    ]
  },
  'employee': {
    totalBalance: 85200.00,
    pnl: 5200.00,
    pnlPercentage: 6.5,
    assets: [
      { symbol: 'MSFT', shares: 120, avgPrice: 350.00, currentPrice: 405.20, allocation: 60 },
      { symbol: 'AAPL', shares: 200, avgPrice: 170.00, currentPrice: 182.31, allocation: 40 },
    ],
    recentTransactions: [
      { id: 1, type: 'Buy', symbol: 'MSFT', amount: 42000.00, date: '2026-02-20', status: 'Completed' },
    ]
  }
};

export const USER_PORTFOLIO_STATS = [
  { "id": 1, "username": "user01", "invested_money": 20000, "spent_on_stocks": 15000, "performance": "positive", "gains_loss": 1800, "personality": "Risk Taker", "assets_allocations": { "stocks": 60, "bonds": 20, "cash": 10, "crypto": 10 } },
  { "id": 2, "username": "user02", "invested_money": 12000, "spent_on_stocks": 9000, "performance": "negative", "gains_loss": -600, "personality": "Conservative", "assets_allocations": { "stocks": 50, "bonds": 30, "cash": 20 } },
  { "id": 3, "username": "user03", "invested_money": 25000, "spent_on_stocks": 20000, "performance": "positive", "gains_loss": 3200, "personality": "Aggressive", "assets_allocations": { "stocks": 70, "mutual_funds": 15, "cash": 10, "crypto": 5 } },
  { "id": 4, "username": "user04", "invested_money": 8000, "spent_on_stocks": 6000, "performance": "negative", "gains_loss": -400, "personality": "Conservative", "assets_allocations": { "stocks": 40, "bonds": 40, "cash": 20 } },
  { "id": 5, "username": "user05", "invested_money": 15000, "spent_on_stocks": 12000, "performance": "positive", "gains_loss": 950, "personality": "Aggressive", "assets_allocations": { "stocks": 55, "bonds": 25, "crypto": 10, "cash": 10 } },
  { "id": 6, "username": "user06", "invested_money": 30000, "spent_on_stocks": 25000, "performance": "positive", "gains_loss": 4100, "personality": "Risk Taker", "assets_allocations": { "stocks": 65, "mutual_funds": 20, "real_estate": 10, "cash": 5 } },
  { "id": 7, "username": "user07", "invested_money": 10000, "spent_on_stocks": 7000, "performance": "negative", "gains_loss": -500, "personality": "Conservative", "assets_allocations": { "stocks": 45, "bonds": 35, "cash": 20 } },
  { "id": 8, "username": "user08", "invested_money": 18000, "spent_on_stocks": 14000, "performance": "positive", "gains_loss": 1600, "personality": "Aggressive", "assets_allocations": { "stocks": 60, "mutual_funds": 20, "crypto": 10, "cash": 10 } },
  { "id": 9, "username": "user09", "invested_money": 9500, "spent_on_stocks": 8000, "performance": "negative", "gains_loss": -700, "personality": "Conservative", "assets_allocations": { "stocks": 50, "bonds": 30, "cash": 20 } },
  { "id": 10, "username": "user10", "invested_money": 26000, "spent_on_stocks": 21000, "performance": "positive", "gains_loss": 3500, "personality": "Risk Taker", "assets_allocations": { "stocks": 70, "mutual_funds": 15, "real_estate": 10, "cash": 5 } },
  { "id": 11, "username": "user11", "invested_money": 11000, "spent_on_stocks": 9000, "performance": "positive", "gains_loss": 800, "personality": "Balanced", "assets_allocations": { "stocks": 55, "bonds": 25, "cash": 20 } },
  { "id": 12, "username": "user12", "invested_money": 6000, "spent_on_stocks": 5000, "performance": "negative", "gains_loss": -350, "personality": "Conservative", "assets_allocations": { "stocks": 40, "bonds": 40, "cash": 20 } },
  { "id": 13, "username": "user13", "invested_money": 20000, "spent_on_stocks": 16000, "performance": "positive", "gains_loss": 2700, "personality": "Risk Taker", "assets_allocations": { "stocks": 65, "mutual_funds": 20, "crypto": 10, "cash": 5 } },
  { "id": 14, "username": "user14", "invested_money": 7500, "spent_on_stocks": 6000, "performance": "negative", "gains_loss": -400, "personality": "Balanced", "assets_allocations": { "stocks": 45, "bonds": 35, "cash": 20 } },
  { "id": 15, "username": "user15", "invested_money": 14000, "spent_on_stocks": 11000, "performance": "positive", "gains_loss": 1200, "personality": "Aggressive", "assets_allocations": { "stocks": 55, "mutual_funds": 25, "cash": 20 } },
  { "id": 16, "username": "user16", "invested_money": 27000, "spent_on_stocks": 22000, "performance": "positive", "gains_loss": 3900, "personality": "Risk Taker", "assets_allocations": { "stocks": 70, "real_estate": 15, "mutual_funds": 10, "cash": 5 } },
  { "id": 17, "username": "user17", "invested_money": 9000, "spent_on_stocks": 7000, "performance": "negative", "gains_loss": -550, "personality": "Conservative", "assets_allocations": { "stocks": 50, "bonds": 30, "cash": 20 } },
  { "id": 18, "username": "user18", "invested_money": 16000, "spent_on_stocks": 13000, "performance": "positive", "gains_loss": 1750, "personality": "Aggressive", "assets_allocations": { "stocks": 60, "mutual_funds": 20, "crypto": 10, "cash": 10 } },
  { "id": 19, "username": "user19", "invested_money": 13000, "spent_on_stocks": 10000, "performance": "negative", "gains_loss": -700, "personality": "Balanced", "assets_allocations": { "stocks": 50, "bonds": 30, "cash": 20 } },
  { "id": 20, "username": "user20", "invested_money": 21000, "spent_on_stocks": 17000, "performance": "positive", "gains_loss": 3100, "personality": "Risk Taker", "assets_allocations": { "stocks": 65, "mutual_funds": 20, "real_estate": 10, "cash": 5 } }
];
