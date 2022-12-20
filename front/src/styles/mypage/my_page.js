import styled from '@emotion/styled';

const DivMyPage = styled.div`
  justify-content: flex-start;
  flex-wrap: nowrap;
  margin: 0 100px;
`;

const NavMyPage = styled.nav`
  padding-top: 30px;
  margin-right: 5%;
  color: #383838;
  max-width: 25%;
  min-width: 95px;
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

const MainMyPage = styled.main`
  margin-left: 10px;
  padding: 20px 0;
  flex: 1 0 67%;
  h1 {
    font-size: 25px;
    font-weight: bold;
    margin: 10px 0 35px 0;
  }
`;

export { DivMyPage, NavMyPage, MainMyPage };
