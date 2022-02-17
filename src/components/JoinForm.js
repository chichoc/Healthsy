import React from 'react';
import JoinTerms from './JoinTerms';
import { Join, Title, Form, PhoneNumber } from '../styles/join_form';
import Input from './Input';

const JoinForm = ({ inputEmailId, onChangeInputJoin }) => {
  return (
    <Join>
      <Title>회원가입</Title>
      <Form className='vertical_flex' align='start'>
        <Input
          label='이메일'
          className='oval'
          type='text'
          name='email'
          placeHolder='user@example.com'
          onChangeInputJoin={onChangeInputJoin}
        />
        <datalist id='email-domain' className='oval'>
          <option value={`${inputEmailId}@naver.com`}></option>
          <option value={`${inputEmailId}@gmail.com`}></option>
          <option value={`${inputEmailId}@apple.com`}></option>
        </datalist>
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
        <Input
          label='이름'
          className='oval'
          type='text'
          name='username'
          placeHolder='이름 입력'
          onChangeInputJoin={onChangeInputJoin}
        />
        <PhoneNumber>
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
          <button className='oval'>인증요청</button>
          <input
            className='oval'
            type='text'
            placeholder='인증번호 입력'
            name={'phone_check'}
            onChange={onChangeInputJoin}
          ></input>
          <button className='oval'>확인</button>
        </PhoneNumber>

        <JoinTerms />
        <button type='submit' className='oval join_btn'>
          가입하기
        </button>
      </Form>
    </Join>
  );
};

export default JoinForm;
