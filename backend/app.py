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

# 뉴스 api
@app.route('/api/news', methods = ["GET"])
def get_news():
    keyword = request.args.get("q","")
    try:
        conn = pymysql.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            db=os.getenv("DB_NAME"),    
            charset="utf8mb4",
            cursorclass=pymysql.cursors.DictCursor
        )
        with conn.cursor() as cursor:
            sql = "SELECT * FROM coin_news WHERE symbol = %s"
            cursor.execute(sql, (keyword,))
            result = cursor.fetchall()
            return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 변동률 api
@app.route('/api/changeRate', methods = ["GET"])
def get_change_rate():
    keyword = request.args.get("q","")
    print(f"received request for: {keyword}")
    try:        
        print("Trying DB access")
        # 요청이 존재할 때마다 db 새로 연결
        conn = pymysql.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            db=os.getenv("DB_NAME"),    
            charset="utf8mb4",
            cursorclass=pymysql.cursors.DictCursor
        )
        with conn.cursor() as cursor:
            sql = "SELECT * FROM coin_past_info WHERE pair = %s"
            cursor.execute(sql, (keyword,))
            rows = cursor.fetchall()
            print(f"fetched rows: {rows}")
            data = [row["change_24h"] for row in rows]
            return jsonify(data)        
    except Exception as e:
        print("error in api")
        import traceback
        traceback.print_exc()
        return (jsonify({'error': str(e)}), 500)
    
@app.route('/api/changeWeekRate', methods = ["GET"])
def get_change_week_rate():
    keyword = request.args.get("q","")
    print(f"received request for: {keyword}")
    try:        
        print("Trying DB access")
        # 요청이 존재할 때마다 db 새로 연결
        conn = pymysql.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            db=os.getenv("DB_NAME"),    
            charset="utf8mb4",
            cursorclass=pymysql.cursors.DictCursor
        )
        with conn.cursor() as cursor:
            sql = "SELECT * FROM coin_past_info WHERE pair = %s"
            cursor.execute(sql, (keyword,))
            rows = cursor.fetchall()
            print(f"fetched rows: {rows}")
            data = [row["change_week"] for row in rows]
            return jsonify(data)        
    except Exception as e:
        print("error in api")
        import traceback
        traceback.print_exc()
        return (jsonify({'error': str(e)}), 500)
    
# 게시판 관련 api
@app.route("/api/posts", methods= ['GET'])
def get_posts():
    try:
        conn = pymysql.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            db=os.getenv("DB_NAME"),    
            charset="utf8mb4",
            cursorclass=pymysql.cursors.DictCursor
        )
        with conn.cursor() as cursor:
            sql = "SELECT * FROM posts"
            cursor.execute(sql)
            posts = cursor.fetchall()
        return jsonify(posts)
    except Exception as e:
        print("error in api")
        import traceback
        traceback.print_exc()
        return (jsonify({"error": str(e)}), 500)    

    
@app.route("/api/posts", methods = ["POST"])
def create_post():
    data = request.get_json()
    title = data["title"]
    content = data["content"]
    coin = data["coin"]
    try:
        conn = pymysql.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            db=os.getenv("DB_NAME"),    
            charset="utf8mb4",
            cursorclass=pymysql.cursors.DictCursor
        )
        with conn.cursor() as cursor:
            sql = "INSERT INTO posts (title, content, coin) VALUES (%s, %s, %s)"
            cursor.execute(sql, (title, content, coin))
            conn.commit()
            post_id = cursor.lastrowid
        return jsonify({"id": post_id, "title": title, "content": content, "coin":coin }), 201
    except Exception as e:
        print("error in api")
        import traceback
        traceback.print_exc()
        return (jsonify({"error": str(e)}), 500)

@app.route("/api/posts/<int:post_id>",methods = ["DELETE"])
def delete_post(post_id):
    try:
        conn = pymysql.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            db=os.getenv("DB_NAME"),    
            charset="utf8mb4",
            cursorclass=pymysql.cursors.DictCursor
        )
        with conn.cursor() as cursor:
            sql = "DELETE FROM posts WHERE id = %s"
            cursor.execute(sql, (post_id,))
            conn.commit()
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": str(e)}),500
    
@app.route("/api/posts/<int:post_id>", methods = ["PUT"])
def update_post(post_id):
    data = request.json
    try:
        conn = pymysql.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            db=os.getenv("DB_NAME"),    
            charset="utf8mb4",
            cursorclass=pymysql.cursors.DictCursor
        )
        with conn.cursor() as cursor:
            sql = "UPDATE posts SET title = %s, content = %s, coin = %s WHERE id = %s"
            cursor.execute(sql,(data["title"], data["content"], data["coin"], post_id))
            conn.commit()
        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        

if __name__ == '__main__':
    app.run(port=5000, debug=True)