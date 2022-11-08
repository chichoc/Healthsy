import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../store/features/productSlice';
import { RiHeartAddLine, RiHeartFill } from 'react-icons/ri';
import { BsPlusSquareDotted, BsCheckSquareFill } from 'react-icons/bs';
import { FiShare } from 'react-icons/fi';
import StarScore from '../reusable/StarScore';
import TableList from '../reusable/TableList';
import productImg from '../../assets/img/testSale.jpeg';
import dataProductMain from '../../assets/api/dataProductMain';
import { MainProduct, DivProductBtns } from '../../styles/product/product_main';

const ProductMain = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.product.info);
  const { reviews: countTotalReviews, score: countAvgScore } = useSelector((state) => state.product.count);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const commaToPrice = (price) => {
    if (price < 1000) return price;
    return price.toLocaleString();
  };

  return (
    <MainProduct className='horizontal_flex'>
      {selectedProduct ? (
        <>
          <img src={productImg} alt='제품 이미지' />
          <div className='vertical_flex product_primary'>
            <h2 className='product_brand'>{selectedProduct.brand}</h2>
            <div className='horizontal_flex product_header'>
              <h1>{selectedProduct.PRDLST_NM}</h1>
              <button>
                <FiShare title={'공유하기'} size={25} color='#acacac' />
              </button>
            </div>
            <h4 className='product_score'>
              <StarScore size={20} score={countAvgScore} />
              <span>({countTotalReviews}건)</span>
            </h4>
            <h3>{selectedProduct.price && commaToPrice(selectedProduct.price)}원</h3>
            <TableList columns={dataProductMain} datas={selectedProduct} />
            {/* 기능성 키워드 */}

            <DivProductBtns className='horizontal_flex'>
              <button className='horizontal_flex'>
                <RiHeartAddLine size={35} color='#00C9B7' />
                <span>찜하기</span>
                {/* <RiHeartFill title={'찜해제'} size={35} color='#ff4d4d' /> */}
              </button>
              <button className='horizontal_flex'>
                <BsPlusSquareDotted size={35} color='#00C9B7' />
                {/* <BsCheckSquareFill size={35} color='#00C9B7' /> */}
                <span>비교하기</span>
              </button>
              <button className='horizontal_flex'>
              </button>
            </DivProductBtns>
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
