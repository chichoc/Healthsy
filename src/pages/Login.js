import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import LoginOther from '../components/LoginOther';
import LoginSocial from '../components/LoginSocial';
import MainFooter from '../components/MainFooter';
import MainHeader from '../components/MainHeader';
import axios from 'axios';

const Login = () => {
  const [inputLogin, setInputLogin] = useState({});
  const [inputFocus, setInputFocus] = useState({});
  const [cookie, setCookie] = useState();

  const onChangeInputLogin = (e) => {
    setInputLogin({ ...inputLogin, [e.target.name]: e.target.value });
  };

  const onFocusInput = (e) => {
    setInputFocus({ ...inputFocus, [e.target.name]: true });
  };

  const onBlurInput = (e) => {
    setInputFocus({ ...inputFocus, [e.target.name]: false });
  };

  const onClickLoginBtn = () => {
    if (inputLogin.email === '' || inputLogin.pw === '') {
      // '아이디와 비밀번호를 입력해주세요.'
    }
    // 이메일 형식 체크
    loginDB(inputLogin.email, inputLogin.pw);
  };

  const loginDB = (email, password) => {
    axios({
      method: 'post',
      url: 'http://localhost:8888',
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
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
        onClickLoginBtn={onClickLoginBtn}
      />
      <LoginOther />
      <LoginSocial />
      <MainFooter />
    </>
  );
};

export default Login;
