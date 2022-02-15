import styled from '@emotion/styled';

const Join = styled.section`
  /* background-color: red; */
  width: 400px;
  padding: 20px 0;
  margin: 0 auto;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 30px;
  margin: 10px 0;
  font-weight: bold;
`;

const Form = styled.form`
  label {
    margin: 10px 0;
    /* background-color: red; */
  }
  .oval {
    border-radius: 20px;
    padding: 10px 20px;
    /* background-color: red; */
    border: 1px solid #dddd;
  }
  input {
    /* background-color: red; */
    margin-top: 10px;
    font-size: 15px;
  }
  .pw_check {
    /* background-color: red; */
    margin: 10px 0;
  }
  button {
    background-color: #00c9b7;
    color: white;
    margin-top: 10px;
    font-size: 15px;
  }

  .join_btn {
    padding: 15px 20px;
    font-size: 20px;
    font-weight: bold;
  }
`;
const Email = styled.div``;

export { Join, Title, Form, Email };
