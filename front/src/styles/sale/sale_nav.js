import styled from '@emotion/styled';

const Nav = styled.nav`
  margin: 20px 100px;
  p {
    font-size: 12px;
    padding: 0 0 5px 10px;
    color: #acacac;
    span {
      letter-spacing: 1px;
    }
  }
  ul {
    text-align: center;
    overflow-x: auto;
    height: 90px;
    flex: 1 0 auto;
    justify-content: flex-start;
  }
  button {
    background-color: #dddd;
    padding: 10px;
    border-radius: 20px;
    margin: 5px;
    font-size: 15px;
  }
  button.select,
  button.selectAll {
    background-color: #344b47;
    color: white;
  }
  button.select::after {
    content: '\\00a0\\00a0\\00a0\\2715';
    font-size: 10px;
  }
`;

export { Nav };
