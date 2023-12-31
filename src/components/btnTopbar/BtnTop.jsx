import React, { useEffect, useState, useMemo } from 'react'
import Modal from '../modal/Modal'
import Button from '../Button'
// import { FaMoon } from 'react-icons/fa'
// import { MdSunny } from 'react-icons/md'
import { MdCircle, MdClose } from 'react-icons/md'
import { TbLogout } from 'react-icons/tb'
import { FiBell } from 'react-icons/fi'
import { ImUser } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import './btntop.css'
import { notification, readNotificationUser } from '../../services/notificationService'
import moment from 'moment/moment'
import { getImg } from '../../services/getImg'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();

const fetchData = async () => {
  const response = await notification();
  return response.data.notification;
};

const MyComponent = ({id, setShowMenu, showNotification, setShowNotification}) => {
  const navigate = useNavigate();
    const { data, error } = useQuery('myData', fetchData);
    
    const countUnread = useMemo(() => {
        if (data && Array.isArray(data)) {
            return data.filter(item => item.readAt === null).length;
        }
        return 0; // Retourne 0 si les données ne sont pas chargées ou ne sont pas sous forme de tableau
    }, [data]);
    
    if (error) {
        return (
            <div style={{
                    background: '#00000067',
                    borderRadius: 50, marginRight: 8,
                    width: 40, height: 40, flexDirection: 'row-reverse',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
            >
                <FiBell color='white' size={22} />
            </div>
        )
    }

    const readNotification = (data) => {
        if (data.readAt) {
            navigate('/reservation', { state: { data: data } })
        } else {
            readNotificationUser({ id_Notification: data.id_Notification, id_User: id })
            .then(() => {
                navigate('/reservation', { state: { data: data } })
            }).catch((err) => {
                console.log(err);
            });
        }
    }

  return (
    
        <div style={{
            position:'relative',
            width: 50,
            height: 50,
            borderRadius: 50,
            top: 5,
        }}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: 15, cursor: 'pointer', }}>
                {countUnread !== 0 ? <div style={{
                    position: 'absolute', width: 20, height: 20,
                    borderRadius: 50, background: 'red', top: -5, color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <span style={{ fontSize: 10 }}>
                      { countUnread > 15 ? '15+' : countUnread }
                    </span>
                </div>:null}
                <div style={{
                        background: '#00000067',
                        borderRadius: 50, marginRight: 8,
                        width: 40, height: 40, flexDirection: 'row-reverse',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                    onClick={() =>{
                        setShowNotification(!showNotification)
                        setShowMenu(false)
                    }}
                >
                    <FiBell color='white' size={22} />
                </div>
            </div>
            {showNotification ? <div
                className='menuprofile'
                style={{
                    width: 300,
                    maxHeight: showNotification?350:0,
                    background:'#fffffff0',
                    position: 'absolute',
                    right: 20,
                    zIndex: 99,
                    paddingBlock: 10,
                    borderRadius: 5,
                    top: 41,
                    overflowY:'auto',
                }}
          >
              <div style={{
                  display: 'flex',
                  justifyContent:'space-between',
                  padding: 5,
                  fontSize: 22,
                  fontWeight: 700,
                  marginBottom: 2,
                  paddingLeft: 10,
              }}>
                  <span>Notifications</span>
                  <MdClose
                      size={17}
                      onClick={() => setShowNotification(!showNotification)}
                      style={{cursor:'pointer'}}
                  />
              </div>
                {data.map((item) => (
                    <div
                        className='listnotification'
                        key={item.id_Notification}
                        onClick={() => {
                            readNotification(item)
                        }}
                        style={{position:'relative',}}
                    >
                        <div style={{
                        }}>     
                            <img
                                alt='pdp'
                                src={getImg(item.reservationLivre.adherent.photo_Adh)}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 50,
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                        
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',fontSize:12
                        }}>
                            <span style={{marginRight:10}}>
                                {item.reservationLivre.adherent.prenom_Adh+' '+item.content_Notification+' '+item.reservationLivre.livre.titre_Livre}
                            </span>
                            <span style={{
                                fontSize: 10,
                                fontWeight: 300,
                                color: item.readAt ? 'black' : '#1e88e5',
                            }}>{moment(item.date_Notification).format('DD MMM YYYY')}</span>
                        </div>
                        {!item.readAt ? <MdCircle size={8} color='#1e88e5' style={{position:'absolute', right:5, top:25}} />:
                        <img
                            src={getImg(item.user.user_Profil)} alt="pdp"
                            style={{
                                width: 16,
                                height: 16,
                                borderRadius: 50,
                                position: 'absolute',
                                right: 5,
                                bottom: 5
                            }}
                        />}
                    </div>  
                ))}
            </div>:null}
        </div>
  );
};

function BtnTop() {
    const [openLogout, setOpenLogout] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showNotification, setShowNotification] = useState(false)
    const [user, setUser] = useState([])

    useEffect(() => {
        getUserLocal()
    }, [])

    const getUserLocal = () => {
        const storedUser = localStorage.getItem('User');
        if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        } else {
            navigate('/')
        }
    }

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('User')
        navigate('/')
    }
    const list = [
        {title:'Voir votre profil', icon: ImUser, onClick:()=>{navigate('/profile', { state: { user: user } })}},
        // {title:'Notification', icon: FiBell, onClick:()=>{navigate('/notification')}},
        {title:'Se deconnecter', icon: TbLogout, onClick:()=>{setOpenLogout(true)}}
    ]
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginRight:5 }}>
        <QueryClientProvider client={queryClient}>
              <MyComponent
                  id={user.id_user}
                  setShowMenu={setShowMenu}
                  showNotification={showNotification}
                  setShowNotification={setShowNotification}
              />
        </QueryClientProvider>
        <div style={{
            position:'relative',
            width: 45,
            height: 45,
            borderRadius: 50,
        }}>
            <img
                onClick={() => {
                    setShowNotification(false)
                    setShowMenu(!showMenu)
                }}
                src={getImg(user.user_profil)} alt="pdp"
                style={{
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                    objectFit: 'cover',
                    borderRadius: 50,
                    border: '1px solid #2377a9',
                    boxShadow: '2px 2px 10px #009da0, 2px 2px 2px #2377a9, 2px 2px 5px #00a1feaa',
                    resize:'inherit'
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
                        src={getImg(user.user_profil)} alt=""
                        style={{
                            width: 60,
                            height: 60,
                            cursor: 'pointer',
                            objectFit: 'cover',
                            borderRadius: 50,
                            boxShadow: '2px 2px 10px #000000e0'
                        }}
                      />
                      <span style={{fontSize:18, fontWeight:600, textTransform:'capitalize'}}>{user.user_name}</span>
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
