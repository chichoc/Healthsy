import styled from '@emotion/styled';

const Header = styled.nav`
  height: 100px;
  align-items: ${(props) => props.align};
  justify-content: space-between;
  padding: 0 100px;
  box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
`;

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

export { Header, Ul };
