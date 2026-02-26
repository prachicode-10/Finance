export const MOCK_STOCKS = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 785.12, change: 12.45, changePercent: 1.61, trend: 'up' },
  { symbol: 'AAPL', name: 'Apple Inc', price: 182.31, change: -1.20, changePercent: -0.65, trend: 'down' },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 195.40, change: 5.60, changePercent: 2.95, trend: 'up' },
  { symbol: 'MSFT', name: 'Microsoft Corp', price: 405.20, change: 3.10, changePercent: 0.77, trend: 'up' },
  { symbol: 'BTC', name: 'Bitcoin', price: 52140.0, change: -450.0, changePercent: -0.85, trend: 'down' },
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
  {
    id: 1,
    question: "What is a 'Stop-Loss' order used for?",
    options: [
      "To automatically buy a stock at a lower price",
      "To limit a loss on a security position",
      "To stop trading for the day",
      "To lend money to a broker"
    ],
    answer: 1,
    explanation: "A stop-loss order is designed to limit an investor's loss on a security position by automatically selling the security when it reaches a certain price."
  },
  {
    id: 2,
    question: "Which of these is considered a 'Low Risk' investment?",
    options: [
      "Cryptocurrency",
      "Penny Stocks",
      "Government Bonds",
      "Venture Capital"
    ],
    answer: 2,
    explanation: "Government bonds are generally considered low risk because they are backed by the government's ability to tax its citizens."
  }
];

export const COURSES_DATA = [
  {
    id: 'basics',
    title: 'Financial Foundations',
    description: 'Learn the core concepts of investing, risk management, and market mechanics.',
    icon: 'BookOpen',
    modules: [
      { id: 'm1', title: 'Understanding Stocks & Bonds', content: 'Stocks represent ownership in a company, while bonds are loans to an entity...' },
      { id: 'm2', title: 'The Power of Compounding', content: 'Compound interest is the 8th wonder of the world. It is the interest you earn on interest...' },
      { id: 'm3', title: 'Introduction to Risk', content: 'Risk is the possibility of losing some or all of your investment. Diversification is key...' }
    ],
    quizIds: [1, 2]
  },
  {
    id: 'advanced',
    title: 'Advanced Trading Strategies',
    description: 'Master technical analysis, options, and complex market sentiment indicators.',
    icon: 'TrendingUp',
    modules: [
      { id: 'a1', title: 'Technical Analysis 101', content: 'Technical analysis is a trading discipline employed to evaluate investments and identify trading opportunities...' },
      { id: 'a2', title: 'Options & Derivatives', content: 'Options are financial instruments that are based on the value of underlying securities...' }
    ],
    quizIds: []
  },
  {
    id: 'ai-finance',
    title: 'AI in Modern Finance',
    description: 'Explore how AI and Machine Learning are reshaping the investment landscape.',
    icon: 'Brain',
    modules: [
      { id: 'ai1', title: 'Algorithmic Trading', content: 'Algorithmic trading is a process for executing orders using automated pre-programmed trading instructions...' },
      { id: 'ai2', title: 'Sentiment Analysis in Finance', content: 'Financial sentiment analysis is the use of NLP to track the mood of investors and markets...' }
    ],
    quizIds: []
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
