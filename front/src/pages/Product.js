import React, { useLayoutEffect } from 'react';
import { useNavigationType, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { countReviews } from '../store/features/productSlice';
import ProductMain from '../components/product/ProductMain';
import ProductNav from '../components/product/ProductNav';
import withPage from './withPage';

const Product = () => {
  const dispatch = useDispatch();
  const navType = useNavigationType();
  let { id: productId } = useParams();
  const { count: countStatus } = useSelector((state) => state.product.status);

  useLayoutEffect(() => {
    if (countStatus === 'idle') dispatch(countReviews(productId));
    if (navType === 'PUSH') window.scrollTo(0, 0);
  });
  return (
    <>
      <ProductMain />
      <ProductNav />
    </>
  );
};

export default withPage(Product);
