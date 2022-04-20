import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dataNotice from '../assets/api/dataNotice';
import axios from 'axios';

export const PageContext = createContext();

const PageProvider = (props) => {
  const [notice, setNotice] = useState(dataNotice);
  const [isLogin, setIsLogin] = useState(false);
  const title = notice[notice.length - 1].title;
  let navigate = useNavigate();

  const setAuthorizationToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      // 토큰 만료되었을 때
      delete axios.defaults.headers.common['Authorization'];
    }
  };
  const getCookie = (name) => {
    if (document.cookie) {
      const cookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith(name))
        .split('=')[1];
      return decodeURIComponent(cookie) || undefined;
    }
  };

  const setCookie = (name, value, options) => {
    options = {
      path: '/',
      'max-age': 60 * 30,
      // httpOnly: '',
      // SameSite: 'lax',
      // Secure: '',
    };
    // samsite 옵션은 2017년 이전 버전에서는 지원하지 않음
    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    for (let optionKey in options) {
      updatedCookie += '; ' + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += '=' + optionValue;
      }
    }
    document.cookie = updatedCookie;
  };

  const deleteCookie = (name) => {
    setCookie(name, '', {
      expires: 'Thu, 01 Jan 1970 00:00:00 GMT',
    });
  };

  return (
    <PageContext.Provider
      value={{ isLogin, setIsLogin, title, navigate, setAuthorizationToken, getCookie, setCookie, deleteCookie }}
    >
      {props.children}
    </PageContext.Provider>
  );
};

export default PageProvider;
