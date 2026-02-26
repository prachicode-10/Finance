import { MOCK_STOCKS, MOCK_NEWS, PORTFOLIO_DATA } from '../data/mockData';

export const AIService = {
    getSentimentAnalysis: () => {
        const scores = MOCK_NEWS.map(n => n.score);
        const average = scores.reduce((a, b) => a + b, 0) / scores.length;
        return {
            overall: average > 0.2 ? 'Bullish' : average < -0.2 ? 'Bearish' : 'Neutral',
            score: average.toFixed(2),
            summary: `Market sentiment is currently ${average > 0 ? 'positive' : 'negative'} based on ${MOCK_NEWS.length} major news outlets.`
        };
    },

    getAdvisorResponse: (query, userContext = {}) => {
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes('portfolio') || lowerQuery.includes('my assets')) {
            const topAsset = PORTFOLIO_DATA.assets.sort((a, b) => b.allocation - a.allocation)[0];
            return `Your portfolio is looking strong with a total balance of $${PORTFOLIO_DATA.totalBalance.toLocaleString()}. Your largest allocation is in ${topAsset.symbol} (${topAsset.allocation}%). I suggest diversifying more if you want to reduce risk.`;
        }

        if (lowerQuery.includes('prediction') || lowerQuery.includes('should i buy')) {
            const bullishNews = MOCK_NEWS.filter(n => n.sentiment === 'positive').length;
            return `Based on my current sentiment analysis, ${bullishNews} out of ${MOCK_NEWS.length} recent reports are positive. This suggests a low-to-medium risk for new entries in tech sectors like NVIDIA.`;
        }

        return "I'm your AI Financial Advisor. You can ask me about your portfolio, market sentiment, or stock predictions. How can I help you today?";
    },

    simulateStockPrediction: (symbol, userPrediction) => {
        const stock = MOCK_STOCKS.find(s => s.symbol === symbol) || MOCK_STOCKS[0];
        const aiPrediction = (stock.changePercent * (1 + (Math.random() * 0.4 - 0.2))).toFixed(2);
        const realResult = (stock.changePercent * (1 + (Math.random() * 0.2 - 0.1))).toFixed(2);

        return {
            symbol: stock.symbol,
            userPrediction: parseFloat(userPrediction).toFixed(2),
            aiPrediction,
            realResult,
            explanation: `The AI prediction of ${aiPrediction}% was based on current market sentiment of ${stock.trend} and historical volatility.`
        };
    }
};
