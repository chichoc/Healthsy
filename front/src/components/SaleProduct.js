import React from 'react';
import { Article } from '../styles/sale_product';

const SaleProduct = () => {
  return (
    <Article>
      <img src='../images/testSale.jpeg' alt='제품 이미지' />
      <h1>브랜드명</h1>
      <h1>제품명</h1>
      <h2>가격</h2>
      {/* 헬씨 배송 여부 */}
    </Article>
  );
};

export default SaleProduct;
