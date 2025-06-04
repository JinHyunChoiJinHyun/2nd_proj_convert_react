import React, { useState } from 'react'
import "./Predict.css"
import Dropdown from './dropdown/Dropdown'
import { coins } from '../data'


const Predict = () => {
  const [periodSelected, setPeriodSelected] = useState("과거")
  const option1 = coins.map((coin => (coin.name)))
  const option2 = {
    "과거":["1년 전", "2년 전", "3년 전"],
    "미래":["7일 후", "15일 후", "30일 후"],
  }
  
  return (
    <div>
      <div className="container">
        <div className="predictTitle">
          <h2>수익률 예측 시뮬레이션</h2>
          <p>과거 데이터를 기반으로 미래 투자 수익률을 예측해 보세요.</p>
        </div>
        <div className="tab">
          <p
            onClick={() => setPeriodSelected("과거")}
          >과거</p>
          <p
            onClick={() => setPeriodSelected("미래")}
          >미래</p>
        </div>
        <Dropdown options = {option1} />        
        {periodSelected == "과거" &&(
          <Dropdown options = {option2["과거"]}/>        
        )}
        {periodSelected == "미래" &&(
          <Dropdown options = {option2["미래"]}/>        
        )}
      </div>
    </div>
  )
}

export default Predict
