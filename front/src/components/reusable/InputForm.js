import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showInputLabel, hideInputLabel } from '../../store/features/formSlice';
import { BsEyeSlash } from 'react-icons/bs';
import emailDomains from '../../assets/api/dataEmailDomain';
import { DivInputForm } from '../../styles/form/input_form';

const InputForm = ({
  label,
  className,
  row_set,
  type = 'text',
  name,
  value,
  inputEmailId,
  typeToValidate = '',
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

  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();

  const validateInput = (reg = /^(?!\s*$).+/, value) => {
    if (reg.test(value)) return true;
    else return false;
  };

  const regToValidate = {
    email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    password: /^[0-9a-zA-Z]{8,20}$/,
    phone: /^\d{3}-\d{4}-\d{4}$/,
  };

  const onHandleTypeAttribute = () => {
    inputRef.current.type = inputRef.current.type === 'password' ? 'text' : 'password';
  };

  return (
    <DivInputForm
      className={row_set ? 'row_set' : 'row_form'}
      wrong={!isValidated || isValidated[name] === undefined ? false : !isValidated[name]}
    >
      <div className={button ? 'horizontal_flex' : ''}>
        <label htmlFor={name} className={form.focusedInputName[name] ? 'focus' : ''}>
          {label}
        </label>
        <input
          id={name}
          disabled={inputDisabled}
          readOnly={readOnly}
          className={name.includes('password') ? className + ' password' : className}
          type={type}
          name={name}
          placeholder={placeHolder}
          value={value}
          onChange={(e) => {
            changeMethod(e);
            setIsValidated({ ...isValidated, [name]: validateInput(regToValidate[typeToValidate], e.target.value) });
            blurMethod && setIsValidated({ ...isValidated, [name]: true });
          }}
          onFocus={() => {
            dispatch(showInputLabel(inputRef.current.name));
          }}
          onBlur={(e) => {
            // 입력값 있으면 label 보이도록
            !inputRef.current.value && dispatch(hideInputLabel(inputRef.current.name));
            // 비밀번호 확인 입력창의 경우 다 입력한 후에 일치 여부 확인할 수 있도록
            blurMethod && setIsValidated({ ...isValidated, [name]: blurMethod(e.target.value) });
          }}
          ref={inputRef}
        />
        {/* 비밀번호 타입만 입력값 볼 수 있는 아이콘 추가 */}
        {name.includes('password') && inputRef.current?.value && (
          <BsEyeSlash className='handle_input_type' color='#616161' onClick={onHandleTypeAttribute} />
        )}

        <datalist id='email-domain' className='oval'>
          {emailDomains.map((elem, index) => (
            <option key={index.toString()} value={`${inputEmailId}@${elem.domain}`}></option>
          ))}
        </datalist>

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
