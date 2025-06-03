import React from 'react'
import "./Predict.css"
import Dropdown from './Dropdown'


const Predict = () => {
  return (
    <div>
      <div className="container">
        <div className="predictTitle">
          <h2>수익률 예측 시뮬레이션</h2>
          <p>과거 데이터를 기반으로 미래 투자 수익률을 예측해 보세요.</p>
        </div>
        <Dropdown />
      </div>
    </div>
  )
}

export default Predict
