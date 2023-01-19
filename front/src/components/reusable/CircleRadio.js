import styled from '@emotion/styled';
import React from 'react';

const CircleRadio = ({ name, dark = false, value, checked, onChangeMethod, headerSpan }) => {
  return (
    <LabelCheck>
      <input
        type='radio'
        className={dark ? 'dark' : ''}
        name={name}
        value={value}
        checked={checked}
        onChange={onChangeMethod}
      />
      {<span>{headerSpan}</span>}
    </LabelCheck>
  );
};

const LabelCheck = styled.label`
  margin-right: 20px;
  text-align: left;
  input[type='radio'] {
    display: none;
  }
  input[type='radio'] + span::before {
    box-sizing: border-box;
    content: '\u2713';
    font-size: 14px;
    display: inline-block;
    color: #dcdcdc;
    border: 1px solid #dcdcdc;
    padding-left: 1px;
    font-weight: bold;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin-right: 10px;
    line-height: 16px;
  }
  input[type='radio'].dark + span::before {
    color: white;
    background-color: #dcdcdc;
  }
  input[type='radio']:checked + span::before {
    color: white;
    border-color: #00c9b7;
    background-color: #00c9b7;
  }
  span {
    letter-spacing: 0.5px;
  }
`;

export default CircleRadio;
