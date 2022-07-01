import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { UlProdReview } from '../../styles/product/review_pagination';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';

const ReviewPagination = ({ pageUnit, currentPage, setCurrentPage }) => {
  const countTotalReviews = useSelector((state) => state.product.count.reviews);
  const maxPage = Math.ceil(countTotalReviews / pageUnit);
  const maxPageOffset = maxPage - (maxPage % pageUnit) + 1;
  const [pageOffset, setPageOffset] = useState(1);

  return (
    <>
      <UlProdReview className='horizontal_flex'>
        {pageOffset !== 1 && (
          // 이전 페이지 블록의 첫번째
          <button
            className='prev_arrow'
            onClick={() => {
              setCurrentPage(pageOffset - 10);
              setPageOffset(pageOffset - 10);
            }}
          >
            <AiOutlineDoubleLeft color='#707070' />
          </button>
        )}

        {[...Array(pageOffset === maxPageOffset ? maxPage % pageUnit : pageUnit)].map((_, index) => (
          <li key={index}>
            <button
              className={pageOffset + index === currentPage ? 'selectedBtn' : ''}
              onClick={() => setCurrentPage(pageOffset + index)}
            >
              {pageOffset + index}
            </button>
          </li>
        ))}
        {pageOffset < maxPageOffset && (
          // 다음 페이지 블록의 첫번째
          <button
            className='next_arrow'
            onClick={() => {
              setCurrentPage(pageOffset + 10);
              setPageOffset(pageOffset + 10);
            }}
          >
            <AiOutlineDoubleRight color='#707070' className='arrow_icon' />
          </button>
        )}
      </UlProdReview>
    </>
  );
};

export default ReviewPagination;
