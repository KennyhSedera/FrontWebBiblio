import React from 'react';
import '../dashboard/cardDash.css';
import { getImg } from '../../services/getImg';
import Button from '../../components/Button';
import { valider } from '../../services/userService';
import Alert from '../../components/alert/Alert'

function CardUser({item, onclose=()=>{}}) {
  const [loand, setLoand]= React.useState(false)
  const [alertType, setAlertType] = React.useState('success');
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState('null');
  const validate = ({id}) => {
    setLoand(true)
    valider(id)
    .then((res) => {
        setAlertOpen(true);
        setAlertMsg(res.data.succee);
        setAlertType('success');
        setLoand(false)
        onclose()
    }).catch((err) => {
        console.log(err);
    });
  }
  return (
   <div className="containercard">
      <div className="tBox-wrap">
        <span className="tHover"></span>
        <span className="tHover"></span>
        <span className="tHover"></span>
        <span className="tHover"></span>
        <span className="tHover"></span>
        <span className="tHover"></span>
        <span className="tHover"></span>
        <span className="tHover"></span>
        <span className="tHover"></span>
        <div className='tBox'>
          <img
            src={getImg(item.user_profil)}
            alt="icon"
          /> 
          <div style={{marginBlock:10}}>
            <div style={{fontSize:16}}><strong>Nom: </strong>{item.user_name}</div>
            <div style={{fontSize:16}}><strong>Email: </strong>{item.user_email}</div>
            <div style={{fontSize:16}}><strong>Contact: </strong>{item.user_contact}</div>
          </div>
          <div style={{ width: '80%', zIndex:99 }}>
            <Button
              title={'Valider'}
              color={'#1e88e5'}
              textcolor={'white'}
              loanding={loand}
              onClick={() => validate(item.id_user)}
            />
          </div>
        </div>
      </div>
      <Alert open={alertOpen} Message={alertMsg} type={alertType} />
    </div>
  )
}

export default CardUser
