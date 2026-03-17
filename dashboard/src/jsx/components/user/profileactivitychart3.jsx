import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProfileActivityChart3 = () => {
  const data = {
    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    datasets: [
      {
        label: 'Data',
        data: [20, 35, 60, 45, 40, 70, 30, 80, 65, 70, 60, 35],
        backgroundColor: '#a15d01', 
        borderRadius: 0, 
        barThickness: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#000',
        },
      },
      y: {
        grid: {
          color: '#eee',
        },
        ticks: {
          color: '#000',
          stepSize: 10,
        },
        beginAtZero: true,
        max: 80,
      },
    },
  };

  return <Bar data={data} options={options} height={302}  width={1135}/>;
};

export default ProfileActivityChart3;

