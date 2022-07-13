import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import withModal from '../withModal';
import PrimaryButton from '../reusable/PrimaryButton';
import { BsStarFill } from 'react-icons/bs';
import { MainReviewForm } from '../../styles/product/review_form.js';

const ReviewForm = () => {
  let { id: productId } = useParams();
  const [selectedScore, setSelectedScore] = useState('');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState({});

  const { userId } = useSelector((state) => state.page);

  const onScoreChanged = (stringScore) => {
    setSelectedScore(parseInt(stringScore));
  };
  const onContentChanged = (e) => {
    setContent(e.target.value);
  };

  const onResetInput = () => {
    setSelectedScore('');
    setContent('');
  };

  const createReview = async () => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('productId', productId);
    formData.append('selectedScore', selectedScore);
    formData.append('content', content);
    formData.append('file', photo.file);

    await axios
      .post('http://localhost:8888/product/addReview', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res, req) => {
        if (res.data.addReview) {
          alert('후기 남겨주셔서 감사합니다!');
          onResetInput();
        }
      });
  };

  const onAbled = Boolean(selectedScore) && Boolean(content);

  const starScores = ['1점', '2점', '3점', '4점', '5점'];

  return (
    <MainReviewForm className='vertical_flex'>
      <section>
        <h2>제품 만족도</h2>
        <div className='star_scores horizontal_flex'>
          {starScores.map((score, index) => (
            <BsStarFill
              key={index}
              className={selectedScore >= parseInt(score) ? 'score_icon score_select' : 'score_icon'}
              title={score}
              size={40}
              onClick={() => onScoreChanged(score)}
            />
          ))}
        </div>
        {selectedScore ? (
          <h4>
            {selectedScore}점<span>/ 5점</span>
          </h4>
        ) : (
          <p className='score_comment'>별점을 눌러 평가해주세요</p>
        )}
      </section>
      <section className='vertical_flex'>
        <label htmlFor='review'>
          <h2>솔직한 후기를 남겨주세요</h2>
        </label>
        <textarea
          id='review'
          name='review'
          placeholder='최소 10자 이상 입력해주세요.'
          onChange={onContentChanged}
          value={content}
        ></textarea>
      </section>
      <section>
        <label htmlFor='reviewPhoto'>사진 첨부하기</label>
        <input
          type='file'
          name='reviewPhoto'
          id='reviewPhoto'
          onChange={(e) => {
            setPhoto({
              preview: URL.createObjectURL(e.target.files[0]),
              file: e.target.files[0],
              path: e.target.value,
            });
          }}
        />
        {photo.preview && <img src={photo.preview} alt='미리보기' style={{ width: '100px' }} />}
      </section>
      <div className='horizontal_flex_button'>
        <PrimaryButton buttonName={'초기화하기'} onClickMethod={onResetInput} />
        <PrimaryButton buttonName={'등록하기'} disabled={!onAbled} type={'submit'} onClickMethod={createReview} />
      </div>
    </MainReviewForm>
  );
};

export default withModal(ReviewForm);
