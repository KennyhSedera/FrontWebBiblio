import React from 'react'
import './cardemprunt.css'
import moment from 'moment'
import { getImg } from '../../services/getImg'
import Button from '../../components/Button'
import Modal from '../../components/modal/Modal'

function CardEmprunt({ data }) {
  const [open, setOpen]=React.useState(false)
  const str = data.adherent.prenom_Adh;
  const pseudo = str.split(' ');
  let date1 = new Date(data.retour_Emprunt);
  let date2 = new Date();

  return (
      <div className='cardemprunt'>
        <img
            className='imgadh'
            src={getImg(data.adherent.photo_Adh)}
            alt="adhimg"
        />
          <div style={{
              position: 'relative',
              top: 8, left: 10,
              fontWeight: '800',
              fontSize: 18,
              marginBottom: 20,
          }}>{data.adherent.id_Adh}</div>
          <div style={{width:'calc(100% - 115px)', fontSize:18, paddingInline:5, overflowWrap:'break-word'}}>
            <div style={{fontWeight:'600'}}>{pseudo[pseudo.length - 1]}</div>
          </div>
          <div className='bookemp'>
            <div><strong>Titre: </strong>{data.livre.titre_livre}</div>
            <div><strong>Auteur: </strong>{data.livre.auteur_livre}</div>
            <div><strong>Début: </strong>{ moment(data.date_Emprunt).format('DD MMM YYYY ')}</div>
            <div><strong>Retour: </strong>{ moment(data.retour_Emprunt).format('DD MMM YYYY ')}</div>
          </div>
          {date1 > date2 && <div style={{width:'60%', marginTop:20, marginLeft:'20%'}}>
            <Button title='Retour' color='' textcolor='white' onClick={()=>setOpen(true)} />
      </div>}
      
        <Modal open={open}>
            <div style={{
                background: '#ffffffe8', width: 380, minHeight: 100, padding: 10,
                borderRadius: 15, color: 'black', fontSize: 18, fontWeight: 600,
            }}>
                <div style={{ marginLeft: 10, fontSize:22 }}>
                    <span>Deconnexion ?</span>
                </div>
                <div style={{
                    justifyContent: 'center', display: 'flex',
                    height: 50, alignItems: 'center', fontWeight: 500,
                    marginBottom: 20, fontSize: 15,
                }}>
                    <span>Voulez-vous se deconnecter vraiment ?</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div style={{ width: '42%', }}>
                        <Button small onClick={() => setOpen(false)} title='annuler' color='white' textcolor='black' textsize={15} />
                    </div>
                    <div to='/' style={{ width: '42%', textDecoration: 'none' }}>
                        <Button
                            small
                            title='Deconnecter'
                            color='#00b2fee1'
                            textcolor='white'
                            textsize={15}
                            onClick={handleLogout}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    </div>
  )
}

export default CardEmprunt
