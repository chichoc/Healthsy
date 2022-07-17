import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import dataProductInfo from '../../assets/api/dataProductInfo';
import TableList from '../reusable/TableList';

const ProductInfo = forwardRef((props, infoSection) => {
  const selectedProduct = useSelector((state) => state.product.info);

  return (
    <>
      <h1 ref={infoSection}>주요 정보</h1>
      {dataProductInfo.map((info) => (
        <TableList data={selectedProduct[info.columnName]} header={info.header} />
      ))}
    </>
  );
});

export default ProductInfo;
