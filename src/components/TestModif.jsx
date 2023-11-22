import React, { useEffect, useState } from 'react'
import '../index.css'
import Input from './Input'
import { MdClose } from 'react-icons/md'
// import Button from './Button'

function TestModif({value, onClose=()=>{}, title}) {
    const [numadh, setNumAdh] = useState('')
    const [nomadh, setNomAdh] = useState('')
    const [prenomadh, setPrenomAdh] = useState('')
    useEffect(() => {
        if (value) {
            setNomAdh(value.nom_Adh)
            setNumAdh(value.id_Adh)
            setPrenomAdh(value.prenom_Adh)
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
        </div>
    </div>
  )
}

export default TestModif
