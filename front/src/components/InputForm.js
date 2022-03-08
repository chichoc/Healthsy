import React from 'react';
import { Div } from '../styles/input_form';

const InputForm = ({
  label,
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
      <span className={label ? 'focus' : ''}>{label}</span>
      <div className='horizontal_flex'>
        <input
          className={className}
          type={type}
          name={name}
          placeholder={placeHolder}
          onChange={onChangeMethod}
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
    </Div>
  );
};

export default InputForm;
