import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Ul } from '../styles/main_top';

const MainTop = ({ title }) => {
  return (
    <Nav className='horizontal_flex' align='center'>
      <Link to='/help'>[공지사항] {title}</Link>
      <Ul className='horizontal_flex' align='center'>
        <li>
          <Link to='/login'>
            <img className='wish' src='./images/wish(1).png' alt='찜'></img>
          </Link>
        </li>
        <li>
          <Link to='/login'>
            <img className='cart' src='./images/cart.png' alt='장바구니'></img>
          </Link>
        </li>
        <li>
          <Link to='/login'>로그인</Link>
        </li>
      </Ul>
    </Nav>
  );
};

export default MainTop;