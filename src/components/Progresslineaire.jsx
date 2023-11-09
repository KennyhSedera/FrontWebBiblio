import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Background from './layout/Background';

export default function LinearIndeterminate() {
  return (
    <Background>
      <div style={{
        width: 200,
        height: 50,
        background: 'white',
        position: 'relative',
        
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
        <div style={{position:'absolute', top:20}}><LinearProgress  /></div>
      </div>
    </Background>
  );
}
