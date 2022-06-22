import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { UlProdReview } from '../../styles/product/review_pagination';

const ReviewPagination = ({ pageUnit, currentPage, setCurrentPage }) => {
  const countTotalReviews = useSelector((state) => state.product.count.reviews);
  const maxPage = Math.ceil(countTotalReviews / pageUnit);
  const maxPageOffset = maxPage - (maxPage % pageUnit) + 1;
  const [pageOffset, setPageOffset] = useState(1);

  return (
    <>
      <UlProdReview className='horizontal_flex'>
        {pageOffset !== 1 && (
          <button
            className='prev_arrow'
            onClick={() => {
              setCurrentPage(pageOffset - 10);
              setPageOffset(pageOffset - 10);
            }}
          >
            &lt;
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
          <button
            className='next_arrow'
            onClick={() => {
              setCurrentPage(pageOffset + 10);
              setPageOffset(pageOffset + 10);
            }}
          >
            &gt;
          </button>
        )}
      </UlProdReview>
    </>
  );
};

export default ReviewPagination;
