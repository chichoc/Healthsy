import React from 'react';
import MyMain from '../components/mypage/MyMain';
import MyMenu from '../components/mypage/MyMenu';
import withPage from './withPage';

const MyPage = () => {
  return (
    <div className='horizontal_flex'>
      <MyMenu />
      <MyMain />
    </div>
  );
};

export default withPage(MyPage);
