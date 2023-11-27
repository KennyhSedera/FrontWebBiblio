import React, { useState,  useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Background from '../components/layout/Background';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { getImg } from '../services/getImg';
import { readReservationUser } from '../services/reservationService';
import '../components/book/book.css';

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
            setUser(parsedUser);
            readReservation()
        } else {
            navigate('/')
        }
    }

    const readReservation = ()=>{
        if (!data.readAt) {
            readReservationUser({id_Reservation:data.id_Reservation, userId:user.id_user})
        }
    }
    const BookView = ({ item }) => {
        const [coverZIndex, setCoverZIndex] = React.useState(1);
        const setCoverZIndexWithDelay = () => {
            setTimeout(() => setCoverZIndex(-1), 900);
        };
        return (
            <div 
                className={`book ${coverZIndex === -1 ? 'hide-cover' : ''}`}
                key={item.id_livre}
                onMouseEnter={setCoverZIndexWithDelay}
                onMouseLeave={()=>setTimeout(() => setCoverZIndex(1), 901)}
            >
                <div className="cover">
                    <img
                    src={getImg(item.photo_livre)}
                    alt="tsy hita"
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '0px 10px 10px 0px',
                        objectFit: 'cover',
                    }}
                    />
                </div>
                <div className="last-page">
                    <div style={{fontSize:14}}>Title:</div>
                    <span>{item.titre_livre}</span>
                    <div style={{ fontWeight: 500, fontSize: 16, marginTop: 5 }}>
                        Auteur: <strong style={{ fontSize: 16 }}>{item.auteur_livre}</strong>
                    </div>
                    <div className="nbpage" style={{ paddingInline: 5 }}>
                    <strong>{item.nb_page_livre} </strong>pages
                    </div>
                </div>
                <div className="back-cover">
                    <img
                    src={getImg(item.photo_livre)}
                    alt="tsy hita"
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '0px 10px 10px 0px',
                    }}
                    />
                </div>
            </div>
        );
    };
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
                            <div style={{width:'100%', backgroundColor:'red'}}>
                                <BookView item={data.reservationLivre.livre} />
                            </div>
                            
                        </div>
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
                    </div>
            </div>
        </Background>
    )
}

export default ReservationView
