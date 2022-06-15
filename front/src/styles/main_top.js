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
const ClickMenu = styled.ul`
  background: #fff;
  border-radius: 8px;
  position: absolute;
  top: 40px;
  right: 80px;
  width: 90px;
  text-align: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  opacity: ${(props) => (props.open ? 1 : 0)};
  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
  transform: ${(props) => (props.open ? 'translateY(0)' : 'translateY(-20px)')};
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;

  li {
    padding: 10px;
    font-size: 15px;
  }
  li:hover {
    cursor: pointer;
    background-color: #f8f8f8;
  }
`;

export { Nav, Ul, ClickMenu };
