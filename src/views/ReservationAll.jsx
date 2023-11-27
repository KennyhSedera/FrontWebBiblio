import React, {useState, useEffect} from 'react';
import Background from '../components/layout/Background';
import { useNavigate } from 'react-router-dom';
import { MdCircle, MdKeyboardArrowLeft } from 'react-icons/md';
import { getImg } from '../services/getImg';
import { reservation } from '../services/reservationService';
import moment from 'moment';
import Button from '../components/Button';

function ReservationAll() {
  const [user, setUser] = useState([])
  const [data, setData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getUserLocal()
    getReservation()
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
  const getReservation = () => {
    reservation()
    .then((res) => {
      setData(res.data.reservations)
    }).catch((err) => {
      console.log(err);
    });
  }
  return (
    <Background>
      <div style={{
        width: 800,
        height: 450,
        background: '#ffffffa2',
        borderRadius:15,
        zIndex: 1,
      }}>
        <div style={{display:'flex', alignItems:'flex-start', position:'relative', paddingTop:15, justifyContent:'space-between', paddingInline:10}}>
          <MdKeyboardArrowLeft
            size={30}
            style={{ cursor:'pointer' }}
            onClick={()=>navigate('/accueil')}
          />
          <span style={{ fontSize: 25, fontWeight: 700 }}>Réservation</span>
          <img
            src={getImg(user.user_profil)}
            alt='pdp'
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              objectFit: 'cover',
            }}
          />
        </div>
        <div className='reservationcontent' style={{
          height: '80%', marginTop:10,
        }}>
          <div className='reservationcontent-inner'>
            <div style={{
              marginInline: 10,
              marginTop: 8,
              padding: 5,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              gap: 10,
            }}>
              {data.map((item) => (<div style={{
                width: '31%',
                height: 80,
                borderRadius: 10,
                marginTop: 5,
                boxShadow: '2px 2px 10px #009da0, 2px 2px 2px #2377a9, 2px 2px 5px #00a1feaa',
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
                padding: 5,
                position: 'relative',
                cursor: 'pointer',
              }} key={item.id_Reservation}>
                <div>
                  <img
                    alt='pdp'
                    src={getImg(item.adherent.photo_Adh)}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div style={{
                  marginTop:5
                }}>
                  <span style={{ fontWeight: 700 }}>{item.adherent.nom_Adh + ' ' + item.adherent.prenom_Adh}</span> a réservé(e) la livre :
                  <span style={{ fontWeight: 700 }}>{' ' + item.livre.titre_livre}</span> le
                  <span style={{ fontWeight: 700 }}>{' ' + moment(item.date_Reservation).format('DD MMM YYYY')}</span>.
                </div>
                {!item.readAt ?
                  <div style={{
                    position: 'absolute',
                    right: 5,
                    bottom: 2,
                    backgroundColor: '#1e88e5',
                    paddingBlock: 6,
                    paddingInline: 10,
                    color: 'white',
                    borderRadius: 5,
                    fontWeight: 700,
                  }} >
                    Emprunter
                  </div> : user ?
                  <img
                    src={getImg(item.user.user_profil)} alt="pdp"
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 50,
                      position: 'absolute',
                      right: 5,
                      bottom: 5
                    }}
                  /> : null
                }
              </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </Background>
  )
}

export default ReservationAll;