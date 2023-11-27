import * as React from 'react';
import './dashboard.css'
// import { FaBook, FaBookOpen, FaBookReader, FaChartPie, FaRocket, FaStaylinked, FaUserAlt, FaUsers, } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { countLivre } from '../../services/livreService';
import { countEmprunt } from '../../services/empruntService';
import { countAdh } from '../../services/adherentService';
import CardDashboard from './CardDashboard';
import MainLayout from '../../components/layout/MainLayout';
import { countReservation } from '../../services/reservationService';

export default function DashboardView() {
    const [livre, setLivre] = React.useState(0);
    const [membre, setMembre] = React.useState(0);
    const [emprunt, setEmprunt] = React.useState(0);
    const [reservation, setReservation] = React.useState(0);

    React.useEffect(() => {
        countLivre()
            .then((res) => {
                setLivre(res.data.total)
            }).catch((err) => {
                console.log(err);
            });
        countAdh()
            .then((res) => {
                setMembre(res.data.total)
            }).catch((err) => {
                console.log(err);
            });
        countEmprunt()
            .then((res) => {
                setEmprunt(res.data.emprunt[0].total)
            }).catch((err) => {
                console.log(err);
            });
        countReservation()
            .then((res) => {
                setReservation(res.data.total[0].total)
            }).catch((err) => {
                console.log(err);
            });

    }, [])

    const cards = [
        { title: 'Adhérents', route: '/membre', total: membre, icon: 'graduate.gif' },
        { title: 'Livres', route: '/livre', total: livre, icon: 'dictionary.gif' },
        { title: 'Emprunts', route: '/emprunt', total: emprunt, icon: 'science-fiction.gif' },
        { title: 'Resérvations', route: '/reservation', total: reservation, icon: 'dictionary.gif' },
        { title: 'Statistiques', route: '/statistique', icon: 'pie-chart (1).gif' },
        { title: 'Utilisateurs', route: '/utilisateur', icon: 'profile.gif' },
        { title: 'Status', route: '/status', icon: 'profile.gif' },
        { title: 'Profile', route: '/profile', icon: 'profile.gif' },
    ]
    return (
        <MainLayout title='Tableau de bord' overflow>
                <div style={{
                    display: 'flex', alignItems: 'flex-start',
                    justifyContent: 'space-around', flexWrap: 'wrap',
                }}>
                    {cards.map((item, i) => (
                        <Link className='carddashboard' style={{
                            width: '24%', color: 'white',
                            height: 225, fontSize: 24,
                            borderRadius: 10,
                            marginBlock: 5, fontWeight: 600,
                            display: 'flex', flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            textDecoration: 'none', opacity: 0.9,
                        }} to={item.route} key={i}>
                            <CardDashboard
                                title={item.title}
                                nb={item.total}
                                icon={item.icon}
                            />
                        </Link>
                    ))}
                </div>
        </MainLayout >
    );
}