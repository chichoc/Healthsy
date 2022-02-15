import React from 'react';
import { Link } from 'react-router-dom';
import { Div, Form } from '../styles/login_form';

const LoginForm = ({ inputLogin, onChangeInputLogin }) => {
  return (
    <Div>
      <p>
        로그인하시고 필요한 영양제를 <br />
        쉽고 빠르게 구매하세요!
      </p>
      <Form className='vertical_flex'>
        <input className='oval' type='text' placeholder='이메일' name={'email'} onChange={onChangeInputLogin}></input>
        <input className='oval' type='text' placeholder='비밀번호' name={'pw'} onChange={onChangeInputLogin}></input>
        <label>
          <input type='checkbox' />
          <span>로그인 저장</span>
        </label>
        <button className='oval'>로그인</button>
      </Form>
    </Div>
  );
};

export default LoginForm;
