import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const MainTop = ({ title, isLogin }) => {
  return (
    <Nav className='horizontal_flex' align='center'>
      <Link to='/help'>[공지사항] {title}</Link>
      <Ul className='horizontal_flex' align='center'>
        <li>
          <Link to='/login'>찜</Link>
        </li>
        <li>
          <Link to='/login'>장바구니</Link>
        </li>
        <li>{isLogin ? <Link to='/login'>마이페이지</Link> : <Link to='/login'>로그인</Link>}</li>
      </Ul>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: #e8f3f1;
  height: 30px;
  align-items: ${(props) => props.align};
  padding: 5px 120px;
`;

const Ul = styled.ul`
  li {
    padding: 0 10px;
    /* background-color: red; */
  }
`;

export default MainTop;
