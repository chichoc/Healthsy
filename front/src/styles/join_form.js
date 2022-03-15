import styled from '@emotion/styled';

const Join = styled.section`
  /* background-color: red; */
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
    /* background-color: red; */
    margin-bottom: 40px;
  }

  div > div:first-child {
    /* margin-bottom: 20px; */
    /* background-color: red; */
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
  border: 1px solid ${(props) => (props.able ? '#00c9b7' : '#ababab')};
  background-color: ${(props) => (props.able ? '#00c9b7' : '#ababab')};
`;

export { Join, Title, Form, Button };
