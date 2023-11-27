import React, { useEffect, useState } from 'react'
import './style.css'
import MainLayout from '../components/layout/MainLayout';
import Chart from 'react-google-charts';
import { countEmpByEmpLivre, countEmpruntByDate } from '../services/empruntService';
import moment from 'moment';

function StatistiqueView() {
  const [chartData, setChartData] = useState([]);
  const [LinechartData, setLineChartData] = useState([]);

  useEffect(() => {
    countEmpByEmpLivre()
    .then((res) => {
      const formattedData = formatDataForChart(res.data.emprunt);
      setChartData(formattedData);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const formatDataForChart = data => {
    const chartData = [
      [ 'Emplacement', 'Total' ],
      ...data.map(item => [ item.livre.emplacement_livre, item.total ]),
    ];
    return chartData;
  };

  useEffect(() => {
    countEmpruntByDate()
    .then((res) => {
      const formattedData = formatDataForLineChart(res.data.emprunt);
      setLineChartData(formattedData);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const formatDataForLineChart = data => {
    const chartData = [
      [ 'Date', 'Total' ],
      ...data.map(item => [item.Date, item.total ]),
    ];
    return chartData;
  };

  return (
    <MainLayout title={'Statistique'} overflow>
      <div style={{
        width: '100%', height: '100%', display: 'flex',
        alignItems:'flex-start', flexWrap:'wrap'
      }}>
        <Chart
          width={'450px'}
          height={'300px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            is3D: true,
            backgroundColor: 'red',
          }}
        />
        <Chart
          width={'450px'}
          height={'300px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={LinechartData}
          options={{
            backgroundColor: 'blue',
            hAxis: {
              title: 'Date',
            },
            vAxis: {
              title: 'Total',
            },
          }}
        />
      </div>
      
    </MainLayout>
  );
}

export default StatistiqueView

// // Fonction pour récupérer les données de l'API
// const fetchDataFromAPI = async () => {
//   try {
//     const response = await fetch('http://localhost:1142/countEmpByEmpLivre');
//     if (response.ok) {
//       const data = await response.json()
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
//     </div>
//   );
// };

// export default MyChart;
