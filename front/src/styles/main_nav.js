import styled from '@emotion/styled';

const NavMain = styled.nav`
  height: 100px;
  align-items: center;
  justify-content: center;
  padding: 0 100px;
  margin-bottom: 10px;
  ${(props) => props.searchForm && 'visibility: hidden;'};
  .logo {
    margin-right: 10%;
    font-size: 40px;
    font-family: 'Rokkitt', serif;
  }
  @media (max-width: 768px) {
    /* For mobile phones: */
    .logo {
      text-align: center;
    }
  }
`;
const AsideMain = styled.aside`
  margin: 68px auto 0 auto; // 30 + 50 - 10
  max-width: 70%;
  input,
  button {
    font-size: 20px;
  }
  button {
    color: #dcdcdc;
    position: absolute;
    top: 68px;
    right: 100px;
    padding-top: 10px;
  }
`;

const UlMain = styled.ul`
  align-items: center;
  flex: 1 1 70%;
  li {
    padding: 0 10px;
    flex: 0 1 auto;
    cursor: pointer;
    color: #505050;
  }
  li:hover {
    color: #000000;
  }
`;

export { AsideMain, NavMain, UlMain };
