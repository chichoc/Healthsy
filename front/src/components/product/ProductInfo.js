import React from 'react';
import { useSelector } from 'react-redux';
import { DivProductInfo } from '../../styles/product/product_info';

const ProductInfo = () => {
  const selectedProduct = useSelector((state) => state.product.info);

  return (
    <>
      <h1>주요 정보</h1>
      <DivProductInfo className='horizontal_flex'>
        {selectedProduct.POG_DAYCNT && (
          <>
            <h4>유통기한</h4>
            <span>{selectedProduct.POG_DAYCNT}</span>
          </>
        )}
      </DivProductInfo>
      <DivProductInfo className='horizontal_flex'>
        {selectedProduct.NTK_MTHD && (
          <>
            <h4>섭취방법</h4>
            <span>{selectedProduct.NTK_MTHD}</span>
          </>
        )}
      </DivProductInfo>
      <DivProductInfo className='horizontal_flex'>
        {selectedProduct.IFTKN_ATNT_MATR_CN && (
          <>
            <h4>섭취시주의사항</h4>
            <span>{selectedProduct.IFTKN_ATNT_MATR_CN}</span>
          </>
        )}
      </DivProductInfo>
      <DivProductInfo className='horizontal_flex'>
        {selectedProduct.CSTDY_MTHD && (
          <>
            <h4>보관방법</h4>
            <span>{selectedProduct.CSTDY_MTHD}</span>
          </>
        )}
      </DivProductInfo>
    </>
  );
};

export default ProductInfo;
