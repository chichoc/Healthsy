import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Nav, Ul } from '../styles/main_header';

const MainHeader = () => {
  const menu = [
    { name: '성분별', link: '/sale' },
    { name: '브랜드별', link: '/sale' },
    { name: '대상별', link: '/sale' },
    { name: '비교 및 추천', link: '/mypage' },
    { name: '고객센터', link: '/help' },
  ];
  return (
    <Header className='horizontal_flex' align='center'>
      <span>
        <Link to='/' className='logo'>
          Healthsy
        </Link>
      </span>
      <Nav>
        <Ul className='horizontal_flex' align='end'>
          {menu.map((menu, index) => (
            <li key={index.toString()}>
              <Link to={menu.link}>{menu.name}</Link>
            </li>
          ))}
          <li>
            <img className='search' src='./images/search.png' alt='검색'></img>
          </li>
        </Ul>
      </Nav>
    </Header>
  );
};

export default MainHeader;
