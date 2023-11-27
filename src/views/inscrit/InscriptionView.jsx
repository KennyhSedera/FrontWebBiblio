import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import InscritAdh from '../../components/InscritAdh';
import Modal from '../../components/modal/Modal';
import CardInscrit from './CardInscrit';
import { getAllAdhInscrit } from '../../services/membreService';

function InscriptionView() {
    const [membres, setMembres] = React.useState([]);
    const [input, setInput] = React.useState({
        search: '',
    });

    // Créez une copie de la liste de membres initiale
    const [initialMembres, setInitialMembres] = React.useState([]);

    const getAll = () => {
        getAllAdhInscrit()
            .then((res) => {
                const inscriptions = res.data.inscriptions;
                setMembres(inscriptions);
                setInitialMembres(inscriptions);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    React.useEffect(() => {
        getAll();
    }, []);

    const [currentPage, setCurrentPage] = React.useState(1);
    const dataPerPage = 8;
    const lastIndex = currentPage * dataPerPage;
    const firstIndex = lastIndex - dataPerPage;
    const data = membres.slice(firstIndex, lastIndex);
    const nbPage = Math.ceil(membres.length / dataPerPage);

    const prevPage = () => {
        if (currentPage !== firstIndex && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if (currentPage !== lastIndex && currentPage < nbPage) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInput(prevState => ({ ...prevState, [name]: value }));

        const filteredMembres = initialMembres.filter((item) => {
            return value.toLowerCase() === ''
                ? item :
                item.id_Adh.toLowerCase().includes(value.toLowerCase()) ||
                item.adherent.nom_Adh.toLowerCase().includes(value.toLowerCase()) ||
                item.adherent.prenom_Adh.toLowerCase().includes(value.toLowerCase()) ||
                item.adherent.adresse_Adh.toLowerCase().includes(value.toLowerCase())
        });

        setMembres(filteredMembres);
    };

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('Inscription');
    const [value, setValue] = React.useState('');

    const handleClickListItem = () => {
       setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
        setValue('')
        setTitle('Reinscription');
    };

    return (
        <MainLayout
            title='Adhérent Inscrits'
            handleOnChange={handleOnChange}
            search
            btn
            handleClickListItem={handleClickListItem}
            btnAdd
            nextPage={nextPage}
            prevPage={prevPage}
            lastIndex={lastIndex}
            firstIndex={firstIndex}
            nbPage={nbPage}
            currentPage={currentPage}
        >
            <div style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
            }}>
                {   data.length > 0 ?
                    data.map((item) => (
                        <div key={item.id_InscritAdh} style={{ width: 'calc(25% - 10px)', height: '45%' }}>
                            <CardInscrit data={item} />
                        </div>
                    )) : (
                    <div style={{
                        width:'100%',
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: 800,
                        marginTop:50
                    }}>Aucun adhérent inscrit .</div>
                )}
            </div>

            <Modal open={open} >
                <InscritAdh onClose={handleClose} title={title} value={value} />
            </Modal>
        </MainLayout>
    );
}

export default InscriptionView;
