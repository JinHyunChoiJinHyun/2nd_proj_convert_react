from flask import Flask, jsonify
from flask_cors import CORS
import pymysql
import pymysql.cursors

app = Flask(__name__)
CORS(app)

# MySQL 연결 설정
conn = pymysql.connect(
    host="localhost",
    user="root",
    password="981021",
    db="my_project",
    charset="utf8mb4",
    cursorclass=pymysql.cursors.DictCursor
)

@app.route('/api/news', methods = ["GET"])
def get_news():
    try:
        with conn.cursor() as cursor:
            sql = "SELECT title FROM news"
            cursor.execute(sql)
            result = cursor.fetchall()
            return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)