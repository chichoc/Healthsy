import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onModalOpen } from '../../store/features/modalSlice';
import { fetchReviews } from '../../store/features/productSlice';
import { useParams } from 'react-router-dom';
import Modal from '../../Modal';
import ReviewForm from './ReviewForm';
import ReviewSort from './ReviewSort';
import ReviewPagination from './ReviewPagination.js';
import { HeaderProdReview, DivProdReview } from '../../styles/product/product_review';
import StarScore from '../reusable/StarScore';
import { GoThumbsup, GoThumbsdown } from 'react-icons/go';

const ProductReview = () => {
  const dispatch = useDispatch();
  let { id: productId } = useParams();
  const pageUnit = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const isModal = useSelector((state) => state.modal.isModal.productReview);
  const reviews = useSelector((state) => state.product.reviews);
  const { fetch: fetchStatus, count: countStatus } = useSelector((state) => state.product.status);
  const { reviews: countTotalReviews, score: countAvgScore } = useSelector((state) => state.product.count);
  const reviewsError = useSelector((state) => state.product.error);

  useEffect(() => {
    if (countStatus === 'succeeded') {
      if (countTotalReviews !== undefined)
        dispatch(
          fetchReviews({
            productId,
            prevIdx: currentPage === 1 ? '' : reviews[9].id,
          })
        );
    }
  }, [countStatus, productId, dispatch, countTotalReviews, currentPage]);

  if (countTotalReviews === 0) {
    return (
      <>
        <h1>후기</h1>
        <section>
          <h2>아직 후기가 없습니다.</h2>
        </section>
      </>
    );
  }

  return (
    <>
      <HeaderProdReview>
        <h1>총 {countTotalReviews}건의 후기가 있습니다.</h1>
        <div className='horizontal_flex'>
          <h2>구매 만족도</h2>
          <StarScore size={25} score={countAvgScore} />
          <span>{countAvgScore}</span>
          <span className='perfect_score'>/</span>
          <span className='perfect_score'>5.0</span>
        </div>
        {/* 별점 차트 */}
      </HeaderProdReview>
      <ReviewSort />

      {isModal && (
        <Modal>
          <ReviewForm termHeader={'리뷰쓰기'} />
        </Modal>
      )}

      <DivProdReview>
        {reviews.map((review, index) => (
          <article key={index} className='horizontal_flex'>
            <h2>
              <StarScore score={review.score} />
              <span>{review.date}</span>
              <span>{review.name}</span>
              <p>{review.content}</p>
            </h2>
            <h4 className='horizontal_flex'>
              <img src='' alt='사진' />
              <div>
                <button>
                  <GoThumbsup /> <span>{review.thumbsUp}</span>
                </button>
                <button>
                  <GoThumbsdown />
                </button>
              </div>
            </h4>
          </article>
        ))}

        {reviews && <ReviewPagination pageUnit={pageUnit} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
        <button onClick={() => dispatch(onModalOpen({ component: 'productReview', isModal: true }))}>리뷰쓰기</button>
      </DivProdReview>
    </>
  );
};

export default ProductReview;
