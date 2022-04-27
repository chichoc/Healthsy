import React from 'react';
import ProductAsk from '../components/ProductAsk';
import ProductDetail from '../components/ProductDetail';
import ProductInfo from '../components/ProductInfo';
import ProductMain from '../components/ProductMain';
import ProductReview from '../components/ProductReview';

const Product = () => {
  return (
    <>
      <ProductMain />
      <h1>다른 상품 추천</h1>
      <ProductInfo />
      <ProductReview />
      <ProductAsk />
      <ProductDetail />
    </>
  );
};

export default Product;
