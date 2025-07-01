from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)

def get_connection():
    return pymysql.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor
    )

@app.route("/api/posts", methods=["GET"])
def get_posts():
    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT * FROM board_post ORDER BY post_id DESC")
                posts = cursor.fetchall()
                # ✅ post_id → id 로 바꿔서 전달
                for post in posts:
                    post["id"] = post.pop("post_id")
                return jsonify(posts)
    except Exception as e:
        print("GET ERROR:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/posts", methods=["POST"])
def create_post():
    data = request.get_json()
    # print("📨 Received POST:", data)

    title = data.get("title")
    content = data.get("content")
    writer_id = data.get("writer_id", 0)
    view_count = data.get("view_count", 0)
    likes = data.get("likes", 0)
    created_at = datetime.now()
    updated_at = datetime.now()
    deleted_at = datetime.now()
    deleted_yn = "N"

    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                sql = """
                INSERT INTO board_post (title, content, writer_id, view_count, likes, created_at, updated_at, deleted_at, deleted_yn)
                VALUES (%s, %s, %s, %s, %s, %s,%s, %s, %s)
                """
                cursor.execute(sql, (title, content, writer_id, view_count, likes, created_at,updated_at,deleted_at, deleted_yn))
                conn.commit()
                post_id = cursor.lastrowid
                return jsonify({
                    "id": post_id,  # ✅ post_id를 id로
                    "title": title,
                    "content": content,
                    "writer_id": writer_id,
                    "view_count": view_count,
                    "likes": likes,
                    "created_at": created_at.strftime("%Y-%m-%d %H:%M:%S")
                }), 201
    except Exception as e:
        print("❌ POST ERROR:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/posts/<int:post_id>", methods=["PUT"])
def update_post(post_id):
    data = request.get_json()
    title = data.get("title")
    content = data.get("content")

    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                sql = """
                UPDATE board_post SET title=%s, content=%s WHERE post_id=%s
                """
                cursor.execute(sql, (title, content, post_id))
                conn.commit()
                return jsonify({"id": post_id, "title": title, "content": content})
    except Exception as e:
        print("PUT ERROR:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/posts/<int:post_id>", methods=["DELETE"])
def delete_post(post_id):
    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("DELETE FROM board_post WHERE post_id=%s", (post_id,))
                conn.commit()
                return jsonify({"result": "success"})
    except Exception as e:
        print("DELETE ERROR:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5050, debug=True)
