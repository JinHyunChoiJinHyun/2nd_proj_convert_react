import React from 'react'
import Dropdown from '../Predict/dropdown/Dropdown'
import { coins } from '../data'
import "./Board.css"

const Board = () => {
  const options = coins.map((coin => (coin.name)))
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
          <form action="/">
            <input type="text" />
            <button className='searchBtn'>검색</button>
            <button className='createBtn'>새 글 작성</button>
          </form>
          </div>
        </div>
      </div>
    
  )
}

export default Board
