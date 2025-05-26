import React from 'react'
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from 'chart.js';
import { callback } from 'chart.js/helpers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FearGreedGraph = () => {
    const data = {
        labels:["현재 수치"],
        datasets:[
            {
                label: "게이지 값",
                data: [70],
                backgroundColor: "#36A2EB",
                borderRadius: 8,
                barThickness: 30,
            },
        ],
    };

    const options = {
        indexAxis: "y",
        responsive: true,
        scales:{
            x:{
                max: 100,
                ticks:{
                    callback:(value) => `${value}`,                    
                },
            },
            y:{
                grid:{
                    display:false,
                },
            },
        },
        plugins: {
            legend:{display: false},
            tooltip:{
                callbacks:{
                    label: (context) => `${context.parsed.x}%`,
                },
            },
        },
    };
  return (
    <>
      <Bar data = {data} options={options} />
    </>
  )
}

export default FearGreedGraph
