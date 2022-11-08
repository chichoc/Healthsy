import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import TableList from '../reusable/TableList';
import dataProductInfo from '../../assets/api/dataProductInfo';

const ProductInfo = forwardRef((props, infoSection) => {
  const selectedProduct = useSelector((state) => state.product.info);

  return (
    <>
      <h2 ref={infoSection}>주요 정보</h2>
      <TableList columns={dataProductInfo} datas={selectedProduct} />
    </>
  );
});

export default ProductInfo;
