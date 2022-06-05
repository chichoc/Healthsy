import React, { useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onLogIn } from '../store/features/pageSlice';
import axios from 'axios';
import MainFooter from '../components/MainFooter';
import MainHeader from '../components/MainHeader';
import MainTop from '../components/MainTop';

const withPage = (WrappedComponent) => {
  const Component = () => {
    const page = useSelector((state) => state.page.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useLayoutEffect(() => {
      if (!page.isLogin) {
        axios.post('http://localhost:8888/login/authorization', {}).then((res, req) => {
          if (!res.data.token) return;
          if (res.data.updated) {
            // 로그인 상태에서 회원가입 못하도록 설정
            if (location.pathname === '/join') navigate('/');
            dispatch(onLogIn());
          } else {
            if (location.pathname !== '/login') alert('로그인이 만료되어 다시 로그인 부탁드립니다');
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
        <WrappedComponent />
        <MainFooter />
      </>
    );
  };
  return Component;
};

export default withPage;
