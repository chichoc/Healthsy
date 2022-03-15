import React, { useContext } from 'react';
import MainFooter from '../components/MainFooter';
import MainHeader from '../components/MainHeader';
import MainTop from '../components/MainTop';
import MainTopLogin from '../components/MainTopLogin';
import JoinProvider from '../contexts/JoinContext';
import { PageContext } from '../contexts/PageContext';

const withPage = (WrappedComponent) => {
  const Component = () => {
    const { isLogin, title } = useContext(PageContext);

    return (
      <>
        {isLogin ? <MainTopLogin title={title} /> : <MainTop title={title} />}
        <MainHeader />
        <JoinProvider>
          <WrappedComponent />
        </JoinProvider>
        <MainFooter />
      </>
    );
  };
  return Component;
};

export default withPage;
