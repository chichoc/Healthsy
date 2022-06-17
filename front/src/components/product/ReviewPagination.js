import React from 'react';
import { UlProdReview } from '../../styles/product/review_pagination';

const ReviewPagination = ({ pageTotal, limit, page, setPage }) => {
  const numPages = Math.ceil(pageTotal / limit);

  return (
    <>
      <UlProdReview className='horizontal_flex'>
        <button className='prev_arrow' onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        {[...Array(numPages)].map((_, index) => (
          <li key={index}>
            <button onClick={() => setPage(index + 1)}>{index + 1}</button>
          </li>
        ))}
        <button className='next_arrow' onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </button>
      </UlProdReview>
    </>
  );
};

export default ReviewPagination;
