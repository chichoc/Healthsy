import styled from '@emotion/styled';

const Header = styled.header`
  /* background-color: red; */
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
    /* background-color: blue; */
  }
`;

export { Header, Nav, Ul };
