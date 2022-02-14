import React, { useState } from 'react';
import noticeList from '../assets/api/datanotice';
import MainTop from '../components/MainTop';
import MainHeader from '../components/MainHeader';
import MainContent from '../components/MainContent';
import MainFooter from '../components/MainFooter';

const Index = () => {
  const [notice, setNotice] = useState(noticeList);
  const [isLogin, setIsLogin] = useState(false);
  const title = notice[notice.length - 1].title;

  return (
    <>
      <MainTop title={title} isLogin={isLogin} />
      <MainHeader isLogin={isLogin} setIsLogin={setIsLogin} />
      <MainContent />
      <MainFooter />
    </>
  );
};

export default Index;
