import React from 'react';
import styled from '@emotion/styled';

const PrimaryButton = ({ buttonName, disabled = false, type = 'button', onClickMethod }) => {
  return (
    <Button type={type} disabled={disabled} onClick={onClickMethod}>
      {buttonName}
    </Button>
  );
};

const Button = styled.button`
  width: 100%;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => (props.type === 'submit' ? '#ffff' : '#00c9b7')};
  background-color: ${(props) => (props.type === 'submit' ? '#00c9b7' : '#ffff')};
  border: 1px solid ${(props) => (props.disabled ? '#ababab' : '#00c9b7')};
  background-color: ${(props) => props.disabled && '#ababab'};
`;

export default PrimaryButton;
