import styled from '@emotion/styled';

const Join = styled.section`
  width: 450px;
  margin: 0 auto;
  text-align: left;
`;

const Form = styled.form`
  .row_form,
  fieldset {
    margin-bottom: 30px;
  }
  .row_set {
    margin-bottom: 20px;
  }

  fieldset {
    border: solid 1px #dcdcdc;
    border-radius: 20px;
    padding: 15px 20px;
    font-size: 15px;
  }
  fieldset legend {
    padding: 0 5px;
    color: #616161;
  }
  fieldset input {
    margin-right: 5px;
  }
  fieldset label {
    margin-right: 5px;
    vertical-align: text-top;
  }

  button {
    width: 200px;
  }
`;

export { Join, Form };
