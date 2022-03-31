import React from 'react';
import { Div } from '../styles/input_form';

const InputForm = ({
  label,
  focusState,
  className,
  type,
  name,
  placeHolder,
  onChangeMethod,
  onBlurMethod,
  onFocusMethod,
  button,
  condition,
  btnClickMethod,
}) => {
  return (
    <Div className='row_form'>
      <span className={focusState ? 'focus' : ''}>{label}</span>
      <div className={button ? 'horizontal_flex' : ''}>
        <input
          className={className}
          type={type}
          name={name}
          placeholder={placeHolder}
          onChange={onChangeMethod}
          onFocus={onFocusMethod}
          onBlur={onBlurMethod}
        ></input>
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
