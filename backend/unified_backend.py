from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import requests
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

# Configuration
NEWS_API_KEY = '6eb1c50ac0ee4516a1fe72fa46ce8783'

# --- API Service: NewsAPI (Primary for JSON endpoints) ---
def get_newsapi_news(stock):
    try:
        url = f"https://newsapi.org/v2/everything?q={stock}&sortBy=publishedAt&apiKey={NEWS_API_KEY}"
        response = requests.get(url, timeout=10).json()
        articles = response.get('articles', [])
        
        results = []
        for article in articles[:5]:
            results.append({
                "title": article["title"],
                "url": article["url"],
                "source": article["source"]["name"],
                "publishedAt": article.get("publishedAt", "")
            })
        return results
    except Exception as e:
        print(f"NewsAPI Error: {e}")
        return []

# --- API Service: Yahoo Finance (Secondary/Legacy for HTML views) ---
def get_yahoo_news(ticker):
    url = f"https://query1.finance.yahoo.com/v1/finance/search?q={ticker}"
    headers = {"User-Agent": "Mozilla/5.0"}
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            data = response.json()
            return data.get("news", [])[:5]
        return []
    except Exception as e:
        print(f"Yahoo Fetch Error: {e}")
        return []

# --- AI Logic: Sentiment Analysis ---
def analyze_sentiment(text):
    if not text:
        return "Neutral", "neutral", 0
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    if polarity > 0.1:
        return "Positive", "positive", round(polarity, 2)
    elif polarity < -0.1:
        return "Negative", "negative", round(polarity, 2)
    else:
        return "Neutral", "neutral", round(polarity, 2)

# --- Routes: HTML / Frontend Views ---
@app.route("/", methods=["GET", "POST"])
def home():
    news_data = []
    searched = False
    
    if request.method == "POST":
        ticker = request.form.get("ticker", "").upper()
        if ticker:
            searched = True
            # Use Yahoo News for the HTML view context as per the new repo logic
            raw_news = get_yahoo_news(ticker)
            for item in raw_news:
                title = item.get("title", "No Title")
                sentiment, sentiment_class, score = analyze_sentiment(title)
                news_data.append({
                    "title": title,
                    "link": item.get("link", "#"),
                    "sentiment": sentiment,
                    "sentiment_class": sentiment_class,
                    "score": score
                })
    
    # Try to render sentiment.html if it exists, otherwise fallback to index.html
    try:
        return render_template("sentiment.html", news=news_data, searched=searched)
    except:
        return render_template("index.html", news=news_data, searched=searched)

# --- Routes: JSON / React API Endpoints ---
@app.route("/news/<stock>")
def api_news(stock):
    try:
        # Use NewsAPI for the React frontend data source
        articles = get_newsapi_news(stock)
        return jsonify(articles)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/analyze/<text>")
def api_analyze(text):
    sentiment, sentiment_class, score = analyze_sentiment(text)
    return jsonify({
        "original_text": text,
        "sentiment": sentiment,
        "class": sentiment_class,
        "score": score
    })

if __name__ == "__main__":
    print("------------------------------------------")
    print("🚀 UNIFIED AI BACKEND SERVICE STARTED")
    print("Mode: Single-File Integration")
    print("Endpoints: / (HTML), /news/ (API), /analyze/ (AI)")
    print("------------------------------------------")
    app.run(debug=True, port=5001)
