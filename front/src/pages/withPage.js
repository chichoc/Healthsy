import React, { useState } from 'react';
import MainFooter from '../components/MainFooter';
import MainHeader from '../components/MainHeader';
import MainTop from '../components/MainTop';
import noticeList from '../assets/api/datanotice';
import MainTopLogin from '../components/MainTopLogin';

const withPage = (WrappedComponent) => {
  const Component = () => {
    const [notice, setNotice] = useState(noticeList);
    const [isLogin, setIsLogin] = useState(false);
    const title = notice[notice.length - 1].title;
    return (
      <>
        {isLogin ? <MainTopLogin title={title} /> : <MainTop title={title} />}
        <MainHeader />
        <WrappedComponent />
        <MainFooter />
      </>
    );
  };
  return Component;
};

export default withPage;
