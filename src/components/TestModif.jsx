import React, { useEffect, useState } from 'react'
import '../index.css'
import Input from './Input'
import { MdClose } from 'react-icons/md'
import Autocomplete from './drowpDown/Autocomplete'
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
                // error={error.numadh}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e=>setNomAdh(e.target.value)}
                placeholder='Entrer nom adhérent ...'
                value={nomadh}
                // error={error.numadh}
              />
            </div>
            <div style={{ width: '32%', }}>
              <Input
                onChange={e=>setPrenomAdh(e.target.value)}
                placeholder='Entrer prénom adhérent ...'
                value={prenomadh}
                // error={error.nomadh}
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
        </div>
    </div>
  )
}

export default TestModif
