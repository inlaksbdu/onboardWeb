import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DemographyChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          color: '#666',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Demography',
        align: 'start',
        color: '#333',
        font: {
          size: 14,
          weight: '700'
        },
        padding: {
          bottom: 30
        }
      },
      subtitle: {
        display: true,
        text: 'Statistics',
        align: 'start',
        color: '#666',
        font: {
          size: 14,
          weight: '400'
        },
        padding: {
          bottom: 20
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#666',
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: '#f0f0f0',
          drawBorder: false,
        },
        border: {
          display: false
        },
        ticks: {
          color: '#666',
          font: {
            size: 12
          },
          stepSize: 200
        },
        min: 0,
        max: 1000
      }
    },
    barPercentage: 0.8,
    categoryPercentage: 0.7
  };

  const data = {
    labels: ['Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Male',
        data: [700, 750, 950, 400],
        backgroundColor: '#7987FF',
        borderRadius: 4,
      },
      {
        label: 'Female',
        data: [450, 500, 850, 200],
        backgroundColor: '#A3C7EE',
        borderRadius: 4,
      }
    ]
  };

  return (
    <div className="w-full  h-[300px] bg-white p-3 shadow-lg border-slate-200 border max-xl:mt-0 max-xl:w-[48%]  max-md:w-full  max-md:mt-5  mt-4 rounded-lg">
      <Bar options={options} data={data} />
    </div>
  );
};

export default DemographyChart;