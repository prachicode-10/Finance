from flask import Flask, jsonify, render_template
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)
API_KEY ='6eb1c50ac0ee4516a1fe72fa46ce8783'
def get_stock_news(stock):
    url = f"https://newsapi.org/v2/everything?q={stock}&sortBy=publishedAt&apiKey={API_KEY}"
    response = requests.get(url).json()
    articles = response.get('articles', [])
    news_list = []
    for article in articles[:5]:
        news_list.append({
            "title": article["title"],
            "url": article["url"],
            "source": article["source"]["name"]
        })
    return news_list
@app.route("/")
def home():
    return render_template("MarketSentimental.jsx")
@app.route("/news/<stock>")
def news(stock):
    news_items = get_stock_news(stock)
    return jsonify(news_items)
if __name__ == "__main__":
    app.run(debug=True)
