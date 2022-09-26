import styled from '@emotion/styled';
import React from 'react';

const CircleCheck = ({ id, headerSpan, checked, onChangeMethod, detailSpan, className }) => {
  return (
    <LabelCheck className={className}>
      <input type='checkbox' id={id} name={id} checked={checked} onChange={() => onChangeMethod(id)} />
      <span>{headerSpan}</span>
      {detailSpan && <span className={detailSpan}>{detailSpan === 'required' ? '(필수)' : '(선택)'}</span>}
    </LabelCheck>
  );
};

const LabelCheck = styled.label`
  margin: -10px 0 10px;
  text-align: left;
  input[type='checkbox'] {
    display: none;
  }
  input[type='checkbox'] + span::before {
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
  input[type='checkbox']:checked + span::before {
    color: white;
    border-color: #00c9b7;
    background-color: #00c9b7;
  }
  span {
    letter-spacing: 0.5px;
  }
  span.required,
  span.optional {
    font-size: 12px;
    margin-left: 4px;
  }
  span.required {
    color: red;
  }
  span.optional {
    color: #ababab;
  }
`;

export default CircleCheck;
