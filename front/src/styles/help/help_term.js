import styled from '@emotion/styled';

const NavHelp = styled.nav`
  margin-bottom: 25px;
  a button {
    background-color: #dddd;
    padding: 10px 15px;
    border-radius: 20px;
    margin-left: 15px;
    font-size: 15px;
  }
  a:first-of-type button {
    margin-left: 0px;
  }
  a button.select {
    background-color: #344b47;
    color: white;
  }
`;

const ArticleHelp = styled.article`
  padding: 30px 20px;
  width: 100%;
  border-radius: 20px;
  border: #dddd 1px solid;
  min-height: 250px;

  p.none {
    font-size: 15px;
    color: #acacac;
    text-align: center;
    line-height: 250px;
  }

  main {
    max-height: 500px;
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

export { NavHelp, ArticleHelp };
