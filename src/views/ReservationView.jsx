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
          {/* <div style={{
              width: 700,
              height: 400,
              background: '#ffffffa2',
              borderRadius:15,
              ZIndex: 99,
          }}>
              <div style={{textAlign:'center', position:'relative', paddingTop:15,}}>
                  <MdKeyboardArrowLeft size={25} style={{position:'absolute', left:10,}} />
                  <span style={{ fontSize: 20, fontWeight: 700 }}>Réservation</span>
              </div>
              <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
              }}>
                  <div style={{
                    width:'50%', 
                    background:'red', 
                    minHeight:200,
                  }}></div>
                  <div style={{
                    width:'50%', 
                    background:'blue', 
                    minHeight:200,
                  }}></div>
              </div>
      </div> */}
           <div style={{
                width: 500, minHeight: 200, zIndex:1,
                background: '#ffffffa2', color: '#00b2fee1',
                borderRadius: 10, padding: 10, textAlign: 'center',
                display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 10,
            }}>
                <div style={{textAlign:'center', position:'relative', paddingTop:15,}}>
                    <MdKeyboardArrowLeft size={25} style={{position:'absolute', left:10,}} />
                    <span style={{ fontSize: 20, fontWeight: 700 }}>Réservation</span>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                }}>
                    <div style={{
                        width:'50%', 
                        background:'red', 
                        minHeight:200,
                    }}></div>
                    <div style={{
                        width:'50%', 
                        background:'blue', 
                        minHeight:200,
                    }}></div>
                </div>
            </div>
    </Background>
  )
}

export default ReservationView
