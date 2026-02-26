const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;
const API_KEY = '6eb1c50ac0ee4516a1fe72fa46ce8783';

app.use(cors());
app.use(express.json());

app.get('/news/:stock', async (req, res) => {
    const { stock } = req.params;
    try {
        const url = `https://newsapi.org/v2/everything?q=${stock}&sortBy=publishedAt&apiKey=${API_KEY}`;
        const response = await axios.get(url);
        const articles = response.data.articles || [];

        const newsList = articles.slice(0, 5).map(article => ({
            title: article.title,
            url: article.url,
            source: article.source.name
        }));

        res.json(newsList);
    } catch (error) {
        console.error("Error fetching news:", error.message);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running at http://127.0.0.1:${PORT}`);
});
