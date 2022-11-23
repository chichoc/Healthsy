import React, { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onModalOpen } from '../../store/features/modalSlice';
import { fetchReviews } from '../../store/features/productSlice';
import { useParams } from 'react-router-dom';
import Portal from '../../Portal';
import ReviewForm from './ReviewForm';
import ReviewSort from './ReviewSort';
import ReviewList from './ReviewList';
import ReviewPagination from './ReviewPagination.js';
import StarScore from '../reusable/StarScore';
import NotFound from '../reusable/NotFound';
import { HeaderProdReview } from '../../styles/product/product_review';

const ProductReview = forwardRef((props, reviewSection) => {
  const dispatch = useDispatch();
  let { id: productId } = useParams();
  const pageUnit = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [pageOffset, setPageOffset] = useState(1);

  const isModal = useSelector((state) => state.modal.isModal.productReview);
  const { numberOfReviews, avgScoreOfReviews } = useSelector((state) => state.product.count);
  const { sortOfReviews: sort, typeOfReviews: type } = useSelector((state) => state.product.fetch);
  const reviewsError = useSelector((state) => state.product.error);

  useEffect(() => {
    setCurrentPage(1);
    setPrevPage(0);
    setPageOffset(1);
  }, [sort]);

  useEffect(() => {
    dispatch(
      fetchReviews({
        productId,
        currentPage,
        pageNumDiffer: currentPage === 1 ? 1 : currentPage - prevPage,
        sort,
      })
    );
  }, [productId, currentPage, prevPage, sort]);

  useEffect(() => {
    window.scrollTo({ top: reviewSection.current.offsetTop });
  }, [currentPage, reviewSection]);

  if (numberOfReviews === 0) {
    return (
      <HeaderProdReview>
        <div className='horizontal_flex'>
          <h2 ref={reviewSection}>후기</h2>
          <button onClick={() => dispatch(onModalOpen({ component: 'productReview', isModal: true }))}>
            후기 작성하기
          </button>
        </div>

        <NotFound text={'아직 등록된 후기가 없습니다.'} />

        {isModal && (
          <Portal>
            <ReviewForm termHeader={'리뷰쓰기'} />
          </Portal>
        )}
      </HeaderProdReview>
    );
  }

  return (
    <>
      <HeaderProdReview>
        <div className='horizontal_flex'>
          <h2 ref={reviewSection}>상품 후기 ({numberOfReviews})</h2>
          <button onClick={() => dispatch(onModalOpen({ component: 'productReview', isModal: true }))}>
            리뷰 작성하기
          </button>
          {isModal && (
            <Portal>
              <ReviewForm termHeader={'리뷰쓰기'} />
            </Portal>
          )}
        </div>
        <div className='horizontal_flex avg_score'>
          <h3>구매 만족도</h3>
          <StarScore size={25} score={avgScoreOfReviews} />
          <span>{avgScoreOfReviews}</span>
          <span className='perfect_score'>/</span>
          <span className='perfect_score'>5.0</span>
        </div>
        {/* 별점 차트 */}
      </HeaderProdReview>
      <ReviewSort />
      <ReviewList />

      {numberOfReviews > 0 && (
        <ReviewPagination
          pageUnit={pageUnit}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setPrevPage={setPrevPage}
          pageOffset={pageOffset}
          setPageOffset={setPageOffset}
        />
      )}
    </>
  );
});

export default ProductReview;
