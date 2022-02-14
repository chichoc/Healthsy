import React from 'react';
import styled from '@emotion/styled';

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
const Terms = styled.section`
  text-align: left;
  border: 1px solid #dddd;
  margin: 10px 0;
  border-radius: 20px;

  label {
    border-bottom: 1px solid #dddd;
    margin: 0;
    padding: 10px;
  }

  label:last-child {
    border-bottom: none;
  }

  input {
    margin-right: 10px;
    width: 10px;
  }

  span {
    vertical-align: baseline;
  }
`;

export default JoinTerms;
