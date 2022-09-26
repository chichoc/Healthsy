import styled from '@emotion/styled';

const DivLogin = styled.div`
  text-align: center;
  p {
    margin: 30px 0 20px;
    font-size: 20px;
    line-height: 1.5;
  }
`;
const FormLogin = styled.form`
  width: 250px;
  margin: 0 auto;

  .row_set {
    margin-bottom: 15px;
  }
  .login_check span {
    color: #616161;
    font-size: 15px;
  }
`;

export { DivLogin, FormLogin };
