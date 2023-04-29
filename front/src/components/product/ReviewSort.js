import React from 'react';
import { useSelector } from 'react-redux';
import { onSelectSort } from '../../store/features/productSlice';
import SortUl from '../reusable/SortUl';
import dataReviewSort from '../../assets/api/dataReviewSort';
import { DivReviewSort } from '../../styles/product/review_sort.js';

const ReviewSort = ({ headerRef }) => {
  const { sortOfReviews: sort, typeOfReviews: type } = useSelector((state) => state.product.fetch);

  return (
    <DivReviewSort className='horizontal_flex'>
      <div className='horizontal_flex' ref={headerRef}>
        <button>전체</button>
        <button>사진</button>
      </div>

      <SortUl dataToMap={dataReviewSort} handleClick={onSelectSort} selectedData={sort} />
    </DivReviewSort>
  );
};

export default ReviewSort;
