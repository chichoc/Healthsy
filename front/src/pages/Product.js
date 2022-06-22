import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { countReviews } from '../store/features/productSlice';
import ProductMain from '../components/product/ProductMain';
import ProductNav from '../components/product/ProductNav';
import withPage from './withPage';

const Product = () => {
  const dispatch = useDispatch();
  let { id: productId } = useParams();
  const { count: countStatus } = useSelector((state) => state.product.status);

  useEffect(() => {
    if (countStatus === 'idle') {
      dispatch(countReviews(productId));
    }
  });
  return (
    <>
      <ProductMain />
      <ProductNav />
      <h1>다른 상품 추천</h1>
    </>
  );
};

export default withPage(Product);
