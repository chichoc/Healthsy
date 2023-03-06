import React, { useEffect, useRef, useState } from 'react';
import withPage from './withPage';
import { BsSearch } from 'react-icons/bs';
import PrimaryButton from '../components/reusable/PrimaryButton';
import takingImg from '../assets/img/takingSample.png';
import comparingImg from '../assets/img/comparingSample.png';
import searchImg from '../assets/img/searchSample.png';
import { Content } from '../styles/main_content';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const outerRef = useRef();
  const navigate = useNavigate();

  const contents = [
    {
      name: '복용함',
      imgSrc: takingImg,
      header: '쉽게 파악하세요!',
      text: (
        <>
          복용 중인 영양제들의 총 함량 아시나요?
          <br /> 1일 섭취량 당 함량<span>*</span>을 한눈에 확인해보세요.
        </>
      ),
      additionalText: `*식품 등의 표시ㆍ광고에 관한 법률 시행규칙 제6조제2항 및 제3항 관련 별표5 1일 영양성분
      기준치 참고 (2022년 11월 28일 개정)`,
      btnSrcToNavigate: 'mypage/taking',
    },
    {
      name: '비교함',
      imgSrc: comparingImg,
      header: '쉽게 비교하세요!',
      text: (
        <>
          어떤 제품을 구매해야할지 고민되시나요? <br /> 궁금한 제품들을 한눈에 비교해보세요.
        </>
      ),
      btnSrcToNavigate: 'mypage/comparing',
    },
    {
      name: '상품 검색',
      imgSrc: searchImg,
      header: '쉽게 찾으세요!',
      text: (
        <>
          특정 조건의 제품을 찾으시나요?
          <br /> 성분ㆍ브랜드ㆍ기능별로 필터링하고 검색<span>*</span>하며 원하는 영양제를 빠르게 찾아보세요.
        </>
      ),
      additionalText: (
        <>
          *상단의 <BsSearch title={'검색'} size={14} color={'#909090'} /> 를 누르시면 어디서든지 검색하실 수 있어요
        </>
      ),
    },
  ];

  useEffect(() => {
    const moveScroll = (y) => outerRef.current.scrollTo({ top: y, behavior: 'smooth' });

    const handleWheel = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerRef.current;
      const height = window.innerHeight - 130;
      let yToMove = 0;

      if (deltaY > 0) yToMove = scrollTop < height ? height : height * 2;
      else yToMove = scrollTop < height * 2 ? 0 : height;

      moveScroll(yToMove);
      setScrollIndex(Math.floor(scrollTop / height) + (deltaY > 0 ? 1 : -1));
    };

    const outerRefCurrent = outerRef.current;
    outerRefCurrent.addEventListener('wheel', handleWheel);

    return () => outerRefCurrent.removeEventListener('wheel', handleWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(scrollIndex);
    if (scrollIndex === 2) setTimeout(() => window.scrollTo({ top: 99999, behavior: 'smooth' }), 500);
    else setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 500);
  }, [scrollIndex]);

  return (
    <Content>
      <main ref={outerRef} className='outer'>
        {contents.map((content, index) => (
          <div key={index} className='inner horizontal_flex'>
            <img src={takingImg} alt={`${content.name} 예시`} />
            <div className='text vertical_flex'>
              <h4>{content.header}</h4>
              <p>{content.text}</p>
              <span>{content.additionalText}</span>
              <PrimaryButton
                buttonName={index < 2 ? `${content.name} 바로가기` : '상단으로 이동하기'}
                onClickMethod={() =>
                  index < 2 ? navigate(`/${content.btnSrcToNavigate}`) : window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              />
            </div>
          </div>
        ))}
      </main>
    </Content>
  );
};

export default withPage(Main);
