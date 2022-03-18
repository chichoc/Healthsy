import styled from '@emotion/styled';

const Header = styled.header`
  height: 100px;
  align-items: ${(props) => props.align};
  padding: 0 120px;
  box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.3);
`;

const Nav = styled.nav``;

const Ul = styled.ul`
  align-items: ${(props) => props.align};
  li {
    padding: 0 10px;
  }
  img.search {
    width: 20px;
    vertical-align: text-bottom;
    margin-bottom: -2px;
  }
`;

export { Header, Nav, Ul };
