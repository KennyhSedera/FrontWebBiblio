import React from 'react'
import "./modal/modal.css";
import Button from './Button';

function AlertDialog({
    open = true,
    message = '',
    handelClose=()=>{},
}) {
  return (open) ? (
    <div className='popup'>
        <div style={{
            background: '#ffffffed', width: 380, minHeight: 100, padding: 10,
            borderRadius: 10, color: 'black', fontWeight: 600,
        }}>
            <div style={{ marginLeft: 10, fontSize: 22, color: 'red' }}>
                <span>Alert !</span>
            </div>
            <div style={{
                display: 'flex', justifyContent: 'center', marginTop: 10, 
                minHeight: 50, alignItems: 'center', fontWeight: 500,
                marginBottom: 20, fontSize: 15,
            }}>
                {message}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ width: '42%' }}>
                    <Button onClick={handelClose} small title='OK' textsize={15} />
                </div>
            </div>
        </div>
    </div>
  ):null
}

export default AlertDialog
