import React, { useState } from 'react';
import JoinTerms from './JoinTerms';
import InputForm from '../../reusable/InputForm';
import PrimaryButton from '../../reusable/PrimaryButton';
import useEmailVerification from '../../customHook/useEmailVerification';
import { Join, Form } from '../../../styles/form/join/join_form';

const JoinForm = ({ inputJoin, setInputJoin, apiLoading, setApiLoading, apiError, setApiError, joinDB }) => {
  const [isValidatedJoin, setIsValidatedJoin] = useState({});
  const [isSubmitJoin, setIsSubmitJoin] = useState(false); // 중복 누름 방지

  const [emailVerification, sendCodeToEmail, verifyEmail] = useEmailVerification({
    email: inputJoin.email,
    setApiError,
    setApiLoading,
  });
  let isCheckRequired = ['checkAge', 'checkService', 'checkInfo'].every((name) => inputJoin.check[name]);

  let isValidatedAllJoin =
    Object.keys(isValidatedJoin).length === 6 && Object.values(isValidatedJoin).every((value) => !!value);

  let enableJoin = isValidatedAllJoin && emailVerification.isVerificated && isCheckRequired;


  const onInputJoinChanged = (e) => {
    const { name, value } = e.target;
    setInputJoin({ ...inputJoin, [name]: value });
  };

  const checkPassword = (valueToCompare) => {
    return inputJoin.password === valueToCompare ? true : false;
  };

  const onClickJoin = (e) => {
    setIsSubmitJoin(true);
    e.preventDefault();
    joinDB();
    setIsSubmitJoin(false);
  };

  return (
    <Join>
      <h1>회원가입</h1>
      <Form className='vertical_flex' align='start'>
        <InputForm
          label='이메일'
          className='ovalInputWithButton'
          rowSet={true}
          name='email'
          placeHolder='이메일'
          changeMethod={onInputJoinChanged}
          typeToValidate={'email'}
          isValidated={isValidatedJoin}
          setIsValidated={setIsValidatedJoin}
          button='인증 요청'
          btnClickMethod={sendCodeToEmail}
          btnDisabled={!isValidatedJoin.email}
        />

        <div>
          <InputForm
            label='인증번호'
            className='ovalInputWithButton'
            name='emailVerificationCode'
            placeHolder='인증번호 입력'
            condition='제한 시간 내로 입력해주세요'
            button='확인'
            isValidated={isValidatedJoin}
            setIsValidated={setIsValidatedJoin}
            changeMethod={onInputJoinChanged}
            inputDisabled={!emailVerification.sendedCode || emailVerification.isVerificated}
            btnClickMethod={(e) => verifyEmail(e, inputJoin.emailVerificationCode)}
            btnDisabled={!inputJoin.emailVerificationCode || emailVerification.isVerificated}
          />
        </div>

        <div className='horizontal_flex'>
          <InputForm
            label='비밀번호'
            type='password'
            name='password'
            placeHolder='비밀번호'
            condition='영문과 숫자 포함하여 8~20자'
            typeToValidate={'password'}
            isValidated={isValidatedJoin}
            setIsValidated={setIsValidatedJoin}
            changeMethod={onInputJoinChanged}
          />
          <InputForm
            label='비밀번호 확인'
            type='password'
            name='passwordCheck'
            placeHolder='비밀번호 확인'
            typeToValidate={'password'}
            isValidated={isValidatedJoin}
            setIsValidated={setIsValidatedJoin}
            blurMethod={checkPassword}
            changeMethod={onInputJoinChanged}
          />
        </div>
        <div className='horizontal_flex'>
          <InputForm
            label='이름'
            name='userName'
            placeHolder='이름'
            isValidated={isValidatedJoin}
            setIsValidated={setIsValidatedJoin}
            changeMethod={onInputJoinChanged}
          />
          <InputForm
            label='연락처'
            type='tel'
            name='phoneNumber'
            placeHolder='연락처'
            condition=' - 포함하여 번호 입력'
            typeToValidate={'phone'}
            isValidated={isValidatedJoin}
            setIsValidated={setIsValidatedJoin}
            changeMethod={onInputJoinChanged}
            value={inputJoin.phoneNumber || ''}
          />
        </div>
        <JoinTerms inputJoin={inputJoin} setInputJoin={setInputJoin} />
        <PrimaryButton
          type='submit'
          disabled={!enableJoin || isSubmitJoin}
          buttonName={'가입하기'}
          onClickMethod={onClickJoin}
        />
      </Form>
    </Join>
  );
};

export default JoinForm;
