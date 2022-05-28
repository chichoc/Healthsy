import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onLogIn } from '../store/features/pageSlice';
import axios from 'axios';
import withPage from './withPage';
import LoginForm from '../components/LoginForm';
import LoginOther from '../components/LoginOther';
import LoginSocial from '../components/LoginSocial';

const Login = () => {
  const [inputLogin, setInputLogin] = useState({ email: '', password: '' });
  const [inputFocus, setInputFocus] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    if (inputLogin.email === '' || inputLogin.pw === '') return alert('아이디와 비밀번호를 입력해주세요.');
    // 이메일 형식 체크
    loginDB();
  };

  const loginDB = () => {
    axios
      .post(
        'http://localhost:8888/login/authentication',
        {
          email: inputLogin.email,
          password: inputLogin.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.result === true) {
          dispatch(onLogIn());
          navigate('/');
        } else if (res.data.content === 'password') {
          alert('비밀번호를 다시 입력해주세요');
        } else if (res.data.content === 'email') {
          alert('이메일을 다시 입력해주세요');
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
