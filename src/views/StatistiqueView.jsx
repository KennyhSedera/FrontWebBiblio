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
    ['Emplacement', 'Total emprunt'],
    ['Adulte', 11],
    ['Jeune', 2],
  ];

  return (
      <MainLayout title={'Statistique'} overflow>
        <Chart
            width={'500px'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
            title: '',
            is3D: true,
            backgroundColor: 'transparent', // Changer la couleur de fond du graphique
            }}
        />
          {/* <Chart
        width={'500px'}
        height={'300px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          title: 'Données depuis la base de données',
          backgroundColor: '#f7f7f7', // Changer la couleur de fond du graphique
          hAxis: {
            title: 'X-axis Title',
          },
          vAxis: {
            title: 'Y-axis Title',
          },
        }}
      /> */}
      {/* <Chart
        width={'500px'}
        height={'300px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          title: 'Données depuis la base de données',
          backgroundColor: '#f7f7f7', // Changer la couleur de fond du graphique
          hAxis: {
            title: 'X-axis Title',
          },
          vAxis: {
            title: 'Y-axis Title',
          },
        }}
      /> */}
    </MainLayout>
  );
}

export default StatistiqueView

// // Fonction pour récupérer les données de l'API
// const fetchDataFromAPI = async () => {
//   try {
//     const response = await fetch('URL_DE_VOTRE_API');
//     if (response.ok) {
//       const data = await response.json();
//       return data; // Retourne les données de l'API
//     } else {
//       throw new Error('Erreur lors de la récupération des données');
//     }
//   } catch (error) {
//     console.error('Erreur:', error);
//     return null;
//   }
// };

// import React, { useState, useEffect } from 'react';
// import Chart from 'react-google-charts';

// const MyChart = () => {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     // Récupérer les données de l'API
//     fetchDataFromAPI().then(data => {
//       if (data) {
//         // Traiter les données si nécessaire pour les adapter au format attendu par Google Chart
//         const formattedData = formatDataForChart(data);
//         setChartData(formattedData); // Mettre à jour le state avec les données formatées
//       }
//     });
//   }, []);

//   // Fonction pour formater les données pour le graphique
//   const formatDataForChart = data => {
//      // Adapter les données au format requis par le graphique
  // Ici, supposons que vous voulez utiliser value1 et value2 dans le graphique

//   const chartData = [
//     ['Category', 'Value 1', 'Value 2'],
//     ...data.map(item => [item.name, item.value1, item.value2]),
//   ];

//   return chartData;
//   };

//   return (
//     <div style={{ display: 'flex', maxWidth: 900 }}>
//       <Chart
//         width={'500px'}
//         height={'300px'}
//         chartType="PieChart"
//         loader={<div>Loading Chart</div>}
//         data={chartData}
//         options={{
//           title: 'Données depuis la base de données',
//           is3D: true,
//         }}
//       />
//     </div>
//   );
// };

// export default MyChart;
