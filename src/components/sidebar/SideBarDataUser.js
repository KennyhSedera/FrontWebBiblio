import React from 'react';
import * as FaIcons from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

export const SidebarDataUser = [
  
    { id: 1, title: 'Tableau de bord', path: '/accueil', icon: <FaIcons.FaHome />, link:true },
    { id: 2, title: 'Adhérents', icon: <FaIcons.FaUsers />,
    iconClosed: <MdKeyboardArrowDown />,
    iconOpened: <MdKeyboardArrowUp />,
    link:false,
    subNav: [
      {
        title: 'Adhérents',
        path: '/membre',
        icon: <FaIcons.FaUsers />
      },
      {
        title: 'Adhérents Inscrit',
        path: '/inscription',
        icon: <FaIcons.FaUsers />
      }
    ] },
    { id: 3, title: 'Livres', icon: <FaIcons.FaBook />, path: '/livre', link:true },
    { id: 4, title: 'Emprunts', icon: <FaIcons.FaBook />, path: '/emprunt', link:true },
    { id: 5, title: 'Réservation', icon: <FaIcons.FaBook />, path: '/reservationAll', link:true },
];