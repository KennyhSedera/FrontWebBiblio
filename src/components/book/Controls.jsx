import React, { useState } from 'react';
import './control.css'
import Background from '../layout/Background';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';

function Controls() {
  const { state } = useLocation();
  const id = state.id;
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  
  const navigate = useNavigate();

  const handleClose = ()=>{
    navigate('/inscription');
  }

  return (
    <Background>
      <div className={`flipcard ${isFlipped ? 'flipped' : ''}`}>
          <div className="flipcardinner">
            <div className="flipfront">
            <p>Front Side { id }</p>
              <div className="buttonclose" onClick={handleClose}><MdClose size={20} /></div>
              <button onClick={flipCard}><FaArrowRight /></button>
            </div>
            <div className="flipback">
              <p>Back Side</p>
              <button onClick={flipCard}><FaArrowLeft /></button>
            </div>
          </div>
      </div>
    </Background>
  )
}

export default Controls
