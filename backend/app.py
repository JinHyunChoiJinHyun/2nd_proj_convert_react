from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql
import pymysql.cursors
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

load_dotenv()

# MySQL 연결 설정
conn = pymysql.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    db=os.getenv("DB_NAME"),    
    charset="utf8mb4",
    cursorclass=pymysql.cursors.DictCursor
)

@app.route('/api/news', methods = ["GET"])
def get_news():
    keyword = request.args.get("q","")
    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM coin_news WHERE symbol = %s"
            cursor.execute(sql, (keyword,))
            result = cursor.fetchall()
            return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)