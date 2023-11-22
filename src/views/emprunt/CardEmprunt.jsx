import React from 'react'
import './cardemprunt.css'
import moment from 'moment'
import { getImg } from '../../services/getImg'

function CardEmprunt({data}) {

  const str = data.inscriptionadherent.adherent.prenom_Adh;

  const pseudo = str.split(' ');
    
  return (
      <div className='cardemprunt'>
        <img
            className='imgadh'
            src={getImg(data.inscriptionadherent.adherent.photo_Adh)}
            alt="adhimg"
        />
          <div style={{
              position: 'relative',
              top: 8, left: 10,
              fontWeight: 'bold',
              fontSize: 14,
              marginBottom: 20,
          }}>{data.inscriptionadherent.adherent.id_Adh}</div>
          <div style={{width:'calc(100% - 115px)', fontSize:19, paddingInline:5, overflowWrap:'break-word'}}>
            <div style={{fontWeight:'700'}}>{pseudo[pseudo.length - 1]}</div>
          </div>
          <div className='bookemp'>
            <div><strong>Titre: </strong>{data.livre.titre_livre}</div>
            <div><strong>Auteur: </strong>{data.livre.auteur_livre}</div>
            <div><strong>Début: </strong>{ moment(data.date_Emprunt).format('DD MMM YYYY ')}</div>
            <div><strong>Retour: </strong>{ moment(data.retour_Emprunt).format('DD MMM YYYY ')}</div>
          </div>
    </div>
  )
}

export default CardEmprunt
