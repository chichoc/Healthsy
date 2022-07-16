import React from 'react';
import { useSelector } from 'react-redux';
import dataProductDetail from '../../assets/api/dataProductDetail';
import TableList from '../reusable/TableList';

const ProductDetail = () => {
  const selectedProduct = useSelector((state) => state.product.info);

  return (
    <>
      <h1>상세 정보</h1>
      {dataProductDetail.map((detail) => (
        <TableList data={selectedProduct[detail.columnName]} header={detail.header} />
      ))}
    </>
  );
};

export default ProductDetail;
