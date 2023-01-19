import styled from '@emotion/styled';

const Join = styled.section`
  width: 450px;
  margin: 0 auto;
  text-align: left;
`;

const Form = styled.form`
  div.row_set,
  fieldset {
    margin-bottom: 25px;
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
    font-size: 14px;
  }

  div.horizontal_flex_button button {
    width: 200px;
    padding: 13px 20px;
    border-radius: 40px;
    margin-top: 10px;
  }

  div.distinguish {
    border-bottom: 1px solid #f2f2f2;
    margin-bottom: 20px;
  }
`;

export { Join, Form };
