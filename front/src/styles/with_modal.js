import styled from '@emotion/styled';
const PopUp = styled.article`
  background: rgba(0, 0, 0, 0.2);
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
  padding: 20px 30px 40px 40px;
  width: 100%;
  max-width: 350px;
  height: 500px;
  border-radius: 30px;

  nav {
    height: 40px;
    padding: 10px 0 10px 0;
  }
  nav h1 {
    font-size: 23px;
    font-weight: bold;
    line-height: 38px;
  }
  nav button {
    color: #ababab;
    font-size: 25px;
  }
  main {
    max-height: 430px;
    overflow-y: auto;
    padding-right: 10px;
  }
  main h2 {
    font-weight: bold;
    padding: 10px 0;
  }
  main p,
  main ol {
    line-height: 1.3;
    padding-bottom: 5px;
    font-size: 15px;
  }
  main ol {
    display: list-item;
    padding-left: 20px;
  }
  main ol li {
    padding: 2px 0;
    list-style: decimal outside;
    word-break: keep-all;
  }
  main li > ol {
    padding-left: 0px;
  }
  main li > ol li {
    list-style: none;
  }
`;

export { PopUp, Term };
