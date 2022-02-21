import React from 'react';

const Input = ({ label, className, type, name, placeHolder, onChangeMethod }) => {
  return (
    <label>
      <h3>{label}</h3>
      <input className={className} type={type} name={name} placeholder={placeHolder} onChange={onChangeMethod}></input>
    </label>
  );
};

export default Input;
