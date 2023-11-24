import React, { useState } from 'react';
import Background from '../../components/layout/Background';
import './profile.css';
import { IoIosImages } from 'react-icons/io';
import Button from '../../components/Button';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

function ProfilView() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state || {};
    console.log({data:user});

    const [file, setFile] = useState('')
    const handleChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const urlImg = URL.createObjectURL(file)
            setFile(urlImg);
        }
    }
    const handleAnnuler = () => {
        setFile('');
    }
    const handleBack = ()=>{
        navigate('/accueil')
    }
    return (
        <Background>
            <div style={{
                width:40,
                height: 40,
                borderRadius: 10,
                backgroundColor: '#ffffffdf',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor:'pointer',
                position: 'absolute',
                left:10,
                top:10,
            }} onClick={handleBack}>
                <MdKeyboardArrowLeft size={25} />
            </div>
            <div className="profilebody">
                <div className="profileimg">
                    <img src={file ? file : "me.jpg"} alt="" /> 
                    <div className="card"></div>
                    <div className="card2"></div>
                    {!file && <div className="icon">
                        <input type="file" style={{display:'none'}} onChange={handleChange} id="img" />
                        <label htmlFor="img">
                            <IoIosImages size={25} />
                        </label>
                    </div>}
                    {file && (
                        <div className="btncomfirme">
                            <Button
                                small
                                textsize={14}
                                color={'#fffffff0'}
                                textcolor={'black'}
                                title={'Non'}
                                width={'calc(50% - 5px)'}
                                onClick={handleAnnuler}
                            />
                            <Button small textsize={14} title={'Oui'} width={'calc(50% - 5px)'} />
                        </div>
                    )}
                </div>
            </div>
        </Background>
    )
}

export default ProfilView;