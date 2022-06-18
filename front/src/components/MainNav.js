import React from 'react';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import dataMainMenu from '../assets/api/dataMainMenu';
import { NavMain, LogoMain, UlMain } from '../styles/main_nav';

const MainNav = () => {
  return (
    <NavMain className='horizontal_flex' align='center'>
      <LogoMain>
        <Link to='/' className='logo'>
          Healthsy
        </Link>
      </LogoMain>
      <UlMain className='horizontal_flex' align='center'>
        {dataMainMenu.map((menu, index) => (
          <li key={index.toString()}>
            <Link to={menu.link}>{menu.name}</Link>
          </li>
        ))}
        <li>
          <BsSearch title={'검색'} size={19} />
        </li>
      </UlMain>
    </NavMain>
  );
};

export default MainNav;
