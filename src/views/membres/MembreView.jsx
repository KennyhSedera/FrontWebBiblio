import * as React from 'react';
import { deleteAdh, getAllAdh } from '../../services/adherentService';
import './membre.css';
import CardMembre from './CardMembre';
import MainLayout from '../../components/layout/MainLayout';
import Modal from '../../components/modal/Modal';
import AddAdh from '../../components/AddAdh';
import DialogDelete from '../../components/DialogDelete';
import Alert from '../../components/alert/Alert'

export default function MembreView() {
    const [membres, setMembres] = React.useState([]);
    const [input, setInput] = React.useState({
        search: '',
    });

    // Créez une copie de la liste de membres initiale
    const [initialMembres, setInitialMembres] = React.useState([]);

    const getAll = () => {
        getAllAdh()
            .then((res) => {
                const adherents = res.data.adherents;
                setMembres(adherents);
                setInitialMembres(adherents);
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

    const nbPage = Math.ceil(membres.length / dataPerPage);

    const prevPage = () => {
        if (currentPage !== firstIndex && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== lastIndex && currentPage < nbPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInput((prevState) => ({ ...prevState, [name]: value }));
        console.log(input);
        const filteredMembres = initialMembres.filter((item) => {
            return value.toLowerCase() === ''
                ? item
                : item.id_Adh.toLowerCase().includes(value.toLowerCase()) ||
                  item.nom_Adh.toLowerCase().includes(value.toLowerCase()) ||
                  item.prenom_Adh.toLowerCase().includes(value.toLowerCase()) ||
                  item.adresse_Adh.toLowerCase().includes(value.toLowerCase()) ||
                  item.quartier_Adh.toLowerCase().includes(value.toLowerCase()) ||
                  item.tel_Adh.toLowerCase().includes(value.toLowerCase()) ||
                  item.naissance_Adh.toLowerCase().includes(value.toLowerCase());
        });
        setMembres(filteredMembres);
    };

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('Nouveau');
    const [value, setValue] = React.useState('');

    const handleClickListItem = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setValue('');
        setTitle('Nouveau');
        getAll()
    };

    const [idSelected, setIdSelected] = React.useState(null);
    const [delOpen, setDelOpen] = React.useState(false);
    const [delMsg, setDelMsg] = React.useState('null');

    const [alertType, setAlertType] = React.useState('success');
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState('null');
    
    const deleteItem = (data) => {
        setIdSelected(data.id_Adh);
        setDelOpen(true);
        setDelMsg(`Voulez-vous supprimer vraiment l'adhérent "${data.nom_Adh + ' ' + data.prenom_Adh}" ?`)
    }
    const editItem = (data) => {
        setTitle('Modification');
        setValue(data);
        setOpen(true);
    }
    const handleAccept = () => {
        deleteAdh(idSelected)
        .then((res) => {
            setAlertOpen(true);
            setAlertMsg(res.data.succee);
            setAlertType('success');
            setDelOpen(false)
            getAll()
            setTimeout(() => {
                setAlertOpen(false)
            }, 3000);
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <MainLayout
            handleOnChange={handleOnChange}
            title="Liste Adhérents" search btn
            handleClickListItem={handleClickListItem} btnAdd
            nextPage={nextPage}
            prevPage={prevPage}
            lastIndex={lastIndex}
            firstIndex={firstIndex}
            nbPage={nbPage}
            currentPage={currentPage}
        >
            <div
                style={{
                    width: '100%',
                    height: 'calc(100% - 20px)',
                    borderRadius: 10,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 10,
                    paddingBlock:2,
                }}
            >
                {membres.length > 0 ? membres
                    .slice(firstIndex, lastIndex)
                    .map((item) => (
                        <div key={item.id_Adh} style={{ width: 'calc(25% - 14px)', height: '40%'}}>
                            <CardMembre data={item} deleteItem={()=>deleteItem(item)} edit={()=>editItem(item)} />
                        </div>
                    )) : (
                        <div style={{
                            width:'100%',
                            textAlign: 'center',
                            fontSize: 20,
                            fontWeight: 800,
                            marginTop:50
                        }}>Aucun adhérent enregistrer .</div>
                    )}
            </div>

            <Modal open={open}>
                <AddAdh onClose={handleClose} title={title} value={value} />
            </Modal>
            <DialogDelete active={delOpen} message={delMsg} onClose={() => setDelOpen(false)} onAccept={handleAccept} />
            <Alert open={alertOpen} Message={alertMsg} type={alertType} />
        </MainLayout>
    );
}