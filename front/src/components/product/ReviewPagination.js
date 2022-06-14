import React from 'react';
import { useSelector } from 'react-redux';

const ReviewPagination = ({ pageTotal, limit, page, setPage }) => {
  const numPages = Math.ceil(pageTotal / limit);

  return (
    <>
      <nav>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        {[...Array(numPages)].map((_, i) => (
          <button key={i} onClick={() => setPage(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </button>
      </nav>
    </>
  );
};

export default ReviewPagination;
