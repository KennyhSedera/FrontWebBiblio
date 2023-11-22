import React, { useEffect, useState } from 'react'
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
// import { inscription } from '../services/membreService'

function TestModif({value, onClose=()=>{}, title}) {
    const [numadh, setNumadh] = useState('');
    const [nomadh, setNomadh] = useState('');
    const [prenomadh, setPrenomadh] = useState('');
    const [teladh, setTeladh] = useState('');
    const [addressadh, setAddressadh] = useState('');
    const [quartieradh, setQuartieradh] = useState('');
    const [nationaliteadh, setNationaliteadh] = useState('');
    const [lieunaissadh, setLieunaissadh] = useState('');
    const [btnTitle, setBtnTitle] = React.useState('Enregistrer');
    const [file, setFile] = React.useState(null);
    const [genre, setGenre] = useState('Homme');
    const [datenaiss, setDateNaiss] = useState(new Date());
    const [typeAdh, setTypeAdh] = useState([]);
    const [searchValue, setSearchValue] = useState(null);
    
    const [numadherr, setNumadherr] = useState('');
    const [nomadherr, setNomadherr] = useState('');
    const [prenomadherr, setPrenomadherr] = useState('');
    const [teladherr, setTeladherr] = useState('');
    const [addressadherr, setAddressadherr] = useState('');
    const [quartieradherr, setQuartieradherr] = useState('');
    const [nationaliteadherr, setNationaliteadherr] = useState('');
    const [lieunaissadherr, setLieunaissadherr] = useState('');
    const [typeError, setTypeError] = useState('');
    const [fileError, setFileError] = React.useState('');
    
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')
    const [alertType, setAlertType] = useState('success')
    const [loading, setLoading] = React.useState(false);
    
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


    React.useEffect(() => {
        getTypeAdhAll();
        if(!value){
            getAdhAll();
        }
    }, [value]);
    const getAdhAll = async () => {
        try {
        let adherent = [];
        const result = await getAllAdh();
        adherent = result.data.adherents;
        if (adherent.length<= 0){
            setNomadh('AFF00001')
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
            setNomadh(id)
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
    }, [value])
    
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
                  handelChange={()=>setFileError('')}
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

export default TestModif
