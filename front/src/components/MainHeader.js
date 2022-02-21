import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Nav, Ul } from '../styles/main_header';

const MainHeader = () => {
  return (
    <Header className='horizontal_flex' align='center'>
      <span>
        <Link to='/' className='logo'>
          Healthsy
        </Link>
      </span>
      <Nav>
        <Ul className='horizontal_flex' align='end'>
          <li>
            <Link to='/sale'>성분별</Link>
          </li>
          <li>
            <Link to='/sale'>브랜드별</Link>
          </li>
          <li>
            <Link to='/sale'>대상별</Link>
          </li>
          <li>
            <Link to='/'>비교 및 추천</Link>
          </li>
          <li>
            <Link to='/help'>고객센터</Link>
          </li>
          <li>
            <img className='search' src='./images/search.png' alt='검색'></img>
          </li>
        </Ul>
      </Nav>
    </Header>
  );
};

export default MainHeader;
