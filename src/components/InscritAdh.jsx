import React, { useEffect, useState } from 'react';
import Button from './Button';
import { MdClose } from 'react-icons/md';
import '../index.css';
import Input from './Input';
import { getAllType } from '../services/typeAdhService';
import DatePickerInput from './datepicker/DatePikers';
import { getAllAdhNoInsc } from '../services/adherentService';
import Testdropdown from './dropdownsearch/Testdropdown';
import { inscription } from '../services/membreService';

function InscritAdh({ title, onClose = () => { } }) {
  const [typeAdh, setTypeAdh] = useState([]);
  const [adherent, setAdh] = useState([]);
  const [btnTitle, setBtnTitle] = useState('Enregistrer');

  const [searchValue, setSearchValue] = useState('');
  const [searchValueAdh, setSearchValueAdh] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [input, setInput] = useState({numero:''});

  useEffect(() => {
    getTypeAdhAll();
    getAdhAll();
  }, []);

  const getTypeAdhAll = async () => {
    try {
      const result = await getAllType();
      const types = result.data.types.map((type) => ({id:type.id_TypeAdh, title:type.nom_TypeAdh}));
      setTypeAdh(types);
    } catch (err) {
      console.log(err);
    }
  };

  const getAdhAll = async () => {
    try {
      const result = await getAllAdhNoInsc();
      const adherent = result.data.adherents.map((Adh) => ({id:Adh.id_Adh, title:Adh.nom_Adh + ' ' + Adh.prenom_Adh}));
      setAdh(adherent);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchValueChange = (newValue) => {
    setSearchValue(newValue);
  };
  const handleSearchValueChangeAdh = (newValue) => {
    setSearchValueAdh(newValue);
  };

  const handelResetValueType = () => {
    setSearchValue(null);
  };
  const handelResetValueAdh = () => {
    setSearchValueAdh(null);
  };
  const handelOnChangeNum = (e) => {
    const { name, value } = e.target;
    setInput(prevState => ({ ...prevState, [name]: value }));
  }
  
  const datas = [
    {id_TypeAdh:searchValue},
    {id_Adh:searchValueAdh},
    {id_InscritAdh:input.numero},
    {date_InscritAdh:selectedDate},
    { fin_InscritAdh: selectedDate },
 ]
  const validate = () => {
    console.log(datas);
    // inscription(datas)
    // .then((res) => {
    //   alert(res.data.succee)
    // }).catch((err) => {
    //   console.log(err);
    // });
  };
  
  return (
    <div className="modalcard" style={{
      width: 550,
      minHeight: 200,
      color: 'black',
      padding: 12,
      borderRadius: 10,
      background: '#fffffff0',
    }}>

      <div className="modalheadear" style={{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingInlineStart: 15,
      }}>
        <span>{title} Adhérents</span>
        <span
          className="btnclosemodal"
          style={{ background: '#fffffffe' }}
          onClick={onClose}><MdClose size={20}
        /></span>
      </div>
      <div style={{
        minHeight: 200,
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingBlock: 10,
        paddingInline: 10,
      }}>
        <div style={{ width: '48%' }}>
          <Input
            name='numero'
            onChange={(e)=>handelOnChangeNum(e)}
            placeholder='Numero inscription ...'
          />
        </div>
        <div style={{ width: '48%' }}>
          <Testdropdown
            placeholder='Nom adhérent ...'
            data={adherent}
            onSelectId={handleSearchValueChangeAdh}
            onResetId={handelResetValueAdh}
          />
        </div>
        <div style={{ width: '48%' }}>
          <Testdropdown
            placeholder='Types adhérent ...'
            data={typeAdh}
            onSelectId={handleSearchValueChange}
            onResetId={handelResetValueType}
          />
        </div>
        <div style={{ width: '48%' }}>
          <Input
            type='number'
            placeholder="Frais d'inscription ..."
          />
        </div>
        <div style={{ width: '48%' }}>
          <DatePickerInput
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            placeholder="Debut inscription ..."
          />
        </div>
        <div style={{ width: '48%' }}>
          <DatePickerInput
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            placeholder="Fin validation inscription ..."
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ width: '50%' }}>
          <Button onClick={validate} large color='#00b2fee1' title={btnTitle} textsize={15} />
        </div>
      </div>
    </div>
  );
}

export default InscritAdh;
