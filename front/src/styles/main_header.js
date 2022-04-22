import styled from '@emotion/styled';

const Header = styled.nav`
  height: 100px;
  align-items: ${(props) => props.align};
  justify-content: space-between;
  padding: 0 100px;
  box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
  span {
  }
`;

const HeaderLogo = styled.span`
  padding-right: 40px;
  flex: 1 0 auto;
  font-size: 40px;
  font-family: 'Rokkitt', serif;
`;

const Ul = styled.ul`
  align-items: ${(props) => props.align};
  max-width: 700px;
  flex: 1 1 auto;
  li {
    padding: 0 10px;
    flex: 0 1 auto;
  }
  img.search {
    width: 20px;
    vertical-align: text-bottom;
    margin-bottom: -2px;
  }
`;

export { Header, HeaderLogo, Ul };
