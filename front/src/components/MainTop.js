import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onLogOut } from '../store/features/pageSlice';
import { BsHeart } from 'react-icons/bs';
import { BsPerson } from 'react-icons/bs';
import axios from 'axios';
import dataNotice from '../assets/api/dataNotice';
import { Nav, Ul, ClickMenu } from '../styles/main_top';

const MainTop = () => {
  const [notice, setNotice] = useState(dataNotice);
  const [openMenu, setOpenMenu] = useState(false);
  const noticeTitle = notice[notice.length - 1].title;

  const page = useSelector((state) => state.page);
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

      <Ul className='horizontal_flex' align='center'>
        <li>
          <Link to='/mypage/like'>
            <BsHeart title={'찜'} size={20} />
          </Link>
        </li>
        {page.isLogin ? (
          // 로그인한 상태
          <li onClick={() => setOpenMenu(!openMenu)}>
            <BsPerson title={'마이페이지'} size={24} />
            <ClickMenu open={openMenu}>
              <li>
                <Link to='/mypage'>마이페이지</Link>
              </li>
              <li onClick={onLogout}>로그아웃</li>
            </ClickMenu>
          </li>
        ) : (
          // 로그인하지 않은 상태
          <li>
            <Link to='/login'>로그인</Link>
          </li>
        )}
      </Ul>
    </Nav>
  );
};

export default MainTop;
