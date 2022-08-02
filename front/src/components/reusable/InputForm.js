import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onFocusInput, onBlurInput } from '../../store/features/formSlice';
import { DivInputForm } from '../../styles/form/input_form';
import emailDomains from '../../assets/api/dataEmailDomain';

const InputForm = ({
  label,
  className,
  row_set,
  type = 'text',
  name,
  value,
  inputEmailId,
  placeHolder,
  button,
  condition,
  changeMethod,
  btnClickMethod,
  disabled = false,
  readOnly = false,
  outerRef,
}) => {
  const innerRef = useRef();
  const inputRef = outerRef || innerRef;

  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();

  return (
    <DivInputForm className={row_set ? 'row_set' : 'row_form'}>
      <span className={form.focusedInputName[name] ? 'focus' : ''}>{label}</span>
      <div className={button ? 'horizontal_flex' : ''}>
        <input
          disabled={disabled}
          readOnly={readOnly}
          className={className}
          type={type}
          name={name}
          placeholder={placeHolder}
          value={value}
          onChange={changeMethod}
          onFocus={() => dispatch(onFocusInput(inputRef.current.name))}
          onBlur={() => dispatch(onBlurInput(inputRef.current.name))}
          ref={inputRef}
        />

        <datalist id='email-domain' className='oval'>
          {emailDomains.map((elem, index) => (
            <option key={index.toString()} value={`${inputEmailId}@${elem.domain}`}></option>
          ))}
        </datalist>

        {button && (
          <button className='ovalButtonWithInput' onClick={btnClickMethod}>
            {button}
          </button>
        )}
      </div>
      {condition ? <h5>{`ⓘ ${condition}`}</h5> : ''}
      {/* {condition ? <h5>형식에 맞지 않습니다.</h5> : ''} */}
    </DivInputForm>
  );
};

export default InputForm;
