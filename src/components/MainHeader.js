import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

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
          <li>검색</li>
        </Ul>
      </Nav>
    </Header>
  );
};

const Header = styled.header`
  /* background-color: red; */
  height: 100px;
  align-items: ${(props) => props.align};
  padding: 0 120px;
  box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.3);
`;

const Nav = styled.nav``;

const Ul = styled.ul`
  align-items: ${(props) => props.align};
  li {
    padding: 0 10px;
    /* background-color: blue; */
  }
`;

export default MainHeader;
