from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import requests
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

# Configuration
NEWS_API_KEY = '6eb1c50ac0ee4516a1fe72fa46ce8783'

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
        return jsonify({"error": "Invalid username or password"}), 401

if __name__ == "__main__":
    print("------------------------------------------")
    print("🚀 UNIFIED AI BACKEND SERVICE STARTED")
    print("Mode: Single-File Integration")
    print("Endpoints: / (HTML), /news/ (API), /analyze/ (AI)")
    print("------------------------------------------")
    app.run(debug=True, port=5001)
