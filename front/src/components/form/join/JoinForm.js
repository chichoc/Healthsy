import React, { useState } from 'react';
import JoinTerms from './JoinTerms';
import InputForm from '../InputForm';
import { Join, Title, Form } from '../../../styles/form/join/join_form';
import PrimaryButton from '../../reusable/PrimaryButton';

const JoinForm = ({
  inputJoin,
  setInputJoin,
  emailVerificationJoin,
  setEmailVerificationJoin,
}) => {
  const [isValidatedJoin, setIsValidatedJoin] = useState({});

  const onInputJoinChanged = (e) => {
    const { name, value } = e.target;
    setInputJoin({ ...inputJoin, [name]: value });
  };
  return (
    <Join>
      <Title>회원가입</Title>
      <Form className='vertical_flex' align='start'>
        <div>
          <InputForm
            label='이메일'
            className='ovalInputWithButton'
            name='email'
            placeHolder='이메일'
            button='인증요청'
            btnClickMethod={sendEmail}
            changeMethod={onInputJoinChanged}
          />
        </div>
        <div>
          <InputForm
            label='인증번호'
            className='ovalInputWithButton'
            name='emailVerifyCode'
            placeHolder='인증번호 입력'
            condition='제한 시간 내로 입력해주세요'
            button='확인'
            changeMethod={onInputJoinChanged}
            btnClickMethod={verifyEmail}
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
            changeMethod={onInputJoinChanged}
          />
          <InputForm
            label='비밀번호 확인'
            className='oval pw_check'
            type='password'
            name='passwordCheck'
            placeHolder='비밀번호 확인'
            changeMethod={onInputJoinChanged}
          />
        </div>
        <div className='horizontal_flex'>
          <InputForm
            label='이름'
            className='oval'
            name='userName'
            placeHolder='이름'
            changeMethod={onInputJoinChanged}
          />
          <InputForm
            label='연락처'
            className='oval'
            name='phoneNumber'
            placeHolder='연락처'
            condition=' - 제외하고 번호 입력'
            changeMethod={onInputJoinChanged}
          />
        </div>
        <PrimaryButton type='submit' disabled={isDisabled} buttonName={'가입하기'} onClickMethod={onClickJoin} />
        <JoinTerms inputJoin={inputJoin} setInputJoin={setInputJoin} />
      </Form>
    </Join>
  );
};

export default JoinForm;
