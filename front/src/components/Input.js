import React from 'react';
import { Label } from '../styles/input';

const Input = ({ label, className, type, name, placeHolder, onChangeMethod }) => {
  return (
    <Label>
      <h3>{label}</h3>
      <input className={className} type={type} name={name} placeholder={placeHolder} onChange={onChangeMethod}></input>
    </Label>
  );
};

export default Input;
