import React from 'react';
import { Description } from '../styles/sale_list';

const SaleProduct = ({ brandName, productName, productPrice = '20,000' }) => {
  const commaPrice = (price) => {
    if (price < 1000) return price;
    return price.toLocaleString();
  };

  return (
    <li>
      <img src='../images/testSale.jpeg' alt='제품 이미지' />
      <Description>
        <h1 className='productBrand'>{brandName}</h1>
        <h1 className='productName'>{productName}</h1>
        <h2 className='productPrice'> {`${commaPrice(productPrice)}원`}</h2>
        {/* 헬씨 배송 여부 */}
      </Description>
    </li>
  );
};

export default SaleProduct;
