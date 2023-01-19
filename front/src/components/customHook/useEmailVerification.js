import React, { useState } from 'react';
import axios from 'axios';

const useEmailVerification = ({ email, setApiError, setApiLoading }) => {
  const [emailVerification, setEmailVerification] = useState({
    sendedCode: '',
    isVerificated: false,
    verificatedEmail: '',
  });

  const checkEmailDuplication = async () => {
    try {
      setApiLoading(true);
      const { data } = await axios.post('http://localhost:8888/join/duplicateEmail', {
        email,
      });
      if (!data.joinDate) return false;
      else return data.joinDate;
    } catch (error) {
      setApiError(error);
      console.log(error);
    } finally {
      setApiLoading(false);
    }
  };

  const sendCodeToEmail = async (e) => {
    try {
      e.preventDefault();
      setApiLoading(true);
      // 인증 후 다른 이메일도 인증 요청할 수 있으므로 isVerificated: false
      setEmailVerification({ isVerificated: false, verificatedEmail: email });
      const dateOfDuplicatedEmail = await checkEmailDuplication();
      if (!dateOfDuplicatedEmail) {
        const { data } = await axios.post('http://localhost:8888/join/sendEmail', {
          email,
        });
        setEmailVerification((prev) => ({ ...prev, ...data }));
      } else alert(`${dateOfDuplicatedEmail}에 이미 가입한 이메일 입니다.`);
    } catch (error) {
      setApiError(error);
      console.log(error);
    } finally {
      setApiLoading(false);
    }
  };

  const verifyEmail = (e, writtenCode) => {
    e.preventDefault();
    if (emailVerification.sendedCode === +writtenCode) {
      alert('인증되었습니다.');
      setEmailVerification({ ...emailVerification, isVerificated: true });
    } else alert('일치하지 않습니다.\n 다시 확인해주시기 바랍니다.');
  };

  return [emailVerification, sendCodeToEmail, verifyEmail];
};

export default useEmailVerification;
