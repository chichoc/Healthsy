import styled from '@emotion/styled';

const NavProduct = styled.nav`
  margin: 10px 100px 0px;
  height: 50px;
  background-color: #dddd;
  align-items: center;
  button {
    width: 25%;
    text-align: center;
    border-right: solid 0.5px;
  }
  button:last-child {
    border-right: none;
  }
`;

export { NavProduct };
