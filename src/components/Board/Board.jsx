import React, { useEffect, useState, useRef } from 'react';
import Dropdown from '../Predict/dropdown/Dropdown';
import { coins } from '../data';
import './Board.css';
import axios from 'axios';

const Board = () => {
  const formRef = useRef(null);

  const options1 = ['전체', ...coins.map((coin) => coin.name)];
  const options2 = coins.map((coin) => coin.name);

  const [selectedCoin, setSelectedCoin] = useState('전체');
  const [posts, setPosts] = useState([]);
  const [showform, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coin, setCoin] = useState('');
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editPost, setEditPost] = useState(null);

  const handleNewPost = () => {
    setShowForm(true);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5050/api/posts`)
      .then((res) => setPosts(res.data))
      .catch(console.error);
  }, []);

  const filteredPosts = posts
    .filter((post) => selectedCoin === '전체' || post.coin === selectedCoin)
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchText.toLowerCase()) ||
        post.content.toLowerCase().includes(searchText.toLowerCase())
    );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setShowForm(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      writer_id: 0,
      view_count: 0,
      likes: 0
    };

    if (isEditing) {
      axios
        .put(`http://localhost:5050/api/posts/${editPost.id}`, newPost)
        .then(() => {
          setPosts(posts.map((p) => (p.id === editPost.id ? { ...p, ...newPost } : p)));
          resetForm();
        })
        .catch(console.error);
    } else {
      axios
        .post('http://localhost:5050/api/posts', newPost)
        .then((res) => {
          setPosts([res.data, ...posts]);
          resetForm();
        })
        .catch(console.error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setCoin('');
    setEditPost(null);
    setIsEditing(false);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5050/api/posts/${id}`)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch(console.error);
  };

  const handleEdit = (post) => {
    setEditPost(post);
    setTitle(post.title);
    setContent(post.content);
    setCoin(post.coin);
    setIsEditing(true);
    setShowForm(true);
  };

  return (
    <div>
      <div className="container" id="boardContainer">
        <h2 className="boardTitle">게시판</h2>
        <nav>
          <ul>
            <li>인기</li>
            <li>최신</li>
            <li>상승 예측</li>
            <li>하락 예측</li>
          </ul>
        </nav>
        <div className="searchContainer">
          <div className="sort">
            <p>종목</p>
            <Dropdown options={options1} onChange={setSelectedCoin} />
          </div>
          <div>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button className="searchBtn" onClick={() => setSearchText(inputText)}>
              검색
            </button>
            <button className="createBtn" onClick={handleNewPost}>
              새 글 작성
            </button>
            {showform && (
              <div className="overlay">
                <form ref={formRef} onSubmit={handleSubmit} className="createPostForm">
                  <input
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label htmlFor="">종목 선택:</label>
                  <Dropdown options={options2} selected={coin} onChange={setCoin} />
                  <textarea
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <button type="submit">작성 완료</button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                  >
                    취소
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        <ul>
          {filteredPosts.map((post) => (
            <li key={post.id}>
              <h2>
                {post.title}({post.coin})
              </h2>
              <p>{post.content}</p>
              <button onClick={() => handleEdit(post)}>수정</button>
              <button onClick={() => handleDelete(post.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Board;
