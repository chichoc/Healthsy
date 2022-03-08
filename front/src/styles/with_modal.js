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
  padding: 20px 40px 40px 40px;
  width: 100%;
  max-width: 350px;
  height: 500px;
  border-radius: 30px;

  nav {
    height: 40px;
    padding: 10px 0 15px 0;
  }
  nav h1 {
    font-size: 20px;
    font-weight: bold;
    top: 0;
  }
  nav button {
    color: #ababab;
    font-size: 25px;
  }
  article {
    max-height: 430px;
    overflow-y: auto;
  }
  article h2 {
    font-weight: bold;
    padding: 10px 0;
  }
  article p,
  article ol {
    line-height: 1.3;
    padding-bottom: 10px;
  }
  article ol {
    display: list-item;
    list-style-position: outside;
  }
  article ol li {
    padding: 2px 0;
    word-break: keep-all;
  }
`;

export { PopUp, Term };
