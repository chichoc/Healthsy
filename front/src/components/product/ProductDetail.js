import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import dataProductDetail from '../../assets/api/dataProductDetail';
import TableList from '../reusable/TableList';

const ProductDetail = forwardRef((props, detailSection) => {
  const selectedProduct = useSelector((state) => state.product.info);

  return (
    <>
      <h1 ref={detailSection}>상세 정보</h1>
      {dataProductDetail.map((detail) => (
        <TableList data={selectedProduct[detail.columnName]} header={detail.header} />
      ))}
    </>
  );
});

export default ProductDetail;
