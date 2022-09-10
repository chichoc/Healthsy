import React, { useState } from 'react';
import JoinTerms from './JoinTerms';
import InputForm from '../../reusable/InputForm';
import PrimaryButton from '../../reusable/PrimaryButton';
import { Join, Form } from '../../../styles/form/join/join_form';

const JoinForm = ({
  inputJoin,
  setInputJoin,
  emailVerificationJoin,
  setEmailVerificationJoin,
  sendCodeToEmail,
  onClickJoin,
}) => {
  const [isValidatedJoin, setIsValidatedJoin] = useState({});

  let isCheckRequired = ['checkAge', 'checkService', 'checkInfo'].every((name) => inputJoin.check[name]);

  let isValidateAll =
    Object.keys(isValidatedJoin).length === 6 && Object.values(isValidatedJoin).every((value) => !!value);

  let enableJoin = isValidateAll && emailVerificationJoin.isVerificated && isCheckRequired;

  const onInputJoinChanged = (e) => {
    const { name, value } = e.target;
    setInputJoin({ ...inputJoin, [name]: value });
  };

  const verifyEmail = (e) => {
    e.preventDefault();
    if (emailVerificationJoin.sendedCode === +inputJoin.emailVerificationCode) {
      alert('인증되었습니다.');
      setEmailVerificationJoin({ ...emailVerificationJoin, isVerificated: true });
    } else alert('일치하지 않습니다.\n 다시 확인해주시기 바랍니다.');
  };

  const checkPassword = (valueToCompare) => {
    return inputJoin.password === valueToCompare ? true : false;
  };

  return (
    <Join>
      <h1>회원가입</h1>
      <Form className='vertical_flex' align='start'>
        <div>
          <InputForm
            label='이메일'
            className='ovalInputWithButton'
            name='email'
            placeHolder='이메일'
            changeMethod={onInputJoinChanged}
            typeToValidate={'email'}
            isValidated={isValidatedJoin}
            setIsValidated={setIsValidatedJoin}
            button='인증 요청'
            btnClickMethod={sendCodeToEmail}
            btnDisabled={!inputJoin.email || !isValidatedJoin.email}
          />
        </div>
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
            inputDisabled={!emailVerificationJoin.sendedCode || emailVerificationJoin.isVerificated}
            btnClickMethod={verifyEmail}
            btnDisabled={!inputJoin.emailVerificationCode || emailVerificationJoin.isVerificated}
          />
        </div>

        <div className='horizontal_flex'>
          <InputForm
            label='비밀번호'
            className='oval'
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
            className='oval'
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
            className='oval'
            name='userName'
            placeHolder='이름'
            isValidated={isValidatedJoin}
            setIsValidated={setIsValidatedJoin}
            changeMethod={onInputJoinChanged}
          />
          <InputForm
            label='연락처'
            className='oval'
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
        <PrimaryButton type='submit' disabled={!enableJoin} buttonName={'가입하기'} onClickMethod={onClickJoin} />
      </Form>
    </Join>
  );
};

export default JoinForm;
