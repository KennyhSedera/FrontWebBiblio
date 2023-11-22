import React from 'react'
import './card.css'
import {
  FaEdit,
  FaFemale,
  FaFlag,
  FaMale,
  FaMobile,
  FaTrashAlt,
} from 'react-icons/fa'
import { BiMap } from "react-icons/bi";
import { getImg } from '../../services/getImg';
// import moment from 'moment';

function CardMembre({
  data,
  deleteItem = () => { },
  edit = () => { },
}) {
  // const setDate = (date ) => {
  //   return moment(date).format('DD - MM - YYYY ')
  // }
  
  return (
    <div className='containercard'>
      <div className="tilt-box-wrap">
          <span className=""></span>
          <span className="t_over"></span>
          <span className="t_over"></span>
          <span className="t_over"></span>
          <span className="t_over"></span>
          <span className="t_over"></span>
          <span className="t_over"></span>
          <span className="t_over"></span>
          <span className="t_over"></span>
          <div className="tilt-box">
          <div style={{
            display:'flex',
            gap:10,
            alignItems:'center'
          }}>
            {data.status === false && <FaTrashAlt
              size={17}
              color='red'
              onClick={deleteItem} 
              style={{ transformStyle: 'preserve-3d', cursor: 'pointer' }}
            />}
            <FaEdit
              size={18}
              color='blue'
              onClick={edit} 
              style={{ transformStyle: 'preserve-3d', cursor: 'pointer' }}
            />
          </div>

          <div style={{
            position: 'absolute',
            top: 6,
            right: 15,
            fontSize: 18,
          }}>
            <strong>{data.id_Adh}</strong>
          </div>
          <div style={{fontWeight:'bold', marginTop:12, textTransform:'capitalize'}}>{data.nom_Adh} </div>
          <div style={{textTransform:'capitalize'}}> {data.prenom_Adh}</div>
          
          <div style={{
            marginTop: 15, textTransform: 'capitalize',
            display: 'flex', alignItems: 'center', gap:10
          }}><BiMap size={20} />{data.adresse_Adh}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            {data.genre_Adh === 'Homme' ? <FaMale size={18} /> : <FaFemale size={18} />}
            {data.genre_Adh}
          </div>
          <div style={{display:'flex', alignItems:'center', gap:14}}><FaMobile />{ data.tel_Adh }</div>
          <div style={{display:'flex', alignItems:'center', gap:15}}><FaFlag size={14}/>{ data.nationalite_Adh }</div>
          <img src={getImg(data.photo_Adh)} alt="adhPhoto" style={{
            width: 75,
            height: 75,
            position: 'absolute',
            right: 5,
            bottom: 5,
            borderRadius: 50,
            objectFit: 'cover',
            transformStyle: 'preserve-3d',
            backdropFilter: 'blur(5px)'
          }} />
        </div>
      </div>
    </div>
  )
}

export default CardMembre
