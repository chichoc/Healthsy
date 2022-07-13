import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onModalOpen } from '../../store/features/modalSlice';
import { addReviewThumbs, fetchReviews } from '../../store/features/productSlice';
import { useParams } from 'react-router-dom';
import Modal from '../../Modal';
import ReviewForm from './ReviewForm';
import ReviewSort from './ReviewSort';
import ReviewPagination from './ReviewPagination.js';
import StarScore from '../reusable/StarScore';
import { HeaderProdReview, DivProdReview } from '../../styles/product/product_review';
import { GoThumbsup, GoThumbsdown } from 'react-icons/go';
import userProfileImg from '../../assets/img/userProfile.png';

const ProductReview = () => {
  const dispatch = useDispatch();
  let { id: productId } = useParams();
  const pageUnit = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [thumbs, setThumbs] = useState({});

  const isModal = useSelector((state) => state.modal.isModal.productReview);
  const reviews = useSelector((state) => state.product.reviews);
  const { fetch: fetchStatus, count: countStatus } = useSelector((state) => state.product.status);
  const { reviews: countTotalReviews, score: countAvgScore } = useSelector((state) => state.product.count);
  const reviewsError = useSelector((state) => state.product.error);

  const onChangeThumbs = (id, index, name) => {
    if (thumbs[id] === name) {
      const { [id]: name, ...rest } = thumbs;
      setThumbs(rest);
      dispatch(addReviewThumbs({ reviewId: id, thumbs: name, sign: '-' }));
    } else {
      setThumbs({ ...thumbs, [id]: name });
      dispatch(addReviewThumbs({ reviewId: id, thumbs: name, sign: '+' }));
    }
  };

  useEffect(() => {
    if (countStatus === 'succeeded') {
      if (countTotalReviews !== undefined)
        dispatch(
          fetchReviews({
            productId,
            currentPage,
            pageNumDiffer: currentPage - prevPage,
          })
        );
    }
  }, [countStatus, productId, dispatch, countTotalReviews, currentPage, prevPage]);

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
        <div className='horizontal_flex'>
          <h1>총 {countTotalReviews}건의 후기가 있습니다.</h1>
          <button onClick={() => dispatch(onModalOpen({ component: 'productReview', isModal: true }))}>
            리뷰 작성하기
          </button>
        </div>
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
            <h2 className='horizontal_flex'>
              <div className='profile_review'>
                <img src={userProfileImg} alt='회원 이미지' />
                {/* <a href='https://www.flaticon.com/free-icons/user' title='user icons'>
                  User icons created by Smashicons - Flaticon
                </a> */}
              </div>
              <div className='header_review'>
                <StarScore score={review.score} />
                <span>{review.date}</span>
                <span>{review.name}</span>
                <p>{review.content}</p>
              </div>
            </h2>
            <h4 className='horizontal_flex'>
              <img src={review.image} alt='사진' />
              <div className='thumbs_buttons vertical_flex'>
                <button
                  className={thumbs[review.id] === 'up' ? 'thumbs_click' : ''}
                  name='up'
                  onClick={(e) => {
                    const { name } = e.target;
                    onChangeThumbs(review.id, index, name);
                  }}
                >
                  <GoThumbsup className={thumbs[review.id] === 'up' ? 'thumbs_click' : 'thumbs'} size={15} />
                  <span>{review.thumbsUp}</span>
                </button>
                <button
                  className={thumbs[review.id] === 'down' ? 'thumbs_click' : ''}
                  name='down'
                  onClick={(e) => {
                    const { name } = e.target;
                    onChangeThumbs(review.id, index, name);
                  }}
                >
                  <GoThumbsdown className={thumbs[review.id] === 'down' ? 'thumbs_click' : 'thumbs'} size={15} />
                </button>
              </div>
            </h4>
          </article>
        ))}

        {reviews && (
          <ReviewPagination
            pageUnit={pageUnit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setPrevPage={setPrevPage}
          />
        )}
      </DivProdReview>
    </>
  );
};

export default ProductReview;
