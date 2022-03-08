import React from 'react';
import JoinTerms from './JoinTerms';
import { Join, Title, Form } from '../styles/join_form';
import InputForm from './InputForm';
import emailDomains from '../assets/api/dataEmailDomain';

const JoinForm = ({
  inputJoin,
  inputEmailId,
  isModal,
  setIsModal,
  isCheckAll,
  onChangeInputJoin,
  datalistEmail,
  sendEmail,
  verifyEmail,
  onCheck,
  onCheckAll,
  onClickJoin,
  onModalOpen,
  onModalClose,
}) => {
  return (
    <Join>
      <Title>회원가입</Title>
      <Form className='vertical_flex' align='start'>
        <div>
          <InputForm
            label='이메일'
            className='ovalInputWithButton'
            type='text'
            name='email'
            placeHolder='이메일'
            onChangeMethod={onChangeInputJoin}
            button='인증요청'
            btnClickMethod={sendEmail}
          />
        </div>

        <datalist id='email-domain' className='oval'>
          {emailDomains.map((elem, index) => (
            <option key={index.toString()} value={`${inputEmailId}@${elem.domain}`}></option>
          ))}
        </datalist>
        <div>
          <InputForm
            label='인증번호'
            className='ovalInputWithButton'
            type='type'
            name='emailV'
            placeHolder='인증번호 입력'
            onChangeMethod={onChangeInputJoin}
            condition='제한 시간 내로 입력해주세요'
            button='확인'
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
            onChangeMethod={onChangeInputJoin}
            condition='영문과 숫자 포함하여 8~20자'
          />
          <InputForm
            label='비밀번호 확인'
            className='oval pw_check'
            type='password'
            name='passwordCheck'
            placeHolder='비밀번호 확인'
            onChangeMethod={onChangeInputJoin}
          />
        </div>
        <div className='horizontal_flex'>
          <InputForm
            label='이름'
            className='oval'
            type='text'
            name='username'
            placeHolder='이름'
            onChangeMethod={onChangeInputJoin}
          />
          <InputForm
            label='연락처'
            className='oval'
            type='text'
            name='phoneNumber'
            placeHolder='연락처'
            onChangeMethod={onChangeInputJoin}
            condition=' - 제외하고 번호 입력'
          />
        </div>

        <JoinTerms
          inputJoin={inputJoin}
          isCheckAll={isCheckAll}
          isModal={isModal}
          setIsModal={setIsModal}
          onCheck={onCheck}
          onCheckAll={onCheckAll}
          onModalOpen={onModalOpen}
          onModalClose={onModalClose}
        />
        <button type='submit' className='oval join_btn' onClick={onClickJoin}>
          가입하기
        </button>
      </Form>
    </Join>
  );
};

export default JoinForm;
