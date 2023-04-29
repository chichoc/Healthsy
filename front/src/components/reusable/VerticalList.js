import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { addReviewThumbs } from '../../store/features/productSlice';
import { GoThumbsdown, GoThumbsup } from 'react-icons/go';
import NotFound from './NotFound';
import StarScore from './StarScore';
import useScrollY from '../customHook/useScrollY';
import userProfileImg from '../../assets/img/userProfile.png';
import productImg from '../../assets/img/supplementsSample.jpeg';
import { useDispatch } from 'react-redux';

const VerticalList = ({ datas, figure = false, mypage = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [thumbs, setThumbs] = useState({});
  const [clipped, setClipped] = useState(Array(10));
  // undefined: clip할 필요 없음, true: clip (더보기 가능하지만 누르지 않음), false: clip 해제(더보기 누름)
  const contentRef = useRef([]);

  const { storeScroll } = useScrollY();

  const capitalizeFirstChar = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const splitLocations = (locations, num) => {
    if (num === 1) return <img src={locations.split(',')[0]} alt='사진' />;
    return locations.split(',').map((location) => <img src={location} alt='사진' />);
  };

  const changeClipped = (idx) => {
    setClipped(clipped.map((tf, index) => (index === idx && tf !== undefined ? !tf : tf)));
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

  useEffect(() => {
    setClipped(
      contentRef.current.map(
        (p, idx) => p.clientHeight < p.scrollHeight || datas[idx].locations?.split(',').length > 1 || undefined
      )
    );
  }, [datas]);

  if (!datas) return <NotFound text={'작성하신 후기가 없습니다.'} />;
  return (
    <UlList mypage={mypage}>
      {datas.map((data, index) => (
        <article key={index} className='horizontal_flex'>
          {figure && (
            <figure className='profile_review'>
              <img src={userProfileImg} alt='회원 이미지' />
              <figcaption className='vertical_flex'>
                <a href='https://www.flaticon.com/free-icons/user' title='user icons'>
                  User icons created by Smashicons - Flaticon
                </a>
                <span>{data.name}</span>
              </figcaption>
            </figure>
          )}
          {mypage && (
            <div
              className='product_mypage'
              key={data.id}
              onClick={() => {
                storeScroll();
                navigate(`/product/${data.productId}`);
              }}
            >
              <img src={productImg} alt='제품 이미지' />
              <h2 className='brand_prod'>{data.brand}</h2>
              <h2 className='name_prod'>{data.PRDLST_NM}</h2>
            </div>
          )}
          <div>
            <div className='info_review horizontal_flex'>
              <StarScore score={data.score} />
              <span>{data.date}</span>
            </div>
            <div className='content_review horizontal_flex'>
              <p>{data.content}</p>
              <div className='photo_review'>{index % 2 ? <img src={productImg} alt='사진' /> : ''}</div>
              <p
                ref={(el) => (contentRef.current[index] = el)}
                className={clipped[index] ? 'clipped' : ''}
                onClick={() => changeClipped(index)}
              >
                {data.content}
              </p>

              <div className='photo_review'>
                {data.locations && splitLocations(data.locations, clipped[index] ? 1 : 4)}
              </div>
            </div>
            {clipped[index] && <button>더보기</button>}
          </div>
          <aside className='thumbs_buttons vertical_flex'>
            <button
              name='up'
              disabled={mypage}
              className={thumbs[data.id] === 'up' ? 'thumbs_click' : ''}
              onClick={(e) => onChangeThumbs(data.id, e)}
            >
              <GoThumbsup className={thumbs[data.id] === 'up' ? 'thumbs_click' : ''} size={15} />
              <span>{data.thumbsUp}</span>
            </button>
            <button
              name='down'
              disabled={mypage}
              className={thumbs[data.id] === 'down' ? 'thumbs_click' : ''}
              onClick={(e) => onChangeThumbs(data.id, e)}
            >
              <GoThumbsdown className={thumbs[data.id] === 'down' ? 'thumbs_click' : ''} size={15} />
              <span>{data.thumbsDown}</span>
            </button>
          </aside>
        </article>
      ))}
    </UlList>
  );
};

const UlList = styled.ul`
  article {
    border-bottom: 1px solid #e8e8e8;
    padding: 10px 0px;
    max-height: 30%;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
  article figure.profile_review {
    padding-top: 10px;
    margin-right: 10px;
    width: 10%;
    max-width: 100px;
    text-align: center;
    img {
      width: 40px;
      opacity: 0.4;
    }
    span {
      font-size: 15px;
      color: #585858;
      display: inline-block;
    }
    a {
      font-size: 3px;
      color: #c0c0c0;
    }
  }
  article div.product_mypage {
    cursor: pointer;
    margin: 10px 1px 10px 0;
    flex: 1 0 20%;
    img {
      width: 60%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      border-radius: 10px;
    }
    .brand_prod,
    .name_prod {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .brand_prod {
      margin-top: 7px;
      color: #787878;
      font-size: 13px;
    }
    .name_prod {
      margin-top: 6px;
      font-size: 14px;
    }
  }
  article div {
    flex: 1 1 75%;
    div.info_review {
      justify-content: flex-start;
      margin-right: 0px;
      flex: 1 1 auto;
      span {
        color: #b8b8b8;
        font-size: 13px;
        vertical-align: text-bottom;
        margin-left: 10px;
        line-height: 20px;
      }
      span:first-of-type {
        margin-left: 0px;
      }
    }
    div.content_review {
      justify-content: space-between;
      
      flex-wrap: nowrap;
      flex: 1 1 auto;
      p {
        
        margin-top: 10px;
        margin-left: 5px;
        overflow-wrap: break-word;
        letter-spacing: 1px;
        line-height: 1.3;
        font-size: 13px;
        flex: 1 2 auto;
        min-height: 80px;
      }
      p.clipped {
        text-overflow: ellipsis;
        white-space: wrap;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
      }

      div.photo_review {
        flex: 0 0 13%;
        margin-left: 2%;
        img {
          width: 100%;
        }
      }
      div.photo_review.clipped {
        width: 20px;
      }
    }
  }

  article aside.thumbs_buttons {
    margin-left: 3%;
    justify-content: center;
    button {
      border: 1px solid #e8e8e8;
      border-radius: 20px;
      padding: 6px;
      width: 60px;
      ${(props) => props.mypage && 'cursor: auto'};
      span {
        vertical-align: middle;
        margin-left: 5px;
      }
      svg {
        fill: #606060;
        ${(props) => props.mypage && 'fill: #B8B8B8'};
      }
    }
    button.thumbs_click {
      border: 1px solid #00c9b7;
    }
    .thumbs_click {
      color: #00c9b7;
      fill: #00c9b7;
    }
    button:first-of-type {
      margin-bottom: 5px;
    }
    button:last-of-type {
      margin-top: 5px;
    }
  }
`;

export default VerticalList;
