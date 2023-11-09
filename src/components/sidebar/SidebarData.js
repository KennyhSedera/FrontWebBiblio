import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

export const SidebarData = [
  
    { id: 1, title: 'Tableau de bord', path: '/accueil', icon: <FaIcons.FaHome />, link:true },
    { id: 2, title: 'Adhérents', icon: <FaIcons.FaUsers />,
    iconClosed: <MdKeyboardArrowDown />,
    iconOpened: <MdKeyboardArrowUp />,
    link:false,
    subNav: [
      {
        title: 'Tous les Adhérents',
        path: '/membre',
        icon: <FaIcons.FaUsers />
      },
      {
        title: 'Adhérents Inscrit',
        path: '/inscription',
        icon: <FaIcons.FaUsers />
      }
    ] },
    { id: 3, title: 'Livres', icon: <FaIcons.FaBook />,
    iconClosed: <MdKeyboardArrowDown />,
    iconOpened: <MdKeyboardArrowUp />,
    link:false,
    subNav: [
      {
        title: 'Livres',
        path: '/livre',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Livres disponibles',
        path: '/livredispo',
        icon: <IoIcons.IoIosPaper />
      }
    ] },
    { id: 4, title: 'Emprunts', icon: <FaIcons.FaBook />,
    iconClosed: <MdKeyboardArrowDown />,
    iconOpened: <MdKeyboardArrowUp />,
    link:false,
    subNav: [
      {
        title: 'Emprunts',
        path: '/emprunt',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Emprunt en cours',
        path: '/empruntencours',
        icon: <IoIcons.IoIosPaper />
      }
    ] },
    { id: 5, title: 'Statistique', path: '/statistique', icon: <FaIcons.FaChartPie />, link:true },
    { id: 7, title: 'Utilisateur', path: '/utilisateur', icon: <FaIcons.FaUserAlt />, link:true },
    // { id: 6, title: 'Profile', path: '/profile', icon: <FaIcons.FaUserCog />, link:true },
];