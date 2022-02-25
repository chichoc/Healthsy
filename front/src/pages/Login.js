import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import LoginOther from '../components/LoginOther';
import LoginSocial from '../components/LoginSocial';
import axios from 'axios';
import withPage from './withPage';

const Login = () => {
  const [inputLogin, setInputLogin] = useState({});
  const [inputFocus, setInputFocus] = useState({});
  const [isLogin, setIsLogin] = useState(false);
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

  const onClickLogin = () => {
    if (inputLogin.email === '' || inputLogin.pw === '') {
      // '아이디와 비밀번호를 입력해주세요.'
    }
    // 이메일 형식 체크
    loginDB();
  };

  const loginDB = () => {
    axios
      .post('http://localhost:8888/login', {
        email: inputLogin.email,
        password: inputLogin.password,
      })
      .then((response) => {
        if (!response.data.message) {
          setIsLogin(response.data.message);
          console.log(response);
        } else {
          setIsLogin(response.data[0].message);
          console.log(response);
        }
      });
  };

  return (
    <>
      <LoginForm
        inputLogin={inputLogin}
        inputFocus={inputFocus}
        onChangeInputLogin={onChangeInputLogin}
        onFocusInput={onFocusInput}
        onBlurInput={onBlurInput}
        onClickLogin={onClickLogin}
      />
      <LoginOther />
      <LoginSocial />
    </>
  );
};
export default withPage(Login);
