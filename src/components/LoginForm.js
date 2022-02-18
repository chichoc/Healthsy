import React from 'react';
import { Link } from 'react-router-dom';
import { Div, Form, Button, InputContainer, InputCheck } from '../styles/login_form';

const LoginForm = ({ inputLogin, inputFocus, onChangeInputLogin, onFocusInput, onBlurInput, onClickLoginBtn }) => {
  const { email, pw } = inputFocus;
  return (
    <Div>
      <p>
        로그인하시고 필요한 영양제를 <br />
        쉽고 빠르게 구매하세요!
      </p>
      <Form className='vertical_flex'>
        <InputContainer>
          <span className={email && 'focus'}>이메일</span>
          <input
            className='oval'
            type='text'
            placeholder='이메일'
            name={'email'}
            onChange={onChangeInputLogin}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
          ></input>
        </InputContainer>
        <InputContainer>
          <span className={pw && 'focus'}>비밀번호</span>
          <input
            className='oval'
            type='text'
            placeholder='비밀번호'
            name={'pw'}
            onChange={onChangeInputLogin}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
          ></input>
        </InputContainer>
        <InputCheck>
          <input type='checkbox' id='loginCheck' />
          <span>로그인 상태 유지</span>
        </InputCheck>
        <Button className='oval' onClick={onClickLoginBtn}>
          로그인
        </Button>
      </Form>
    </Div>
  );
};

export default LoginForm;
