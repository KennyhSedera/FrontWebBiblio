import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../component.css'
import './sidebar.css'

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      {item.link ? <NavLink className='list' to={item.path} key={item.id}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <span className='iconsidebar'>
            {item.icon}
          </span>
          {item.title}
        </div>
      </NavLink> : (<div className='list' style={{cursor:'pointer'}} onClick={item.subNav && showSubnav}>
          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap:10,
        }}>
          <span className='iconsidebar'>
            {item.icon}
          </span>
          {item.title}
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </div>)}
      
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <NavLink className='sublist' to={item.path} key={index}>
              <span className='iconsidebar'>
                {item.icon}
              </span>
              {item.title}
            </NavLink>
          );
        })}
    </>
  );
};

export default SubMenu;