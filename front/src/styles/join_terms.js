import styled from '@emotion/styled';

const Terms = styled.section`
  text-align: left;
  border: 1px solid #dddd;
  margin: 30px 0;
  border-radius: 20px;

  label {
    border-bottom: 1px solid #dddd;
    margin: 0;
    padding: 10px;
  }

  label:last-child {
    border-bottom: none;
  }

  input {
    margin-right: 10px;
    width: 10px;
  }

  span {
    vertical-align: baseline;
  }
`;

export { Terms };
