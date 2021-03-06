import React, { forwardRef, useEffect, useState } from 'react';
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

const ProductReview = forwardRef((props, reviewSection) => {
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
    dispatch(
      fetchReviews({
        productId,
        currentPage,
        pageNumDiffer: currentPage - prevPage,
      })
    );
  }, [productId, dispatch, currentPage, prevPage]);

  if (countTotalReviews === 0) {
    return (
      <>
        <h1>??????</h1>
        <section>
          <h2>?????? ????????? ????????????.</h2>
        </section>
      </>
    );
  }

  return (
    <>
      <HeaderProdReview>
        <div className='horizontal_flex'>
          <h1 ref={reviewSection}>
            ??? {countTotalReviews}?????? ????????? ????????????.{' '}
            <button onClick={() => dispatch(onModalOpen({ component: 'productReview', isModal: true }))}>
              ?????? ????????????
            </button>
          </h1>
        </div>
        <div className='horizontal_flex countStar'>
          <h2>?????? ?????????</h2>
          <StarScore size={25} score={countAvgScore} />
          <span>{countAvgScore}</span>
          <span className='perfect_score'>/</span>
          <span className='perfect_score'>5.0</span>
        </div>
        {/* ?????? ?????? */}
      </HeaderProdReview>
      <ReviewSort />

      {isModal && (
        <Modal>
          <ReviewForm termHeader={'????????????'} />
        </Modal>
      )}

      <DivProdReview>
        {reviews.map((review, index) => (
          <article key={index} className='horizontal_flex'>
            <h2 className='horizontal_flex'>
              <div className='profile_review'>
                <img src={userProfileImg} alt='?????? ?????????' />
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
              {review.photo && <img src={review.photo} alt='??????' />}
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
});

export default ProductReview;
