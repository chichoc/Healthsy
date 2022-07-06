import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DivLogin, FormLogin, InputCheck } from '../../../styles/form/login/login_form';
import InputForm from '../../reusable/InputForm';
import PrimaryButton from '../../reusable/PrimaryButton';
import { onLogIn } from '../../../store/features/pageSlice';

const LoginForm = () => {
  const [inputLogin, setInputLogin] = useState({});
  const [inputFocus, setInputFocus] = useState({});
  const { email, password } = inputFocus;

  const [isSubmit, setIsSubmit] = useState(false);
  const isEnterAll = Boolean(inputLogin.email) && Boolean(inputLogin.password);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onInputLoginChanged = (e) => {
    const { name, value } = e.target;
    setInputLogin({ ...inputLogin, [name]: value });
    if (name === 'email' && value.includes('@')) {
      let emailIdIndex = value.indexOf('@');
      setInputLogin({ ...inputLogin, emailId: value.substr(0, emailIdIndex) });
      e.target.setAttribute('list', 'email-domain');
    }
  };

  const onClickLogin = (e) => {
    setIsSubmit(true);
    e.preventDefault();
    // 이메일 형식 체크
    loginDB();
    setIsSubmit(false);
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
        const { userId, userName, result } = res.data;
        if (result === true) {
          dispatch(onLogIn({ userId, userName }));
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
    <DivLogin>
      <p>
        나에게 필요한 영양제를 <br />
        쉽고 빠르게 알아보세요!
      </p>
      <FormLogin className='vertical_flex' align='center'>
        <InputForm
          label='이메일'
          focusState={email}
          className='oval'
          type='text'
          name='email'
          placeHolder='이메일'
          inputEmailId={inputLogin.emailId ? inputLogin.emailId : ''}
          changeMethod={onInputLoginChanged}
        />
        <InputForm
          label='비밀번호'
          focusState={password}
          className='oval'
          type='password'
          name='password'
          placeHolder='비밀번호'
          changeMethod={onInputLoginChanged}
        />
        <InputCheck>
          <input type='checkbox' id='loginCheck' />
          <span>로그인 상태 유지</span>
        </InputCheck>

        <PrimaryButton
          type={'submit'}
          disabled={!isEnterAll || isSubmit}
          buttonName={'로그인'}
          onClickMethod={onClickLogin}
        />
      </FormLogin>
    </DivLogin>
  );
};

export default LoginForm;
