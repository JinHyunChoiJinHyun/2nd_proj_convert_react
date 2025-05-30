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

const GoldGraph = () => {
    const data = {
        labels: ["1월", "2월", "3월", "4월", "5월"],
        datasets:[
            {
                label:"금",
                data: [12, 19, 3, 5, 2],
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
