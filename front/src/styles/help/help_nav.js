import styled from '@emotion/styled';

const NavHelp = styled.nav`
  padding-top: 30px;
  margin-right: 10%;
  color: #383838;
  max-width: 25%;
  min-width: 95px;

  ul li {
    padding: 10px;
    margin: 10px 0px;
    border-radius: 10px;
    color: #686868;
    text-align: center;
    font-size: 20px;
  }
  ul li:hover {
    background-color: #f0f0f0;
  }
`;

const MainHelp = styled.main`
  margin-left: 10px;
  padding: 20px 0;
  flex: 1 0 67%;
  h1 {
    font-size: 25px;
    font-weight: bold;
    margin: 10px 0 35px 0;
  }
`;

export { NavHelp, MainHelp };
