import React from 'react'
import "./Header.css"

const Header = ({setPage, page}) => {
  return (
    <>
      <header className='header'>
        <nav className='nav'>
          <div className="container">
            <h1 className='logo'><a href="">매수하기 딱 좋은 날씨네</a></h1>
            <ul>
              <li onClick={() => {
                setPage("Home");                
              }}>메인</li>
              <li onClick={() => {
                setPage("Predict");                
              }}>수익률 예측</li>
              <li onClick={() => {
                setPage("Board")
              }}>종목 토론</li>            
            </ul>
            <form action="" className='searchForm'>
              <input type="text" />
              <button className='searchBtn'>검색</button>
              <button className='logInBtn'>로그인</button>
            </form>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
