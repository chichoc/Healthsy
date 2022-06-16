import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeTextArea, onChangeScore } from '../../store/features/productSlice';
import { onModalClose } from '../../store/features/modalSlice';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import withModal from '../withModal';
import PrimaryButton from '../form/PrimaryButton';
import { BsStarFill } from 'react-icons/bs';
import { MainReviewForm } from '../../styles/product/review_form.js';

const ReviewForm = () => {
  const textAreaElement = useRef();
  let { id: productId } = useParams();
  const { userId } = useSelector((state) => state.page);
  const { score, content } = useSelector((state) => state.product.newReview);
  const dispatch = useDispatch();
  const createReview = () => {
    axios.post('http://localhost:8888/product/addReview', { userId, productId, score, content }).then((res, req) => {
      if (res.data.addReview) {
        alert('후기 남겨주셔서 감사합니다!');
      }
    });
  };

  const starScore = ['1점', '2점', '3점', '4점', '5점'];

  return (
    <MainReviewForm>
      <section>
        <h2>제품 만족도</h2>
        <div>
          {starScore.map((score, index) => (
            <BsStarFill
              key={index}
              className={'score_icon'}
              title={score}
              size={40}
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
          <h2>솔직한 후기를 남겨주세요</h2>
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
      <div className='horizontal_flex_button '>
        <PrimaryButton buttonName={'취소하기'} onClickMethod={() => dispatch(onModalClose())} />
        <PrimaryButton buttonName={'등록하기'} type={'submit'} onClickMethod={() => createReview()} />
      </div>
    </MainReviewForm>
  );
};

export default withModal(ReviewForm);
