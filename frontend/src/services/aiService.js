import { MOCK_STOCKS, MOCK_NEWS, PORTFOLIO_DATA } from '../data/mockData';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5001';

export const AIService = {
    getSentimentAnalysis: async (newsList = []) => {
        if (!newsList || newsList.length === 0) {
            return {
                overall: 'Neutral',
                score: 0,
                summary: `Market sentiment is currently neutral as no news was found.`
            };
        }

        let totalScore = 0;
        let analyzedCount = 0;

        // Note: In a real app we might want a batch endpoint to avoid rate limits
        // For now, we'll analyze the titles of the top 3 news items
        const itemsToAnalyze = newsList.slice(0, 3);

        for (const item of itemsToAnalyze) {
            try {
                const url = `${API_BASE_URL}/analyze/${encodeURIComponent(item.title)}`;
                const response = await axios.get(url);
                totalScore += response.data.score;
                analyzedCount++;
            } catch (error) {
                console.error("Sentiment analysis error:", error);
            }
        }

        const average = analyzedCount > 0 ? (totalScore / analyzedCount) : 0;

        return {
            overall: average > 0.1 ? 'Bullish' : average < -0.1 ? 'Bearish' : 'Neutral',
            score: average.toFixed(2),
            summary: `Market sentiment is currently ${average > 0.1 ? 'positive' : average < -0.1 ? 'negative' : 'neutral'} based on recent news.`
        };
    },

    getAdvisorResponse: async (query, userContext = {}) => {
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes('portfolio') || lowerQuery.includes('my assets')) {
            const topAsset = PORTFOLIO_DATA.assets.sort((a, b) => b.allocation - a.allocation)[0];
            return `Your portfolio is looking strong with a total balance of $${PORTFOLIO_DATA.totalBalance.toLocaleString()}. Your largest allocation is in ${topAsset.symbol} (${topAsset.allocation}%). I suggest diversifying more if you want to reduce risk.`;
        }

        if (lowerQuery.includes('prediction') || lowerQuery.includes('should i buy')) {
            return `Based on my current sentiment analysis, I'd suggest reviewing the latest market trends. Predicting exact movements is difficult, but keeping an eye on positive sentiment sectors like AI is usually a good strategy.`;
        }

        // Analyze user query sentiment and reply accordingly
        try {
            const response = await axios.get(`${API_BASE_URL}/analyze/${encodeURIComponent(query)}`);
            const sentiment = response.data.sentiment;
            if (sentiment === "Negative") {
                return "I hear the concern. The market can be volatile, but keeping a long-term perspective is key. Can I help analyze a specific stock you are worried about?";
            } else if (sentiment === "Positive") {
                return "That sounds great! Market optimism is good, but always remember to manage your risks properly. Is there a specific stock you're looking to invest in?";
            }
        } catch (error) {
            console.error("AI Advisor error:", error);
        }

        return "I'm your AI Financial Advisor. You can ask me about your portfolio, market sentiment, or specific stock predictions. How can I help you today?";
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
