import React from 'react';
import './book.css';
import {
    // FaEye,
    FaRegEdit, FaTrashAlt
} from 'react-icons/fa';
import { getImg } from '../../services/getImg';

const BookView = ({item, editItem=()=>{}, deleteItem=()=>{}}) => {
   
    // Ajoutez un état pour gérer le délai du z-index
    const [coverZIndex, setCoverZIndex] = React.useState(1);

    // Fonction pour définir le z-index du cover après un délai
    const setCoverZIndexWithDelay = () => {
        setTimeout(() => setCoverZIndex(-1), 900);
    };
    return (
        <div 
            className={`book ${coverZIndex === -1 ? 'hide-cover' : ''}`}
            key={item.id_livre}
            onMouseEnter={setCoverZIndexWithDelay}
            onMouseLeave={()=>setTimeout(() => setCoverZIndex(1), 901)}
        >
            <div className="cover">
                <img
                src={getImg(item.photo_livre)}
                alt="tsy hita"
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '0px 10px 10px 0px',
                    objectFit: 'cover',
                }}
                />
            </div>
            <div className="last-page">
                <div style={{fontSize:14}}>Title:</div>
                <span>{item.titre_livre}</span>
                <div style={{ fontWeight: 500, fontSize: 16, marginTop: 5 }}>
                    Auteur: <strong style={{ fontSize: 16 }}>{item.auteur_livre}</strong>
                </div>
                <div className="action">
                {item.status_livre==='Dispo' && <FaTrashAlt
                    style={{ cursor: 'pointer' }}
                    color="red"
                    onClick={() => deleteItem(item)}
                />}
                {/* <FaEye
                    style={{ cursor: 'pointer' }}
                    color="grey"
                    onClick={() => editItem(item)}
                /> */}
                <FaRegEdit
                    style={{ cursor: 'pointer', marginRight:5 }}
                    color="blue"
                    onClick={() => editItem(item)}
                />
                </div>
                <div className="nbpage" style={{ paddingInline: 5 }}>
                <strong>{item.nb_page_livre} </strong>pages
                </div>
            </div>
            <div className="back-cover">
                <img
                src={getImg(item.photo_livre)}
                alt="tsy hita"
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '0px 10px 10px 0px',
                }}
                />
            </div>
        </div>
    );
};

export default BookView;
