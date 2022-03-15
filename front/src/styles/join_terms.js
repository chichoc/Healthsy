import styled from '@emotion/styled';

const Terms = styled.ul`
  text-align: left;
  border: 1px solid #dddd;
  margin: 10px 0 30px 0;
  border-radius: 20px;

  li {
    border-bottom: 1px solid #dddd;
    margin: 0;
    padding: 15px 10px 15px 15px;
    font-size: 15px;
    position: relative;
  }

  li:last-child {
    border-bottom: none;
  }

  input {
    margin-right: 10px;
  }

  span {
    font-size: 12px;
  }
  span.required {
    color: red;
  }
  span.optional {
    color: #ababab;
  }

  .termBtn {
    position: absolute;
    right: 10px;
    font-weight: lighter;
  }
`;

export { Terms };
