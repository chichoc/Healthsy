import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const LoginSearch = () => {
  return (
    <Search>
      <ul className='horizontal_flex'>
        <li>
          <Link to='/join'>
            <button className='join'>회원가입</button>
          </Link>
        </li>
        <li>ㅣ</li>
        <li>
          <button>아이디 찾기</button>
        </li>
        <li>ㅣ</li>
        <li>
          <button>비밀번호 찾기</button>
        </li>
      </ul>
    </Search>
  );
};

const Search = styled.div`
  text-align: center;
  margin: 10px 0;
  ul {
    justify-content: center;
  }
  li {
    font-size: 13px;
    /* background-color: red; */
  }
  .join:hover {
    /* background-color: red; */
    cursor: pointer;
  }
`;

export default LoginSearch;
