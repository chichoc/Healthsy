import styled from '@emotion/styled';
const PopUp = styled.article`
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Term = styled.div`
  background: white;
  padding: 20px 50px 50px 50px;
  width: 100%;
  max-width: 350px;
  height: auto;
  border-radius: 20px;

  nav {
    position: relative;
    height: 40px;
    /* background-color: red; */
  }
  nav h1 {
    font-size: 30px;
    font-weight: bold;
    position: absolute;
    top: 0;
  }
  nav button {
    position: absolute;
    top: 0;
    right: 0;
  }
  main {
    max-height: 300px;
    overflow-y: auto;
  }
`;

export { PopUp, Term };
