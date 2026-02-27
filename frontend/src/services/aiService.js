import { MOCK_STOCKS, MOCK_NEWS, PORTFOLIO_DATA } from '../data/mockData';
import { ADVISOR_KNOWLEDGE_BASE, FALLBACK_ANSWERS } from '../data/advisorDataset';
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
        const lowerQuery = query.toLowerCase().trim().replace(/[?]$/, "");

        // 1. Check for specific dynamic data triggers first (High Priority)
        if (/\b(portfolio|balance|assets|holdings|money|invested)\b/.test(lowerQuery)) {
            const topAsset = PORTFOLIO_DATA.assets.sort((a, b) => b.allocation - a.allocation)[0];
            return `Your portfolio is looking strong with a total balance of $${PORTFOLIO_DATA.totalBalance.toLocaleString()}. Your largest allocation is in ${topAsset.symbol} (${topAsset.allocation}%). I suggest diversifying more if you want to reduce risk.`;
        }

        // 2. Search knowledge base with prioritized matching
        let bestEntry = null;
        let maxScore = 0;

        ADVISOR_KNOWLEDGE_BASE.forEach(entry => {
            const entryQuestion = entry.question.toLowerCase().trim().replace(/[?]$/, "");
            let currentScore = 0;

            // Scenario A: Exact or very close match
            if (lowerQuery === entryQuestion) {
                currentScore += 100;
            } else if (lowerQuery.includes(entryQuestion) || entryQuestion.includes(lowerQuery)) {
                currentScore += 50;
            }

            // Scenario B: Keyword overlap within the question
            const entryWords = entryQuestion.split(/\s+/).filter(w => w.length > 3);
            entryWords.forEach(word => {
                if (lowerQuery.includes(word)) {
                    currentScore += word.length;
                }
            });

            if (currentScore > maxScore) {
                maxScore = currentScore;
                bestEntry = entry;
            }
        });

        // Threshold for a "good" match
        if (bestEntry && maxScore > 5) {
            return bestEntry.answer;
        }

        // 3. Project-specific fallbacks (Check if user is asking about the app itself)
        if (/\b(dashboard|learn|news|sentiment|predict|video|about|project)\b/.test(lowerQuery)) {
            if (lowerQuery.includes("dash")) return FALLBACK_ANSWERS.dashboard;
            if (lowerQuery.includes("learn") || lowerQuery.includes("quiz")) return FALLBACK_ANSWERS.learning_center;
            if (lowerQuery.includes("sentiment") || lowerQuery.includes("news")) return FALLBACK_ANSWERS.sentiment;
            return FALLBACK_ANSWERS.project_info;
        }

        // 4. Fallback to sentiment-based adaptive reply
        try {
            const response = await axios.get(`${API_BASE_URL}/analyze/${encodeURIComponent(query)}`);
            const sentiment = response.data.sentiment;
            if (sentiment === "Negative") {
                return "I detect some concern in your query. The financial world can be complex, but clarity is the first step. Would you like to know more about budgeting, saving, or your portfolio?";
            } else if (sentiment === "Positive") {
                return "That's a great positive outlook! Financial growth starts with a good mindset. Is there anything specific about investing or the FIN-AI platform you'd like to explore?";
            }
        } catch (error) {
            console.error("AI Advisor fallback error:", error);
        }

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
