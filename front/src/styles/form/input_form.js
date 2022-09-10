import styled from '@emotion/styled';

const DivInputForm = styled.div`
  position: relative;
  font-size: 15px;
  margin-bottom: 20px;

  label {
    position: absolute;
    color: ${(props) => (props.wrong ? '#ff8566' : '#616161')};
    top: 0;
    padding: 10px 20px;
    font-size: 15px;
    transition: top 0.5s ease-in-out, font-size 0.2s ease-in-out;
    display: none;
    letter-spacing: 0.5px;
  }
  label.focus {
    top: -5px;
    left: 17px;
    padding: 0 3px;
    display: inline;
    font-size: 13px;
    background-color: white;
    color: ${(props) => (props.wrong ? '#ff8566' : '#616161')};
  }

  input {
    font-size: inherit;
    box-sizing: border-box;
    border: 1px solid ${(props) => (props.wrong ? '#ff8566' : '#dcdcdc')};
    width: 100%;
    letter-spacing: 1px;
  }
  input::placeholder {
    color: #616161;
  }
  input[type='password'] {
    letter-spacing: 5px;
  }
  input[type='password']::placeholder {
    letter-spacing: 1px;
  }
  input.password {
    padding-right: 35px;
    max-width: 198px;
  }
  input:disabled,
  input[readOnly] {
    color: #a0a0a0;
    background-color: rgba(239, 239, 239, 0.4);
  }
  input:focus {
    border: 1px solid ${(props) => (props.wrong ? '#ff8566' : '#ababab')};
  }
  input:focus::placeholder {
    color: transparent;
  }

  .handle_input_type {
    cursor: pointer;
    position: absolute;
    margin: auto 0;
    top: 0;
    bottom: 0;
    right: 15px;
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
    ${(props) => props.wrong || 'border-right: none;'};
    flex: 2;
  }

  .ovalButtonWithInput {
    border-radius: 0 20px 20px 0;
    padding: 10px 20px;
    border: 1px solid #00c9b7;
    color: #00c9b7;
    background-color: 'white';
    flex: 1;
  }

  .ovalButtonWithInput:disabled {
    border: 1px solid #bfbfbf;
    color: #999999;
    background-color: #f2f2f2;
  }
`;
export { DivInputForm };
