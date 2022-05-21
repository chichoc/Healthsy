import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onLogIn } from '../store/features/page';
import axios from 'axios';
import MainFooter from '../components/MainFooter';
import MainHeader from '../components/MainHeader';
import MainTop from '../components/MainTop';
import JoinProvider from '../contexts/JoinContext';

const withPage = (WrappedComponent) => {
  const Component = () => {
    const page = useSelector((state) => state.page.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useLayoutEffect(() => {
      if (!page.isLogin) {
        axios.post('http://localhost:8888/login/authorization', {}).then((res, req) => {
          if (!res.data.token) return;
          if (res.data.updated) dispatch(onLogIn());
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
