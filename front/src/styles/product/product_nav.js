import styled from '@emotion/styled';

const DivProduct = styled.div`
  margin: 10px 100px 0px;
  .sticky {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 1;
    margin: 0px 100px;
  }
  .sticky + section {
    padding-top: 50px;
  }
`;

const NavProduct = styled.nav`
  align-items: center;
  button {
    width: 33.3%;
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
    margin: 20px 0;
    padding-top: 20px;
  }
`;

export { DivProduct, NavProduct, SectionProduct };
