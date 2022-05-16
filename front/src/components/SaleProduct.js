import React from 'react';

const SaleProduct = ({ brandName, productName, productPrice = '20,000' }) => {
  const commaPrice = (price) => {
    if (price < 1000) return price;
    return price.toLocaleString();
  };

  return (
    <>
      <img src='../images/testSale.jpeg' alt='제품 이미지' />
      <h1 className='productBrand'>{brandName}</h1>
      <h1 className='productName'>{productName}</h1>
      <h2 className='productPrice'> {`${commaPrice(productPrice)}원`}</h2>
      {/* 헬씨 배송 여부 */}
    </>
  );
};

export default SaleProduct;
