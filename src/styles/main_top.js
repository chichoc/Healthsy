import styled from '@emotion/styled';

const Nav = styled.nav`
  background-color: #e8f3f1;
  height: 30px;
  align-items: ${(props) => props.align};
  padding: 5px 120px;
`;

const Ul = styled.ul`
  li {
    padding: 0 10px;
    /* background-color: red; */
  }
`;

export { Nav, Ul };
