import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Ul } from '../styles/main_top';

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

export default MainTop;
