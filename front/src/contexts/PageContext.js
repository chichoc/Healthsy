import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dataNotice from '../assets/api/dataNotice';

export const PageContext = createContext();

const PageProvider = (props) => {
  const [notice, setNotice] = useState(dataNotice);
  const [isLogin, setIsLogin] = useState(false);
  const title = notice[notice.length - 1].title;
  let navigate = useNavigate();

  return <PageContext.Provider value={{ isLogin, setIsLogin, title, navigate }}>{props.children}</PageContext.Provider>;
};

export default PageProvider;
