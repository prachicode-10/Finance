from flask import Flask, render_template, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Mock Data for internal use
API_KEY = '6eb1c50ac0ee4516a1fe72fa46ce8783'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/predict')
def predict():
    return render_template('predict.html')

@app.route('/portfolio')
def portfolio():
    return render_template('portfolio.html')

@app.route('/learning')
def learning():
    return render_template('learning.html')

@app.route('/advisor')
def advisor():
    return render_template('advisor.html')

# API Endpoints
@app.route('/news/<stock>')
def get_news(stock):
    url = f"https://newsapi.org/v2/everything?q={stock}&sortBy=publishedAt&apiKey={API_KEY}"
    try:
        response = requests.get(url).json()
        articles = response.get('articles', [])
        news_list = [{"title": a["title"],"url": a["url"],"source": a["source"]["name"]} for a in articles[:5]]
        return jsonify(news_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
