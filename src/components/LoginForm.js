import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

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

const Div = styled.div`
  /* background-color: red; */
  text-align: center;
  width: 400px;
  margin: 30px auto 0;
  font-size: 20px;
  p {
    padding: 10px;
    line-height: 1.5;
  }
`;
const Form = styled.form`
  width: 250px;
  margin: 0 auto;
  .oval {
    border-radius: 20px;
    padding: 10px 20px;
  }
  input {
    border: 1px solid #dddd;
    margin-top: 10px;
    font-size: 15px;
  }
  button {
    background-color: #00c9b7;
    color: white;
    margin-top: 10px;
    font-size: 15px;
  }
  label {
    text-align: left;
    font-size: 13px;
  }
`;

export default LoginForm;
