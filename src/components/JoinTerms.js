import React from 'react';
import { Terms } from '../styles/join_terms';

const JoinTerms = () => {
  return (
    <Terms className='vertical_flex'>
      <label>
        <input type='checkbox' />
        <span>아래 내용에 모두 동의합니다.</span>
      </label>
      <label>
        <input type='checkbox' />
        <span>만 14세 이상입니다.</span>
      </label>
      <label>
        <input type='checkbox' />
        <span>서비스 이용약관</span>
      </label>
      <label>
        <input type='checkbox' />
        <span>개인 정보 수집 및 이용 동의</span>
      </label>
      <label>
        <input type='checkbox' />
        <span>SMS/ 이메일 (마케팅 정보) 수신 동의</span>
      </label>
    </Terms>
  );
};

export default JoinTerms;
