import React, { useState } from 'react';
import InputForm from '../../reusable/InputForm';
import CircleCheck from '../../reusable/CircleCheck';
import PrimaryButton from '../../reusable/PrimaryButton';
import { DivLogin, FormLogin } from '../../../styles/form/login/login_form';

const LoginForm = ({ inputLogin, setInputLogin, loginDB }) => {
  const [isValidatedLogin, setIsValidatedLogin] = useState({});
  const [isSubmitLogin, setIsSubmitLogin] = useState(false); // 중복 누름 방지

  const isValidatedAllLogin =
    Object.keys(isValidatedLogin).length === 2 && Object.values(isValidatedLogin).every((value) => !!value);

  const onInputLoginChanged = (e) => {
    const { name, value } = e.target;
    setInputLogin({ ...inputLogin, [name]: value });
  };

  const onClickLogin = (e) => {
    setIsSubmitLogin(true);
    e.preventDefault();
    loginDB();
    setIsSubmitLogin(false);
  };

  return (
    <DivLogin>
      <p>
        나에게 필요한 영양제를 <br />
        쉽고 빠르게 알아보세요!
      </p>
      <FormLogin className='vertical_flex' align='center'>
        <InputForm
          label='이메일'
          rowSet={true}
          typeToValidate={'email'}
          name='email'
          isValidated={isValidatedLogin}
          setIsValidated={setIsValidatedLogin}
          placeHolder='이메일'
          changeMethod={onInputLoginChanged}
        />
        <InputForm
          label='비밀번호'
          type='password'
          name='password'
          isValidated={isValidatedLogin}
          setIsValidated={setIsValidatedLogin}
          placeHolder='비밀번호'
          changeMethod={onInputLoginChanged}
        />

        <CircleCheck id={'loginCheck'} headerSpan={'로그인 상태 유지'} className={'login_check'} />

        <PrimaryButton
          type={'submit'}
          disabled={!isValidatedAllLogin || isSubmitLogin}
          buttonName={'로그인'}
          onClickMethod={onClickLogin}
        />
      </FormLogin>
    </DivLogin>
  );
};

export default LoginForm;
