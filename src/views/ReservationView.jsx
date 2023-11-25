import React, { useState,  useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Background from '../components/layout/Background';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { getImg } from '../services/getImg';
import { readReservationUser } from '../services/reservationService';

function ReservationView() {
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = location.state || {};
    const [user, setUser] = useState([])
    useEffect(() => {
        getUserLocal()
    }, [])

    const getUserLocal = () => {
        const storedUser = localStorage.getItem('User');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser); // Ici, vous obtiendrez de nouveau l'objet user
        } else {
            console.log('Aucun utilisateur trouvé dans le localStorage.');
        }
    }

    const readReservation = ()=>{
        if (!data.readAt) {
            readReservationUser({id_Reservation:data.id_Reservation, userId:user.id_user})
        }
    }

    return (
        <Background>
            <div style={{
                width: 700,
                height: 400,
                background: '#ffffffa2',
                borderRadius:15,
                zIndex: 1,
            }}>
                    <div style={{textAlign:'center', position:'relative', paddingTop:15,}}>
                        <MdKeyboardArrowLeft 
                            size={30}
                            style={{ position: 'absolute', left: 10, cursor:'pointer' }}
                            onClick={()=>navigate('/accueil')}
                        />
                        <span style={{ fontSize: 25, fontWeight: 700 }}>Réservation</span>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                    }}>
                        <div style={{
                            width:'50%',
                            minHeight:200,
                    }}>
                        <img 
                            src={getImg(data.reservationLivre.adherent.photo_Adh)}
                            alt='adhpdp'
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                objectFit: 'cover',
                            }}
                        />
                        </div>
                        <div style={{
                            width:'50%', 
                            // background:'blue', 
                            minHeight:200,
                        }}></div>
                    </div>
            </div>
        </Background>
    )
}

export default ReservationView
