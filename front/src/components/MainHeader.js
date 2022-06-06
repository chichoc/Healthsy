import React from 'react';
import { Link } from 'react-router-dom';
import { Header, HeaderLogo, Ul } from '../styles/main_header';
import dataMainMenu from '../assets/api/dataMainMenu';
import { BsSearch } from 'react-icons/bs';

const MainHeader = () => {
  return (
    <Header className='horizontal_flex' align='center'>
      <HeaderLogo>
        <Link to='/' className='logo'>
          Healthsy
        </Link>
      </HeaderLogo>
      <Ul className='horizontal_flex' align='center'>
        {dataMainMenu.map((menu, index) => (
          <li key={index.toString()}>
            <Link to={menu.link}>{menu.name}</Link>
          </li>
        ))}
        <li>
          <BsSearch title={'검색'} size={19} />
        </li>
      </Ul>
    </Header>
  );
};

export default MainHeader;
