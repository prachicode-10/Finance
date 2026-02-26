const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = 5000;
const API_KEY = '6eb1c50ac0ee4516a1fe72fa46ce8783';

// Setup View Engine (Mimicking Jinja blocks with EJS Layouts)
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(expressLayouts);
app.set('layout', 'base'); // base.html will be the master template

app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'static')));

// Request Logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// --- Routes ---
app.get('/', (req, res) => res.render('sentiment', { title: 'Market Sentiment | FinLearn AI' }));
app.get('/dashboard', (req, res) => res.render('dashboard'));
app.get('/predict', (req, res) => res.render('predict'));
app.get('/portfolio', (req, res) => res.render('portfolio'));
app.get('/learning', (req, res) => res.render('learning'));
app.get('/advisor', (req, res) => res.render('advisor'));
app.get('/sentiment', (req, res) => res.render('sentiment'));

// API Endpoint (Matching exactly with what was in app.py)
app.get('/news/:stock', async (req, res) => {
    const { stock } = req.params;
    try {
        const url = `https://newsapi.org/v2/everything?q=${stock}&sortBy=publishedAt&apiKey=${API_KEY}`;
        const response = await axios.get(url);
        const articles = response.data.articles || [];
        const newsList = articles.slice(0, 5).map(a => ({
            title: a.title,
            url: a.url,
            source: a.source.name
        }));
        res.json(newsList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
    console.log(`Structure: Serving templates from /templates and assets from /static`);
});
