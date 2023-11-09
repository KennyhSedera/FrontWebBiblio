import React from 'react'
import './navbar.css'
import { FaBook } from 'react-icons/fa'
// import pdp from './logo.png'

function NavbarView() {
    return (
        <div className='navbar'>
            <div className='logocontent'>
                <div className='logo'>
                    <FaBook size={20} />
                </div>
                <span style={{ fontSize: 22, fontWeight: 600 }}></span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 600 }}>BIBLIOTHEQUE ALLIANCE FRANÇAISE</div>
            <div className='rightnav'>
                <div className='pdp'>
                    <img src='me.jpg' alt="" style={{ width: 52, height: 52, borderRadius: '50%' }} />
                </div>
            </div>
        </div>
    )
}

export default NavbarView