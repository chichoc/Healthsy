import styled from '@emotion/styled';

const ArticleModal = styled.article`
  background: white;
  padding: 20px 30px 40px 40px;
  width: 100%;
  max-width: 350px;
  height: 500px;
  border-radius: 30px;

  header {
    height: 40px;
    padding: 10px 0 10px 0;
  }
  header h1 {
    font-size: 23px;
    font-weight: bold;
    line-height: 38px;
  }
  header button {
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

export { ArticleModal };
