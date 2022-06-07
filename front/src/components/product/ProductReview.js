import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onModalOpen } from '../../store/features/modalSlice';
import Modal from '../../Modal';
import { HeaderProdReview } from '../../styles/product/product_review';
import ReviewForm from './ReviewForm';

const ProductReview = () => {
  const dispatch = useDispatch();
  const isModal = useSelector((state) => state.modal.value.isModal.productReview);

  return (
    <>
      <HeaderProdReview className='horizontal_flex'>
        <h1>후기 (개수) 평균 별점</h1>
        {/* 별점 차트 */}
        {/* 도움순 최신순 */}
        <button onClick={() => dispatch(onModalOpen({ component: 'productReview', isModal: true }))}>리뷰쓰기</button>
      </HeaderProdReview>

      {isModal && (
        <Modal>
          <ReviewForm termHeader={'리뷰쓰기'} />
        </Modal>
      )}

      <ul>
        <li></li>
      </ul>
    </>
  );
};

export default ProductReview;
