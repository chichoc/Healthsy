import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PageContext } from '../contexts/PageContext';
import { Nav, Ul } from '../styles/main_top';

const MainTopLogin = () => {
  const { title } = useContext(PageContext);
  return (
    <Nav className='horizontal_flex' align='center'>
      <Link to='/help'>[공지사항] {title}</Link>
      <Ul className='horizontal_flex' align='center'>
        <li>
          <Link to='/mypage'>
            <img className='wish' src='./images/wish(1).png' alt='찜'></img>
          </Link>
        </li>
        <li>
          <Link to='/mypage'>
            <img className='cart' src='./images/cart.png' alt='장바구니'></img>
          </Link>
        </li>
        <li>
          <Link to='/mypage'>
            <img className='cart' src='./images/profile.png' alt='마이페이지'></img>
          </Link>
        </li>
        <li>
          <Link to='/login'>로그아웃</Link>
          {/* 레디스에서 토큰 삭제 */}
        </li>
      </Ul>
    </Nav>
  );
};

export default MainTopLogin;
