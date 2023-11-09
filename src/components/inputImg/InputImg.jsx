import React, { useState } from 'react';
import './inputimg.css';
import { BsImageFill, } from 'react-icons/bs';

function InputImg({setFile, error, handelChange=()=>{}}) {
    const [name, setName] = useState('');

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      setFile(file);
      setName(file.name);
      handelChange();
    }
  return (
    <div className='inputimg' style={{
      border: `1px solid ${error ? 'red' : 'transparent'}`,
      position: 'relative',
      marginBottom: 20,
    }}>
      <input 
        type="file"
        id="img" 
        style={{ display: 'none' }}
        accept="image/png, image/jpeg, image/bmp"
        onChange={handleFileUpload}
      />
      <label htmlFor="img">
          <BsImageFill size={25} color={error ? '#ff6969':''} />
          {name ? <div style={{
          maxWidth: 'calc(100% - 60px)',
          overflow: 'hidden',
          color: '#000',
          whiteSpace: 'nowrap',
          textOverflow:'ellipsis',
        }}>{name}</div> : <span style={{color:error ? 'red':'#656565',  }}>Choisir un photo ...</span>}
      </label>
            <span style={{ color: 'red', fontSize: 12, position:'absolute', left:5, bottom:-20 }}>{error}</span>
    </div>
  )
}

export default InputImg
