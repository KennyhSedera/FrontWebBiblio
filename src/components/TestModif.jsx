import React, { useEffect, useState } from 'react'
import '../index.css'
import Input from './Input'
import Button from './Button'

function TestModif({value, onClose=()=>{}, title}) {
    const [nom, setNom] = useState('')
    useEffect(() => {
        if (value) {
            setNom(value.nom_Adh)
        }
    }, [value])
    
  return (
      <div className="modalcard"
          style={{
             width: 200, minHeight: 200, color: 'black',
        padding: 12, borderRadius: 10, background: '#fffffff0',
        }}
      >
          {title}
          <Input
              value={nom}
              onChange={(text)=>(setNom(text.target.value))}
          />
          <Button title='Close' onClick={onClose} />
    </div>
  )
}

export default TestModif
