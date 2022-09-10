import styled from '@emotion/styled';

const Join = styled.section`
  width: 420px;
  padding: 20px 0;
  margin: 0 auto;
  text-align: left;

  h1 {
    font-size: 25px;
    margin: 10px 0 30px 0;
    font-weight: bold;
    letter-spacing: 0.5px;
  }
`;

const Form = styled.form`
  div .row_form {
    margin-bottom: 35px;
  }

  & > div:first-of-type {
    margin-bottom: -20px;
  }

  button {
    padding: 15px 20px;
  }
`;

export { Join, Form };
