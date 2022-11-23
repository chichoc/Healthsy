import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReviewThumbs } from '../../store/features/productSlice';
import { GoThumbsup, GoThumbsdown } from 'react-icons/go';
import StarScore from '../reusable/StarScore';
import userProfileImg from '../../assets/img/userProfile.png';
import productImg from '../../assets/img/testSale.jpeg';
import { DivProdReview } from '../../styles/product/product_review';

const ReviewList = () => {
  const dispatch = useDispatch();
  const [thumbs, setThumbs] = useState({});
  const reviews = useSelector((state) => state.product.reviews);
  const capitalizeFirstChar = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const onChangeThumbs = (id, event) => {
    const name = event.target.name || event.target.closest('button').name;
    // 해당 review의 도움 버튼 둘 중 하나 이미 누른 경우
    if (id in thumbs) {
      // 눌렀던 버튼 다시 클릭 = 눌렀던 버튼 취소
      if (thumbs[id] === name) {
        const { [id]: name, ...rest } = thumbs;
        setThumbs(rest);
        dispatch(
          addReviewThumbs({
            reviewId: id,
            typeOfThumbs: name,
            capitalizedTypeOfThumbs: capitalizeFirstChar(name),
            sign: '-',
          })
        );
        // 누르지 않은 버튼 클릭 = 눌렀던 버튼 취소 + 해당 버튼 클릭
      } else {
        const nameToCancel = name === 'up' ? 'down' : 'up';
        // 기존에 추가했던 값 취소
        dispatch(
          addReviewThumbs({
            reviewId: id,
            typeOfThumbs: nameToCancel,
            capitalizedTypeOfThumbs: capitalizeFirstChar(nameToCancel),
            sign: '-',
          })
        );
        // 새로 추가
        setThumbs({ ...thumbs, [id]: name });
        dispatch(
          addReviewThumbs({
            reviewId: id,
            typeOfThumbs: name,
            capitalizedTypeOfThumbs: capitalizeFirstChar(name),
            sign: '+',
          })
        );
      }
    }
    // 해당 review의 어떤 도움 버튼을 누르지 않은 경우
    else {
      setThumbs((prev) => ({ ...prev, [id]: name }));
      dispatch(
        addReviewThumbs({
          reviewId: id,
          typeOfThumbs: name,
          capitalizedTypeOfThumbs: capitalizeFirstChar(name),
          sign: '+',
        })
      );
    }
  };
  return (
    <DivProdReview>
      {' '}
      {reviews.map((review, index) => (
        <article key={index} className='horizontal_flex'>
          <figure className='profile_review'>
            <img src={userProfileImg} alt='회원 이미지' />
            <figcaption className='vertical_flex'>
              <a href='https://www.flaticon.com/free-icons/user' title='user icons'>
                User icons created by Smashicons - Flaticon
              </a>
              <span>{review.name}</span>
            </figcaption>
          </figure>
          <div>
            <div className='info_review horizontal_flex'>
              {' '}
              <StarScore score={review.score} />
              <span>{review.date}</span>
            </div>
            <div className='content_review horizontal_flex'>
              <p>{review.content}</p>
              <div className='photo_review'>{review.photo && <img src={review.photo} alt='사진' />}</div>
            </div>
          </div>
          <aside className='thumbs_buttons vertical_flex'>
            <button
              className={thumbs[review.id] === 'up' ? 'thumbs_click' : ''}
              name='up'
              onClick={(e) => onChangeThumbs(review.id, e)}
            >
              <GoThumbsup className={thumbs[review.id] === 'up' ? 'thumbs_click' : 'thumbs'} size={15} />
              <span>{review.thumbsUp}</span>
            </button>
            <button
              className={thumbs[review.id] === 'down' ? 'thumbs_click' : ''}
              name='down'
              onClick={(e) => onChangeThumbs(review.id, e)}
            >
              <GoThumbsdown className={thumbs[review.id] === 'down' ? 'thumbs_click' : 'thumbs'} size={15} />
            </button>
          </aside>
        </article>
      ))}
    </DivProdReview>
  );
};

export default ReviewList;
