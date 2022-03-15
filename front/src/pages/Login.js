import React, { useContext, useState } from 'react';
import LoginForm from '../components/LoginForm';
import LoginOther from '../components/LoginOther';
import LoginSocial from '../components/LoginSocial';
import axios from 'axios';
import withPage from './withPage';
import { PageContext } from '../contexts/PageContext';

const Login = () => {
  const [inputLogin, setInputLogin] = useState({});
  const [inputFocus, setInputFocus] = useState({});
  const [cookie, setCookie] = useState();
  const { setIsLogin, navigate } = useContext(PageContext);

  const onChangeInputLogin = (e) => {
    setInputLogin({ ...inputLogin, [e.target.name]: e.target.value });
  };

  const onFocusInput = (e) => {
    setInputFocus({ ...inputFocus, [e.target.name]: true });
  };

  const onBlurInput = (e) => {
    setInputFocus({ ...inputFocus, [e.target.name]: false });
  };

  const onClickLogin = (e) => {
    e.preventDefault();
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
        if (response.data === 'success') {
          setIsLogin(true);
          navigate('/');
        } else if (response.data === 'password') {
          console.log('비밀번호를 다시 입력해주세요');
        } else if (response.data === 'email') {
          console.log('이메일을 다시 입력해주세요');
        }
      })
      .catch((error) => {
        console.log(error);
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
