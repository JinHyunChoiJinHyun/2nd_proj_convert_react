import React, {useState, useEffect} from 'react'
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

const GoldGraph = ({selectedCoin, pair}) => {

    const selectedCoinInData = coins.find(coin => coin.name === selectedCoin) // map + filter
    
    const [chartData, setChartData] = useState([])

    useEffect(() => {
            const fetchData = async () => {
                const res = await fetch(`http://localhost:5000/api/changeWeekRate?q=${pair}`);
                const data = await res.json();
                setChartData(data);
            }
            fetchData();
        }, [pair])

    const data = {
        labels: ["1월", "2월", "3월", "4월", "5월", "6월" , "7월", "8월", "9월", "10월", "11월", "12월"],
        datasets:[
            {
                label:selectedCoinInData.name,
                data: chartData,
                fill: false,
                borderColor: "yellow",
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins:{
            legend:{position:"top"},
            title:{display:true, text:"금 시가 그래프"}
        },
    };
    console.log(chartData)
  return (
    <>
        <div className="goldHeader">
            <h2>일별</h2>
            <div className="goldInfo">
                <p className='goldPrice'>₩4.04P</p>
                <p className='goldRate'>▼ 0.86%</p>
            </div>
        </div>
        <Line data = {data} options = {options} />
    </>
  )
}

export default GoldGraph
