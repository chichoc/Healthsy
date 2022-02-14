import React from 'react';
import styled from '@emotion/styled';
import JoinTerms from './JoinTerms';

const JoinForm = ({ onChangeInputJoin }) => {
  return (
    <Join>
      <Title>회원가입</Title>
      <Form className='vertical_flex' align='start'>
        <label>
          <h3>이메일</h3>
          <Email className='horizontal_flex'>
            <input
              className='oval'
              type='text'
              placeholder='이메일'
              name={'email'}
              onChange={onChangeInputJoin}
            ></input>
            <span>@</span>
            <input
              list='email-domain'
              className='oval email'
              type='email'
              placeholder='선택 또는 입력'
              name={'email'}
              onChange={onChangeInputJoin}
            ></input>
            <datalist id='email-domain' className='oval'>
              <option value='naver.com'></option>
              <option value='gmail.com'></option>
              <option value='apple.com'></option>
            </datalist>
          </Email>
        </label>
        <label>
          <h3>비밀번호</h3>
          <input
            className='oval'
            type='password'
            placeholder='8~20자 영문, 숫자, 특수문자 중 2가지 이상'
            name={'pw'}
            onChange={onChangeInputJoin}
          ></input>
          <input
            className='oval pw_check'
            type='password'
            placeholder='비밀번호 확인'
            name={'pw_check'}
            onChange={onChangeInputJoin}
          ></input>
        </label>
        <label>
          <h3>이름</h3>
          <input
            className='oval'
            type='text'
            placeholder='이름 입력'
            name={'name'}
            onChange={onChangeInputJoin}
          ></input>
        </label>
        <label>
          <h3>연락처</h3>
          <input
            className='oval'
            type='text'
            placeholder='- 제외하고 번호 입력'
            name={'phone'}
            onChange={onChangeInputJoin}
          ></input>
        </label>
        <input
          className='oval'
          type='text'
          placeholder='인증번호 입력'
          name={'phone_check'}
          onChange={onChangeInputJoin}
        ></input>
        <button className='oval'>인증요청</button>
        <button className='oval'>확인</button>
        <JoinTerms />
        <button type='submit' className='oval join_btn'>
          가입하기
        </button>
      </Form>
    </Join>
  );
};

const Join = styled.section`
  /* background-color: red; */
  width: 400px;
  padding: 20px 0;
  margin: 0 auto;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 30px;
  margin: 10px 0;
  font-weight: bold;
`;

const Form = styled.form`
  label {
    margin: 10px 0;
    /* background-color: red; */
  }
  .oval {
    border-radius: 20px;
    padding: 10px 20px;
    /* background-color: red; */
    border: 1px solid #dddd;
  }
  input {
    /* background-color: red; */
    margin-top: 10px;
    font-size: 15px;
  }
  .pw_check {
    /* background-color: red; */
    margin: 10px 0;
  }
  button {
    background-color: #00c9b7;
    color: white;
    margin-top: 10px;
    font-size: 15px;
  }

  .join_btn {
    padding: 15px 20px;
    font-size: 20px;
    font-weight: bold;
  }
`;
const Email = styled.div``;

export default JoinForm;
