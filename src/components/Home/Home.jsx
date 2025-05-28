import React, { useState } from 'react'
import "./Home.css"
import { coins } from '../data'
import CoinItem from './CoinItem'
import MarketCapGraph from './graph/MarketCapGraph'
import GoldGraph from './graph/GoldGraph'
import FearGreedGraph from './graph/FearGreedGraph'
import NewsList from './NewsList'


const Home = ({setPage, setCoin, coin}) => {
    const [graph, setGraph] = useState("marketCap")
    const [symbol, setSymbol] = useState("btc")
  return (
    <>
      <main>
        <div className="newsPanel">
            <NewsList            
            symbol = {symbol}/>               
            
        </div>
        <div className="leftPanel">            
            <h2>코인 일기예보</h2>
            <div className="coinTable">    
                {coins.map((coin, idx) => {
                    return (
                    <div className="tableContainer">
                        <CoinItem
                        key={idx}
                        name={coin.name}
                        price={coin.price}
                        rate={coin.rate}
                        weather_yesterday={coin.weather_yesterday}
                        weather_today={coin.weather_today}
                        weather_tomorrow={coin.weather_tomorrow}
                        onClick = {() => {                            
                            setCoin(coin.name)                  
                            setSymbol(coin.symbol)                  
                    }}
                    />
                    </div>
                    )                
                })}    
                     
            </div>
        </div>
        
        <div className="rightPanel">            
            <div className="marketCapPanel">
                <div className="graphTab">
                    <ul>
                        <li 
                        onClick={() => {
                            setGraph("marketCap")
                        }}>시가총액</li>
                        <li
                        onClick={() => {
                            setGraph("gold")
                        }}>금</li>
                    </ul>
                </div>                                    
                {graph == "marketCap" &&<MarketCapGraph />}
                {graph == "gold" &&<GoldGraph />}
                              
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
                    <FearGreedGraph />               
                </div>
            </div>
        </div>
      </main>
    </>
  )
}

export default Home
