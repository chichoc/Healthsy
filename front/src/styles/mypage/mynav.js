import styled from '@emotion/styled';

const NavMyPage = styled.nav`
  padding-top: 30px;
  margin-left: 100px;
  margin-right: 40px;
  flex: 0 0 auto;
  color: #383838;
  max-width: 25%;

  h2 {
    letter-spacing: 0.8px;
    font-weight: bold;
    font-size: 20px;
    padding-left: 5px;
    margin-bottom: 5px;
  }
  ul {
    padding-bottom: 15px;
  }
  ul li {
    padding: 10px;
    margin: 10px 0px;
    border-radius: 10px;
  }
  ul li:hover {
    background-color: #f0f0f0;
  }
`;

export { NavMyPage };
