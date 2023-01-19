import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import JoinForm from '../components/form/join/JoinForm';
import withPage from './withPage';

const Join = () => {
  const [inputJoin, setInputJoin] = useState({
    check: { checkAll: false, checkAge: false, checkService: false, checkInfo: false, checkMarketing: false },
  });
  // request state
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const navigate = useNavigate();

  const joinDB = () => {
    try {
      setApiLoading(true);
      const { data } = axios.post('http://localhost:8888/join/dataInsert', {
        email: inputJoin.email,
        password: inputJoin.password,
        name: inputJoin.userName,
        phone: inputJoin.phoneNumber,
        checkMarketing: inputJoin.check.checkMarketing,
      });
      if (data === 'success') {
        alert(`${inputJoin.userName}님 회원가입되었습니다.\n로그인 후 더 많은 서비스를 사용해보세요!`);
        navigate('/login');
      }
    } catch (error) {
      setApiError(error);
      console.log(error);
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <>
      <JoinForm
        inputJoin={inputJoin}
        setInputJoin={setInputJoin}
        apiLoading={apiLoading}
        setApiLoading={setApiLoading}
        apiError={apiError}
        setApiError={setApiError}
        joinDB={joinDB}
      />
    </>
  );
};

export default withPage(Join);
