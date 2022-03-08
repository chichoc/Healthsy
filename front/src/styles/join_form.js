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
  margin: 20px 0;
  font-weight: bold;
`;

const Form = styled.form`
  div .row_form {
    /* background-color: red; */
    margin-top: 20px;
  }

  .pw_check {
  }

  .join_btn {
    color: white;
    border-radius: 20px;
    padding: 15px 20px;
    font-size: 20px;
    font-weight: bold;
    /* background-color: #00c9b7; */
    background-color: #ababab;
    border: 1px solid #ababab;
  }
`;

export { Join, Title, Form };
