import styled from '@emotion/styled';

const Terms = styled.ul`
  text-align: left;
  border: 1px solid #dddd;
  margin: 10px 0 30px 0;
  border-radius: 20px;

  li {
    border-bottom: 1px solid #dddd;
    margin: 0;
    padding: 15px 10px 15px 20px;
    font-size: 15px;
    position: relative;
  }

  li:last-child {
    border-bottom: none;
  }

  .termBtn {
    position: absolute;
    right: 40px;
    padding: 0px;
    cursor: pointer;
    color: #ababab;
  }
`;

export { Terms };
