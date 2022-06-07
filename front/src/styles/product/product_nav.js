import styled from '@emotion/styled';

const SectionProduct = styled.section`
  margin: 10px 100px 0px;
`;

const NavProduct = styled.nav`
  height: 50px;
  background-color: #dddd;
  align-items: center;
  button {
    width: 25%;
    text-align: center;
    border-right: solid 0.5px;
  }
  button:last-child {
    border-right: none;
  }
`;
const ArticleProduct = styled.article``;

export { SectionProduct, NavProduct, ArticleProduct };
