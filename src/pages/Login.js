import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import LoginOther from '../components/LoginOther';
import LoginSocial from '../components/LoginSocial';
import MainFooter from '../components/MainFooter';
import MainHeader from '../components/MainHeader';

const Login = () => {
  const [inputLogin, setInputLogin] = useState({});
  const [inputFocus, setInputFocus] = useState({});

  const onChangeInputLogin = (e) => {
    setInputLogin({ ...inputLogin, [e.target.name]: e.target.value });
  };

  const onFocusInput = (e) => {
    setInputFocus({ ...inputFocus, [e.target.name]: true });
  };

  const onBlurInput = (e) => {
    setInputFocus({ ...inputFocus, [e.target.name]: false });
  };

  return (
    <>
      <MainHeader />
      <LoginForm
        inputLogin={inputLogin}
        inputFocus={inputFocus}
        onChangeInputLogin={onChangeInputLogin}
        onFocusInput={onFocusInput}
        onBlurInput={onBlurInput}
      />
      <LoginOther />
      <LoginSocial />
      <MainFooter />
    </>
  );
};

export default Login;
