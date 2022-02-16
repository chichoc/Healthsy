import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from '../styles/login_other';

const LoginSearch = () => {
  return (
    <Search>
      <ul className='horizontal_flex'>
        <li>
          <button>아이디 찾기</button>
        </li>
        <li>ㅣ</li>
        <li>
          <button>비밀번호 찾기</button>
        </li>
        <li>ㅣ</li>
        <li>
          <Link to='/join'>
            <button className='join'>회원가입</button>
          </Link>
        </li>
      </ul>
    </Search>
  );
};

export default LoginSearch;
