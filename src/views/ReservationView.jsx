import React from 'react'
import { useLocation } from 'react-router-dom';
import Background from '../components/layout/Background';
import { MdKeyboardArrowLeft } from 'react-icons/md';

function ReservationView() {
  const location = useLocation();
  const { data } = location.state || {};
  console.log({data:data});
  return (
    <Background>
          <div style={{
              width: 700,
              height: 400,
              background: '#ffffffdf',
              borderRadius:15,
              ZIndex: 1,
          }}>
              <div>
                  <MdKeyboardArrowLeft size={25} />
                  <span style={{fontSize:20, fontWeight:700}}>Réservation</span>
              </div>
              
      </div>
    </Background>
  )
}

export default ReservationView
