import styled from '@emotion/styled';

const Div = styled.div`
  /* background-color: red; */
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
`;

const InputContainer = styled.label`
  position: relative;

  span {
    position: absolute;
    color: #616161;
    top: 0;
    padding: 10px 20px;
    font-size: 15px;
    transition: top 0.5s ease-in-out, font-size 0.2s ease-in-out;
    display: none;
  }

  span.focus {
    top: 5px;
    left: 20px;
    padding: 0 3px;
    display: inline;
    font-size: 13px;
    background-color: white;
    color: #616161;
  }

  input[type='text'] {
    border: 1px solid #dcdcdc;
    margin-top: 10px;
    font-size: 15px;
    box-sizing: border-box;
    width: 100%;
  }

  input::placeholder {
    color: #616161;
  }

  input:focus {
    border: 2px solid #ababab;
  }

  input:focus::placeholder {
    color: transparent;
  }
`;

const InputCheck = styled.label`
  text-align: left;
  font-size: 15px;
  margin-top: 10px;

  input[type='checkbox'] {
    display: none;
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
    margin-right: 4px;
    vertical-align: baseline;
  }
  input[type='checkbox']:checked + span::before {
    border-color: #00c9b7;
    content: '\u2713';
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

export { Div, Form, Button, InputContainer, InputCheck };
