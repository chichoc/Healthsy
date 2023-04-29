import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { onModalClose } from '../../store/features/modalSlice';
import { updateCount } from '../../store/features/productSlice';
import withModal from '../withModal';
import PrimaryButton from '../reusable/PrimaryButton';
import { BsStarFill, BsCameraFill } from 'react-icons/bs';
import { IoCloseCircle } from 'react-icons/io5';
import { DivReviewForm } from '../../styles/product/review_form.js';

const ReviewForm = () => {
  const dispatch = useDispatch();
  let { id: productId } = useParams();
  const [selectedScore, setSelectedScore] = useState('');
  const [content, setContent] = useState('');
  const [photos, setPhotos] = useState([]);
  let { numberOfReviews } = useSelector((state) => state.product.count);

  const photoLimit = 4;

  const { userId } = useSelector((state) => state.page);

  const changeScore = (stringScore) => {
    setSelectedScore(parseInt(stringScore));
  };

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const removePhoto = (selectedIdx) => {
    setPhotos((prev) => prev.filter((_, idx) => idx !== selectedIdx));
  };

  const resetInput = () => {
    setSelectedScore('');
    setPhotos([]);
    setContent('');
  };

  const createReview = async () => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('productId', productId);
    formData.append('selectedScore', selectedScore);
    formData.append('content', content);

    for (const { file } of photos) {
      formData.append('photos', file);
    }

    await axios
      .post('http://localhost:8888/product/addReview', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((res, req) => {
        if (res.data.addReview) {
          alert('후기 남겨주셔서 감사합니다!');
          dispatch(onModalClose());
          dispatch(updateCount(productId));
        } else {
          alert('오류가 발생하였습니다. \n 잠시 후에 다시 시도해주시기 바랍니다.');
        }
      });
  };

  const onAbled = Boolean(selectedScore) && Boolean(content) && photos.length <= photoLimit;

  const starScores = ['1점', '2점', '3점', '4점', '5점'];

  return (
    <DivReviewForm className='vertical_flex'>
      <section>
        <h2>제품은 만족하셨나요?</h2>
        <div className='star_scores horizontal_flex'>
          {starScores.map((score, index) => (
            <BsStarFill
              key={index}
              className={selectedScore >= parseInt(score) ? 'score_icon score_select' : 'score_icon'}
              title={score}
              size={35}
              onClick={() => changeScore(score)}
            />
          ))}
        </div>
        {selectedScore ? (
          <h4>
            <span>{selectedScore}점</span>/ 5점
          </h4>
        ) : (
          <p>별점을 눌러 평가해주세요</p>
        )}
      </section>
      <section className='vertical_flex'>
        <label htmlFor='review'>
          <h2>솔직한 후기를 남겨주세요.</h2>
        </label>
        <textarea
          id='review'
          name='review'
          placeholder='최소 10자 이상 입력해주세요.'
          onChange={changeContent}
          value={content}
        ></textarea>
      </section>
      <section className='photo horizontal_flex'>
        <label htmlFor='reviewPhoto' className='vertical_flex'>
          <>
            <BsCameraFill color={'#B8B8B8'} size={28} />
            <p>
              <span className={photos.length > photoLimit ? 'over' : ''}>{photos.length}</span> / {photoLimit}
            </p>
          </>
        </label>
        <input
          type='file'
          name='reviewPhoto'
          id='reviewPhoto'
          accept='image/*'
          multiple
          onChange={(e) => {
            setPhotos((prev) => [...prev, ...Object.values(e.target.files).map((file) => ({ name: file.name, file }))]);
          }}
        />
        {photos.length > 0 &&
          photos.map((p, idx) => (
            <div key={idx} className='outer'>
              <div className='inner'>
                <img src={URL.createObjectURL(p.file)} alt={p.name} />
              </div>
              <button className='remove' onClick={() => removePhoto(idx)}>
                <IoCloseCircle color='#888888' size={22} />
              </button>
            </div>
          ))}
      </section>
      <div className='horizontal_flex_button buttons'>
        <PrimaryButton buttonName={'초기화하기'} onClickMethod={resetInput} />
        <PrimaryButton buttonName={'등록하기'} disabled={!onAbled} type={'submit'} onClickMethod={createReview} />
      </div>
    </DivReviewForm>
  );
};

export default withModal(ReviewForm);
