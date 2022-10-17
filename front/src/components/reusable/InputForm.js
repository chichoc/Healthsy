import React, { useEffect, useRef, useState } from 'react';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import emailDomains from '../../assets/api/dataEmailDomain';
import { DivInputForm } from '../../styles/form/input_form';

const InputForm = ({
  label,
  className = 'oval',
  rowSet = false,
  type = 'text',
  typeToValidate = '',
  name,
  value,
  isValidated,
  setIsValidated,
  placeHolder,
  changeMethod,
  blurMethod,
  button,
  btnClickMethod,
  condition,
  inputDisabled = false,
  readOnly = false,
  btnDisabled = false,
  outerRef,
}) => {
  const innerRef = useRef();
  const inputRef = outerRef || innerRef;
  const [inputFocus, setInputFocus] = useState(false);
  const [inputType, setInputType] = useState(type);
  const [inputEmailId, setInputEmailId] = useState('');

  const regToValidate = {
    email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    password: /^[0-9a-zA-Z]{8,20}$/,
    phone: /^\d{3}-\d{4}-\d{4}$/,
  };

  const validateInput = (value, reg = /[^?!\s*$~<>@]{1,}/g) => {
    if (reg.test(value)) return true;
    else return false;
  };

  const onHandleTypeAttribute = () => {
    inputRef.current.type = inputRef.current.type === 'password' ? 'text' : 'password';
    setInputType(inputRef.current.type);
  };

  useEffect(() => {
    const onHandleDataList = () => {
      if (validateInput(inputEmailId) && inputEmailId.length > 0) inputRef.current.setAttribute('list', 'email-domain');
      else inputRef.current.removeAttribute('list');
    };
    onHandleDataList();
  }, [inputEmailId, inputRef]);

  return (
    <DivInputForm
      className={rowSet ? 'row_set' : 'row_form'}
      wrong={!isValidated || isValidated[name] === undefined ? false : !isValidated[name]}
    >
      <div className={button ? 'horizontal_flex' : ''}>
        <label htmlFor={name} className={inputFocus ? 'focus' : ''}>
          {label}
        </label>
        <input
          ref={inputRef}
          id={name}
          disabled={inputDisabled}
          readOnly={readOnly}
          className={name.includes('password') ? className + ' password' : className}
          type={type}
          name={name}
          placeholder={placeHolder}
          value={value}
          onChange={(e) => {
            const { value } = e.target;
            changeMethod(e);
            setIsValidated({ ...isValidated, [name]: validateInput(value, regToValidate[typeToValidate]) });
            blurMethod && setIsValidated({ ...isValidated, [name]: true });
            name.includes('email') &&
              (value.includes('@') ? setInputEmailId(value.slice(0, value.lastIndexOf('@'))) : setInputEmailId(''));
          }}
          onFocus={() => setInputFocus(true)}
          onBlur={(e) => {
            // 입력값 있으면 label 보이도록
            !inputRef.current.value && setInputFocus(false);
            // 비밀번호 확인 입력창의 경우 다 입력한 후에 일치 여부 확인할 수 있도록
            blurMethod && setIsValidated({ ...isValidated, [name]: blurMethod(e.target.value) });
          }}
        />
        {/* 이메일 입력시 자주 쓰이는 도메인 제시 */}
        <datalist id='email-domain' className='oval'>
          {emailDomains.map((domain, index) => (
            <option key={index} value={`${inputEmailId}@${domain}`}></option>
          ))}
        </datalist>

        {/* 비밀번호 타입만 입력시 입력값 볼 수 있는 아이콘 추가 */}
        {name.includes('password') &&
          inputRef.current?.value &&
          (inputType === 'password' ? (
            <BsEyeSlash className='inner_button_right' onClick={onHandleTypeAttribute} />
          ) : (
            <BsEye className='inner_button_right' onClick={onHandleTypeAttribute} />
          ))}

        {button && (
          <button className='ovalButtonWithInput' onClick={btnClickMethod} disabled={btnDisabled || !isValidated}>
            {button}
          </button>
        )}
      </div>
      {condition ? <h5>{`ⓘ ${condition}`}</h5> : ''}
    </DivInputForm>
  );
};

export default InputForm;
