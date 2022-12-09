import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import withPage from './withPage';
import MyNav from '../components/mypage/MyNav';
import MyMain from '../components/mypage/MyMain';

const MyPage = () => {
  const isLoggedin = useSelector((state) => state.page.isLoggedIn);
  return (
    <div className='horizontal_flex' style={{ flexWrap: 'nowrap' }}>
      {!isLoggedin && <Navigate to='/login' />}
      <MyNav />
      <MyMain />
    </div>
  );
};

export default withPage(MyPage);
