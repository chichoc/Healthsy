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
  label {
    text-align: left;
    margin: -10px 0 10px;
  }
  label span {
    color: #616161;
    font-size: 15px;
  }
`;

export { DivLogin, FormLogin };
