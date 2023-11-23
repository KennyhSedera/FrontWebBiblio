import React from 'react'
import { useLocation } from 'react-router-dom';
import Background from '../components/layout/Background';

function ReservationView() {
  const location = useLocation();
  const { data } = location.state || {};
  console.log({data:data});
  return (
    <Background>
          <div style={{
              width: 700,
              height: 500,
              background:'#ffffffa3'
          }}>
              
      </div>
    </Background>
  )
}

export default ReservationView
