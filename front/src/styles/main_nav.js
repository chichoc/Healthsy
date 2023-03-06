import styled from '@emotion/styled';

const NavMain = styled.nav`
  height: 100px;
  align-items: center;
  justify-content: center;
  padding: 0 100px;
  box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.3);
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
  button.form_close {
    font-size: 20px;
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
    color: #686868;
  }

  li:hover {
    color: #282828;
  }
  li svg:hover {
    fill: #282828;
  }
`;

export { AsideMain, NavMain, UlMain };
