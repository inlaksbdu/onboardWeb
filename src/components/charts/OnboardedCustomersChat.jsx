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
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'SME',
        data: [120, 150, 170, 200, 230, 300, 310, 320, 400, 450, 470, 500],
        borderColor: '#319D9C',
        backgroundColor: '#319D9C',
        pointStyle: 'circle',
        pointRadius: 5,
        pointBackgroundColor: '#319D9C',
      },
      {
        label: 'Individual',
        data: [80, 100, 90, 120, 150, 180, 200, 250, 300, 350, 400, 450],
        borderColor: '#7987FF',
        backgroundColor: '#7987FF',
        pointStyle: 'circle',
        pointRadius: 5,
        pointBackgroundColor: '#7987FF',
      },
      {
        label: 'Group',
        data: [60, 70, 100, 110, 130, 140, 160, 180, 220, 250, 300, 350],
        borderColor: '#137A08',
        backgroundColor: '#137A08',
        pointStyle: 'circle',
        pointRadius: 5,
        pointBackgroundColor: '#137A08',
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
        align: 'end', // Aligns items to the end (right)
        labels: {
          usePointStyle: true, 
          pointStyle: 'circle', 
          boxWidth: 10, 
          boxHeight: 10, 
          padding: 20, 
        },
      
        

      },
      title: {
        display: true,
        text: 
          'Total Onboarded Customers (January - December)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          borderDash: [5, 5], // Creates dotted lines for vertical grid
          color: 'rgba(0, 0, 0, 0.1)',
          borderColor:"green" // Removes horizontal grid lines
        },
      },
      x:{
        grid: {
          display: false, 
          borderDash: [5, 5], // Creates dotted lines for vertical grid
          color: 'rgba(0, 0, 0, 0.1)',// Removes vertical grid lines
        },
      }
    },
  };

  return (
  
  <div  className=" w-full flex  flex-col bg-white    p-4 shadow border border-slate-100 rounded-lg  z-10" >
        <h1 className='text-left font-semibold text-slate-600'>Customer Onboarding Data</h1>

  <Line data={data} options={options} className="h-full w-full"  /></div>) ;
};

export default OnboardedCustomersChat;
