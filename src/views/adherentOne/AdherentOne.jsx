import React, { useEffect, useState } from 'react'
import './adherentone.css'
import { useLocation } from 'react-router-dom';
import Background from '../../components/layout/Background';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getOneAdhInscrit } from '../../services/membreService';
import { getOneAdh } from '../../services/adherentService';
import { getImg } from '../../services/getImg';
import { IoMdPrint } from 'react-icons/io';
import { FaArrowRight } from 'react-icons/fa';
import moment from 'moment'
import GeneratePDF from './GeneratePDF';
import Modal from '../../components/modal/Modal';

function AdherentOne() {
  const { state } = useLocation();
  const id = state.id;
  const [isFlipped, setIsFlipped] = useState(false);
  const [print, setPrint] = useState(false);
  const [data, setData] = useState([])
  const [adh, setAdh] = useState([])
  const [type, setType] = useState('')

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  
  const navigate = useNavigate();

  const handleClose = ()=>{
    navigate('/inscription');
  }

  const getOne = () => {
    getOneAdhInscrit(id)
    .then((res) => {
      setData(res.data.inscription)
      setType(res.data.inscription.typeadherent.nom_TypeAdh)
      getAdh(res.data.inscription.id_Adh)
    }).catch((err) => {
      console.log(err);
    });
  }

  const getAdh = (id) => {
    getOneAdh(id)
    .then((res) => {
      setAdh(res.data.adherent)
    }).catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    getOne()
  }, [])

  return (
    <Background>
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
          <div className="flip-card-inner">
          {isFlipped ?
            <div className='iconback2' onClick={handleClose}><MdClose size={18} /></div> :
            <div className='iconback' onClick={handleClose}><MdClose size={18} /></div>
          }
          <div className="iconflip" onClick={flipCard}><FaArrowRight size={12} /></div>
          <div className="iconpdf" onClick={()=>setPrint(true)}><IoMdPrint size={20} /></div>
            <div className="flip-card-front">
              <div className="flipcardfrontinner">
                <div className="front-header">
                    <div style={{
                      textAlign: 'center',
                      wordWrap:'break-word',
                      width: 'calc(30%)',
                    }}><img style={{width:120, height:120}} src='logo.png' /></div>
                    <div className="header-right">
                     <div style={{
                        margin: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems:'center',
                        gap: 5,
                        fontSize: 16,
                        fontWeight:600,
                      }}>
                        <strong style={{fontSize:20}}> {type} </strong>
                        <div><strong>Année: </strong> {moment(data.date_InscritAdh).format('YYYY')}</div>
                        <div><strong>N°:</strong> {adh.id_Adh}</div>
                      </div>
                    </div>
                    <img className='img' src={getImg(adh.photo_Adh)} alt="photoAdh" />
                  </div>
                <div style={{fontSize:16, width:'calc(100% - 180px)'}}>
                  <div><strong>Nom</strong>: {adh.nom_Adh}</div>
                  <div><strong>Prénom</strong>: {adh.prenom_Adh}</div>
                  <div><strong>Né(e) le</strong>: {moment(adh.naissance_Adh).format('DD / MM / YYYY')}</div>
                  <div><strong>Adresse</strong>: {adh.adresse_Adh}</div>
                  <div><strong>Date</strong>: {moment(data.date_InscritAdh).format('DD / MM / YYYY')}</div>
                </div>
                <div style={{fontSize:16}}><strong>Visa du Responsable</strong></div>
              </div>
            </div>
            <div className="flip-card-back">
              <div className="flipcardfrontinner">
                <div className="front-header">
                    <div style={{
                      textAlign: 'center',
                      wordWrap:'break-word',
                      width: 'calc(30%)',
                    }}><img style={{width:120, height:120}} src='logo.png' /></div>
                    <div className="header-right">
                     <div style={{
                        margin: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems:'center',
                        gap: 5,
                        fontSize: 16,
                        fontWeight:600,
                      }}>
                        <strong style={{fontSize:20}}> {type} </strong>
                        <div><strong>Année: </strong> {moment(data.date_InscritAdh).format('YYYY')}</div>
                        <div><strong>N°:</strong> {adh.id_Adh}</div>
                      </div>
                    </div>
                    <img className='img' src={getImg(adh.photo_Adh)} alt="photoAdh" />
                  </div>
                <div style={{fontSize:16, width:'calc(100% - 180px)'}}>
                  <div><strong>Nom</strong>: {adh.nom_Adh}</div>
                  <div><strong>Prénom</strong>: {adh.prenom_Adh}</div>
                  <div><strong>Né(e) le</strong>: {moment(adh.naissance_Adh).format('DD / MM / YYYY')}</div>
                  <div><strong>Adresse</strong>: {adh.adresse_Adh}</div>
                  <div><strong>Date</strong>: {moment(data.date_InscritAdh).format('DD / MM / YYYY')}</div>
                </div>
                <div style={{fontSize:16}}><strong>Visa du Responsable</strong></div>
              </div>
            </div>
          </div>
      </div>
      <Modal open={print} >
        <GeneratePDF data={data} adh={adh} type={type} onClose={()=>setPrint(false)} />
      </Modal>
    </Background>
  )
}

export default AdherentOne;
