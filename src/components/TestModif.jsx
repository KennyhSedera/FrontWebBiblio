import React, { useEffect, useState } from 'react'
import '../index.css'
import Input from './Input'
import { MdClose } from 'react-icons/md'
import Autocomplete from './drowpDown/Autocomplete'
import Testdropdown from './dropdownsearch/Testdropdown'
import InputImg from './inputImg/InputImg'
import DatePickerInput from './datepicker/DatePikers'
import Button from './Button'
import Alert from './alert/Alert'
import { createLivre, updateLivre } from '../services/livreService'

function TestModif({value, onClose=()=>{}, title}) {
  const [titrelivre, setTitreLivre] = useState('')
  const [auteurlivre, setAuteurLivre] = useState('')
  const [collectionlivre, setCollectionLivre] = useState('')
  const [editionlivre, setEditionLivre] = useState('')
  const [notationlivre, setNotationLivre] = useState('')
  const [nbpagelivre, setNbPageLivre] = useState('')
  const [formatlivre, setFormatLivre] = useState('')
  const [emplacementlivre, setEmplacementLivre] = useState('Jeune')
  const [file, setFile] = React.useState(null);
  const [dateeditionlivre, setDateEdition] = React.useState(new Date());
  const [btnTitle, setBtnTitle] = React.useState('Enregistrer');
  const [loading, setLoading] = React.useState(false);
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('success')
  const [idUser, setIdUser] = useState('success')
  
  const [fileError, setFileError] = useState('');
  const [titrelivreErr, settitrelivreErr] = useState('')
  const [auteurlivreErr, setauteurlivreErr] = useState('')
  const [collectionlivreErr, setcollectionlivreErr] = useState('')
  const [editionlivreErr, seteditionlivreErr] = useState('')
  const [notationlivreErr, setnotationlivreErr] = useState('')
  const [nbpagelivreErr, setnbpagelivreErr] = useState('')
  const [formatlivreErr, setformatlivreErr] = useState('')
    useEffect(() => {
        if (value) {
            setTitreLivre(value.titre_livre)
            setAuteurLivre(value.auteur_livre)
            setCollectionLivre(value.collection_livre)
            setEditionLivre(value.edition_livre)
            setNotationLivre(value.notation_livre)
            setFormatLivre(value.format_livre)
            setNbPageLivre(value.nationalite_Adh)
            setEmplacementLivre(value.lieunaiss_Adh || 'Jeune')
            setDateEdition(value.naissance_Adh)
            setBtnTitle('Modifier')
        }
    }, [value])
  
  
  useEffect(() => {
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

 const validate = () => {
    if (titrelivre ==='') {
      settitrelivreErr( 'Cette champ ne doit pas être vide!' )
    }else if (auteurlivre ==='') {
      setauteurlivreErr( 'Cette champ ne doit pas être vide!' )
    }else if (collectionlivre ==='') {
      setcollectionlivreErr( 'Cette champ ne doit pas être vide!' )
    }else if (editionlivre ==='') {
      seteditionlivreErr( 'Cette champ ne doit pas être vide!' )
    }else if (notationlivre ==='') {
      setnotationlivreErr( 'Cette champ ne doit pas être vide!' )
    }else if (formatlivre ==='') {
      setformatlivreErr( 'Cette champ ne doit pas être vide!' )
    }else if (nbpagelivre ==='') {
      setnbpagelivreErr( 'Cette champ ne doit pas être vide!' )
    } else if (file === null && btnTitle === 'Enregistrer') {
      setFileError('Choisissez une image!')
    } else {
      const formData = new FormData();
      formData.append("photo_livre", file);
      formData.append("titre_livre", titrelivre);
      formData.append("auteur_livre", auteurlivre);
      formData.append("collection_livre", collectionlivre);
      formData.append("edition_livre", editionlivre);
      formData.append("notation_livre",notationlivre);
      formData.append("format_livre", formatlivre);
      formData.append("nb_page_livre", nbpagelivre);
      formData.append("emplacement_livre", emplacementlivre);
      formData.append("date_edition_livre", dateeditionlivre);
      formData.append("date_enregistrement_livre", new Date);
      if (!loading) {
        setLoading(true);
      }
      if (btnTitle === 'Enregistrer') {
        createLivre(formData)
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
        titre_livre: titrelivre,
        auteur_livre: auteurlivre,
        collection_livr: collectionlivre,
        edition_livre: editionlivre,
        notation_livre: notationlivre,
        format_livre: formatlivre,
        nb_page_livre: nbpagelivre,
        emplacement_livre: emplacementlivre,
      }
        updateLivre(formData)
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
                        onChange={e=>{
                          setTitreLivre(e.target.value)
                          settitrelivreErr('')
                        }}
                        error={titrelivreErr}
                        value={titrelivre}
                        placeholder='Entrez la titre du livre'
                        bgcolor='white'
                    />
                </div>
                <div style={{ width: '32%', }}>
                    <Input
                        onChange={e=>{
                          setAuteurLivre(e.target.value)
                          setauteurlivreErr('')
                        }}
                        error={auteurlivreErr}
                        value={auteurlivre}
                        placeholder="Entrez l'auteur du livre"
                        bgcolor='white'
                    />
                </div>
                <div style={{ width: '32%', }}>
                    <Input
                        onChange={e=>{
                          setCollectionLivre(e.target.value)
                          setcollectionlivreErr('')
                        }}
                        error={collectionlivreErr}
                        value={collectionlivre}
                        placeholder='Entrez collection du livre'
                        bgcolor='white'
                    />
                </div>
                <div style={{ width: '32%', }}>
                    <Input
                        onChange={e=>{
                          setEditionLivre(e.target.value)
                          seteditionlivreErr('')
                        }}
                        error={editionlivreErr}
                        value={editionlivre}
                        placeholder='Entrez edition du livre'
                        bgcolor='white'
                    />
                </div>
                <div style={{ width: '32%', }}>
                  <DatePickerInput
                    onDateChange={setDateEdition}
                    value={dateeditionlivre}
                  />
                </div>
                <div style={{ width: '32%', }}>
                    <Input
                        onChange={e=>{
                          setNotationLivre(e.target.value)
                          setnotationlivreErr('')
                        }}
                        value={notationlivre}
                        error={notationlivreErr}
                        placeholder='Entrez notation du livre'
                        bgcolor='white'
                    />
                </div>
                <div style={{ width: '32%', }}>
                    <Input
                        onChange={e=>{
                          setFormatLivre(e.target.value)
                          setformatlivreErr('')
                        }}
                        error={formatlivreErr}
                        value={formatlivre}
                        placeholder='Entrez format du livre'
                    />
                </div>
                <div style={{ width: '32%', }}>
                    <Input
                        onChange={e=>{
                          setNbPageLivre(e.target.value)
                          setnbpagelivreErr('')
                        }}
                        type='number'
                        error={nbpagelivreErr}
                        value={nbpagelivre}
                        placeholder='Entrez le nombre de page'
                        bgcolor='white'
                    />
                </div>
                <div style={{ width: '32%', }}>
                    <Autocomplete
                      items={['Jeune', 'Adulte']}
                      placeholder='Emplacement livre ...'
                      selected={emplacementlivre}
                      setSelected={setEmplacementLivre}
                    />
                </div>
                <div style={{ width: '32%', marginBottom: 20, }}>
                    <InputImg
                        setFile={setFile}
                        handelChange={()=>setFileError('')}
                        error={fileError}
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

export default TestModif
