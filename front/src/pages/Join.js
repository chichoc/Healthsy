import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import JoinForm from '../components/JoinForm';
import withPage from './withPage';
import { JoinContext } from '../contexts/JoinContext';

const Join = () => {
  const [inputEmailId, setInputEmailId] = useState('');
  const [sendVerifyCode, setSendVerifyCode] = useState('');
  const navigate = useNavigate();

  const { inputJoin, setInputJoin, setIsCheckAll } = useContext(JoinContext);

  const { checkAge, checkService, checkInfo, checkMarketing } = inputJoin.check;

  useEffect(() => {
    // 약관 모두 일일이 체크하면 전체 선택 버튼도 체크
    if (checkAge && checkService && checkInfo && checkMarketing) {
      setIsCheckAll(true);
    } // 하나라도 체크 해제되면 전체 선택 버튼 해제
    else if (checkAge || checkService || checkInfo || checkMarketing) {
      setIsCheckAll(false);
    }
  }, [checkAge, checkService, checkInfo, checkMarketing]);

  const datalistEmail = useCallback((e) => {
    let emailIdIndex = e.target.value.indexOf('@');
    setInputEmailId(e.target.value.substr(0, emailIdIndex));
    e.target.setAttribute('list', 'email-domain');
  }, []);

  const duplicateEmail = () => {
    axios
      .post('http://localhost:8888/join/duplicateEmail', {
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
    if (sendVerifyCode === +inputJoin.emailVerifyCode) {
      console.log('인증 완료!');
      setInputJoin({ ...inputJoin, verifyEmail: true });
    } else {
      console.log('인증 실패');
    }
  };

  const onChangeInputJoin = useCallback(
    (e) => {
      setInputJoin({ ...inputJoin, [e.target.name]: e.target.value });
      if (e.target.name === 'email' && e.target.value.includes('@')) datalistEmail(e);
    },
    [datalistEmail, inputJoin]
  );

  const validateEmail = () => {
    const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!regEmail.test(inputJoin.email)) {
      console.log('이메일 형식에 맞게 다시 입력해주세요');
      return false;
    } else {
      return true;
    }
  };

  const validatePassword = () => {
    const regPw = /^[0-9a-zA-Z]{8,20}$/;
    if (!regPw.test(inputJoin.password)) {
      console.log('비밀번호 형식에 맞게 다시 입력해주세요');
      return false;
    } else {
      return true;
    }
  };

  const validatePhoneNumber = () => {
    const regPhone = /^\d{3}-\d{3,4}-\d{4}$/;
    if (!regPhone.test(inputJoin.phoneNumber)) {
      console.log('연락처 형식에 맞게 다시 입력해주세요');
      return false;
    } else {
      return true;
    }
  };

  const checkNull = () => {
    if (
      inputJoin.email === '' ||
      inputJoin.password === '' ||
      inputJoin.password_check === '' ||
      inputJoin.username === '' ||
      inputJoin.phoneNumber === ''
    ) {
      console.log('모두 입력해주세요');
      // '필드 바로 아래에 문구 뜨도록'
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
    checkNull();
    if (!inputJoin.verifyEmail) {
      console.log('이메일 인증을 진행해주세요');
    }
    validateEmail() && validatePassword() && validatePhoneNumber() ? joinDB() : console.log('형식에 맞게 입력해주세요');
  };

  return (
    <>
      <JoinForm
        inputEmailId={inputEmailId}
        datalistEmail={datalistEmail}
        sendEmail={sendEmail}
        verifyEmail={verifyEmail}
        onChangeInputJoin={onChangeInputJoin}
        onClickJoin={onClickJoin}
      />
    </>
  );
};

export default withPage(Join);
