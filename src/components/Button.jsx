import React from 'react';
import '../index.css';
import { CircularProgress } from '@mui/material';

function Button({ title, onClick = () => { }, color, textcolor, textsize, small, large, xlarge, width, loanding}) {
    return (
        <div className='button' style={{
            background: color, color: textcolor, fontSize: textsize, maxHeight: 46,
            height: small ? 35 : large ? 42 : xlarge ? 50 : 40,
            boxShadow: `2px 2px 4px #000000a0`, width: width ? width : '',
            position:'relative',
        }} onClick={onClick}>
            {loanding ? '':title}
            {loanding && (
            <CircularProgress
                size={24}
                sx={{
                color: 'white',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
                }}
            />
            )}
        </div>
    )
}

export default Button;