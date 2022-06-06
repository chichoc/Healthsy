import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onLogOut } from '../store/features/pageSlice';
import { BsHeart } from 'react-icons/bs';
import { BsPerson } from 'react-icons/bs';
import axios from 'axios';
import dataNotice from '../assets/api/dataNotice';
import { Nav, Ul } from '../styles/main_top';

const MainTop = () => {
  const [notice, setNotice] = useState(dataNotice);
  const noticeTitle = notice[notice.length - 1].title;

  const page = useSelector((state) => state.page.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    axios.post('http://localhost:8888/login/logout', {}, { withCredentials: true }).then((res) => {
      dispatch(onLogOut());
      navigate('/');
    });
  };

  return (
    <Nav className='horizontal_flex' align='center'>
      <Link to='/help'>[공지사항] {noticeTitle}</Link>

      {page.isLogin ? (
        // 로그인한 상태
        <Ul className='horizontal_flex' align='center'>
          <li>
            <Link to='/login'>
              <BsHeart title={'찜'} size={20} />
            </Link>
          </li>
          <li>
            <Link to='/mypage'>
              <BsPerson title={'마이페이지'} size={24} />
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
              <BsHeart title={'찜'} size={20} />
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
