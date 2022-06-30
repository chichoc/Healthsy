import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../store/features/saleSlice';
import { RiHeartAddLine, RiHeartFill } from 'react-icons/ri';
import { BsPlusSquareDotted } from 'react-icons/bs';
import { FiShare } from 'react-icons/fi';
import productImg from '../../assets/img/testSale.jpeg';
import { MainProduct, BtnProduct } from '../../styles/product/product_main';

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

  const commaToPrice = (price) => {
    if (price < 1000) return price;
    return price.toLocaleString();
  };

  const addCommaNextSpace = (string) => {
    return string.split(',').join(', ');
  };

  return (
    <MainProduct className='horizontal_flex'>
      {selectedProduct ? (
        <>
          <img src={productImg} alt='제품 이미지' />
          <div className='vertical_flex product_primary'>
            <h3 className='product_brand'>{selectedProduct.brand}</h3>
            <h2>{selectedProduct.PRDLST_NM}</h2>
            <h3>{commaToPrice(selectedProduct.price)}원</h3>
            <h4>
              <div className='horizontal_flex'>
                형태 <span>{selectedProduct.PRDT_SHAP_CD_NM}</span>
              </div>
              <div className='horizontal_flex'>
                원료 <span>{addCommaNextSpace(selectedProduct.raw_material)}</span>
              </div>
            </h4>
            {/* 기능성 키워드 */}

            <BtnProduct className='horizontal_flex '>
              <button>
                <RiHeartAddLine size={30} color={'#00C9B7'} />
                <span>찜하기</span>
                {/* <RiHeartFill title={'찜해제'}  size={30} color={'#ff4d4d'} /> */}
              </button>
              <button>
                <BsPlusSquareDotted size={30} color={'#00C9B7'} />
                <span>비교하기</span>
              </button>
              <button>
                <FiShare size={30} color={'#00C9B7'} />
                <span>공유하기</span>
              </button>
            </BtnProduct>

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
