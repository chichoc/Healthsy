import React from 'react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';
import { UlProdReview } from '../../styles/product/review_pagination';

const Pagination = ({
  unitOfPageOffset,
  maxPage,
  maxPageOffset,
  currentPage,
  setCurrentPage,
  setPrevPage,
  pageOffset,
  setPageOffset,
}) => {
  return (
    <>
      <UlProdReview className='horizontal_flex'>
        {pageOffset !== 1 && (
          // 이전 페이지 블록의 첫번째
          <button
            className='prev_arrow'
            onClick={() => {
              setPrevPage(currentPage);
              setCurrentPage(pageOffset - 10);
              setPageOffset(pageOffset - 10);
            }}
          >
            <AiOutlineDoubleLeft color='#707070' />
          </button>
        )}

        {[...Array(pageOffset === maxPageOffset ? maxPage % unitOfPageOffset : unitOfPageOffset)].map((_, index) => (
          <li key={index}>
            <button
              className={pageOffset + index === currentPage ? 'selectedBtn' : ''}
              onClick={() => {
                setPrevPage(currentPage);
                setCurrentPage(pageOffset + index);
              }}
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
              setPrevPage(currentPage);
              setCurrentPage(pageOffset + 10);
              setPageOffset(pageOffset + 10);
            }}
          >
            <AiOutlineDoubleRight color='#707070' />
          </button>
        )}
      </UlProdReview>
    </>
  );
};

export default Pagination;
