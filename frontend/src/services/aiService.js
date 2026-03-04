import { MOCK_STOCKS, MOCK_NEWS, PORTFOLIO_DATA } from '../data/mockData';
import { ADVISOR_KNOWLEDGE_BASE, FALLBACK_ANSWERS } from '../data/advisorDataset';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const AIService = {
    // ... (keep getSentimentAnalysis as is)
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

    getAdvisorResponse: async (query, context = {}) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/advisor`, {
                query,
                personality: context.personality || 'Balanced',
                portfolio: context.portfolio || {}
            });

            if (response.data && response.data.response) {
                return response.data.response;
            }
        } catch (error) {
            console.error("AI Advisor backend error, falling back to local logic:", error);
        }

        const lowerQuery = query.toLowerCase().trim().replace(/[?]$/, "");

        // Local fallback logic (enhanced)
        if (/\b(portfolio|balance|assets|holdings|money|invested)\b/.test(lowerQuery)) {
            const balance = context.portfolio?.totalBalance || 53000;
            return `Your portfolio balance is $${balance.toLocaleString()}. Based on your ${context.personality || 'Balanced'} strategy, you are well-positioned.`;
        }

        // Search knowledge base
        let bestEntry = null;
        let maxScore = 0;
        ADVISOR_KNOWLEDGE_BASE.forEach(entry => {
            const entryQuestion = entry.question.toLowerCase().trim().replace(/[?]$/, "");
            let currentScore = 0;
            if (lowerQuery === entryQuestion) currentScore += 100;
            else if (lowerQuery.includes(entryQuestion)) currentScore += 50;

            if (currentScore > maxScore) {
                maxScore = currentScore;
                bestEntry = entry;
            }
        });

        if (bestEntry && maxScore > 5) return bestEntry.answer;

        return FALLBACK_ANSWERS.fallback;
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
