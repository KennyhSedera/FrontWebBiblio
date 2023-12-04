import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import Modal from '../../components/modal/Modal'
import EmpruntBook from '../../components/EmpruntBook'
import { getAllEmprunt } from '../../services/empruntService';
import CardEmprunt from './CardEmprunt';
import Button from '../../components/Button';

function EmpruntView() {
  const [isOpen, setIsOpen] = useState(false);
  const [openRetour, setOpenRetour] = useState(false);
  const [emprunt, setEmprunt] = useState([])
  const [currentPage, setCurrentPage] = React.useState(1);
  const dataPerPage = 8;
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const data = emprunt.slice(firstIndex, lastIndex);
  const nbPage = Math.ceil(emprunt.length / dataPerPage);
  const [input, setInput] = React.useState({
    search: '',
  })
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
  const getAll = () => {
    getAllEmprunt()
    .then((res) => {
      setEmprunt(res.data.emprunts)
    }).catch((err) => {
      console.log(err);
    });
  }
  useEffect(() => {
    getAll()
  }, [])
  const handleClickListItem = () => {
    setIsOpen(true)
  }
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInput(prevState => ({ ...prevState, [name]: value }));
  }
  const handleRetour = (item) => {
    setOpenRetour(true)
    const str = item.adherent.prenom_Adh;
    const pseudo = str.split(' ');
    return (
      <Modal open={openRetour}>
        <div style={{
            background: '#ffffffe8', width: 380, minHeight: 100, padding: 10,
            borderRadius: 15, color: 'black', fontSize: 18, fontWeight: 600,
        }}>
            <div style={{ marginLeft: 10, fontSize:22 }}>
                <span>Retour Emprunt ?</span>
            </div>
            <div style={{
                justifyContent: 'center', display: 'flex',
                height: 50, alignItems: 'center', fontWeight: 500,
                marginBottom: 20, fontSize: 15,
            }}>
                <span>Voulez-vous enregistrer la retour du {item.livre.titre_livre} emprunté par {pseudo} le {moment(item.date_Emprunt).format('DD MMM YYYY ')} ?</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ width: '42%', }}>
                    <Button small onClick={() => setOpenRetour(false)} title='annuler' color='white' textcolor='black' textsize={15} />
                </div>
                <div to='/' style={{ width: '42%', textDecoration: 'none' }}>
                    <Button
                        small
                        title='Enregistrer'
                        color='#00b2fee1'
                        textcolor='white'
                        textsize={15}
                        // onClick={handleLogout}
                    />
                </div>
            </div>
        </div>
      </Modal>
    )
  }
  return (
    <MainLayout 
      search title='Liste Emprunts'
      btn handleOnChange={handleOnChange}
      handleClickListItem={handleClickListItem}
      nextPage={nextPage} prevPage={prevPage}
      lastIndex={lastIndex} firstIndex={firstIndex} btnAdd
      currentPage={currentPage} nbPage={nbPage}
    >
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: 10,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 15,
        padding:10,
      }}>
        { data.length > 0 ?
          data
            .filter((item) => {
              return input.search.toLowerCase() === '' ?
                item : (
                  item.livre.titre_livre.toLowerCase().includes(input.search.toLowerCase()) ||
                  item.adherent.id_Adh.toLowerCase().includes(input.search.toLowerCase()) ||
                  item.adherent.nom_Adh.toLowerCase().includes(input.search.toLowerCase()) ||
                  item.adherent.prenom_Adh.toLowerCase().includes(input.search.toLowerCase())
                )
            })
            .map((item) => (
              <div key={item.id_Emprunt} style={{width:'calc(25% - 20px)', height:'calc(48% - 20px)'}}>
                <CardEmprunt data={item} onClick={()=>handleRetour(item)} />
              </div>
            )) : (
            <div style={{
                width:'100%',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 800,
                marginTop:50
            }}>Aucun livre emprunter .</div>
        )}
      </div>
      <Modal open={isOpen} >
        <EmpruntBook onClose={()=>{setIsOpen(false); getAll()}} title='Emprunter' />
      </Modal>
      
    </MainLayout>
  )
}

export default EmpruntView
