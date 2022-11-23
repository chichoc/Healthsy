import React, { useLayoutEffect } from 'react';
import { useNavigationType, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../store/features/productSlice';
import withPage from './withPage';
import ProductMain from '../components/product/ProductMain';
import ProductNav from '../components/product/ProductNav';
import NotFound from '../components/reusable/NotFound';

const Product = () => {
  const dispatch = useDispatch();
  const navType = useNavigationType();
  let { id: productId } = useParams();

  const selectedProduct = useSelector((state) => state.product.info);
  const statusOfProduct = useSelector((state) => state.product.status.product);
  const error = useSelector((state) => state.product.error);

  useLayoutEffect(() => {
    dispatch(fetchProduct(productId));
    if (navType !== 'POP') window.scrollTo(0, 0);
  }, [productId, navType]);

  if (error) return <NotFound text={'오류가 발생했습니다.\n 잠시 후에 다시 시도해주시기 바랍니다.'} />;

  return statusOfProduct === 'succeeded' && Object.keys(selectedProduct).length === 0 ? (
    <NotFound text={'상품을 찾을 수 없습니다.'} />
  ) : (
    <>
      <ProductMain />
      <ProductNav />
    </>
  );
};

export default withPage(Product);
