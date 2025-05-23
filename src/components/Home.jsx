import React from 'react'
import "./Home.css"
import { coins } from './data'
import CoinItem from './CoinItem'

const Home = ({setPage, setCoin}) => {
  return (
    <>
      <main>
        <div className="leftPanel">            
            <h2>코인 일기예보</h2>
            <div className="coinTable">    
                {coins.map((coin, idx) => {
                    return (<CoinItem
                    key={idx}
                    name={coin.name}
                    price={coin.price}
                    rate={coin.rate}
                    weather_yesterday={coin.weather_yesterday}
                    weather_today={coin.weather_today}
                    weather_tomorrow={coin.weather_tomorrow}
                    onClick = {() => {
                        setPage("Detail");
                        setCoin(coin.name)                  
                    }}
                    />)                
                })}    
                     
            </div>
        </div>
        <div className="rightPanel">            
            <div className="marketCapPanel">
                <h2>시가 총액</h2>
                <div className="marketCapInfo">
                    <p className='marketPrice'>₩4.04P</p>
                    <p className='marketRate'>▼ 0.86%</p>
                </div>
            </div>
            
            <div className="fearGreedPanel">
                <div className="fearGreedPanelHeader">
                    <h2>공포 탐욕 지수</h2>
                    <div className="fearGreedInfo">
                        <p>40</p>
                        <p>중립</p>
                    </div>
                </div>
                <div className="fearGreedBody">
                    <p className='fearGreedEmo'>😀</p>     
                    <div className="fearGreedGraph">
                        <div className="fearGauge">
                            <div className="fearIndicator"></div>
                        </div>
                        <div className="fearGreedLabels">
                            <span>극도의 공포</span>
                            <span>중립</span>
                            <span>극도의 탐욕</span>
                        </div>
                    </div>               
                </div>
            </div>
        </div>
      </main>
    </>
  )
}

export default Home
