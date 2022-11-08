import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import dataProductDetail from '../../assets/api/dataProductDetail';
import TableList from '../reusable/TableList';

const ProductDetail = forwardRef((props, detailSection) => {
  const selectedProduct = useSelector((state) => state.product.info);

  return (
    <>
      <h2 ref={detailSection}>상세 정보</h2>
      <TableList columns={dataProductDetail} datas={selectedProduct} />
    </>
  );
});

export default ProductDetail;
