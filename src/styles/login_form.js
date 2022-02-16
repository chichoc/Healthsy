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
    top: 0;
    padding: 10px 20px;
    font-size: 15px;
    transition: top 0.5s ease-in-out, font-size 0.2s ease-in-out;
    z-index: 1000;
    display: none;
  }

  span.focus {
    top: 5px;
    left: 20px;
    padding: 0 3px;
    display: inline;
    font-size: 13px;
    background-color: white;
  }

  input[type='text'] {
    border: 1px solid #dddd;
    margin-top: 10px;
    font-size: 15px;
    box-sizing: border-box;
    width: 100%;
  }

  input:focus {
    border: 2px solid #555;
  }

  input:focus::placeholder {
    color: transparent;
  }
`;

const InputCheck = styled.label`
  text-align: left;
  font-size: 13px;
`;

const Button = styled.button`
  background-color: #00c9b7;
  color: white;
  margin-top: 10px;
  font-size: 15px;
`;

export { Div, Form, Button, InputContainer, InputCheck };
