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

  button {
    width: 200px;
  }
`;

export { Join, Title, Form };
