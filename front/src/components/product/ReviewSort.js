import React from 'react';
import dataReviewSort from '../../assets/api/dataReviewSort';
import SortUl from '../reusable/SortUl';

const ReviewSort = () => {
  return (
    <>
      <SortUl dataToMap={dataReviewSort} />
    </>
  );
};

export default ReviewSort;
