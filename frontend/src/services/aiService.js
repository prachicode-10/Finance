import { MOCK_STOCKS, MOCK_NEWS, PORTFOLIO_DATA } from '../data/mockData';
import { ADVISOR_KNOWLEDGE_BASE } from '../data/advisorDataset';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5001';

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

    getAdvisorResponse: async (query) => {
        const lowerQuery = query.toLowerCase();

        // 1. Check for specific dynamic data triggers first (High Priority)
        if (/\b(portfolio|balance|assets|holdings|money|invested)\b/.test(lowerQuery)) {
            const topAsset = PORTFOLIO_DATA.assets.sort((a, b) => b.allocation - a.allocation)[0];
            return `Your portfolio is looking strong with a total balance of $${PORTFOLIO_DATA.totalBalance.toLocaleString()}. Your largest allocation is in ${topAsset.symbol} (${topAsset.allocation}%). I suggest diversifying more if you want to reduce risk.`;
        }

        // 2. Search knowledge base with weighted scoring
        let bestCategory = null;
        let maxScore = 0;

        for (const category in ADVISOR_KNOWLEDGE_BASE) {
            if (category === 'fallback') continue;

            const data = ADVISOR_KNOWLEDGE_BASE[category];
            let currentCategoryScore = 0;

            data.keywords.forEach(kw => {
                const kwLower = kw.toLowerCase();
                const regex = new RegExp(`\\b${kwLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');

                if (regex.test(lowerQuery)) {
                    currentCategoryScore += kwLower.length * (kwLower.includes(' ') ? 2 : 1);
                    if (lowerQuery.trim() === kwLower) currentCategoryScore += 50;
                }
            });

            if (currentCategoryScore > maxScore) {
                maxScore = currentCategoryScore;
                bestCategory = category;
            }
        }

        if (bestCategory && maxScore > 2) {
            return ADVISOR_KNOWLEDGE_BASE[bestCategory].response;
        }

        // 3. Fallback to sentiment-based adaptive reply
        try {
            const response = await axios.get(`${API_BASE_URL}/analyze/${encodeURIComponent(query)}`);
            const sentiment = response.data.sentiment;
            if (sentiment === "Negative") {
                return "I detect some concern in your query. The financial markets can be complex, but clarity is the first step to success. Would you like me to explain a specific feature of FIN-AI or analyze your asset allocation?";
            } else if (sentiment === "Positive") {
                return "I love the mathematical optimism! A positive outlook coupled with data-driven strategy is a winning combination. Is there a specific project module or investment asset you'd like to explore next?";
            }
        } catch (error) {
            console.error("AI Advisor fallback error:", error);
        }

        return ADVISOR_KNOWLEDGE_BASE.fallback.response;
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
