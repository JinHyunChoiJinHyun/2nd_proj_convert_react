import React from 'react'
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MarketCapGraph = () => {
    const data = {
        labels: ["1월", "2월", "3월", "4월", "5월"],
        datasets:[
            {
                label:"시가총액",
                data: [12, 19, 3, 5, 2],
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
            title:{display:true, text:"시가총액 그래프"}
        },
    };
  return (
    <>
        <div className="marketHeader">
            <h2>시가 총액</h2>
            <div className="marketCapInfo">
                <p className='marketPrice'>₩4.04P</p>
                <p className='marketRate'>▼ 0.86%</p>
            </div>
        </div>
        <Line data = {data} options = {options} />
    </>
  )
}

export default MarketCapGraph
