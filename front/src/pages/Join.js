import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import JoinForm from '../components/form/join/JoinForm';
import withPage from './withPage';

const Join = () => {
  const [inputJoin, setInputJoin] = useState({
    check: { checkAll: false, checkAge: false, checkService: false, checkInfo: false, checkMarketing: false },
  });

  const [emailVerificationJoin, setEmailVerificationJoin] = useState({ sendedCode: '', isVerificated: false });

  const navigate = useNavigate();

  const checkEmailDuplication = async () => {
    return await axios
      .post('http://localhost:8888/join/duplicateEmail', {
        email: inputJoin.email,
      })
      .then((res) => {
        if (!res.data.joinDate) return false;
        else return res.data.joinDate;
      })
      .catch((error) => console.log(error));
  };

  const sendCodeToEmail = async (e) => {
    e.preventDefault();
    // 인증 후 다른 이메일로 요청할 경우
    setEmailVerificationJoin({ ...emailVerificationJoin, isVerificated: false });
    const dateOfDuplicatedEmail = await checkEmailDuplication();
    if (!dateOfDuplicatedEmail) {
      axios
        .post('http://localhost:8888/join/sendEmail', {
          email: inputJoin.email,
        })
        .then((res) => setEmailVerificationJoin({ ...emailVerificationJoin, ...res.data }))
        .catch((error) => console.log(error));
    } else alert(`${dateOfDuplicatedEmail}에 이미 가입한 이메일 입니다.`);
  };

  const onClickJoin = (e) => {
    e.preventDefault();
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

  return (
    <>
      <JoinForm
        inputJoin={inputJoin}
        setInputJoin={setInputJoin}
        emailVerificationJoin={emailVerificationJoin}
        setEmailVerificationJoin={setEmailVerificationJoin}
        sendCodeToEmail={sendCodeToEmail}
        onClickJoin={onClickJoin}
      />
    </>
  );
};

export default withPage(Join);
