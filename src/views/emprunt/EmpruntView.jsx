import React, { useEffect, useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import Modal from '../../components/modal/Modal'
import EmpruntBook from '../../components/EmpruntBook'
import { getAllEmprunt } from '../../services/empruntService';
import CardEmprunt from './CardEmprunt';

function EmpruntView() {
  const [isOpen, setIsOpen] = useState(false);
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
  
  return (
    <MainLayout 
      search title='Livre Emprunter'
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
        gap: 10,
      }}>
        { data.length > 0 ?
          data
            .filter((item) => {
              return input.search.toLowerCase() === '' ?
                item : (
                  item.livre.titre_livre.toLowerCase().includes(input.search.toLowerCase()) ||
                  item.inscriptionadherent.adherent.id_Adh.toLowerCase().includes(input.search.toLowerCase()) ||
                  item.inscriptionadherent.adherent.nom_Adh.toLowerCase().includes(input.search.toLowerCase()) ||
                  item.inscriptionadherent.adherent.prenom_Adh.toLowerCase().includes(input.search.toLowerCase())
                )
            })
            .map((item) => (
              <div key={item.id_Emprunt} style={{width:'calc(25% - 20px)', minHeight:'45%'}}>
                <CardEmprunt data={item} />
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
