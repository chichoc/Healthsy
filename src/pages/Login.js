import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import LoginSearch from '../components/LoginSearch';
import LoginSocial from '../components/LoginSocial';
import MainFooter from '../components/MainFooter';
import MainHeader from '../components/MainHeader';

const Login = () => {
  const [inputLogin, setInputLogin] = useState({});

  const onChangeInputLogin = (e) => {
    setInputLogin({ ...inputLogin, [e.target.name]: e.target.value });
  };

  return (
    <>
      <MainHeader />
      <LoginForm inputLogin={inputLogin} onChangeInputLogin={onChangeInputLogin} />
      <LoginSearch />
      <LoginSocial />
      <MainFooter />
    </>
  );
};

export default Login;
