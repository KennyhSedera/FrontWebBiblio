import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Background from '../components/layout/Background';
import { MdKeyboardArrowLeft } from 'react-icons/md';

function ReservationView() {
    const location = useLocation();
    const navigate = useNavigate();
  const { data } = location.state || {};
  console.log({data:data});
  return (
    <Background>
          <div style={{
              width: 700,
              height: 400,
              background: '#ffffffa2',
              borderRadius:15,
              zIndex: 1,
          }}>
                <div style={{textAlign:'center', position:'relative', paddingTop:15,}}>
                    <MdKeyboardArrowLeft 
                        size={25}
                        style={{ position: 'absolute', left: 10, }}
                        onClick={()=>navigate('/accueil')}
                    />
                    <span style={{ fontSize: 25, fontWeight: 700 }}>Réservation</span>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                }}>
                    <div style={{
                        width:'50%', 
                        // background:'red', 
                        minHeight:200,
                    }}></div>
                    <div style={{
                        width:'50%', 
                        // background:'blue', 
                        minHeight:200,
                    }}></div>
                </div>
        </div>
    </Background>
  )
}

export default ReservationView
