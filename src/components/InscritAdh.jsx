import React, { useEffect, useState } from 'react';
import Button from './Button';
import { MdClose } from 'react-icons/md';
import '../index.css';
import { getAllType } from '../services/typeAdhService';
import { getAllAdhNoInsc } from '../services/adherentService';
import Testdropdown from './dropdownsearch/Testdropdown';
import { inscription } from '../services/membreService';
import Alert from './alert/Alert';

function InscritAdh({ title, onClose = () => { } }) {
  const [typeAdh, setTypeAdh] = useState([]);
  const [adherent, setAdh] = useState([]);
  const btnTitle = useState('Enregistrer');
  const [idUser, setIdUser] = useState(null)

  const [searchValue, setSearchValue] = useState(null);
  const [searchValueAdh, setSearchValueAdh] = useState(null);
  const [adhError, setAdhError] = useState('null');
  const [typeError, setTypeError] = useState('null');

  useEffect(() => {
    getTypeAdhAll();
    getAdhAll();
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

  const getTypeAdhAll = async () => {
    try {
      const result = await getAllType();
      const types = result.data.types.map((type) => ({id:type.id_TypeAdh, title:type.nom_TypeAdh}));
      setTypeAdh(types);
    } catch (err) {
      console.log(err);
    }
  };

  const getAdhAll = async () => {
    try {
      const result = await getAllAdhNoInsc();
      const adherent = result.data.adherents.map((Adh) => ({id:Adh.id_Adh, title:Adh.nom_Adh + ' ' + Adh.prenom_Adh}));
      setAdh(adherent);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchValueChange = (newValue) => {
    setSearchValue(newValue);
    setTypeError('')
  };
  const handleSearchValueChangeAdh = (newValue) => {
    setSearchValueAdh(newValue);
    setAdhError('')
  };

  const handelResetValueType = () => {
    setSearchValue(null);
  };
  const handelResetValueAdh = () => {
    setSearchValueAdh(null);
  };
  
  const datas = {
    id_TypeAdh: searchValue,
    id_Adh: searchValueAdh,
    userId: idUser,
  }
 
  const validate = () => {
    setLoading(true)
    inscription(datas)
    .then((res) => {
      setAlertOpen(true);
      setAlertMsg(res.data.succee);
      setAlertType('success')
      setTimeout(() => {
        setAlertOpen(false)
        setLoading(false)
      }, 3000);
    }).catch((err) => {
      console.log(err);
    });
  };
  
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('success')
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="modalcard" style={{
      width: 400,
      minHeight: 80,
      color: 'black',
      padding: 12,
      borderRadius: 10,
      background: '#fffffff0',
    }}>
      <div className="modalheadear" style={{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingInlineStart: 15,
      }}>
        <span>{title}</span>
        <span
          className="btnclosemodal"
          style={{ background: '#fffffffe' }}
          onClick={onClose}><MdClose size={20}
        /></span>
      </div>
      <div style={{
        minHeight: 80,
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingBlock: 10,
        paddingInline: 10,
      }}>
        <div style={{ width: '88%' }}>
          <Testdropdown
            placeholder='Nom adhérent ...'
            data={adherent}
            onSelectId={handleSearchValueChangeAdh}
            onResetId={handelResetValueAdh}
            error={adhError}
          />
        </div>
        <div style={{ width: '88%' }}>
          <Testdropdown
            placeholder='Types adhérent ...'
            data={typeAdh}
            onSelectId={handleSearchValueChange}
            onResetId={handelResetValueType}
            error={typeError}
          />
        </div>
        <Button
          onClick={validate}
          small
          width={'88%'}
          color='#00b2fee1'
          title={btnTitle}
          textsize={15}
          loanding={loading}
        />
      </div>
        <Alert open={alertOpen} Message={alertMsg} type={alertType} />
    </div>
  );
}

export default InscritAdh;
