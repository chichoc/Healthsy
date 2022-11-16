import styled from '@emotion/styled';

const MainSale = styled.main`
  padding: 0px 100px;
  &.not_found {
    align-items: center;
  }
  &.not_found p {
    margin: 20px 0;
    color: #989898;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    line-height: 1.8;
    letter-spacing: 1.2px;
    white-space: pre-wrap;
  }
  figure {
    img {
      width: 300px;
      opacity: 0.3;
      margin: 30px 0 -70px 0;
    }
    figcaption {
      font-size: 6px;
      width: 200px;
      margin: 0 auto;
      text-align: right;
      color: #c0c0c0;
    }
  }

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
    span {
    }
  }
`;

export { MainSale, UlSale, ArticleSale };
