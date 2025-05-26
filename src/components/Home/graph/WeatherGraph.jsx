import React from 'react'
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    scales,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import { callback } from 'chart.js/helpers';
  
  ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const WeatherGraph = () => {
    const data = {
        labels: ["월","화","수","목","금","토","일"],
        datasets: [
            {
                label:"기온",
                data: [13,16,15,17,18],
                borderColor:"skyblue",
                tension:0.4,
                pointRadius:0,
            },
        ],
    };

    const weatherIcons = ['☁️', '🌧️', '🌤️', '☀️', '⛅️']

    const options = {
        responsive: true,
        plugins: {
            legend:{display: false},
            tooltip: {
                callbacks:{
                    label:(context) => `기온: ${context.parsed.y}`
                },
            },
            iconPlugin:{
                icons: weatherIcons,
            },
        },
        scales: {
            y:{
                ticks:{
                    callback:(val) => `${val}`
                },
            },
        },
    };

    const iconPlugin = {
        id:"iconPlugin",
        afterDatasetsDraw(chart, args, pluginOptions) {
            const {ctx} = chart;
            const icons = pluginOptions.icons;
            const dataset = chart.getDatasetMeta(0);

            dataset.data.forEach((datapoint, i) => {
                ctx.font = "20px sans-serif";
                ctx.textAlign = "center";
                ctx.textBaseline = 'bottom';
                ctx.fillText(icons[i], datapoint.x, datapoint.y - 10);
            });
        },
    };
  return (
    <>
        <Line data={data} options={options} plugins={iconPlugin} /> 
    </>
  ) 
}

export default WeatherGraph
