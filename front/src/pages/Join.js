import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import JoinForm from '../components/form/join/JoinForm';
import withPage from './withPage';

const Join = () => {
  const navigate = useNavigate();
  const [inputJoin, setInputJoin] = useState({
    check: { checkAll: false, checkAge: false, checkService: false, checkInfo: false, checkMarketing: false },
  });

  const [emailVerificationJoin, setEmailVerificationJoin] = useState({ sendedCode: '', isVerificated: false });

  const duplicateEmail = () => {
    axios
      .post('http://localhost:8888/join/duplicateEmail', {
        email: formInputValue.email,
        email: inputJoin.email,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const validateEmailResult = validateEmail();
    const duplicateEmailResult = duplicateEmail();

    if (validateEmailResult && duplicateEmailResult) {
      axios
        .post('http://localhost:8888/join/sendEmail', {
          email: inputJoin.email,
        })
        .then((response) => {
          setSendVerifyCode(response.data.sendVerifyCode);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const verifyEmail = (e) => {
    e.preventDefault();
    if (sendVerifyCode === +formInputValue.emailVerifyCode) {
      alert('인증 완료!');
      dispatch(successVerifyEmail);
    } else {
      alert('인증 실패');
    }
  };

  const validateEmail = () => {
    const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!regEmail.test(formInputValue.email)) {
      alert('이메일 형식에 맞게 다시 입력해주세요');
      return false;
    } else {
      return true;
    }
  };

  const validatePassword = () => {
    const regPw = /^[0-9a-zA-Z]{8,20}$/;
    if (!regPw.test(formInputValue.password)) {
      alert('비밀번호 형식에 맞게 다시 입력해주세요');
      return false;
    } else {
      return true;
    }
  };

  const validatePhoneNumber = () => {
    const regPhone = /^\d{3}-\d{3,4}-\d{4}$/;
    if (!regPhone.test(formInputValue.phoneNumber)) {
      alert('연락처 형식에 맞게 다시 입력해주세요');
      return false;
    } else {
      return true;
    }
  };

  const joinDB = () => {
    axios
      .post('http://localhost:8888/join/dataInsert', {
        email: inputJoin.email,
        password: inputJoin.password,
        name: inputJoin.userName,
        phone: inputJoin.phoneNumber,
        checkMarketing: inputJoin.check.checkMarketing,
      })
      .then((response) => {
        if (response.data === 'success') {
          alert('회원가입되셨습니다!');
          navigate('/login');
          // + 스크롤바 최상단으로 이동
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickJoin = (e) => {
    e.preventDefault();
    if (!formInputValue.verifyEmail) {
      alert('이메일 인증을 진행해주세요');
    }
    validateEmail() && validatePassword() && validatePhoneNumber() ? joinDB() : alert('형식에 맞게 입력해주세요');
  };

  return (
    <>
      <JoinForm
        inputJoin={inputJoin}
        setInputJoin={setInputJoin}
        emailVerificationJoin={emailVerificationJoin}
        setEmailVerificationJoin={setEmailVerificationJoin}
      />
    </>
  );
};

export default withPage(Join);
