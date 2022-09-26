import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onLogIn } from '../store/features/pageSlice';
import axios from 'axios';
import withPage from './withPage';
import LoginForm from '../components/form/login/LoginForm';
import LoginOther from '../components/form/login/LoginOther';
import LoginSocial from '../components/form/login/LoginSocial';

const Login = () => {
  const [inputLogin, setInputLogin] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        const { result, userId, userName, content } = res.data;
        if (result === true) {
          dispatch(onLogIn({ userId, userName }));
          navigate('/');
        } else if (content === 'password') alert('비밀번호를 다시 확인해주세요');
        else if (content === 'email') alert('이메일을 다시 확인해주세요');
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <LoginForm inputLogin={inputLogin} setInputLogin={setInputLogin} loginDB={loginDB} />
      <LoginOther />
      <LoginSocial />
    </>
  );
};
export default withPage(Login);
