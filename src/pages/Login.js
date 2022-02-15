import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import LoginOther from '../components/LoginOther';
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
      <LoginOther />
      <LoginSocial />
      <MainFooter />
    </>
  );
};

export default Login;
