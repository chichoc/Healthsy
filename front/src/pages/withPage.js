import React, { useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onLogIn } from '../store/features/pageSlice';
import axios from 'axios';
import MainFooter from '../components/MainFooter';
import MainNav from '../components/MainNav';
import MainTop from '../components/MainTop';
import { IconContext } from 'react-icons';

const withPage = (WrappedComponent) => {
  const Component = () => {
    const isLogin = useSelector((state) => state.page.isLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useLayoutEffect(() => {
      if (!isLogin) {
        axios.post('http://localhost:8888/login/authorization', {}, { withCredentials: true }).then((res, req) => {
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
        <IconContext.Provider value={{ className: 'react-icons' }}>
          <MainTop />
          <MainNav />
          <WrappedComponent />
          <MainFooter />
        </IconContext.Provider>
      </>
    );
  };
  return Component;
};

export default withPage;
