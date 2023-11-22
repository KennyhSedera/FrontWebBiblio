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
  return (
    <MainLayout
      handleOnChange={handleOnChange}
      search title='Utilisateurs'
      nextPage={nextPage} prevPage={prevPage}
      lastIndex={lastIndex} firstIndex={firstIndex}
      nbPage={nbPage} currentPage={currentPage}
    >
      
      <div
        style={{
          width: '100%',
          height: 'calc(100% - 20px)',
          borderRadius: 10,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          paddingBlock:2,
        }}
      >
        {console.log(users)}
      </div>
    </MainLayout>
  )
}

export default UserView
