import React from 'react'
import './mainlayout.css'

function Background({children}) {
  return (
    <div className='layout'>
        <div className="card1 animate"></div>
        <div className="card2 animate1"></div>
        <div className="card4 animate"></div>
        <div className="card3 animate1"></div>
        <div className="card6 animate1"></div>
        <div className="card5 animate"></div>
        {children}
    </div>
  )
}

export default Background
