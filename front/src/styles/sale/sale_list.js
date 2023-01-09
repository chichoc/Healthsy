import styled from '@emotion/styled';

const MainSale = styled.main`
  padding: 0px 100px;
  .observerTarget {
    width: 100px;
  }
`;
const UlSale = styled.ul`
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
  li {
    cursor: pointer;
    margin: 10px 1% 10px 0;
  }
  // 9개씩 배열
  li.small_unit {
    max-width: 30%;
    margin-right: 5%; // (100 - 30*3) / 2
    &:nth-of-type(3n) {
      margin-right: 0px;
    }
  }

  // 16개씩 배열
  li.medium_unit {
    max-width: 23.5%;
    margin-right: 2%; // (100 - 94) / 3
    &:nth-of-type(4n) {
      margin-right: 0px;
    }
  }

  // 25개씩 배열
  li.big_unit {
    max-width: 19.2%;
    margin-right: 1%; // (100 - 96) / 4
    &:nth-of-type(5n) {
      margin-right: 0px;
    }
  }
`;

const ArticleSale = styled.article`
  margin: 0 auto;
  text-align: left;
  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 10px;
  }
  .brand_prod,
  .name_prod {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .brand_prod {
    margin-top: 7px;
    color: #787878;
    font-size: 14px;
  }
  .name_prod {
    margin-top: 6px;
    font-size: 15px;
  }
  .price_prod {
    font-weight: bold;
    margin-top: 8px;
  }
  .price_prod::after {
    content: '원';
    font-weight: normal;
    margin-left: 1px;
  }
  h4 {
    margin-top: 6px;
    ${(props) => !props.isScored && 'visibility: hidden;'};
  }
`;

export { MainSale, UlSale, ArticleSale };
