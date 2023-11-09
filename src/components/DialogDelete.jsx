import React from 'react'
import Button from './Button';
import './modal/modal.css';


function DialogDelete({ active, message = 'supprimer ?', onClose, onAccept }) {

    const handleClose = () => {
        onClose();
    };
    const handleOk = () => {
        onAccept();
    };
    const dark = false
    return (active) ? (
        <div className='popup'>
            <div style={{
                background: dark ? '#001a28dd' : '#ffffffed', width: 380, minHeight: 100, padding: 10,
                borderRadius: 10, color: dark ? 'white' : 'black', fontWeight: 600,
            }}>
                <div style={{ marginLeft: 10, fontSize: 22, color: 'red' }}>
                    <span>Supprimer ?</span>
                </div>
                <div style={{
                    display: 'flex', justifyContent: 'center', marginTop: 10, 
                    minHeight: 50, alignItems: 'center', fontWeight: 500,
                    marginBottom: 20, fontSize: 15, textAlign:'center'
                }}>
                    {message}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div style={{ width: '42%' }}>
                        <Button small onClick={handleClose} title='annuler' color='white' textcolor='black' textsize={15} />
                    </div>
                    <div style={{ width: '42%' }}>
                        <Button small onClick={handleOk} title='Supprimer' color='red' textsize={15} />
                    </div>
                </div>
            </div>
        </div>
    ) : '';
}

export default DialogDelete
