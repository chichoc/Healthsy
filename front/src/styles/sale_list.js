import styled from '@emotion/styled';

const Main = styled.main`
  padding: 0px 100px;
`;
const Ul = styled.ul`
  li {
    width: auto;
    margin: 30px 10px 0;
    text-align: left;
    img {
      width: 150px;
    }
    .productBrand,
    .productName {
      margin-bottom: 5px;
    }
    .productBrand {
      margin-top: 5px;
      color: grey;
      font-size: 14px;
    }
    .productPrice {
      font-weight: bold;
    }
  }
`;

export { Main, Ul };
