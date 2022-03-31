import React from 'react';
import { Div, Form, Button, InputCheck } from '../styles/login_form';
import InputForm from './InputForm';

const LoginForm = ({ inputLogin, inputFocus, onChangeInputLogin, onFocusInput, onBlurInput, onClickLogin }) => {
  const { email, password } = inputFocus;
  return (
    <Div>
      <p>
        필요한 영양제를 <br />
        쉽고 빠르게 구매하세요!
      </p>
      <Form className='vertical_flex' align='center'>
        <InputForm
          label='이메일'
          focusState={email}
          onFocusMethod={onFocusInput}
          onBlurMethod={onBlurInput}
          className='oval'
          type='text'
          name='email'
          placeHolder='이메일'
          onChangeMethod={onChangeInputLogin}
        />
        <InputForm
          label='비밀번호'
          focusState={password}
          onFocusMethod={onFocusInput}
          onBlurMethod={onBlurInput}
          className='oval'
          type='password'
          name='password'
          placeHolder='비밀번호'
          onChangeMethod={onChangeInputLogin}
        />
        <InputCheck>
          <input type='checkbox' id='loginCheck' />
          <span>로그인 상태 유지</span>
        </InputCheck>
        <Button className='oval' onClick={onClickLogin}>
          로그인
        </Button>
      </Form>
    </Div>
  );
};

export default LoginForm;
