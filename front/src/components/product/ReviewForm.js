import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeTextArea, onChangeScore } from '../../store/features/productSlice';
import { onModalClose } from '../../store/features/modalSlice';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import withModal from '../withModal';
import PrimaryButton from '../reusable/PrimaryButton';
import { BsStarFill } from 'react-icons/bs';
import { MainReviewForm } from '../../styles/product/review_form.js';

const ReviewForm = () => {
  const textAreaElement = useRef();
  let { id: productId } = useParams();
  const { userId } = useSelector((state) => state.page);
  const { score: newScore, content } = useSelector((state) => state.product.newReview);
  const dispatch = useDispatch();
  const createReview = () => {
    axios.post('http://localhost:8888/product/addReview', { userId, productId, newScore, content }).then((res, req) => {
      if (res.data.addReview) {
        alert('후기 남겨주셔서 감사합니다!');
      }
    });
  };

  const starScores = ['1점', '2점', '3점', '4점', '5점'];

  return (
    <MainReviewForm className='vertical_flex'>
      <section>
        <h2>제품 만족도</h2>
        <div>
          <div className='star_scores horizontal_flex'>
            {starScores.map((score, index) => (
              <BsStarFill
                key={index}
                className={newScore >= parseInt(score) ? 'score_icon score_select' : 'score_icon'}
                title={score}
                size={40}
                onClick={() => {
                  dispatch(onChangeScore(parseInt(score)));
                }}
              />
            ))}
          </div>
          {newScore !== 0 ? (
            <h4>
              {newScore}점<span>/ 5점</span>
            </h4>
          ) : (
            <p className='score_comment'>별점을 눌러 평가해주세요</p>
          )}
        </div>
      </section>
      <section className='vertical_flex'>
        <label htmlFor='review'>
          <h2>솔직한 후기를 남겨주세요</h2>
        </label>
        <textarea
          id='review'
          name='review'
          placeholder='최소 10자 이상 입력해주세요.'
          ref={textAreaElement}
          onChange={() => dispatch(onChangeTextArea(textAreaElement.current.value))}
        ></textarea>
        {/* 사진 첨부하기 */}
      </section>
      <div className='horizontal_flex_button '>
        <PrimaryButton buttonName={'취소하기'} onClickMethod={() => dispatch(onModalClose())} />
        <PrimaryButton buttonName={'등록하기'} type={'submit'} onClickMethod={() => createReview()} />
      </div>
    </MainReviewForm>
  );
};

export default withModal(ReviewForm);
