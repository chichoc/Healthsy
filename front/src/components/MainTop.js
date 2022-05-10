import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PageContext } from '../contexts/PageContext';
import { Nav, Ul } from '../styles/main_top';
import axios from 'axios';

const MainTop = () => {
  const { navigate, noticeTitle, isLogin, setIsLogin } = useContext(PageContext);

  const onLogout = () => {
    axios.post('http://localhost:8888/login/logout', {}, { withCredentials: true }).then((res) => {
      setIsLogin(false);
      navigate('/');
    });
  };

  return (
    <Nav className='horizontal_flex' align='center'>
      <Link to='/help'>[공지사항] {noticeTitle}</Link>

      {isLogin ? (
        // 로그인한 상태
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
            <button onClick={onLogout}>로그아웃</button>
          </li>
        </Ul>
      ) : (
        // 로그인하지 않은 상태
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
      )}
    </Nav>
  );
};

export default MainTop;
