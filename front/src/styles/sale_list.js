import styled from '@emotion/styled';

const Main = styled.main`
  padding: 0px 100px;
`;
const Ul = styled.ul`
  justify-content: flex-start;
  margin-top: 15px;
  li {
    width: auto;
    margin: 20px 5px;
    text-align: left;
    flex: 1 1 30%;
    align-items: center;
    cursor: pointer;
    img {
      width: auto;
      max-width: 100%;
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
