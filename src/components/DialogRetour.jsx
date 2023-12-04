import React from 'react'

function DialogRetour({livreEmp='', pseudo='', dateEmp=new Date(), onClick=()=>{}, onClose=()=>{}}) {
    return (
        <div style={{
            background: '#ffffffe8', width: 380, minHeight: 100, padding: 10,
            borderRadius: 15, color: 'black', fontSize: 18, fontWeight: 600,
        }}>
            <div style={{ marginLeft: 10, fontSize:22 }}>
                <span>Retour Emprunt ?</span>
            </div>
            <div style={{
                justifyContent: 'center', display: 'flex',
                height: 50, alignItems: 'center', fontWeight: 500,
                marginBottom: 20, fontSize: 15,
            }}>
                <span>Voulez-vous enregistrer la retour du {livreEmp} emprunté par {pseudo} le {moment(dateEmp).format('DD MMM YYYY ')} ?</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ width: '42%', }}>
                    <Button small onClick={onClose} title='annuler' color='white' textcolor='black' textsize={15} />
                </div>
                <div to='/' style={{ width: '42%', textDecoration: 'none' }}>
                    <Button
                        small
                        title='Enregistrer'
                        color='#00b2fee1'
                        textcolor='white'
                        textsize={15}
                        onClick={onClick}
                    />
                </div>
            </div>
        </div>
    )
}

export default DialogRetour
