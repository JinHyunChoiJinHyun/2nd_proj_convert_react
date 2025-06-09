import React, { useEffect, useState, useRef } from 'react'
import Dropdown from '../Predict/dropdown/Dropdown'
import { coins } from '../data'
import "./Board.css"
import axios from "axios";

const Board = () => {
  const formRef = useRef(null)
  const options = coins.map((coin => (coin.name)))

  const [posts, setPosts] = useState([]);

  const [showform, setShowForm] = useState(false);      

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  // post 수정

  const [isEditing, setIsEditing] = useState(false);

  const [editPost, setEditPost] = useState(null)

  const handleNewPost = () => {
    setShowForm(true);
  }
  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts`)
    .then((res) => setPosts(res.data))
    .catch(console.error);
  }, []);

  // 모달 창 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if(formRef.current && !formRef.current.contains(e.target)){ // DOM 객체가 정상적으로 존재하고 내가 클릭한 곳이 ref 영역이 아니라면 (current -> 지정한 ref 영역이 dictionary 형태 저장됨 )
        setShowForm(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside); // mousedown -> 마우스를 누르는 순간 발생
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // post로 전송
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {title, content};
    if (isEditing){
      axios.put(`http://localhost:5000/api/posts/${editPost.id}`, newPost)
      .then(() => {
        setPosts(posts.map(p => p.id === editPost.id ? {...p, ...newPost} : p)) // posts의 id가 editPost(수정된 post)의 id와 같다면 새로운 입력값으로 수정 아니라면 그대로
        resetForm();
      })
      .catch(console.error);
      {console.log(`http://localhost:5000/api/posts/${editPost.id}`)}
    }
    else{      
      axios.post("http://localhost:5000/api/posts", {title, content})
      .then((res) => {
        setPosts([res.data, ...posts])
        setTitle("");
        setContent("");
        setShowForm(false);
      })
      .catch(console.error)    
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditPost(null);
    setIsEditing(false);
    setShowForm(false);
  }

  // post 삭제
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/posts/${id}`)
    .then(() => {
      setPosts(posts.filter((post) => post.id !== id))      
    })
    .catch(console.error);
  }

  // post 수정
  const handleEdit = (post) => {
    setEditPost(post);
    setTitle(post.title);
    setContent(post.content);
    setIsEditing(true);
    setShowForm(true)
  }
  return (
    <div>
      <div className="container" id='boardContainer'>
        <h2 className='boardTitle'>게시판</h2>
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
            <Dropdown options={options}/>
          </div>
          <div>
            <input type="text" />
            <button className='searchBtn'>검색</button>
            <button className='createBtn'
            onClick={handleNewPost}
            >새 글 작성</button>
            {showform &&(
              <div className="overlay">
                <form 
                ref={formRef}
                onSubmit={handleSubmit}
                className='createPostForm'
                >
                  <input 
                  type="text"
                  placeholder='제목'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea 
                  placeholder='내용'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <button
                  type='submit'                
                  >
                    작성 완료
                  </button>   
                  <button
                  type='button'
                  onClick={() => setShowForm(false)}
                  >
                    취소
                  </button>               
                </form>
              </div>
            )}            
          </div>
        </div>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <button onClick={() => handleEdit(post)}>수정</button>
              <button onClick={() => handleDelete(post.id)}>삭제</button>              
            </li>
          ))}
        </ul>
      </div>
    </div>
    
  )
}

export default Board
