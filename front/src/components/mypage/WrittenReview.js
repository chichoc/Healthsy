import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import usePagination from '../customHook/usePagination';
import VerticalList from '../reusable/VerticalList';

const WrittenReview = () => {
  const userId = useSelector((state) => state.page.userId);
  const [reviews, setReviews] = useState([]);
  const [numberOfReviews, setNumberOfReviews] = useState(0);
  // request state
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const [renderPagination, currentPage, prevPage] = usePagination({ numberOfDatas: numberOfReviews });

  const countReviews = async () => {
    try {
      setApiLoading(true);
      const { data } = await axios.post('http://localhost:8888/mypage/counthUserReviews', {
        userId,
      });
      setNumberOfReviews(data.count);
    } catch (error) {
      setApiError(error);
      console.log(error);
    } finally {
      setApiLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      let pageNumDiffer, cursorIdx;
      if (currentPage === 1) pageNumDiffer = 1;
      else {
        pageNumDiffer = currentPage - prevPage;
        cursorIdx = pageNumDiffer > 0 ? reviews[9].reviewId : reviews[0].reviewId;
      }
      setApiLoading(true);
      const { data } = await axios.post('http://localhost:8888/mypage/fetchUserReviews', {
        userId,
        pageNumDiffer,
        cursorIdx,
      });
      setReviews(data);
    } catch (error) {
      setApiError(error);
      console.log(error);
    } finally {
      setApiLoading(false);
    }
  };

  useLayoutEffect(() => {
    countReviews();
  }, []);

  useEffect(() => {
    if (numberOfReviews === 0) return;
    fetchReviews();
  }, [numberOfReviews, currentPage]);

  return (
    <div>
      <h1>작성한 후기 {numberOfReviews}</h1>
      <VerticalList datas={reviews} mypage={true} />
      {renderPagination()}
    </div>
  );
};

export default WrittenReview;
