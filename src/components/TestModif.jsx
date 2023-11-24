import React, { useEffect, useState } from 'react'
import '../index.css'
import Input from './Input'
import { MdClose } from 'react-icons/md'
import Autocomplete from './drowpDown/Autocomplete'
import { createAdh, getAllAdh, getAllAdhNoInsc, updatedAdh } from '../services/adherentService'
import { getAllType } from '../services/typeAdhService'
import Testdropdown from './dropdownsearch/Testdropdown'
import InputImg from './inputImg/InputImg'
import DatePickerInput from './datepicker/DatePikers'
import Button from './Button'
import Alert from './alert/Alert'

function TestModif({value, onClose=()=>{}, title}) {
  const [numadh, setNumAdh] = useState('')
  const [nomadh, setNomAdh] = useState('')
  const [prenomadh, setPrenomAdh] = useState('')
  const [teladh, setTelAdh] = useState('')
  const [adressadh, setAdressAdh] = useState('')
  const [quartieradh, setQuartierAdh] = useState('')
  const [nationaliteadh, setNationaliteAdh] = useState('')
  const [lieunaissadh, setLieuNaiss] = useState('')
  const [genre, setGenre] = useState('Homme')
  const [file, setFile] = React.useState(null);
  const [typeAdh, setTypeAdh] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const [datenaiss, setDateNaiss] = useState(new Date());
  const [btnTitle, setBtnTitle] = React.useState('Enregistrer');
  const [loading, setLoading] = React.useState(false);
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('success')
  const [idUser, setIdUser] = useState('success')
  
  
  const [fileError, setFileError] = React.useState('');
  const [typeError, setTypeError] = useState('');
  const [numadhErr, setNumAdhErr] = useState('')
  const [nomadhErr, setNomAdhErr] = useState('')
  const [prenomadhErr, setPrenomAdhErr] = useState('')
  const [teladhErr, setTelAdhErr] = useState('')
  const [adressadhErr, setAdressAdhErr] = useState('')
  const [quartieradhErr, setQuartierAdhErr] = useState('')
  const [nationaliteadhErr, setNationaliteAdhErr] = useState('')
  const [lieunaissadhErr, setLieuNaissErr] = useState('')
    useEffect(() => {
        if (value) {
            setNomAdh(value.nom_Adh)
            setNumAdh(value.id_Adh)
            setPrenomAdh(value.prenom_Adh)
            setTelAdh(value.tel_Adh)
            setAdressAdh(value.adresse_Adh)
            setQuartierAdh(value.quartier_Adh)
            setNationaliteAdh(value.nationalite_Adh)
            setLieuNaiss(value.lieunaiss_Adh)
            setGenre(value.genre_Adh || 'Homme')
            setDateNaiss(value.naissance_Adh)
            setBtnTitle('Modifier')
        }
    }, [value])
  
  
  useEffect(() => {
    getAdhAll();
    getTypeAdhAll();
    getUserLocal();
  }, []);
  
  const getAdhAll = async () => {
    try {
      const result = await getAllAdh();
      const adherent = result.data.adherents
      console.log(adherent);
      console.log(adherent.length);
      if (adherent.length<= 0){
          setNumAdh('AFF00001')
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
        const num = parseInt(number) + 1
        console.log(num);
          // setNumAdh((num<10000)?(num<1000)?(num<100)?(num<10) ? reference+'0000'+num :reference+'000'+num : reference+'00'+num : reference+'0'+num : reference+num)
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
    
  const getUserLocal = () => {
    const storedUser = localStorage.getItem('User');
      if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIdUser(parsedUser.id_user); // Ici, vous obtiendrez de nouveau l'objet user
    } else {
      console.log('Aucun utilisateur trouvé dans le localStorage.');
    }
  }
  
  const handleSearchValueChange = (newValue) => {
    setSearchValue(newValue);
    setTypeError('')
  };
  
  const handelResetValueType = () => {
    setSearchValue(null);
  };
 const validate = () => {
    if (numadh ==='') {
      setNumAdhErr('Cette champ ne doit pas être vide!')
    } else if (nomadh ==='') {
      setNomAdhErr( 'Cette champ ne doit pas être vide!' )
    }else if (prenomadh ==='') {
      setPrenomAdhErr( 'Cette champ ne doit pas être vide!' )
    }else if (teladh ==='') {
      setTelAdhErr( 'Cette champ ne doit pas être vide!' )
    }else if (adressadh ==='') {
      setAdressAdhErr( 'Cette champ ne doit pas être vide!' )
    }else if (quartieradh ==='') {
      setQuartierAdhErr( 'Cette champ ne doit pas être vide!' )
    }else if (nationaliteadh ==='') {
      setNationaliteAdhErr( 'Cette champ ne doit pas être vide!' )
    }else if (lieunaissadh ==='') {
      setLieuNaissErr( 'Cette champ ne doit pas être vide!' )
    } else if (file === null && btnTitle === 'Enregistrer') {
      setFileError('Choisissez une image!')
    } else if (searchValue === null && btnTitle === 'Enregistrer') {
      setTypeError('Choisissez le type d\'adhérent!')
    } else {
      const formData = new FormData();
      formData.append("photo_adh", file);
      formData.append("id_Adh", numadh);
      formData.append("nom_Adh", nomadh);
      formData.append("prenom_Adh", prenomadh);
      formData.append("adresse_Adh", adressadh);
      formData.append("quartier_Adh", quartieradh);
      formData.append("tel_Adh", teladh);
      formData.append("nationalite_Adh", nationaliteadh);
      formData.append("lieunaiss_Adh", lieunaissadh);
      formData.append("naissance_Adh", datenaiss);
      formData.append("genre_Adh", genre);
      formData.append("id_TypeAdh", searchValue);
      formData.append("id_User", idUser);
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
            onClose();
            setAlertOpen(false);
          }, 3000);
        }).catch((err) => {
          console.log(err);
        });
      } else {
      const formData = {
        nom_Adh: nomadh,
        prenom_Adh: prenomadh,
        adresse_Adh: adressadh,
        quartier_Adh: quartieradh,
        tel_Adh: teladh,
        nationalite_Adh: nationaliteadh,
        lieunaiss_Adh: lieunaissadh,
        genre_Adh: genre,
      }
        updatedAdh(formData, value.id_Adh)
        .then((res) => {
          setAlertOpen(true);
          setAlertMsg(res.data.succee);
          setAlertType('success')
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
  return (
      <div className="modalcard"
          style={{
             width: 700, minHeight: 200, color: 'black',
        padding: 12, borderRadius: 10, background: '#fffffff0',
        }}
      >
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
                onChange={e=>setNumAdh(e.target.value)}
                placeholder='Numéro ...'
                value={numadh}
                readOnly
                error={numadhErr}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e => {
                  setNomAdh(e.target.value);
                  setNomAdhErr('')
                }}
                placeholder='Entrer nom adhérent ...'
                value={nomadh}
                error={nomadhErr}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e => {
                  setPrenomAdh(e.target.value);
                  setPrenomAdhErr('')
                }}
                placeholder='Entrer prénom adhérent ...'
                value={prenomadh}
                error={prenomadhErr}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Autocomplete
                items={['Homme', 'Femme']}
                placeholder='Genre adhérent ...'
                selected={genre}
                setSelected={setGenre}
              />
              </div>
              <div style={{ width: '32%', }}>
              <Input
                onChange={e => {
                  setTelAdh(e.target.value)
                  setTelAdhErr('')
                }}
                name="teladh"
                type='number'
                placeholder='Entrer num telephone Adhérent ...'
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                value={teladh}
                error={teladhErr}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e => {
                  setAdressAdh(e.target.value)
                  setAdressAdhErr('')
                }}
                name="addressadh"
                placeholder='Entrer adresse Adhérent ...'
                value={adressadh}
                error={adressadhErr}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e => {
                  setQuartierAdh(e.target.value)
                  setQuartierAdhErr('')
                }}
                name="quartieradh"
                placeholder='Entrer quartier Adhérent ...'
                value={quartieradh}
                error={quartieradhErr}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e => {
                  setNationaliteAdh(e.target.value)
                  setNationaliteAdhErr('')
                }}
                name="nationaliteadh"
                placeholder='Entrer nationalite Adhérent ...'
                value={nationaliteadh}
                error={nationaliteadhErr}
              />
            </div>
            {!value && <div style={{ width: '32%', marginBottom: 20, }}>
                <InputImg
                  setFile={setFile}
                  error={fileError}
                  handelChange={()=>setFileError('')}
                />
            </div>}
            {!value && <div style={{ width: '32%', }}>
              <DatePickerInput
                onDateChange={setDateNaiss}
                placeholder="Date de naissance"
                date={datenaiss}
              />
            </div>}
            <div style={{ width: '32%', }}>
              <Input
                onChange={e => {
                  setLieuNaiss(e.target.value)
                  setLieuNaissErr('')
                }}
                placeholder='Entrer lieu de naissance adhérent ...'
                value={lieunaissadh}
                error={lieunaissadhErr}
              />
            </div>
            {!value && <div style={{ width: '32%' }}>
              <Testdropdown
                placeholder='Types adhérent ...'
                data={typeAdh}
                onSelectId={handleSearchValueChange}
                onResetId={handelResetValueType}
                error={typeError}
              />
            </div>}
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

export default TestModif
