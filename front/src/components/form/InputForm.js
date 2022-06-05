import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onChangeInput, onFocusInput, onBlurInput } from '../../store/features/formSlice';
import { Div } from '../../styles/input_form';
import emailDomains from '../../assets/api/dataEmailDomain';

const InputForm = ({ label, className, type = 'text', name, placeHolder, button, condition, btnClickMethod }) => {
  const inputElement = useRef();
  const form = useSelector((state) => state.form.value);
  const dispatch = useDispatch();

  // join: const { email, emailVerifyCode, password, passwordCheck, userName, phoneNumber } = inputFocusJoin;

  return (
    <Div className='row_form'>
      <span className={form.focusedInputName[name] ? 'focus' : ''}>{label}</span>
      <div className={button ? 'horizontal_flex' : ''}>
        <input
          className={className}
          type={type}
          name={name}
          placeholder={placeHolder}
          onChange={() => dispatch(onChangeInput(inputElement.current))}
          onFocus={() => dispatch(onFocusInput(inputElement.current.name))}
          onBlur={() => dispatch(onBlurInput(inputElement.current.name))}
          ref={inputElement}
        ></input>
        <datalist id='email-domain' className='oval'>
          {emailDomains.map((elem, index) => (
            <option key={index.toString()} value={`${form.inputValue.inputEmailId}@${elem.domain}`}></option>
          ))}
        </datalist>
        {button ? (
          <button className='ovalButtonWithInput' onClick={btnClickMethod}>
            {button}
          </button>
        ) : (
          ''
        )}
      </div>
      {condition ? <h5>{`ⓘ ${condition}`}</h5> : ''}
      {/* {condition ? <h5>형식에 맞지 않습니다.</h5> : ''} */}
    </Div>
  );
};

export default InputForm;
