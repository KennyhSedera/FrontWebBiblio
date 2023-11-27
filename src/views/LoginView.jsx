import React, { useEffect, useState } from 'react'
import Input from '../components/Input';
import Button from '../components/Button';
import { ImMail4, } from 'react-icons/im'
import { MdLockPerson, MdPhoneAndroid } from 'react-icons/md'
import '../index.css'
import {
    // FaMapMarkerAlt,
    FaUser
} from 'react-icons/fa';
import { register, login, verifiEmail  } from '../services/userService';
import Background from '../components/layout/Background';
import InputImg from '../components/inputImg/InputImg';
import Alert from '../components/alert/Alert';
import { useNavigate } from 'react-router-dom';
import AlertDialog from '../components/AlertDialog';

function LoginView() {
    useEffect(() => {
        getUserLocal()
    }, [])

    const getUserLocal = () => {
        const storedUser = localStorage.getItem('User');
        if (storedUser) {
            navigate('/accueil')
        }
    }

    const inputs = {
        email: '', passwordconf:'', emaillogin: '', passlogin:'', fileerror:'',
        phone: '', username: '', adresse: '', password: '',
    }
    const inputnames = {
        email: 'email', phone: 'phone', username: 'username', adresse: 'adresse', fileerror:'fileerror',
        password: 'password', passwordconf:'passwordconf', emaillogin: 'emaillogin', passlogin:'passlogin'
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setInput(inputs);
        setError(inputs);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setInput(inputs);
        setError(inputs);
    };
    
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [file, setFile] = useState(null);
    const [input, setInput] = useState(inputs)
    const [alertMsg, setAlertMsg] = React.useState('');
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertType, setAlertType] = React.useState('success');
    const [inputError, setError] = useState(inputs);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [dialogMsg, setDialogMsg] = React.useState('');

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInput(prevState => ({ ...prevState, [name]: value }));
        setError(prevState=>({...prevState, [name]: ''}))
    }

    const onChangeFile = () => {
        setError(prevState=>({...prevState, [inputnames.fileerror]: ''}))
    }

    const handleRegister = () => {
        const formData = new FormData();
        formData.append("profile", file);
        formData.append("user_name", input.username);
        formData.append("user_email", input.email);
        formData.append("user_adress", input.adresse);
        formData.append("user_contact", input.phone);
        formData.append("status_compte", 'actif');
        formData.append("password", input.password);

        if (input.username === '') {
            setError(prevState => ({ ...prevState, [inputnames.username]: 'Cette champ ne doit pas être vide!' }));
        } else if (input.email === '') {
            setError(prevState => ({ ...prevState, [inputnames.email]: 'Cette champ ne doit pas être vide!' }));
        } else if (input.phone === '') {
            setError(prevState => ({ ...prevState, [inputnames.phone]: 'Cette champ ne doit pas être vide!' }));
        } else if (file === null) {
            setError(prevState => ({ ...prevState, [inputnames.fileerror]: 'Choisissez une image!' }));
        } else if (input.password === '') {
            setError(prevState => ({ ...prevState, [inputnames.password]: 'Cette champ ne doit pas être vide!' }));
        } else if (input.password.length < 8) {
            setError(prevState => ({ ...prevState, [inputnames.password]: 'Entrez au moins huit(8) caractères!' }));
        } else if (input.passwordconf === '') {
            setError(prevState => ({ ...prevState, [inputnames.passwordconf]: 'Cette champ ne doit pas être vide!' }));
        } else if (input.passwordconf !== input.password) {
            setError(prevState => ({ ...prevState, [inputnames.passwordconf]: 'Les deux mot de passe doivent identique!' }));
        } else {
            setLoanding(true)
            verifiEmail({email:input.email})
            .then((res) => {
                if (res.data.error) {
                    setLoanding(false)
                    setOpenDialog(true)
                    setDialogMsg(res.data.error)
                } else {
                    register(formData)
                    .then((res) => {
                        if (res.data.error) {
                            setLoanding(false)
                            setOpenAlert(true)
                            setAlertMsg(res.data.error)
                            setAlertType('error')
                            setTimeout(() => {
                                setOpenAlert(false)
                            }, 3000);
                        } else {
                            setLoanding(false)
                            setOpenAlert(true);
                            setAlertMsg(res.data.succee);
                            setAlertType('success');
                            setInput(inputs);
                            setFile(null);
                            handleBack()
                            setTimeout(() => {
                                setOpenAlert(false);
                            }, 3000);
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const handleLogin = () => {
        if (input.emaillogin === '') {
            setError(prevState => ({ ...prevState, [inputnames.emaillogin]: 'Cette champ ne doit pas être vide!' }));
        }
        else if (input.passlogin === '') {
            setError(prevState => ({ ...prevState, [inputnames.passlogin]: 'Cette champ ne doit pas être vide!' }));
        } else {
            setLoanding1(true)
            login({ email: input.emaillogin, password: input.passlogin })
            .then((res) => {
                if (res.data.error) {
                    setLoanding1(false)
                    setOpenDialog(true)
                    setDialogMsg(res.data.error)
                } else {
                    const user = res.data.user
                    localStorage.setItem('User', JSON.stringify(user));
                    setLoanding1(false)
                    navigate('/accueil');
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }
    const [loanding, setLoanding] = useState(false);
    const [loanding1, setLoanding1] = useState(false);
    return (
        <Background>
            <Alert open={openAlert} Message={alertMsg} type={alertType} />
            <AlertDialog open={openDialog} message={dialogMsg} handelClose={()=>setOpenDialog(false)} />
            {
                activeStep === 0 ?
                    <React.Fragment>
                        <div style={{
                            width: 500, minHeight: 200, zIndex:1,
                            background: '#ffffffa2', color: '#00b2fee1',
                            borderRadius: 10, padding: 10, textAlign: 'center',
                            display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 10,
                        }}>
                            <div style={{ fontWeight: 800, fontSize: 40, }}>Se connecter</div>
                            <div style={{
                                width: 380,
                            }}>
                                <div style={{ paddingBottom: 5, }}>
                                    <div style={{ paddingBottom: 2 }}>
                                        <Input 
                                            placeholder='Entrer votre adresse e-mail' 
                                            bgcolor='white'
                                            onChange={handleOnChange}
                                            name='emaillogin'
                                            value={input.emaillogin}
                                            error={inputError.emaillogin}
                                            iconColor='black' Icon={ImMail4} 
                                        />
                                    </div>
                                    <div style={{ paddingBottom: 2 }}>
                                        <Input 
                                            placeholder='Entrer votre mot de passe' 
                                            bgcolor='white'
                                            onChange={handleOnChange}
                                            name='passlogin'
                                            value={input.passlogin}
                                            error={inputError.passlogin}
                                            iconColor='black' password Icon={MdLockPerson} 
                                        />
                                    </div>

                                </div>
                                <div>
                                    <div style={{ fontSize: 15, }}>
                                        <Button onClick={handleLogin} title='connecter' color={'#00b2fee1'} loanding={loanding1} />
                                    </div>
                                    <div style={{
                                        textAlign: 'left', fontWeight: 400,
                                        marginTop: 12, marginBottom: 12,
                                        fontSize: 14, color:'black',
                                    }}>Avez-vous une compte? <span style={{ fontWeight: 600, cursor: 'pointer' }} onClick={handleNext}>Créer ici.</span></div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div style={{
                            width: 600, minHeight: 200, zIndex:1,
                            background: '#ffffffd2', color: '#00b2fee1',
                            borderRadius: 10, padding: 10, textAlign: 'center',
                            display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 10,
                        }}>
                            <div style={{ fontWeight: 800, fontSize: 40, }}>Création de compte</div>
                            <div style={{
                                width: '94%',
                            }}>
                                <div style={{
                                    minHeight: 200, display: 'flex',
                                    justifyContent: 'space-around', flexWrap: 'wrap',
                                    paddingBlock: 5, paddingInline: 10,
                                }}>
                                    <div style={{ width: '48%', paddingBottom: 2 }}>
                                        <Input
                                            onChange={handleOnChange}
                                            name="username"
                                            bgcolor='white'
                                            iconColor='black'
                                            Icon={FaUser}
                                            placeholder='Entrez votre nom'
                                            error={inputError.username}
                                            value={input.username}
                                        />
                                    </div>
                                    <div style={{ width: '48%', paddingBottom: 2 }}>
                                        <Input 
                                            onChange={handleOnChange}
                                            name="email"
                                            bgcolor='white' 
                                            iconColor='black' 
                                            Icon={ImMail4} 
                                            placeholder='Entrez votre adresse e-mail' 
                                            error={inputError.email}
                                            value={input.email}
                                        />
                                    </div>
                                    {/* <div style={{ width: '48%', paddingBottom: 2 }}>
                                        <Input 
                                            onChange={handleOnChange}
                                            name="adresse"
                                            bgcolor='white' 
                                            iconColor='black' 
                                            Icon={FaMapMarkerAlt} 
                                            placeholder='Entrez votre Adresse' 
                                            error={inputError.adresse}
                                        />
                                    </div> */}
                                    <div style={{ width: '48%', paddingBottom: 2 }}>
                                        <Input 
                                            onChange={handleOnChange}
                                            name="phone"
                                            bgcolor='white' 
                                            iconColor='black' 
                                            type='number' 
                                            Icon={MdPhoneAndroid} 
                                            placeholder='Entrez votre numéro tel' 
                                            error={inputError.phone}
                                            value={input.phone}
                                        />
                                    </div>
                                    <div style={{ width: '48%', paddingBottom: 2 }}>
                                        <InputImg
                                            setFile={setFile} 
                                            error={inputError.fileerror}
                                            handelChange={onChangeFile}
                                        />
                                    </div>
                                    {/* <div style={{ width: '48%', paddingBottom: 2 }}>
                                    </div> */}
                                    <div style={{ width: '48%', paddingBottom: 2 }}>
                                        <Input 
                                            onChange={handleOnChange}
                                            name="password"
                                            bgcolor='white' 
                                            password 
                                            iconColor='black' 
                                            Icon={MdLockPerson} 
                                            placeholder='Entrez votre mot de passe' 
                                            error={inputError.password}
                                            value={input.password}
                                            // value={input.password}
                                        />
                                    </div>
                                    <div style={{ width: '48%', paddingBottom: 2 }}>
                                        <Input 
                                            onChange={handleOnChange}
                                            name="passwordconf"
                                            bgcolor='white' 
                                            password
                                            iconColor='black' 
                                            Icon={MdLockPerson} 
                                            placeholder='Comfirmez votre mot de pass'
                                            error={inputError.passwordconf}
                                            value={input.passwordconf}
                                        />
                                    </div>
                                    <div style={{ width: '48%', paddingBottom: 2 }}></div>
                                </div>
                                <div style={{ marginInline: 15 }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        fontSize: 15,
                                    }}>
                                        <div style={{ width: 350 }}>
                                            <Button title='Enregistrer' color={'#00b2fee1'} onClick={handleRegister} loanding={loanding} />
                                        </div>
                                    </div>

                                    <div style={{
                                        textAlign: 'left', fontWeight: 400,
                                        marginTop: 12, marginBottom: 12,
                                        fontSize: 14, color:'black',
                                    }}>Si vous avez une compte. <span style={{ fontWeight: 600, cursor: 'pointer' }} onClick={handleBack}>Vas se connecter.</span></div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
            }
        </Background>
    )
}

export default LoginView
