import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import withPage from './withPage';
import MyNav from '../components/mypage/MyNav';
import MyMain from '../components/mypage/MyMain';

const MyPage = () => {
  const isLogin = useSelector((state) => state.page.isLogin);
  return (
    <div className='horizontal_flex'>
      {isLogin || <Navigate to='/login' replace={true} />}
      <MyNav />
      <MyMain />
    </div>
  );
};

export default withPage(MyPage);
