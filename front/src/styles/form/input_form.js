import styled from '@emotion/styled';

const DivInputForm = styled.div`
  position: relative;
  font-size: 15px;
  margin-bottom: 20px;

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
    top: -5px;
    left: 20px;
    padding: 0 3px;
    display: inline;
    font-size: 13px;
    background-color: white;
    color: #616161;
  }

  input {
    font-size: inherit;
    box-sizing: border-box;
    border: 1px solid #dcdcdc;
    width: 100%;
  }
  input::placeholder {
    color: #616161;
  }
  input[type='password'] {
    letter-spacing: 5px;
  }
  input[type='password']::placeholder {
    letter-spacing: 0px;
  }
  input[disabled],
  input[readOnly] {
    color: #a0a0a0;
    background-color: rgba(239, 239, 239, 0.3);
  }

  input:focus {
    border: 2px solid #ababab;
  }
  input:focus::placeholder {
    color: transparent;
  }
  button {
    font-size: inherit;
    border-radius: 0 20px 20px 0;
  }

  h5 {
    font-size: 12px;
    margin-top: 5px;
    margin-left: 10px;
    position: absolute;
    color: #616161;
  }
  .oval {
    border-radius: 20px;
    padding: 10px 20px;
  }

  .ovalInputWithButton {
    border-radius: 20px 0 0 20px;
    padding: 10px 20px;
    border-right: none;
    flex: 2;
  }

  .ovalButtonWithInput {
    border-radius: 0 20px 20px 0;
    padding: 10px 20px;
    border: 1px solid #dcdcdc;
    background-color: #f2f2f2;
    flex: 1;
  }
`;
export { DivInputForm };
