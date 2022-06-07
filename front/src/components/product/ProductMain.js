import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import productImg from '../../assets/img/testSale.jpeg';
import { MainProduct } from '../../styles/product/product_main';

const ProductMain = () => {
  let { id } = useParams();
  const showApiData = useSelector((state) => state.sale.value.showApi.data);
  const selectedProductIndex = showApiData.findIndex((prod) => prod.prod_id === parseInt(id));

  const selectedProduct = showApiData[selectedProductIndex];

  return (
    <MainProduct className='horizontal_flex'>
      <img src={productImg} alt='제품 이미지' />
      <div className='vertical_flex'>
        <h3>{selectedProduct.prod_brand}</h3>
        <h2>{selectedProduct.PRDLST_NM}</h2>
        <h3>{selectedProduct.prod_price}</h3>
        <button>찜하기</button>
        {/* 별점 (리뷰개수), 리뷰가 없어도 뜨도록 */}
      </div>
    </MainProduct>
  );
};

export default ProductMain;
