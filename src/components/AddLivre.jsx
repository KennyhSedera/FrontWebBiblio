import React from "react"
import '../index.css'
import { MdClose } from "react-icons/md";
import Input from "./Input";
import Button from "./Button";
// import moment from "moment";
import DatePickerInput from "./datepicker/DatePikers";
import InputImg from "./inputImg/InputImg";
import Alert from "./alert/Alert";
import { createLivre, updateLivre } from "../services/livreService";

export default function AddLivre({ title, onClose = () => { }, value, }) {
    const inputs = {
        numlivre: '', titrelivre: '', auteurlivre: '', collectionlivre: '',
        editionlivre: '', notationlivre: '', formatlivre: '',
        nbpagelivre: '', emplacementlivre: '', fileerror:'',
    }
    const inputName = {
        numlivre: 'numlivre', titrelivre: 'titrelivre',
        auteurlivre: 'auteurlivre', collectionlivre: 'collectionlivre',
        editionlivre: 'editionlivre', fileerror:'fileerror',
        notationlivre: 'notationlivre', formatlivre: 'formatlivre',
        nbpagelivre: 'nbpagelivre', emplacementlivre: 'emplacementlivre',
        
    }
    
    // const setDate = ({ date }) => {
    //     return moment(date).format('DD MM YYYY ');
    // }
    React.useEffect(() => {
        if (value) {
            setInput(prevState => ({ ...prevState, [inputName.numlivre]: value.id_livre }));
            setInput(prevState => ({ ...prevState, [inputName.titrelivre]: value.titre_livre }));
            setInput(prevState => ({ ...prevState, [inputName.auteurlivre]: value.auteur_livre }));
            setInput(prevState => ({ ...prevState, [inputName.collectionlivre]: value.collection_livre }));
            setInput(prevState => ({ ...prevState, [inputName.editionlivre]: value.edition_livre }));
            setInput(prevState => ({ ...prevState, [inputName.notationlivre]: value.notation_livre }));
            setInput(prevState => ({ ...prevState, [inputName.formatlivre]: value.format_livre }));
            setInput(prevState => ({ ...prevState, [inputName.nbpagelivre]: value.nb_page_livre }));
            setInput(prevState => ({ ...prevState, [inputName.emplacementlivre]: value.emplacement_livre }));
            setDateEdition(value.date_edition_livre);
            setDateEnrg(value.date_enregistrement_livre)
            setBtnTitle('Modifier')
        }
    }, [value, inputName])

    const [btnTitle, setBtnTitle] = React.useState('Enregistrer')
    const [input, setInput] = React.useState(inputs);
    const [error, setErrors] = React.useState(inputs);
    const [file, setFile] = React.useState(null);
    const [dateeditionlivre, setDateEdition] = React.useState(new Date());
    const [dateenrglivre, setDateEnrg] = React.useState(new Date());
    const [loading, setLoading] = React.useState(false);
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInput(prevState => ({ ...prevState, [name]: value }));
        setErrors(prevState => ({ ...prevState, [name]: '' }));
    }
    const onChangeFile = () => {
        setErrors(prevState=>({...prevState, [inputName.fileerror]:''}))
    }
    const validate = () => {
        if (input.numlivre==='') {
            setErrors(prevState=>({...prevState, [inputName.numlivre]:'Cette champ ne doit pas être vide!'}))
        } else if(input.titrelivre==='') {
            setErrors(prevState=>({...prevState, [inputName.titrelivre]:'Cette champ ne doit pas être vide!'}))
        } else if(input.auteurlivre==='') {
            setErrors(prevState=>({...prevState, [inputName.auteurlivre]:'Cette champ ne doit pas être vide!'}))
        } else if(input.collectionlivre==='') {
            setErrors(prevState=>({...prevState, [inputName.collectionlivre]:'Cette champ ne doit pas être vide!'}))
        } else if(input.editionlivre==='') {
            setErrors(prevState=>({...prevState, [inputName.editionlivre]:'Cette champ ne doit pas être vide!'}))
        } else if(input.notationlivre==='') {
            setErrors(prevState=>({...prevState, [inputName.notationlivre]:'Cette champ ne doit pas être vide!'}))
        } else if(input.formatlivre==='') {
            setErrors(prevState=>({...prevState, [inputName.formatlivre]:'Cette champ ne doit pas être vide!'}))
        } else if(input.nbpagelivre==='') {
            setErrors(prevState=>({...prevState, [inputName.nbpagelivre]:'Cette champ ne doit pas être vide!'}))
        } else if(input.emplacementlivre==='') {
            setErrors(prevState=>({...prevState, [inputName.emplacementlivre]:'Cette champ ne doit pas être vide!'}))
        } else if(file===null) {
            setErrors(prevState=>({...prevState, [inputName.fileerror]:'Choisissez une image!'}))
        } else {
            const formData = new FormData();
            formData.append("photo_livre", file);
            formData.append("id_livre", input.numlivre);
            formData.append("titre_livre", input.titrelivre);
            formData.append("auteur_livre", input.auteurlivre);
            formData.append("collection_livre", input.collectionlivre);
            formData.append("edition_livre", input.editionlivre);
            formData.append("notation_livre", input.notationlivre);
            formData.append("format_livre", input.formatlivre);
            formData.append("nb_page_livre", input.nbpagelivre);
            formData.append("emplacement_livre", input.emplacementlivre);
            formData.append("date_edition_livre", dateeditionlivre);
            formData.append("date_enregistrement_livre", dateenrglivre);
            if (!loading) {
                setLoading(true);
            }
            if (btnTitle === 'Enregistrer') {
                createLivre(formData)
                .then((res) => {
                    setAlertOpen(true);
                    setAlertMsg(res.data.succee);
                    setAlertType('success')
                    setInput(inputs);
                    setErrors(inputs);
                    setLoading(false);
                    setTimeout(() => {
                    onClose();
                    setAlertOpen(false);
                    }, 3000);
                }).catch((err) => {
                    console.log(err);
                }); 
            } else {
                updateLivre(formData)
                .then((res) => {
                    setAlertOpen(true);
                    setAlertMsg(res.data.succee);
                    setAlertType('success')
                    setInput(inputs);
                    setErrors(inputs);
                    setLoading(false);
                    setTimeout(() => {
                    onClose();
                    setAlertOpen(false);
                    }, 3000);
                }).catch((err) => {
                    console.log(err);
                }); 
            }
            
        }
    }
    
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertMsg, setAlertMsg] = React.useState('')
    const [alertType, setAlertType] = React.useState('success')
    return (
        <div className="modalcard" style={{
            width: 700, minHeight: 200, color: 'black',
            padding: 12, borderRadius: 10, background: '#fffffff0',
        }}>

            <div className="modalheadear" style={{
                textAlign: 'center', fontWeight: 'bold', fontSize: 30, display: 'flex',
                alignItems: 'center', justifyContent: 'center', paddingInlineStart: 15,
            }}>
                <span>{title} Livre</span>
                <span 
                    className="btnclosemodal" 
                    style={{ background: '#ffffffee' }} 
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
                        onChange={handleOnChange}
                        name="numlivre"
                        error={error.numlivre}
                        value={input.numlivre}
                        // Icon={MdNoteAlt}
                        placeholder='Numero du livre'
                        iconColor='black'
                        bgcolor='white'
                    />
                </div>
                <div style={{ width: '32%', }}>
                    <Input
                        onChange={handleOnChange}
                        name="titrelivre"
                        error={error.titrelivre}
                        value={input.titrelivre}
                        // Icon={FaBook}
                        placeholder='Entrez la titre du livre'
                        iconColor='black'
                        bgcolor='white'
                    />
                </div>
                <div style={{ width: '32%', }}>
                    <Input
                        onChange={handleOnChange}
                        name="auteurlivre"
                        error={error.auteurlivre}
                        value={input.auteurlivre}
                        // Icon={FaUser}
                        placeholder="Entrez l'auteur du livre"
                        iconColor='black'
                        bgcolor='white'
                    />
                </div>
                <div style={{ width: '32%', }}>
                    <Input
                        onChange={handleOnChange}
                        name="collectionlivre"
                        error={error.collectionlivre}
                        value={input.collectionlivre}
                        // Icon={FaUser}
                        placeholder='Entrez collection du livre'
                        iconColor='black'
                        bgcolor='white'
                    />
                </div>
                <div style={{ width: '32%', }}>
                    <Input
                        onChange={handleOnChange}
                        name="editionlivre"
                        error={error.editionlivre}
                        value={input.editionlivre}
                        // Icon={FaUser}
                        placeholder='Entrez edition du livre'
                        iconColor='black'
                        bgcolor='white'
                    />
                </div>
                <div style={{ width: '32%', }}>
                    <DatePickerInput  onDateChange={setDateEdition} value={input.dateeditionlivre} />
                </div>
                <div style={{ width: '32%', }}>
                    <Input
                        onChange={handleOnChange}
                        name="notationlivre"
                        value={input.notationlivre}
                        error={error.notationlivre}
                        placeholder='Entrez notation du livre'
                        iconColor='black'
                        bgcolor='white'
                    />
                </div>
                <div style={{ width: '32%', }}>
                    <Input
                        onChange={handleOnChange}
                        name="formatlivre"
                        error={error.formatlivre}
                        value={input.formatlivre}
                        placeholder='Entrez format du livre'
                        iconColor='black'
                        bgcolor='white'
                    />
                </div>
                <div style={{ width: '32%', }}>
                    <Input
                        onChange={handleOnChange}
                        name="nbpagelivre"
                        type='number'
                        error={error.nbpagelivre}
                        value={input.nbpagelivre}
                        placeholder='Entrez le nombre de page'
                        iconColor='black'
                        bgcolor='white'
                    />
                </div>
                <div style={{ width: '32%', }}>
                    <Input
                        onChange={handleOnChange}
                        name="emplacementlivre"
                        error={error.emplacementlivre}
                        value={input.emplacementlivre}
                        placeholder="Entrez l'emplacement du livre"
                        iconColor='black'
                        bgcolor='white'
                    />
                </div>
                <div style={{ width: '32%', }}>
                    <DatePickerInput
                        onDateChange={setDateEnrg}
                    />
                </div>
                <div style={{ width: '32%', marginBottom: 20, }}>
                    <InputImg
                        setFile={setFile}
                        handelChange={onChangeFile}
                        error={error.fileerror}
                    />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ width: '50%', position: 'relative' }}>
                    <Button
                        onClick={validate}
                        large
                        color='#00b2fee1'
                        title={btnTitle}
                        textsize={15}
                        loanding={loading}
                    />
                </div>
            </div>
        <Alert open={alertOpen} Message={alertMsg} type={alertType} />
        </div>
    )
}