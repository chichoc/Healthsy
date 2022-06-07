import styled from '@emotion/styled';

const Div = styled.div`
  text-align: center;
  width: 400px;
  margin: 30px auto 0;
  font-size: 20px;
  p {
    padding: 10px;
    line-height: 1.5;
  }
`;
const Form = styled.form`
  width: 250px;
  margin: 0 auto;
  .oval {
    border-radius: 20px;
    padding: 10px 20px;
  }
  span.focus {
    top: 5px;
  }
  div {
    margin-bottom: 0px;
  }
  div > input {
    width: 100%;
    margin-top: 10px;
  }
`;

const InputCheck = styled.label`
  text-align: left;
  font-size: 15px;
  margin-top: 10px;

  input[type='checkbox'] {
    display: none;
    /* appearance: none; */
  }
  input[type='checkbox'] + span::before {
    box-sizing: border-box;
    content: '\u00A0';
    display: inline-block;
    border: 1px solid #dddd;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    margin: 0 4px;
    /* position: absolute; */
  }
  input[type='checkbox']:checked + span::before {
    border-color: #00c9b7;
    content: '\u2713';
    font-weight: bold;
    font-size: 14px;
    padding-left: 1px;
    color: white;
    background-color: #00c9b7;
  }
  span {
    color: #616161;
  }
`;

const Button = styled.button`
  background-color: #00c9b7;
  color: white;
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
`;

export { Div, Form, Button, InputCheck };
