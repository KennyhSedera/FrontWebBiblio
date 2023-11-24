import React, { useEffect, useState } from 'react'
import '../index.css'
import Input from './Input'
import { MdClose } from 'react-icons/md'
import Autocomplete from './drowpDown/Autocomplete'
import { getAllAdhNoInsc } from '../services/adherentService'
import { getAllType } from '../services/typeAdhService'
import Testdropdown from './dropdownsearch/Testdropdown'
import InputImg from './inputImg/InputImg'
// import Button from './Button'

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
  
  
  const [fileError, setFileError] = React.useState('');
  const [typeError, setTypeError] = useState('null');
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
        }
    }, [value])
  
  
  useEffect(() => {
    getTypeAdhAll();
    getAdhAll();
  }, []);
  
  const getAdhAll = async () => {
    try {
      const result = await getAllAdhNoInsc();
      const adherent = result.data.adherents
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
          const num = parseInt(number)+1
          setNumAdh((num<10000)?(num<1000)?(num<100)?(num<10) ? reference+'0000'+num :reference+'000'+num : reference+'00'+num : reference+'0'+num : reference+num)
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
                // error={numadhErr}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e=>setNomAdh(e.target.value)}
                placeholder='Entrer nom adhérent ...'
                value={nomadh}
                // error={nomadhErr}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e=>setPrenomAdh(e.target.value)}
                placeholder='Entrer prénom adhérent ...'
                value={prenomadh}
                // error={prenomadhErr}
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
                onChange={e=>setTelAdh(e.target.value)}
                name="teladh"
                type='number'
                placeholder='Entrer num telephone Adhérent ...'
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                value={teladh}
                // error={teladhErr}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e=>setAdressAdh(e.target.value)}
                name="addressadh"
                placeholder='Entrer adresse Adhérent ...'
                value={adressadh}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e=>setQuartierAdh(e.target.value)}
                name="quartieradh"
                placeholder='Entrer quartier Adhérent ...'
                value={quartieradh}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e=>setNationaliteAdh(e.target.value)}
                name="nationaliteadh"
                placeholder='Entrer nationalite Adhérent ...'
                value={nationaliteadh}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e=>setLieuNaiss(e.target.value)}
                placeholder='Entrer lieu de naissance adhérent ...'
                value={lieunaissadh}
              />
            </div>
            <div style={{ width: '32%', marginBottom: 20, }}>
                <InputImg
                  setFile={setFile}
                  error={fileError}
                  handelChange={()=>setFileError('')}
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
        </div>
    </div>
  )
}

export default TestModif
