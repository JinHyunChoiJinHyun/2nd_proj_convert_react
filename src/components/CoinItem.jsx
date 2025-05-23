import React from 'react'

const CoinItem = ({name, price, rate, weather_yesterday, weather_today, weather_tomorrow, onClick}) => {
  return (
    <>
        <div 
        className="coinInfo"
        onClick={onClick}
        >
            <h3 className='coinName'>{name}</h3>
            <p className='coinPrice'>{price}</p>
            <p className='coinRate'>{rate}</p>
        </div>
        <div className="coinWeather">
            <span>{weather_yesterday}</span>
            <span>{weather_today}</span>
            <span>{weather_tomorrow}</span>            
        </div>     
        
    </>
  )
}

export default CoinItem
