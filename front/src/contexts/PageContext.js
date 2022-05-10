import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dataNotice from '../assets/api/dataNotice';
import axios from 'axios';

export const PageContext = createContext();

const PageProvider = (props) => {
  const [notice, setNotice] = useState(dataNotice);
  const [isLogin, setIsLogin] = useState(false);
  const noticeTitle = notice[notice.length - 1].title;
  let navigate = useNavigate();

  const addAuthorizationToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  };
  const removeAuthorizationToken = () => {
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <PageContext.Provider
      value={{
        isLogin,
        setIsLogin,
        noticeTitle,
        navigate,
        addAuthorizationToken,
        removeAuthorizationToken,
      }}
    >
      {props.children}
    </PageContext.Provider>
  );
};

export default PageProvider;
