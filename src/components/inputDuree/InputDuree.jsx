import React, { useState, useEffect } from 'react';
import Input from '../Input';
import Autocomplete from '../drowpDown/Autocomplete';

function InputDuree({onDureeChange}) {
  const [daySelected, setDaySelected] = useState('Jours');
  const [inputValue, setInputValue] = useState('');
  const [tempDuree, setTempDuree] = useState(0);

  useEffect(() => {
    if (daySelected === 'Jours') {
      setTempDuree(inputValue ? parseInt(inputValue) : 0);
    } else if (daySelected === 'Semaines') {
      setTempDuree(inputValue ? parseInt(inputValue) * 7 : 0);
    } else if (daySelected === 'Mois') {
      setTempDuree(inputValue ? parseInt(inputValue) * 30 : 0);
    }
  }, [daySelected, inputValue]);

  useEffect(() => {
    onDureeChange(tempDuree);
  }, [tempDuree, onDureeChange]);

  return (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: 48,
            gap: 10,
        }}
    >
        <div style={{ marginTop: 20, width: '50%' }}>
            <Input
                placeholder={`Durée d'emprunte`}
                type='number'
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
            />
        </div>
        <div style={{ width: '45%' }}>
            <Autocomplete
                selected={daySelected}
                setSelected={(item) => {
                    setDaySelected(item);
                }}
                items={['Jours', 'Semaines', 'Mois']}
            />
        </div>
    </div>
  );
}

export default InputDuree;
