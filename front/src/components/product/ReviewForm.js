import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeTextArea, onChangeScore } from '../../store/features/productSlice';
import { BsStarFill } from 'react-icons/bs';
import withModal from '../withModal';
import { MainReviewForm } from '../../styles/product/review_form.js';

const ReviewForm = () => {
  const textAreaElement = useRef();
  const { score } = useSelector((state) => state.product.value.review);
  const dispatch = useDispatch();

  const starScore = ['1점', '2점', '3점', '4점', '5점'];

  return (
    <MainReviewForm>
      <section>
        <h2>제품 만족도</h2>
        <div>
          {starScore.map((score, index) => (
            <BsStarFill
              key={index}
              title={score}
              size={40}
              color='#E8F3F1'
              onClick={() => {
                dispatch(onChangeScore(parseInt(score)));
              }}
            />
            // #9EEC8A
          ))}
        </div>
        <p>별점을 눌러 평가해주세요</p>
      </section>
      <section className='vertical_flex'>
        <label htmlFor='review'>
          <h2>어떤 점이 좋았나요?</h2>
        </label>
        <textarea
          id='review'
          name='review'
          placeholder='최소 10자 이상'
          ref={textAreaElement}
          onChange={() => dispatch(onChangeTextArea(textAreaElement.current.value))}
        ></textarea>
        {/* 사진 첨부하기 */}
      </section>
      <div>
        <button>취소</button>
        <button onClick={() => {}}>등록</button>
      </div>
    </MainReviewForm>
  );
};

export default withModal(ReviewForm);
