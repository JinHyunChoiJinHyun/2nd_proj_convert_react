import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { coins } from '../../data';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MarketCapGraph = ({selectedCoin, pair}) => {

    const selectedCoinInData = coins.find(coin => coin.name === selectedCoin) // map + filter

    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:5000/api/changeRate?q=${pair}`);
            const data = await res.json();
            setChartData(data);
        }
        fetchData();
    }, [pair])
   

    const data = {
        labels: ["1월", "2월", "3월", "4월", "5월"],
        datasets:[
            {
                label:selectedCoinInData.name,
                data: chartData,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.3,
            },
        ],
    };    

    const options = {
        responsive: true,
        plugins:{
            legend:{position:"top"},
            title:{display:true, text:selectedCoinInData.name}
        },
    };    
    console.log(chartData)
  return (
    <>
        {selectedCoinInData && (
            <div className="marketHeader">
                <h2>{selectedCoinInData.name}</h2>
                <div className="marketCapInfo">
                    <p className='marketPrice'>{selectedCoinInData.price}</p>
                    <p className='marketRate'>{selectedCoinInData.rate}</p>
                </div>      
                
            </div>   
        )}     
        
        <Line data = {data} options = {options} />
    </>
  )
}

export default MarketCapGraph
