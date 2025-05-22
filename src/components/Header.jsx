import React from 'react'
import "./Header.css"

const Header = () => {
  return (
    <>
      <header className='header'>
        <nav className='nav'>
          <div className="container">
            <h1 className='logo'><a href="">매수하기 딱 좋은 날씨네</a></h1>
            <ul>
              <li><a href="">메인</a></li>
              <li><a href="">수익률 예측</a></li>
              <li><a href="">종목 토론</a></li>            
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
