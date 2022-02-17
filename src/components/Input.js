import React from 'react';

const Input = ({ label, className, type, name, placeHolder, onChangeInputJoin }) => {
  return (
    <label>
      <h3>{label}</h3>
      <input
        className={className}
        type={type}
        name={name}
        placeholder={placeHolder}
        onChange={onChangeInputJoin}
      ></input>
    </label>
  );
};

export default Input;
