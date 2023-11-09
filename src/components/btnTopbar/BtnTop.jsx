import React, { useEffect, useState } from 'react'
import Modal from '../modal/Modal'
import Button from '../Button'
import { FaMoon } from 'react-icons/fa'
import { MdSunny } from 'react-icons/md'
import { TbLogout } from 'react-icons/tb'
import { FiBell } from 'react-icons/fi'
import { ImUser } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import './btntop.css'

function BtnTop({theme=false}) {
    const [dark, setDark] = useState(false)
    const [openLogout, setOpenLogout] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        setDark(theme)
    }, [theme])

    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/')
    }
    const list = [
        {title:'Voir votre profil', icon: ImUser, onClick:()=>{navigate('/profile')}},
        {title:'Notification', icon: FiBell, onClick:()=>{navigate('/notification')}},
        {title:'Se deconnecter', icon: TbLogout, onClick:()=>{setOpenLogout(true)}}
    ]
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginRight:5 }}>
        <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: 15, cursor: 'pointer', }}>
            <div style={{
                position: 'absolute', width: 20, height: 20,
                borderRadius: 50, background: 'red', top: 35, color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>2</div>
            <div style={{
                background: dark ? '#ffffff67' : '#00000067',
                borderRadius: 50, marginRight: 8,
                width: 36, height: 36, flexDirection: 'row-reverse',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <FiBell color='white' size={22} />
            </div>
        </div>
        <div onClick={() => { setDark(!dark) }} style={{
            width: 36, height: 36, cursor: 'pointer',
            background: dark ? '#ffffff67' : '#00000067',
            borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{dark ? <FaMoon color='white' size={22} /> : <MdSunny color='yellow' size={25} />}</div>
        <div style={{
            position:'relative',
            width: 45,
            height: 45,
            borderRadius: 50,
        }}>
            <img
                onClick={() => setShowMenu(!showMenu)}
                src='me.jpg' alt=""
                style={{
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                    objectFit: 'cover',
                    borderRadius: 50,
                    border: '1px solid #2377a9',
                    boxShadow: '2px 2px 10px #009da0, 2px 2px 2px #2377a9, 2px 2px 5px #00a1feaa'
                }}
            />
              {showMenu ? <div
                className='menuprofile'
                style={{
                    width: 250,
                    minHeight: showMenu?100:0,
                    background:'#fffffff0',
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    zIndex: 99,
                    padding: 10,
                    borderRadius:5,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap:20,
                        paddingBottom:15,
                        borderBottom:'1px solid black',
                        marginBottom:10,
                    }}
                >
                    <img
                        src='me.jpg' alt=""
                        style={{
                            width: 60,
                            height: 60,
                            cursor: 'pointer',
                            objectFit: 'cover',
                            borderRadius: 50,
                            boxShadow: '2px 2px 10px #000000e0'
                        }}
                      />
                      <span style={{fontSize:18, fontWeight:600}}>Kennyh Sedera</span>
                </div>
                {list.map((item, i) => (
                    <div
                        className='listbtntop'
                        key={i}
                        onClick={item.onClick}
                    >
                        {item.title}
                        <span className='icon'>
                            <item.icon />
                        </span>
                    </div>  
                ))}
            </div>:null}
        </div>
        <Modal open={openLogout}>
            <div style={{
                background: dark ? '#001a28dd' : '#ffffffe8', width: 380, minHeight: 100, padding: 10,
                borderRadius: 15, color: dark ? 'white' : 'black', fontSize: 18, fontWeight: 600,
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
                        <Button small onClick={() => setOpenLogout(false)} title='annuler' color='white' textcolor='black' textsize={15} />
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

export default BtnTop
