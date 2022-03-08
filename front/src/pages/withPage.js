import React, { useState } from 'react';
import MainFooter from '../components/MainFooter';
import MainHeader from '../components/MainHeader';
import MainTop from '../components/MainTop';
import dataNotice from '../assets/api/dataNotice';
import MainTopLogin from '../components/MainTopLogin';

const withPage = (WrappedComponent) => {
  const Component = () => {
    const [notice, setNotice] = useState(dataNotice);
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
