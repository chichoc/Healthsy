import styled from '@emotion/styled';

const DivProduct = styled.div`
  margin: 10px 100px 0px;
`;

const NavProduct = styled.nav`
  align-items: center;
  button {
    width: 25%;
    height: 50px;
    background-color: #f0f0f0;
    color: #344b47;
    text-align: center;
    border-right: solid 0.5px #b0b0b0;
    font-size: 16px;
  }
  button:last-child {
    border-right: none;
  }
  button.selectedNav {
    color: #000000;
    font-weight: bold;
    background-color: #ffffff;
    border: solid 0.5px #b0b0b0;
    border-bottom: none;
    border-left: none;
  }
  button.selectedNav:first-of-type {
    border-left: solid 0.5px #b0b0b0;
  }
`;
const SectionProduct = styled.section`
  h1 {
    font-weight: bold;
    font-size: 20px;
    margin: 10px 0;
  }
`;

export { DivProduct, NavProduct, SectionProduct };
