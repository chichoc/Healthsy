import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onModalOpen } from '../../store/features/modalSlice';
import { fetchReviews } from '../../store/features/productSlice';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../Modal';
import ReviewForm from './ReviewForm';
import ReviewSort from './ReviewSort';
import ReviewPagination from './ReviewPagination.js';
import { BsStarFill } from 'react-icons/bs';
import { HeaderProdReview, DivProdReview } from '../../styles/product/product_review';

const ProductReview = () => {
  const dispatch = useDispatch();
  let { id: productId } = useParams();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const isModal = useSelector((state) => state.modal.isModal.productReview);
  const reviews = useSelector((state) => state.product.reviews);
  const reviewsStatus = useSelector((state) => state.product.status);
  const reviewsError = useSelector((state) => state.product.error);
  const [pageTotal, setPageTotal] = useState(0);

  useEffect(() => {
    if (reviewsStatus === 'idle') dispatch(fetchReviews(productId));
    if (reviewsStatus === 'succeeded') setPageTotal(reviews.length);
  }, [reviewsStatus, productId, dispatch]);

  if (pageTotal === 0) {
    return (
      <section>
        <h2>아직 후기가 없습니다.</h2>
      </section>
    );
  }

  return (
    <>
      <HeaderProdReview className='horizontal_flex'>
        <h1>후기 (개수)건 평균 (평균 별점)/5점</h1>
        {/* 별점 차트 */}
        <ReviewSort />
      </HeaderProdReview>

      {isModal && (
        <Modal>
          <ReviewForm termHeader={'리뷰쓰기'} />
        </Modal>
      )}
      <DivProdReview>
        {reviews.slice(offset, offset + limit).map((review, index) => (
          <article key={index}>
            <h2>
              {[...Array(5)].map((_, index) => (
                <BsStarFill
                  key={index}
                  title={review.score + '점'}
                  size={20}
                  className={review.score >= index + 1 ? 'score_icon score_select' : 'score_icon'}
                />
              ))}
              <span>{review.date}</span>
              <span>{review.name}</span>
            </h2>
            <h4>{review.content}</h4>
          </article>
        ))}

        {reviews && <ReviewPagination pageTotal={pageTotal} limit={limit} page={page} setPage={setPage} />}
        <button onClick={() => dispatch(onModalOpen({ component: 'productReview', isModal: true }))}>리뷰쓰기</button>
      </DivProdReview>
    </>
  );
};

export default ProductReview;
