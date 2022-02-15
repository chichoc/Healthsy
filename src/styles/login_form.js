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
  input {
    border: 1px solid #dddd;
    margin-top: 10px;
    font-size: 15px;
  }
  button {
    background-color: #00c9b7;
    color: white;
    margin-top: 10px;
    font-size: 15px;
  }
  label {
    text-align: left;
    font-size: 13px;
  }
`;

export { Div, Form };
