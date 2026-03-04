from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import requests
from textblob import TextBlob

import os

app = Flask(__name__)
# Permit specific origins in production, or keep open if requested for versatility
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/api/health")
def health_check():
    return jsonify({"status": "healthy", "service": "FinLearn AI Backend"}), 200

# Configuration
NEWS_API_KEY = os.environ.get('NEWS_API_KEY', '6eb1c50ac0ee4516a1fe72fa46ce8783')

# --- Mock Database ---
USER_DATA = [
  {"id": 1, "username": "user01", "password": "pwdUser01!", "action": "login", "tasks": ["Check inbox", "Update profile"]},
  {"id": 2, "username": "user02", "password": "pwdUser02!", "action": "login", "tasks": ["Review code", "Fix bugs"]},
  {"id": 3, "username": "user03", "password": "pwdUser03!", "action": "login", "tasks": ["Prepare presentation", "Attend meeting"]},
  {"id": 4, "username": "user04", "password": "pwdUser04!", "action": "login", "tasks": ["Design UI", "Test components"]},
  {"id": 5, "username": "user05", "password": "pwdUser05!", "action": "login", "tasks": ["Deploy app", "Monitor logs"]},
  {"id": 6, "username": "user06", "password": "pwdUser06!", "action": "login", "tasks": ["Write docs", "Update wiki"]},
  {"id": 7, "username": "user07", "password": "pwdUser07!", "action": "login", "tasks": ["Check emails", "Plan sprint"]},
  {"id": 8, "username": "user08", "password": "pwdUser08!", "action": "login", "tasks": ["Fix CSS", "Push commits"]},
  {"id": 9, "username": "user09", "password": "pwdUser09!", "action": "login", "tasks": ["Review PRs", "Merge branches"]},
  {"id": 10, "username": "user10", "password": "pwdUser10!", "action": "login", "tasks": ["Test API", "Update endpoints"]},
  {"id": 11, "username": "user11", "password": "pwdUser11!", "action": "login", "tasks": ["Optimize queries", "Backup DB"]},
  {"id": 12, "username": "user12", "password": "pwdUser12!", "action": "login", "tasks": ["Create mockups", "Review UX"]},
  {"id": 13, "username": "user13", "password": "pwdUser13!", "action": "login", "tasks": ["Configure server", "Check uptime"]},
  {"id": 14, "username": "user14", "password": "pwdUser14!", "action": "login", "tasks": ["Write tests", "Run CI/CD"]},
  {"id": 15, "username": "user15", "password": "pwdUser15!", "action": "login", "tasks": ["Update schema", "Validate data"]},
  {"id": 16, "username": "user16", "password": "pwdUser16!", "action": "login", "tasks": ["Draft emails", "Schedule meeting"]},
  {"id": 17, "username": "user17", "password": "pwdUser17!", "action": "login", "tasks": ["Analyze metrics", "Prepare report"]},
  {"id": 18, "username": "user18", "password": "pwdUser18!", "action": "login", "tasks": ["Update tasks", "Check dashboard"]},
  {"id": 19, "username": "user19", "password": "pwdUser19!", "action": "login", "tasks": ["Debug errors", "Push hotfix"]},
  {"id": 20, "username": "user20", "password": "pwdUser20!", "action": "login", "tasks": ["Plan release", "Notify team"]}
]

# --- Local news repository (Fallback for reliability) ---
LOCAL_NEWS_DB = {
    "NVDA": [
        {"title": "NVDA Earnings Smash Expectations as AI Demand Surges", "source": "AI Tech Daily", "url": "https://example.com/nvda1"},
        {"title": "New H200 Chips Set to Dominate Data Center Market", "source": "Market Insider", "url": "https://example.com/nvda2"},
    ],
    "AAPL": [
        {"title": "Apple Intelligence Integration Sees Record Beta Adoption", "source": "Fruit Bits", "url": "https://example.com/aapl1"},
        {"title": "Speculation Mounts Over Apple's Next Major Service Pivot", "source": "Wall Street Journal", "url": "https://example.com/aapl2"},
    ],
    "TSLA": [
        {"title": "Tesla Robotaxi Event: What the Analysts Are Saying", "source": "EV Monthly", "url": "https://example.com/tsla1"},
        {"title": "Giga Berlin Expansion Clears Major Regulatory Hurdle", "source": "Berlin Business", "url": "https://example.com/tsla2"},
    ],
    "DEFAULT": [
        {"title": "Market Indices Stabilize Amidst Easing Inflation Data", "source": "Global Finance", "url": "https://example.com/gen1"},
        {"title": "Sector Rotation: Investors Pile into Value Stocks", "source": "Trader Weekly", "url": "https://example.com/gen2"},
    ]
}

# --- API Service: NewsAPI (Primary for JSON endpoints) ---
def get_newsapi_news(stock):
    try:
        url = f"https://newsapi.org/v2/everything?q={stock}&sortBy=publishedAt&apiKey={NEWS_API_KEY}"
        response = requests.get(url, timeout=10).json()
        articles = response.get('articles', [])
        
        if not articles:
             # Fallback to local DB if no articles found
             return LOCAL_NEWS_DB.get(stock.upper(), LOCAL_NEWS_DB["DEFAULT"])

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
        # Return local fallback on any error
        return LOCAL_NEWS_DB.get(stock.upper(), LOCAL_NEWS_DB["DEFAULT"])

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

@app.route("/api/advisor", methods=["POST"])
def api_advisor():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid request"}), 400
    
    query = data.get("query", "").lower()
    personality = data.get("personality", "Balanced")
    portfolio = data.get("portfolio", {})
    
    # Simple simulated intelligence: intent detection and personality tailoring
    response = ""
    
    if "risk" in query or "safe" in query:
        if personality == "Risk Taker":
            response = "For a Risk Taker like you, volatility is an opportunity. Your portfolio is built for high-growth assets like Crypto and Tech. However, I'd suggest keeping an eye on your diversification score—it's currently a bit narrow."
        elif personality == "Conservative":
            response = "Stability is your priority. Your current allocation in Bonds and ETFs like VOO is perfect for capital preservation. I wouldn't recommend any high-beta moves right now."
        else:
            response = f"Your current risk profile is {personality}. Balancing steady returns with some growth exposure is key. Your diversification score is currently 82/100, which is healthy."
            
    elif "balance" in query or "money" in query or "how much" in query:
        balance = portfolio.get("totalBalance", 0)
        spent = portfolio.get("spentOnStocks", 0)
        response = f"Your total portfolio balance is ${balance:,.2f}. You've currently allocated ${spent:,.2f} into active stocks. Based on your {personality} strategy, I'd suggest keeping at least 15% in cash for liquidity."
        
    elif "recommen" in query or "buy" in query or "suggestion" in query:
        if personality == "Risk Taker":
            response = "Based on your appetite for growth, I'm tracking high momentum in BTC and NVDA. Our sentiment analysis shows a strong Bullish trend for these assets over the next 30 days."
        elif personality == "Conservative":
            response = "For your preservation strategy, VOO and BND are showing very stable yields. I recommend staying the course with these diversified index funds."
        else:
            response = "I suggest a mix of AAPL for stability and a small position in TSLA if you want some growth exposure without overleveraging your capital."
            
    elif "sentiment" in query or "news" in query:
        response = "The overall market sentiment is currently Bullish. AI predictions show a target growth of about 8.2% across the S&P 500 this month. This aligns well with your current asset allocation."
        
    else:
        # Default adaptive reply
        sentiment, _, _ = analyze_sentiment(query)
        if sentiment == "Negative":
            response = f"I hear your concern. As a {personality} investor, it's important not to panic during market corrections. Would you like me to analyze your specific holdings for risk?"
        else:
            response = f"That's an interesting question about the markets. As a {personality} strategist, how can I help you optimize your portfolio today? I can analyze your risk, suggest stocks, or check market sentiment."

    return jsonify({
        "response": response,
        "intelligence_level": "High (Context-Aware)",
        "advisor_badge": "AI INSIGHT"
    })

@app.route("/api/login", methods=["POST"])
def api_login():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid request"}), 400
    
    username = data.get("username")
    password = data.get("password")
    
    # Check credentials against the dataset
    user = next((u for u in USER_DATA if u["username"] == username and u["password"] == password), None)
    
    if user:
        # Format the tasks to match the frontend expects: objects with id, title, status
        formatted_tasks = [
            {"id": i + 100, "title": task, "status": "pending"} 
            for i, task in enumerate(user.get("tasks", []))
        ]
        
        response_user = {
            "id": user["id"],
            "username": user["username"],
            "role": "employee", 
            "tasks": formatted_tasks
        }
        return jsonify({"success": True, "user": response_user}), 200
    else:
        # Dynamic login: if user not found, create a placeholder session user
        import random
        dynamic_user = {
            "id": random.randint(1000, 9999),
            "username": username,
            "role": "employee",
            "tasks": [
                {"id": 1001, "title": "Explore Dashboard", "status": "pending"},
                {"id": 1002, "title": "Check Market Sentiment", "status": "pending"}
            ]
        }
        return jsonify({"success": True, "user": dynamic_user}), 200

if __name__ == "__main__":
    print("------------------------------------------")
    print("🚀 UNIFIED AI BACKEND SERVICE STARTED")
    print("Mode: Single-File Integration")
    print("Endpoints: / (HTML), /news/ (API), /analyze/ (AI)")
    print("------------------------------------------")
    app.run(debug=True, port=5001, host='0.0.0.0')
