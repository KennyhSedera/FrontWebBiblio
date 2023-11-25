import * as React from 'react';
import '../../index.css'
import AlertMessage from '../../components/AlertMessage';
import { deleteLivre, getAllLivre } from '../../services/livreService';
import DialogDelete from '../../components/DialogDelete';
import MainLayout from '../../components/layout/MainLayout';
import Modal from '../../components/modal/Modal';
import AddLivre from '../../components/AddLivre';
import BookView from '../../components/book/BookView';


export default function LivreRow() {
     const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');
    const [title, setTitle] = React.useState('Nouveau');
    const [livres, setLivres] = React.useState([]);
    const [delDialog, setDelDialog] = React.useState(false);
    const [delMsg, setDelMsg] = React.useState('Voulez-vous supprimer cet enregistrement ?');
    const [initialLivres, setInitialLivres] = React.useState([]); // Copie de la liste de livres initiale
    const [input, setInput] = React.useState({
        search: '',
    });

    React.useEffect(() => {
        getAll();
    }, []);

    const getAll = () => {
        getAllLivre()
            .then((result) => {
                const livres = result.data.livres;
                setLivres(livres);
                setInitialLivres(livres); // Mettez à jour la copie de la liste de livres initiale
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInput(prevState => ({ ...prevState, [name]: value }));
        console.log(input)
        const filteredLivres = initialLivres.filter((item) => {
            return value.toLowerCase() === ''
                ? item
                : item.titre_livre.toLowerCase().includes(value.toLowerCase()) ||
                  item.auteur_livre.toLowerCase().includes(value.toLowerCase()) ||
                  item.notation_livre.toLowerCase().includes(value.toLowerCase()) ||
                  item.format_livre.toLowerCase().includes(value.toLowerCase()) ||
                  item.emplacement_livre.toLowerCase().includes(value.toLowerCase()) ||
                  item.collection_livre.toLowerCase().includes(value.toLowerCase());
        });

        setLivres(filteredLivres);
    };

    const handleClickListItem = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
        setValue('')
        setTitle('Nouveau');
        getAll();
    };

    const deleteItem = (value) => {
        setDelDialog(true)
        setDelMsg('Voulez-vous supprimer le livre intutilé ' + value.titre_livre)
        setIdSelected(value.id_livre)
    }
    const editItem = (data) => {
        setTitle('Modification');
        setValue(data);
        setOpen(true);
    }
    const [idSelected, setIdSelected] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState(1);
    const dataPerPage = 8;
    const lastIndex = currentPage * dataPerPage;
    const firstIndex = lastIndex - dataPerPage;
    const data = livres.slice(firstIndex, lastIndex);
    const nbPage = Math.ceil(livres.length / dataPerPage);

    const dark = false;

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
    // const setDate = ({ date }) => {
    //     return moment(date).format('DD-MM-YYYY ')
    // }
    const delLivre = () => {
        deleteLivre(idSelected)
            .then((result) => {
                setOpenAlert(true)
                setAlertMsg(result.data.succee)
                setDelDialog(false)
                setTimeout(() => {
                    setOpenAlert(false)
                    getAll()
                }, 3000);
            }).catch((err) => {
                setOpenAlert(true)
                setAlertMsg(err.data.error)
                setAlertType('error')
                setTimeout(() => {
                    setOpenAlert(false)
                }, 3000);
            });
    }

    const [alertMsg, setAlertMsg] = React.useState('');
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertType, setAlertType] = React.useState('success');
    const delClose = () => {
        setDelDialog(false)
    }
    
    return (
        <MainLayout
            handleOnChange={handleOnChange} search
            title='Liste Livres'
            btn handleClickListItem={handleClickListItem}
            btnAdd nextPage={nextPage} prevPage={prevPage}
            lastIndex={lastIndex} firstIndex={firstIndex}
            nbPage={nbPage}
        >
            {openAlert ? <AlertMessage open={true} type={alertType} message={alertMsg} /> : ''}
            <DialogDelete active={delDialog} message={delMsg} onClose={delClose} onAccept={delLivre} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ height: 400, width: '100%' }}>
                    <div className='contentBook' style={{
                        display: 'flex', flexDirection: 'column', fontSize: 14, color: dark ? 'white' : 'black',
                        gap: 5, borderRadius: 20, paddingInline: 10,
                    }}>
                        <div style={{
                            perspective: '1000px', display: 'flex', alignItems: 'center',
                            flexWrap: 'wrap', justifyContent: 'flex-start', gap: 10,
                            paddingInline: '3%',
                        }}>
                            {data.length > 0 ? data
                                .map((item) => (
                                    <BookView item={item} editItem={editItem} deleteItem={deleteItem} />
                                )) : (
                                <div style={{
                                    width:'100%',
                                    textAlign: 'center',
                                    fontSize: 20,
                                    fontWeight: 800,
                                    marginTop:50
                                }}>Aucun livre enregistrer .</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={open} >
                <AddLivre title={title} onClose={handleClose} value={value} />
            </Modal>
        </MainLayout>
    );
}