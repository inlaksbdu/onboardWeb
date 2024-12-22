import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OnboardedCustomersChat = () => {
  const data = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'SME',
        data: [120, 150, 170, 200, 230, 300, 310, 320, 400, 450, 470, 500],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        pointStyle: 'circle',
        pointRadius: 5,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Individual',
        data: [80, 100, 90, 120, 150, 180, 200, 250, 300, 350, 400, 450],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        pointStyle: 'rectRounded',
        pointRadius: 5,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Group',
        data: [60, 70, 100, 110, 130, 140, 160, 180, 220, 250, 300, 350],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        pointStyle: 'triangle',
        pointRadius: 5,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        boxWidth: 20,
        boxHeight: 20,
        borderRadius: 10, // Adds rounded corners to legend labels
        padding: 10,
      },
      title: {
        display: true,
        text: 'Total Onboarded Customers (January - December)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default OnboardedCustomersChat;
