import React from 'react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import ProductMain from '../components/ProductMain';
import ProductNav from '../components/ProductNav';

import withPage from './withPage';

const Product = () => {
  return (
    <>
      <ProductMain />
      <ProductNav />
      <h1>다른 상품 추천</h1>
    </>
  );
};

export default withPage(Product);
