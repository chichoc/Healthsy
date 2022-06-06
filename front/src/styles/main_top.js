import styled from '@emotion/styled';

const Nav = styled.nav`
  background-color: #e8f3f1;
  height: 30px;
  align-items: ${(props) => props.align};
  padding: 5px 100px;
`;

const Ul = styled.ul`
  align-items: ${(props) => props.align};
  li {
    padding: 0 10px;
  }
`;

export { Nav, Ul };
