import axios from 'axios';
import React, { useContext, useLayoutEffect } from 'react';
import MainFooter from '../components/MainFooter';
import MainHeader from '../components/MainHeader';
import MainTop from '../components/MainTop';
import JoinProvider from '../contexts/JoinContext';
import { PageContext } from '../contexts/PageContext';

const withPage = (WrappedComponent) => {
  const Component = () => {
    const { isLogin, setIsLogin, navigate } = useContext(PageContext);

    useLayoutEffect(() => {
      if (!isLogin) {
        axios.post('http://localhost:8888/login/authorization', {}).then((res, req) => {
          if (!res.data.token) return;
          if (res.data.updated) setIsLogin(true);
          else {
            if (window.location.pathname !== '/login') alert('로그인이 만료되어 다시 로그인 부탁드립니다');
            res.error && console.log(res.error);
            navigate('/login');
          }
        });
      }
    }, []);

    return (
      <>
        <MainTop />
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
