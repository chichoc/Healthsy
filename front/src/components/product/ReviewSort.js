import React from 'react';
import dataReviewSort from '../../assets/api/dataReviewSort';
import SortUl from '../reusable/SortUl';
import { DivReviewSort } from '../../styles/product/review_sort.js';

const ReviewSort = () => {
  return (
    <DivReviewSort className='horizontal_flex'>
      <div className='horizontal_flex'>
        <button>전체</button>
        <button>사진</button>
      </div>
      <SortUl dataToMap={dataReviewSort} />
    </DivReviewSort>
  );
};

export default ReviewSort;
