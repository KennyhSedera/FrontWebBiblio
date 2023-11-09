import React from 'react'
import './cardDash.css'
import CountUp from 'react-countup';

function CardDashboard({title, nb, icon}) {
  return (
   <div className="containercard">
      <div className="tBox-wrap">
        <span className="tHover"></span>
        <span className="tHover"></span>
        <span className="tHover"></span>
        <span className="tHover"></span>
        <span className="tHover"></span>
        <span className="tHover"></span>
        <span className="tHover"></span>
        <span className="tHover"></span>
        <span className="tHover"></span>
        <div className="tBox">
          <img
            src={icon}
            alt="icon"
          />
          <div className="nombre">{nb && <CountUp end={nb} delay={3} />}</div>
          <div className="title">{title}</div>
        </div>
      </div>
    </div>
  )
}

export default CardDashboard
