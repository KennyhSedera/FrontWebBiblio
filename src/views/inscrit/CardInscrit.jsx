import React from 'react'
import '../membres/card.css'
import {
  // FaEdit,
  FaEye,
  FaFemale,
  FaGraduationCap,
  FaMale,
  FaMobile,
} from 'react-icons/fa'
import { BiMap } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

// import moment from 'moment';

function CardInscrit({ data }) {
  
// const setDate = ({ date }) => {
//   return moment(date).format('DD-MM-YYYY ')
  // }

  const navigate = useNavigate();
  
  const handleIconClick = (idsel) => {
    const id = idsel;
    navigate('/adherentone', { state: { id } });
  };

  
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
            alignItems:"center"
          }}>
            {/* <FaEdit
              size={18}
              color='blue'
              onClick={() => alert('modif')} 
              style={{ transformStyle: 'preserve-3d', cursor: 'pointer' }}
            /> */}
            <div
              onClick={() => handleIconClick(data.id_InscritAdh)}
              style={{ 
                width: 30,
                height: 30, 
                borderRadius: '50%', 
                background: '#ffffffd0',
                transformStyle: 'preserve-3d',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems:'center',
              }}
            >
              <FaEye
                size={17}
                color='black'
              />
            </div>
            
          </div>

          <div style={{
            position: 'absolute',
            top: 6,
            right: 15,
            fontSize: 18,
          }}>
            <strong>{data.id_InscritAdh}</strong>
          </div>
          <div style={{fontWeight:'bold', marginTop:15, textTransform:'capitalize'}}>{data.adherent.nom_Adh} </div>
          <div style={{textTransform:'capitalize'}}> {data.adherent.prenom_Adh}</div>
          
          <div style={{ marginTop: 15, textTransform:'capitalize' }}><BiMap /> : { data.adherent.adresse_Adh }</div>
          <div>{ data.genre_Adh==='Homme' ? <FaMale /> : <FaFemale />} : { data.adherent.genre_Adh }</div>
          <div><FaMobile /> : { data.adherent.tel_Adh }</div>
          <div><FaGraduationCap /> : { data.typeadherent.nom_TypeAdh }</div>
        </div>
      </div>
    </div>
  )
}

export default CardInscrit
