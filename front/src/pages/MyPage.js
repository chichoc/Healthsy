import React from 'react';
import MyNav from '../components/mypage/MyNav';
import MyMain from '../components/mypage/MyMain';
import withPage from './withPage';

const MyPage = () => {
  return (
    <div className='horizontal_flex'>
      <MyNav />
      <MyMain />
    </div>
  );
};

export default withPage(MyPage);
