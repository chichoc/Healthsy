import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import MainFooter from '../components/MainFooter';
import MainHeader from '../components/MainHeader';
import MainTop from '../components/MainTop';
import MainTopLogin from '../components/MainTopLogin';
import JoinProvider from '../contexts/JoinContext';
import { PageContext } from '../contexts/PageContext';

const withPage = (WrappedComponent) => {
  const Component = () => {
    const { isLogin, isLogout, setIsLogin, navigate } = useContext(PageContext);

    useEffect(() => {
      // 로그아웃 직후가 아닌 경우
      if (!isLogin && !isLogout) {
        axios.post('http://localhost:8888/login/authorization', {}, { withCredentials: true }).then((res, req) => {
          if (!res.data.token) return;
          if (res.data.updated) setIsLogin(true);
          else {
            if (window.location.pathname !== '/login') alert('로그인이 만료되어 다시 로그인 부탁드립니다');
            navigate('/login');
            res.error && console.log(res.error);
          }
        });
      }
    }, []);

    return (
      <>
        {isLogin ? <MainTopLogin /> : <MainTop />}
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
