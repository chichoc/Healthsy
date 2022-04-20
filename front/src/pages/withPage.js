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
    const { isLogin, setIsLogin, title, setAuthorizationToken, getCookie, navigate } = useContext(PageContext);

    useEffect(() => {
      if (!isLogin) {
        setAuthorizationToken(getCookie('token'));
        if (getCookie('token')) {
          axios.post('http://localhost:8888/login/authorization', {}).then((res) => {
            if (res.result) setIsLogin(true);
            else {
              // 토큰이 없거나 유효햐지 않다면 로그인 유도 (리다이렉트)
              alert('로그인이 만료되어 다시 로그인 부탁드립니다');
              navigate('/login');
              res.content && console.log(res.content);
            }
          });
        }
      }
    }, []);

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
