import React from 'react'
import './style.css'
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';
import MainLayout from '../components/layout/MainLayout';
import Chart from 'react-google-charts';

// ChartJS.register(ArcElement, Tooltip, Legend);


function StatistiqueView() {
//     const data = {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [
//             {
//                 label: '# of Votes',
//                 data: [12, 19, 3, 5, 2, 3],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)',
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)',
//                 ],
//                 borderWidth: 1,
//             },
//         ],
//     }
    
//     return (
//         <MainLayout title={'Statistique'} overflow>
//             <div style={{
//                 width: '100%',
//                 display: 'flex',
//                 justifyContent: 'space-around',
//                 flexWrap:'wrap'
//             }}>
//                 <div style={{width:'48%'}}>
//                     <Pie data={data} />
//                 </div>
//             </div>
//         </MainLayout >
    //     )
     const data = [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7],
  ];

  return (
    <MainLayout>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          title: 'My Daily Activities',
          is3D: true,
        }}
      />
    </MainLayout>
  );
}

export default StatistiqueView
