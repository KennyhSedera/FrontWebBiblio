import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import Button from './Button'
import Testdropdown from './dropdownsearch/Testdropdown'
import { livreDispo } from '../services/livreService'
import InputDuree from './inputDuree/InputDuree'
import { createEmprunt } from '../services/empruntService'
import Alert from './alert/Alert'
import { getAllAdhNoEmp } from '../services/adherentService'

function EmpruntBook({ title, onClose = () => { }, value, }) {
  
  const [adherent, setAdh] = useState([]);
  const [livre, setLivre] = useState([]);

  const [selectedAdhId, setSelectedAdhId] = useState(null);
  const [selectedLivreId, setSelectedLivreId] = useState(null);
  const [duree, setDuree] = useState(null)
  const [idUser, setIdUser] = useState(null)

  const handleResetAdhId = () => {
    setSelectedAdhId(null);
  };
  const handleResetLivreId = () => {
    setSelectedLivreId(null);
  };

  useEffect(() => {
    getAdhAll();
    getLivreAll();
    getUserLocal();
  }, []);
    
  const getUserLocal = () => {
    const storedUser = localStorage.getItem('User');
      if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIdUser(parsedUser.id_user); // Ici, vous obtiendrez de nouveau l'objet user
    } else {
      console.log('Aucun utilisateur trouvé dans le localStorage.');
    }
  }

  const getAdhAll = async () => {
    try {
      const result = await getAllAdhNoEmp();
      const adherent = result.data.adherents.map((Adh) => ({id:Adh.id_Adh, title:Adh.nom_Adh + ' ' + Adh.prenom_Adh}));
      setAdh(adherent);
    } catch (err) {
      console.log(err);
    }
  };
  const getLivreAll = async () => {
    try {
      const result = await livreDispo();
      const livre = result.data.livres.map((livre) => ({id:livre.id_livre, title:livre.titre_livre}));
      setLivre(livre);
    } catch (err) {
      console.log(err);
    }
  };
  const handleAdhSelect = (id) => {
    setSelectedAdhId(id);
  };

  const handleLivreSelect = (id) => {
    setSelectedLivreId(id);
  };
  
  const handleDureeChange = (duree) => {
    setDuree(duree);
  };

  const Values = {
    id_Livre: selectedLivreId,
    id_Adh: selectedAdhId,
    duree_Emprunt: duree,
    userId: idUser,
  }

  const validate = () => {
    setLoading(true)
    createEmprunt(Values)
    .then((res) => {
      if (res.data.error) {
        setOpenAlert(true)
        setAlertMsg(res.data.error)
        setAlertType('error')
        setTimeout(() => {
          setOpenAlert(false)
          setLoading(false)
        }, 3000);
      } else {
        setOpenAlert(true)
        setAlertMsg(res.data.succee)
        setAlertType('success')
        setTimeout(() => {
          setOpenAlert(false)
          setLoading(false)
          onClose()
        }, 3000);
      }
    }).catch((err) => {
      console.log(err)
    });

  };

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('success')
  const [loading, setLoading] = React.useState(false);

  return (
  <>
    <div className="modalcard" style={{
      width: 450, minHeight: 200, color: 'black',
      padding: 12, borderRadius: 10, background: '#fffffff0',
    }}>
      <div className="modalheadear" style={{
        textAlign: 'center', fontWeight: 'bold', fontSize: 30, display: 'flex',
        alignItems: 'center', justifyContent: 'center', paddingInlineStart: 15,
      }}>
        <span>{title} Livre</span>
        <span 
          className="btnclosemodal"
          style={{ background: '#fffffffe' }}
          onClick={onClose}><MdClose size={20}
        /></span>
      </div>
      <div style={{
        minHeight: 200, display: 'flex',
        justifyContent: 'space-around', flexWrap: 'wrap',
        paddingBlock: 10, paddingInline: 10,
      }}>
        <div style={{ width: '85%', }}>
          <Testdropdown
            placeholder='Nom adhérent'
            data={adherent}
            onSelectId={handleAdhSelect}
            onResetId={handleResetAdhId}
          />
        </div>
        <div style={{ width: '85%', }}>
          <Testdropdown
            placeholder='Title livre'
            data={livre}
            onSelectId={handleLivreSelect}
            onResetId={handleResetLivreId}
          />
        </div>
        <div style={{ width: '85%', }}>
          <InputDuree onDureeChange={handleDureeChange} />
        </div>
      </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ width: '80%' }}>
            <Button
              onClick={validate}
              large
              color='#00b2fee1'
              title={'Enregistrer'}
              textsize={15}
              loanding={loading}
            />
          </div>
        </div>
      </div>
      
      <Alert open={openAlert} Message={alertMsg} type={alertType} />
    </>
  )
}

export default EmpruntBook
