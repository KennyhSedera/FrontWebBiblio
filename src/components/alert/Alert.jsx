import React from 'react'
import { MdOutlineErrorOutline } from 'react-icons/md'
import { CiWarning } from 'react-icons/ci'
import { FiCheckCircle } from 'react-icons/fi'
import './alert.css'
import { Snackbar } from '@mui/material'

function Alert({
    open = true,
    Message = '',
    type='success',
}) {
    const [state, setState] = React.useState({
      vertical: 'top',
      horizontal: 'right',
    });
    const { vertical, horizontal } = state;
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }} open={open}
      key={vertical + horizontal}
    >
      <div 
        className='alertcomponent'
        style={{
          background: type==='success' ? '#29b729' : type==='error' ? '#ff4949' : '#fab330',
        }}
      >
        {type==='success' ? <FiCheckCircle size={25} />:
          type === 'error' ? <MdOutlineErrorOutline size={25} /> :
          <CiWarning size={25} />
        }
        <div className='alertmsg'>{Message}</div>
      </div>
    </Snackbar>
  )
}

export default Alert