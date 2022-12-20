import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import withPage from './withPage';
import MyNav from '../components/mypage/MyNav';
import MyMain from '../components/mypage/MyMain';
import { DivMyPage } from '../styles/mypage/my_page';

const MyPage = () => {
  const isLoggedin = useSelector((state) => state.page.isLoggedIn);
  return (
    <DivMyPage className='horizontal_flex'>
      {!isLoggedin && <Navigate to='/login' />}
      <MyNav />
      <MyMain />
    </DivMyPage>
  );
};

export default withPage(MyPage);
