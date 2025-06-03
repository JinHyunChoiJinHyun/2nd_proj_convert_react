import React, { useState } from 'react'
import "./Home.css"
import { coins } from '../data'
import CoinItem from './CoinItem'
import HourGraph from './graph/HourGraph'
import GoldGraph from './graph/GoldGraph'
import FearGreedGraph from './graph/FearGreedGraph'
import NewsList from './NewsList'


const Home = ({setPage, setSelectedCoin, selectedCoin}) => {
    const [graph, setGraph] = useState("HourGraph")
    const [symbol, setSymbol] = useState("btc")
    const [pair, setPair] = useState("btcusdt")
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
                            setSelectedCoin(coin.name)                  
                            setSymbol(coin.symbol)  
                            setPair(coin.pair)                
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
                            setGraph("HourGraph")
                        }}>시간별</li>
                        <li
                        onClick={() => {
                            setGraph("gold")
                        }}>일별</li>
                    </ul>
                </div>                                    
                {graph == "HourGraph" &&<HourGraph selectedCoin={selectedCoin} pair={pair}/>}
                {graph == "gold" &&<GoldGraph selectedCoin={selectedCoin} pair={pair}/>}
                              
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
