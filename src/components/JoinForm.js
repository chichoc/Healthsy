import React from 'react';
import JoinTerms from './JoinTerms';
import { Join, Title, Form, Email } from '../styles/join_form';

const JoinForm = ({ onChangeInputJoin }) => {
  return (
    <Join>
      <Title>회원가입</Title>
      <Form className='vertical_flex' align='start'>
        <label>
          <h3>이메일</h3>
          <Email className='horizontal_flex'>
            <input
              className='oval domain'
              type='text'
              placeholder='user'
              name={'email'}
              onChange={onChangeInputJoin}
            ></input>
            {/* <span>@</span> */}
            <input
              list='email-domain'
              className='oval'
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

export default JoinForm;
