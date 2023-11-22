import React, { useEffect, useMemo, useState } from 'react'
import Button from './Button'
import { MdClose } from 'react-icons/md'
import '../index.css'
import Input from './Input'
import DatePickerInput from './datepicker/DatePikers'
import Autocomplete from './drowpDown/Autocomplete'
import InputImg from './inputImg/InputImg'
import { createAdh, getAllAdh, updatedAdh } from '../services/adherentService'
import Alert from './alert/Alert'
import Testdropdown from './dropdownsearch/Testdropdown'
import { getAllType } from '../services/typeAdhService'
import { inscription } from '../services/membreService'

function AddAdh({ title, onClose = () => { }, value, }) {
  const [typeAdh, setTypeAdh] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  React.useEffect(() => {
    getTypeAdhAll();
    getAdhAll();
  }, []);
  const getAdhAll = async () => {
    try {
      let adherent = [];
      const result = await getAllAdh();
      adherent = result.data.adherents;
      if (adherent.length<= 0){
        setInput(prevState => ({ ...prevState, [name.numadh]: 'AFF00001' }))
      }else {
          var max  = adherent[adherent.length - 1].id_Adh
          var reference = ''
          var number = ''
          for(var i=0;i<max.length;i++){
              if(isNaN(max[i])){
                  reference+=max[i]
              }else{
                  number+=max[i]
              }
          }
          const num = parseInt(number)+1
        const id = (num < 10000) ? (num < 1000) ? (num < 100) ? (num < 10) ? reference + '0000' + num: reference + '000' + num: reference + '00' + num : reference + '0' + num : reference + num
        setInput(prevState => ({ ...prevState, [name.numadh]: id }))
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getTypeAdhAll = async () => {
    try {
      const result = await getAllType();
      const types = result.data.types.map((type) => ({id:type.id_TypeAdh, title:type.nom_TypeAdh}));
      setTypeAdh(types);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSearchValueChange = (newValue) => {
    setSearchValue(newValue);
    setTypeError('')
  };
  const handelResetValueType = () => {
    setSearchValue(null);
  };
  const [numadh, setNumadh] = useState('');
  const [nomadh, setNomadh] = useState('');
  const [prenomadh, setPrenomadh] = useState('');
  const [teladh, setTeladh] = useState('');
  const [addressadh, setAddressadh] = useState('');
  const [quartieradh, setQuartieradh] = useState('');
  const [nationaliteadh, setNationaliteadh] = useState('');
  const [lieunaissadh, setLieunaissadh] = useState('');
  
  const [numadherr, setNumadherr] = useState('');
  const [nomadherr, setNomadherr] = useState('');
  const [prenomadherr, setPrenomadherr] = useState('');
  const [teladherr, setTeladherr] = useState('');
  const [addressadherr, setAddressadherr] = useState('');
  const [quartieradherr, setQuartieradherr] = useState('');
  const [nationaliteadherr, setNationaliteadherr] = useState('');
  const [lieunaissadherr, setLieunaissadherr] = useState('');

  const clearForm = [
    setNationaliteadh(''),
    setNumadh(''),
    setNomadh(''),
    setAddressadh(''),
    setDateNaiss(new Date),
    setPrenomadh(''),
    setTeladh(''),
    setQuartieradh(''),
    setNationaliteadh(''),
    setLieunaissadh(''),
    setFile(''),
    setGenre(''),
    setSearchValue(null)
  ]

  useEffect(() => {
    if (value) {
      setNumadh(value.id_Adh);
      setNomadh(value.nom_Adh);
      setPrenomadh(value.prenom_Adh);
      setTeladh(value.tel_Adh);
      setAddressadh(value.adresse_Adh);
      setQuartieradh(value.quartier_Adh);
      setNationaliteadh(value.nationalite_Adh);
      setLieunaissadh(value.lieunaiss_Adh)
      setGenre(value.genre_Adh || 'Homme');
      setDateNaiss(value.naissance_Adh);
      setBtnTitle('Modifier');
    }
  }, [value]);
  
  // const [input, setInput] = React.useState(inputs);
  const [btnTitle, setBtnTitle] = React.useState('Enregistrer');
  const [file, setFile] = React.useState(null);
  const [datenaiss, setDateNaiss] = useState(new Date());
  const [genre, setGenre] = useState('Homme');
  const [fileError, setFileError] = React.useState('');
  const [typeError, setTypeError] = React.useState('');
  
  const validate = () => {
    if (numadh ==='') {
      setNumadherr( 'Cet champ ne doit pas être vide!' )
    } else if (nomadh ==='') {
      setNomadherr( 'Cet champ ne doit pas être vide!' )
    }else if (prenomadh ==='') {
      setPrenomadherr( 'Cet champ ne doit pas être vide!' )
    }else if (teladh ==='') {
      setTeladherr( 'Cet champ ne doit pas être vide!' )
    }else if (addressadh ==='') {
      setAddressadherr( 'Cet champ ne doit pas être vide!' )
    }else if (quartieradh ==='') {
      setQuartieradherr( 'Cet champ ne doit pas être vide!' )
    }else if (nationaliteadh ==='') {
      setNationaliteadherr( 'Cet champ ne doit pas être vide!' )
    }else if (file === null && btnTitle === 'Enregistrer') {
      setFileError('Choisissez une image!')
    }else if (lieunaissadh ==='') {
      setLieunaissadherr( 'Cet champ ne doit pas être vide!' )
    }else if (searchValue === null && btnTitle === 'Enregistrer') {
      setTypeError('Choisissez le type d\'adherent!')
    }else {
      const formData = new FormData();
      formData.append("photo_adh", file);
      formData.append("id_Adh", numadh);
      formData.append("nom_Adh", nomadh);
      formData.append("prenom_Adh", prenomadh);
      formData.append("adresse_Adh", addressadh);
      formData.append("quartier_Adh", quartieradh);
      formData.append("tel_Adh", teladh);
      formData.append("nationalite_Adh", nationaliteadh);
      formData.append("lieunaiss_Adh", lieunaissadh);
      formData.append("naissance_Adh", datenaiss);
      formData.append("genre_Adh", genre);
      if (!loading) {
        setLoading(true);
      }
      if (btnTitle === 'Enregistrer') {
        createAdh(formData)
        .then((res) => {
          setAlertOpen(true);
          setAlertMsg(res.data.succee);
          setAlertType('success')
          setLoading(false);
          setTimeout(() => {
            inscription({ id_Adh: numadh, id_TypeAdh: searchValue })
            .then(()=>clearForm())
          }, 1000);
          setTimeout(() => {
            onClose();
            setAlertOpen(false);
          }, 3000);
        }).catch((err) => {
          console.log(err);
        });
      } else {
        updatedAdh(formData, value.id_Adh)
        .then((res) => {
          setAlertOpen(true);
          setAlertMsg(res.data.succee);
          setAlertType('success')
          clearForm()
          setLoading(false);
          setTimeout(() => {
            onClose();
            setAlertOpen(false);
          }, 3000);
        }).catch((err) => {
          console.log(err);
        });
      }
      
    }
  }
  
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('success')
  const [loading, setLoading] = React.useState(false);
  
  return (
    <div className="modalcard" style={{
        width: 700, minHeight: 200, color: 'black',
        padding: 12, borderRadius: 10, background: '#fffffff0',
    }}>
        <div className="modalheadear" style={{
            textAlign: 'center', fontWeight: 'bold', fontSize: 30, display: 'flex',
            alignItems: 'center', justifyContent: 'center', paddingInlineStart: 15,
        }}>
            <span>{title} Adhérent</span>
            <span 
                className="btnclosemodal" 
                style={{ background: '#fff' }} 
                onClick={onClose}><MdClose size={20} 
            /></span>
        </div>
        <div style={{
            minHeight: 200, display: 'flex',
            justifyContent: 'space-around', flexWrap: 'wrap',
            paddingBlock: 10, paddingInline: 10,
        }}>
            <div style={{ width: '32%', }}>
              <Input
                placeholder='Numéro ...'
                onChange={e=>(setNumadh(e.target.value), setNumadherr(''))}
                name="numadh"
                value={numadh}
                error={numadherr}
                readOnly
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e=>(setNomadh(e.target.value), setNomadherr(''))}
                name="nomadh"
                placeholder='Entrer nom ...'
                value={nomadh}
                error={nomadherr}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e=>(setPrenomadh(e.target.value), setPrenomadherr(''))}
                name="prenomadh"
                placeholder='Entrer prénom ...'
                value={prenomadh}
                error={prenomadherr}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Autocomplete 
                items={['Homme', 'Femme']}
                placeholder='Genre ...'
                selected={genre}
                setSelected={setGenre}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e=>(setTeladh(e.target.value), setTeladherr(''))}
                name="teladh"
                type='number'
                placeholder='Entrer num telephone ...'
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                value={teladh}
                error={teladherr}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e=>(setAddressadh(e.target.value), setAddressadherr(''))}
                name="addressadh"
                placeholder='Entrer adresse ...'
                value={addressadh}
                error={addressadherr}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e=>(setQuartieradh(e.target.value), setQuartieradherr(''))}
                name="quartieradh"
                placeholder='Entrer quartier ...'
                value={quartieradh}
                error={quartieradherr}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e=>(setNationaliteadh(e.target.value), setNationaliteadherr(''))}
                name="nationaliteadh"
                placeholder='Entrer nationalité ...'
                value={nationaliteadh}
                error={nationaliteadherr}
              />
            </div>
            <div style={{ width: '32%', marginBottom: 6, }}>
                <InputImg
                  setFile={setFile}
                  error={fileError}
                  handelChange={handleUpload}
                />
            </div>
            <div style={{ width: '32%', }}>
              <DatePickerInput
                onDateChange={setDateNaiss}
                placeholder="Date de naissance"
                date={datenaiss}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e=>(setLieunaissadh(e.target.value), setLieunaissadherr(''))}
                name="lieunaissadh"
                placeholder='Entrer lieu de naissance ...'
                value={lieunaissadh}
                error={lieunaissadherr}
              />
            </div>
            <div style={{ width: '32%' }}>
              <Testdropdown
            placeholder='Types adhérent ...'
            data={typeAdh}
            onSelectId={handleSearchValueChange}
            onResetId={handelResetValueType}
            error={typeError}
              />
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: '50%', position:'relative' }}>
              <Button
                onClick={validate}
                large
                color='#00b2fee1'
                title={btnTitle}
                textsize={15}
                loanding={loading}
              />
            </div>
        </div>
        <Alert open={alertOpen} Message={alertMsg} type={alertType} />
    </div>
  )
}

export default AddAdh;