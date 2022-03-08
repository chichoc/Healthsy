import React, { useCallback, useEffect, useState } from 'react';
import JoinForm from '../components/JoinForm';
import withPage from './withPage';
import axios from 'axios';

const Join = () => {
  const [inputJoin, setInputJoin] = useState({
    check: { checkAge: false, checkService: false, checkInfo: false, checkMarketing: false },
  });
  const [inputEmailId, setInputEmailId] = useState('');
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isModal, setIsModal] = useState(false);

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

  const sendEmail = (e) => {
    e.preventDefault();
    const validateEmailResult = validateEmail();
    const duplicateEmailResult = duplicateEmail();

    if (validateEmailResult && duplicateEmailResult) {
      axios
        .post('http://localhost:8888/join', {
          email: inputJoin.email,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const verifyEmail = (e) => {
    e.preventDefault();
  };

  const onChangeInputJoin = useCallback(
    (e) => {
      setInputJoin({ ...inputJoin, [e.target.name]: e.target.value });
      if (e.target.name === 'email' && e.target.value.includes('@')) datalistEmail(e);
    },
    [datalistEmail, inputJoin]
  );

  const onCheck = (e) => {
    const { name } = e.target;
    const checkData = { ...inputJoin, check: { ...inputJoin.check, [name]: !inputJoin.check[name] } };
    setInputJoin(checkData);
  };

  const onCheckAll = () => {
    if (isCheckAll === true) {
      setInputJoin({
        ...inputJoin,
        check: { checkAge: false, checkService: false, checkInfo: false, checkMarketing: false },
      });
    } else {
      setInputJoin({
        ...inputJoin,
        check: { checkAge: true, checkService: true, checkInfo: true, checkMarketing: true },
      });
    }
    setIsCheckAll(!isCheckAll);
  };

  const onModalOpen = (e) => {
    e.preventDefault();
    setIsModal(true);
  };

  const onModalClose = () => {
    setIsModal(false);
  };

  const duplicateEmail = () => {};
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
    const regExp = /^[0-9a-zA-Z]{8,20}$/;
    if (!regExp.test(inputJoin.password)) {
      console.log('비밀번호 형식에 맞게 다시 입력해주세요');
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

  const onClickJoin = (e) => {
    e.preventDefault();
    checkNull();
    validatePassword();
    axios
      .post('http://localhost:8888/join', {
        email: inputJoin.email,
        password: inputJoin.password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <JoinForm
        inputJoin={inputJoin}
        inputEmailId={inputEmailId}
        isModal={isModal}
        setIsModal={setIsModal}
        datalistEmail={datalistEmail}
        sendEmail={sendEmail}
        verifyEmail={verifyEmail}
        onChangeInputJoin={onChangeInputJoin}
        onClickJoin={onClickJoin}
        isCheckAll={isCheckAll}
        onCheck={onCheck}
        onCheckAll={onCheckAll}
        onModalOpen={onModalOpen}
        onModalClose={onModalClose}
      />
    </>
  );
};

export default withPage(Join);
