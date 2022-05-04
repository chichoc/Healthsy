import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PageContext } from '../contexts/PageContext';
import { Nav, Ul } from '../styles/main_top';

const MainTopLogin = () => {
  const { navigate, noticeTitle, setIsLogin, setIsLogout } = useContext(PageContext);

  const logOut = () => {
    axios.post('http://localhost:8888/login/logout', {}, { withCredentials: true }).then((res) => {
      setIsLogout(true);
      setIsLogin(false);
      navigate('/');
    });
  };
  return (
    <Nav className='horizontal_flex' align='center'>
      <Link to='/help'>[공지사항] {noticeTitle}</Link>
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
          <button onClick={logOut}>로그아웃</button>
        </li>
      </Ul>
    </Nav>
  );
};

export default MainTopLogin;
