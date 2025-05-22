import React from 'react'
import "./Home.css"

const Home = () => {
  return (
    <>
      <main>
        <div className="leftPanel">            
            <h2>코인 일기예보</h2>
            <div className="coinTable">    
                <div className="coinItem">
                    <div className="coinInfo">
                        <h3 className='coinName'>비트코인</h3>
                        <p className='coinPrice'>$1,000,000</p>
                        <p className='coinRate'>+3.34%</p>
                    </div>
                    <div className="coinWeather">
                        <span>☀</span>
                        <span>☔</span>
                        <span>☂</span>
                    </div>                
                </div>            
                <div className="coinItem">
                    <div className="coinInfo">
                        <h3 className='coinName'>비트코인</h3>
                        <p className='coinPrice'>$1,000,000</p>
                        <p className='coinRate'>+3.34%</p>
                    </div>
                    <div className="coinWeather">
                        <span>☀</span>
                        <span>☔</span>
                        <span>☂</span>
                    </div>                
                </div>            
                <div className="coinItem">
                    <div className="coinInfo">
                        <h3 className='coinName'>비트코인</h3>
                        <p className='coinPrice'>$1,000,000</p>
                        <p className='coinRate'>+3.34%</p>
                    </div>
                    <div className="coinWeather">
                        <span>☀</span>
                        <span>☔</span>
                        <span>☂</span>
                    </div>                
                </div>            
                <div className="coinItem">
                    <div className="coinInfo">
                        <h3 className='coinName'>비트코인</h3>
                        <p className='coinPrice'>$1,000,000</p>
                        <p className='coinRate'>+3.34%</p>
                    </div>
                    <div className="coinWeather">
                        <span>☀</span>
                        <span>☔</span>
                        <span>☂</span>
                    </div>                
                </div>            
                <div className="coinItem">
                    <div className="coinInfo">
                        <h3 className='coinName'>비트코인</h3>
                        <p className='coinPrice'>$1,000,000</p>
                        <p className='coinRate'>+3.34%</p>
                    </div>
                    <div className="coinWeather">
                        <span>☀</span>
                        <span>☔</span>
                        <span>☂</span>
                    </div>                
                </div>            
                <div className="coinItem">
                    <div className="coinInfo">
                        <h3 className='coinName'>비트코인</h3>
                        <p className='coinPrice'>$1,000,000</p>
                        <p className='coinRate'>+3.34%</p>
                    </div>
                    <div className="coinWeather">
                        <span>☀</span>
                        <span>☔</span>
                        <span>☂</span>
                    </div>                
                </div>            
                <div className="coinItem">
                    <div className="coinInfo">
                        <h3 className='coinName'>비트코인</h3>
                        <p className='coinPrice'>$1,000,000</p>
                        <p className='coinRate'>+3.34%</p>
                    </div>
                    <div className="coinWeather">
                        <span>☀</span>
                        <span>☔</span>
                        <span>☂</span>
                    </div>                
                </div>            
                <div className="coinItem">
                    <div className="coinInfo">
                        <h3 className='coinName'>비트코인</h3>
                        <p className='coinPrice'>$1,000,000</p>
                        <p className='coinRate'>+3.34%</p>
                    </div>
                    <div className="coinWeather">
                        <span>☀</span>
                        <span>☔</span>
                        <span>☂</span>
                    </div>                
                </div>            
                <div className="coinItem">
                    <div className="coinInfo">
                        <h3 className='coinName'>비트코인</h3>
                        <p className='coinPrice'>$1,000,000</p>
                        <p className='coinRate'>+3.34%</p>
                    </div>
                    <div className="coinWeather">
                        <span>☀</span>
                        <span>☔</span>
                        <span>☂</span>
                    </div>                
                </div>            
                <div className="coinItem">
                    <div className="coinInfo">
                        <h3 className='coinName'>비트코인</h3>
                        <p className='coinPrice'>$1,000,000</p>
                        <p className='coinRate'>+3.34%</p>
                    </div>
                    <div className="coinWeather">
                        <span>☀</span>
                        <span>☔</span>
                        <span>☂</span>
                    </div>                
                </div>            
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
