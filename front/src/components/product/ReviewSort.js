import React from 'react';
import dataReviewSort from '../../assets/api/dataReviewSort';
import SortUl from '../reusable/SortUl';

const ReviewSort = () => {
  return (
    <div className='horizontal_flex'>
      <div>
        <button>전체</button>
        <button>사진</button>
      </div>
      <SortUl dataToMap={dataReviewSort} />
    </div>
  );
};

export default ReviewSort;
