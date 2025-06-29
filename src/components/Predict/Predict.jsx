import React, { useEffect, useState } from 'react'
import "./Predict.css"
import Dropdown from './dropdown/Dropdown'
import { coins } from '../data'
import axios from 'axios'


const Predict = () => {
  const [periodSelected, setPeriodSelected] = useState("과거")
  const option1 = coins.map((coin => (coin.name)))
  const coinSymbol = coins.map((coin => (coin.pair)))
  const option2 = {
    "과거":["1년 전", "2년 전", "3년 전"],
    "미래":["7일 후", "15일 후", "30일 후"],
  }


  // 예측 기간 선택
  const [selectedPredictPeriod, setSelectedPredictPeriod] = useState(null)

  // 예측 코인 선택
  const [selectedCoinSymbol, setSelectedCoinSymbol] = useState(null)

  // 예측 데이터 선택
  const [data, setData] = useState([])

  useEffect(() => {
    const handlePeriodChange = async () => {
    try{
      const response = await axios.get(`http://localhost:5050/api/predicts?q=${selectedCoinSymbol}`)
      setData(response.data);      
    } catch(err){
      console.error('Erro fetching data:', err)
    }
  };
  handlePeriodChange()
  }, [selectedPredictPeriod])  

  // console.log(selectedCoin)
  // console.log(selectedPredictPeriod)
  console.log(data)
  
  return (
    <div>
      <div className="container" id='predictContainer'>
        <div className="predictTitle">
          <h2>수익률 예측 시뮬레이션</h2>
          <p>과거 데이터를 기반으로 미래 투자 수익률을 예측해 보세요.</p>
        </div>
        <div className="selectContainer">
          <div className="tab">
            <p
              onClick={() => setPeriodSelected("과거")}
              className='past'
            >과거</p>
            <p
              onClick={() => setPeriodSelected("미래")}
              className='future'
            >미래</p>
          </div>
          <div className="dropdownWrapper">
            <div className="choiceCoin">
              <p>코인 선택:</p>
              <Dropdown options = {option1} setSelectedCoinSymbol = {setSelectedCoinSymbol} coinSymbol = {coinSymbol}/>     
            </div>
            <div className="choicePeriod">
              <p>기간 선택:</p>          
              {periodSelected == "과거" &&(
                <Dropdown 
                  options = {option2["과거"]}
                  className = "pastDropdown"
                />        
              )}
              {periodSelected == "미래" &&(
                <>
                  {/* <p>기간을 선택하세요:</p>*/}
                  <Dropdown 
                    options = {option2["미래"]}
                    setSelectedPredictPeriod = {setSelectedPredictPeriod}
                  />        
                </>
              )}
            </div>
            <div className="inputPrice">
              <p>가격:</p>
              <input type="text" />
            </div>
          </div>          
        </div>
      </div>
      <div className="container" id='predictContainer'>
        <div className="predictResultContainer">
          <h2 className="predictResultTitle">
            투자 예측 결과
          </h2>
          <p className='predictResultText'>예상 결과</p>
          <div className="predictGrid">
            <div className="gridBox">
              <p className="gridBoxTitle">초기 투자금</p>
              <p className='girdBoxContent'>$1000</p>
            </div>
            <div className="gridBox">
              <p className="gridBoxTitle">예상 자산 가치</p>
              <p className='girdBoxContent'>$1000</p>
            </div>
            <div className="gridBox">
              <p className="gridBoxTitle">예상 수익/손실</p>
              <p className='girdBoxContent'>$1000</p>
            </div>
            <div className="gridBox">
              <p className="gridBoxTitle">예상 수익률</p>
              <p className='girdBoxContent'>$1000</p>
            </div>
            <div className="gridBox">
              <p className="gridBoxTitle">ETH 시작 시점 가격</p>
              <p className='girdBoxContent'>$1000</p>
            </div>
            <div className="gridBox">
              <p className="gridBoxTitle">ETH 30일 후 예상 가격</p>
              <p className='girdBoxContent'>$1000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Predict
