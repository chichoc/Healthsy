import styled from '@emotion/styled';

const NavMyPage = styled.nav`
  padding-top: 30px;
  padding-left: 100px;
  margin-right: 10px;
  min-width: 105px;
  flex: 0 0 12%;
  color: #383838;

  h2 {
    font-weight: bold;
    font-size: 20px;
  }
  ul {
    padding-bottom: 20px;
    width: 80%;
  }
  ul li {
    padding: 10px 5px 10px 5px;
    margin: 10px 0px;
    border-radius: 10px;
    text-align: center;
  }
  ul li:hover {
    background-color: red;
  }
`;

export { NavMyPage };
