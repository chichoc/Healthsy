import styled from '@emotion/styled';

const MainSale = styled.main`
  padding: 0px 100px;
  .observerTarget {
    width: 100px;
  }
`;
const UlSale = styled.ul`
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  li {
    cursor: pointer;
    margin: 10px 1% 10px 0;
    img {
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
    }
  }
  // 9개씩 배열
  li.small_unit {
    max-width: 30%;
    flex: 1 0 30%;
    &:nth-of-type(3n) {
      margin-right: 0px;
    }
  }

  // 16개씩 배열
  li.medium_unit {
    max-width: 24%;
    flex: 1 0 24%;
    &:nth-of-type(4n) {
      margin-right: 0px;
    }
  }

  // 25개씩 배열
  li.big_unit {
    max-width: 19%;
    flex: 1 0 19%;
    &:nth-of-type(5n) {
      margin-right: 0px;
    }
  }
`;

const ArticleSale = styled.article`
  margin: 0 auto;
  text-align: left;
  .productBrand,
  .productName {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .productBrand {
    margin-top: 7px;
    margin-bottom: 5px;
    color: grey;
    font-size: 14px;
  }
  .productName {
    margin-bottom: 9px;
  }
  .productPrice {
    font-weight: bold;
  }
`;

export { MainSale, UlSale, ArticleSale };
