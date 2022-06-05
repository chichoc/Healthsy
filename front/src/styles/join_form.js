import styled from '@emotion/styled';

const Join = styled.section`
  width: 420px;
  padding: 20px 0;
  margin: 0 auto;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 30px;
  margin: 10px 0 25px 0;
  font-weight: bold;
`;

const Form = styled.form`
  div .row_form {
    margin-bottom: 40px;
  }

  & > div:first-of-type {
    margin-bottom: -20px;
  }

  .pw_check {
  }
`;

const Button = styled.button`
  color: white;
  border-radius: 20px;
  padding: 15px 20px;
  font-size: 20px;
  font-weight: bold;
  border: 1px solid ${(props) => (props.disabled ? '#ababab' : '#00c9b7')};
  background-color: ${(props) => (props.disabled ? '#ababab' : '#00c9b7')};
`;

export { Join, Title, Form, Button };
