import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../store/features/saleSlice';
import { RiHeartAddLine } from 'react-icons/ri';
import productImg from '../../assets/img/testSale.jpeg';
import { MainProduct } from '../../styles/product/product_main';

const ProductMain = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const showApiData = useSelector((state) => state.sale.showApi.data);
  const selectedProductIndex = showApiData.findIndex((prod) => prod.id === parseInt(id));

  const selectedProduct = showApiData[selectedProductIndex];
  useEffect(() => {
    if (selectedProduct) {
      return;
    }
    dispatch(fetchProduct(id));
  }, []);

  return (
    <MainProduct className='horizontal_flex'>
      {selectedProduct ? (
        <>
          <img src={productImg} alt='제품 이미지' />
          <div className='vertical_flex'>
            <h3 className='product_brand'>{selectedProduct.brand}</h3>
            <h2>{selectedProduct.PRDLST_NM}</h2>
            <h3>{selectedProduct.price}</h3>
            <RiHeartAddLine size={30} />
            {/* 별점 (리뷰개수), 리뷰가 없어도 뜨도록 */}
          </div>
        </>
      ) : (
        <div>
          <h2>상품을 찾을 수 없습니다.</h2>
        </div>
      )}
    </MainProduct>
  );
};

export default ProductMain;
