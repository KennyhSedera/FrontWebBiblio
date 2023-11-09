import React, { useState } from 'react'
import Button from './Button'
import { MdClose } from 'react-icons/md'
import '../index.css'
import Input from './Input'
import DatePickerInput from './datepicker/DatePikers'
import Autocomplete from './drowpDown/Autocomplete'
import InputImg from './inputImg/InputImg'
import { createAdh, updatedAdh } from '../services/adherentService'
import Alert from './alert/Alert'

function AddAdh({ title, onClose = () => { }, value, }) {
     const inputs = {
        numadh: '',
        nomadh: '',
        prenomadh: '',
        teladh: '',
        addressadh: '',
        quartieradh: '',
        nationaliteadh: '',
        lieunaissadh: '',
    }
    const name = {
        numadh: 'numadh', nomadh: 'nomadh',
        prenomadh: 'prenomadh', genreadh: 'genreadh',
        teladh: 'teladh', addressadh: 'addressadh',
        quartieradh: 'quartieradh', nationaliteadh: 'nationaliteadh',
        lieunaissadh: 'lieunaissadh',
    }
  
     React.useEffect(() => {
        if (value) {
          setInput(prevState => ({ ...prevState, [name.numadh]: value.id_Adh }))
          setInput(prevState => ({ ...prevState, [name.nomadh]: value.nom_Adh }))
          setInput(prevState => ({ ...prevState, [name.prenomadh]: value.prenom_Adh }))
          setInput(prevState => ({ ...prevState, [name.teladh]: value.tel_Adh }))
          setInput(prevState => ({ ...prevState, [name.addressadh]: value.adresse_Adh }))
          setInput(prevState => ({ ...prevState, [name.quartieradh]: value.quartier_Adh }))
          setInput(prevState => ({ ...prevState, [name.nationaliteadh]: value.nationalite_Adh }))
          setInput(prevState => ({ ...prevState, [name.lieunaissadh]: value.lieunaiss_Adh }))
          setGenre(value.genre_Adh || 'Homme'); 
          setDateNaiss(value.naissance_Adh)
          setBtnTitle('Modifier')
        }
     }, [value, name])
  
  const [input, setInput] = React.useState(inputs);
  const [error, setError] = React.useState(inputs);
  const [btnTitle, setBtnTitle] = React.useState('Enregistrer');
  const [file, setFile] = React.useState(null);
  const [datenaiss, setDateNaiss] = useState(new Date());
  const [genre, setGenre] = useState('Homme');
  
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInput(prevState => ({ ...prevState, [name]: value }));
    setError(prevState => ({ ...prevState, [name]: '' }));
  }
  const handleUpload = () => {
    setFileError('')
  }
  const [fileError, setFileError] = React.useState('');
  
  const validate = () => {
    if (input.numadh ==='') {
      setError(prevState => ({ ...prevState, [name.numadh]: 'Cette champ ne doit pas être vide!' }))
    } else if (input.nomadh ==='') {
      setError(prevState => ({ ...prevState, [name.nomadh]: 'Cette champ ne doit pas être vide!' }))
    }else if (input.prenomadh ==='') {
      setError(prevState => ({ ...prevState, [name.prenomadh]: 'Cette champ ne doit pas être vide!' }))
    }else if (input.teladh ==='') {
      setError(prevState => ({ ...prevState, [name.teladh]: 'Cette champ ne doit pas être vide!' }))
    }else if (input.addressadh ==='') {
      setError(prevState => ({ ...prevState, [name.addressadh]: 'Cette champ ne doit pas être vide!' }))
    }else if (input.quartieradh ==='') {
      setError(prevState => ({ ...prevState, [name.quartieradh]: 'Cette champ ne doit pas être vide!' }))
    }else if (input.nationaliteadh ==='') {
      setError(prevState => ({ ...prevState, [name.nationaliteadh]: 'Cette champ ne doit pas être vide!' }))
    }else if (input.lieunaissadh ==='') {
      setError(prevState => ({ ...prevState, [name.lieunaissadh]: 'Cette champ ne doit pas être vide!' }))
    } else if (file === null && btnTitle === 'Enregistrer') {
      setFileError('Choisissez une image!')
    } else {
      const formData = new FormData();
      formData.append("photo_adh", file);
      formData.append("nom_Adh", input.nomadh);
      formData.append("prenom_Adh", input.prenomadh);
      formData.append("adresse_Adh", input.addressadh);
      formData.append("quartier_Adh", input.quartieradh);
      formData.append("tel_Adh", input.teladh);
      formData.append("nationalite_Adh", input.nationaliteadh);
      formData.append("lieunaiss_Adh", input.lieunaissadh);
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
          setInput(inputs);
          setError(inputs);
          setLoading(false);
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
          setInput(inputs);
          setError(inputs);
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
                onChange={handleOnChange}
                name="numadh"
                placeholder='Id ...'
                value={input.numadh}
                error={error.numadh}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={handleOnChange}
                name="numadh"
                placeholder='Num inscription ...'
                value={input.numadh}
                error={error.numadh}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={handleOnChange}
                name="nomadh"
                placeholder='Entrer nom ...'
                value={input.nomadh}
                error={error.nomadh}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={handleOnChange}
                name="prenomadh"
                placeholder='Entrer prenom ...'
                value={input.prenomadh}
                error={error.prenomadh}
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
                onChange={handleOnChange}
                name="teladh"
                type='number'
                placeholder='Entrer num telephone ...'
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                value={input.teladh}
                error={error.teladh}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={handleOnChange}
                name="addressadh"
                placeholder='Entrer adresse ...'
                value={input.addressadh}
                error={error.addressadh}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={handleOnChange}
                name="quartieradh"
                placeholder='Entrer quartier ...'
                value={input.quartieradh}
                error={error.quartieradh}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={handleOnChange}
                name="nationaliteadh"
                placeholder='Entrer nationalite ...'
                value={input.nationaliteadh}
                error={error.nationaliteadh}
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
                onChange={handleOnChange}
                name="lieunaissadh"
                placeholder='Entrer liue naissance ...'
                value={input.lieunaissadh}
                error={error.lieunaissadh}
              />
            </div>
            <div style={{ width: '32%', marginBottom: 20, }}>
                <InputImg
                  setFile={setFile}
                  error={fileError}
                  handelChange={handleUpload}
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