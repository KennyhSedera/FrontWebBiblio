import React, { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { getAllUsers } from '../../services/userService';
import { useEffect } from 'react';

function UserView() {
  const [users, setUsers] = useState([]);
  const [input, setInput] = React.useState({
        search: '',
    });

    // Créez une copie de la liste de membres initiale
  const [initialUsers, setInitialUsers] = React.useState([]);

  useEffect(() => {
    getUserDB()
  }, [])

  const getUserDB = async () => {
    getAllUsers()
    .then((result) => {
      setUsers(result.data.users)
      setInitialUsers(result.data.users)
    }).catch((err) => {
      console.log(err);
    });
  }

  const [currentPage, setCurrentPage] = React.useState(1);
    const dataPerPage = 8;
    const lastIndex = currentPage * dataPerPage;
    const firstIndex = lastIndex - dataPerPage;

    const nbPage = Math.ceil(users.length / dataPerPage);

    const prevPage = () => {
        if (currentPage !== firstIndex && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== lastIndex && currentPage < nbPage) {
            setCurrentPage(currentPage + 1);
        }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));

    const filteredUsers = initialUsers.filter((item) => {
      return input.toLowerCase() === ''
        ? item
        : item.user_Name.toLowerCase().includes(value.toLowerCase()) ||
          item.user_Email.toLowerCase().includes(value.toLowerCase()) ||
          item.user_Adress.toLowerCase().includes(value.toLowerCase())
    });

    setUsers(filteredUsers);
  };
  const CardUser = (data) => {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
        borderRadius: 10,
      }}>
        {data.user_Name}
      </div>
    )
  }
  return (
    <MainLayout
      handleOnChange={handleOnChange}
      search title='Utilisateurs'
      nextPage={nextPage} prevPage={prevPage}
      lastIndex={lastIndex} firstIndex={firstIndex}
      nbPage={nbPage} currentPage={currentPage}
    >
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ height: 400, width: '100%' }}>
          <div className='contentBook' style={{
            display: 'flex', flexDirection: 'column', fontSize: 14, color: 'black',
            gap: 5, borderRadius: 20, paddingInline: 10,
          }}>
            <div style={{
              perspective: '1000px', display: 'flex', alignItems: 'center',
              flexWrap: 'wrap', justifyContent: 'flex-start', gap: 10,
              paddingInline: '3%',
            }}>
              {users.length > 0 ? users
                .map((item) => (
                  <CardUser data={item} />
                )) : (
                <div style={{
                  width:'100%',
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 800,
                  marginTop:50
                }}>Aucun utilisateur enregistrer .</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default UserView
