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

export const PORTFOLIO_DATA = {
  totalBalance: 125400.00,
  pnl: 12450.50,
  pnlPercentage: 11.2,
  assets: [
    { symbol: 'NVDA', shares: 50, avgPrice: 420.00, currentPrice: 785.12, allocation: 35 },
    { symbol: 'AAPL', shares: 200, avgPrice: 150.00, currentPrice: 182.31, allocation: 25 },
    { symbol: 'MSFT', shares: 80, avgPrice: 310.00, currentPrice: 405.20, allocation: 30 },
    { symbol: 'CASH', shares: 1, avgPrice: 12540.00, currentPrice: 12540.00, allocation: 10 },
  ]
};
