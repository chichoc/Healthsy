import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import Portal from '../Portal';
import SearchForm from './reusable/SearchForm';
import dataMainMenu from '../assets/api/dataMainMenu';
import { AsideMain, NavMain, UlMain } from '../styles/main_nav';

const MainNav = () => {
  const [openSearchForm, setOpenSearchForm] = useState(false);
  const handleSearchForm = () => {
    setOpenSearchForm(!openSearchForm);
  };

  const selectedNavStyle = {
    color: '#000000',
  };

  return (
    <>
      {openSearchForm && (
        <Portal>
          <AsideMain>
            <SearchForm name='searchMain' className='inner_button_left' placeHolder={'제품명 검색'} />
            <button onClick={handleSearchForm}>&#x2715;</button>
          </AsideMain>
        </Portal>
      )}
      <NavMain className='horizontal_flex' searchForm={openSearchForm}>
        <Link to='/' className='logo'>
          Healthsy
        </Link>

        <UlMain className='horizontal_flex'>
          {dataMainMenu.map((menu, index) => (
            <li key={index}>
              <NavLink to={menu.link} style={({ isActive }) => (isActive ? selectedNavStyle : undefined)}>
                {menu.name}
              </NavLink>
            </li>
          ))}
          <li onClick={handleSearchForm}>
            <BsSearch title={'검색'} size={19} color={'#505050'} />
          </li>
        </UlMain>
      </NavMain>
    </>
  );
};

export default MainNav;
