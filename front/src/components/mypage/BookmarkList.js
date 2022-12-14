import axios from 'axios';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ListWithImage from '../reusable/ListWithImage';
import NotFound from '../reusable/NotFound';
import Pagination from '../reusable/Pagination';

const BookmarkList = () => {
  const userId = useSelector((state) => state.page.userId);

  const [bookmarks, setBookmarks] = useState([]);
  const [numberOfBookmarks, setNumberOfBookmarks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [pageOffset, setPageOffset] = useState(1);
  // request state
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const countBoomarks = async () => {
    try {
      setApiLoading(true);
      const { data } = await axios.post('http://localhost:8888/mypage/countBookmarks', {
        userId,
      });
      setNumberOfBookmarks(data.count);
    } catch (error) {
      setApiError(error);
      console.log(error);
    } finally {
      setApiLoading(false);
    }
  };

  const fetchBoomarks = async () => {
    try {
      const pageNumDiffer = currentPage === 1 ? 1 : currentPage - prevPage;
      let cursorIdx = '';
      if (currentPage !== 1) cursorIdx = pageNumDiffer > 0 ? bookmarks[8].bookmarksId : bookmarks[0].bookmarksId;
      setApiLoading(true);
      const { data } = await axios.post('http://localhost:8888/mypage/fetchBookmarks', {
        userId,
        pageNumDiffer,
        cursorIdx,
      });
      setBookmarks(data);
    } catch (error) {
      setApiError(error);
      console.log(error);
    } finally {
      setApiLoading(false);
    }
  };

  useLayoutEffect(() => {
    countBoomarks();
  }, []);

  useEffect(() => {
    if (!numberOfBookmarks) return;
    fetchBoomarks();
  }, [numberOfBookmarks, currentPage, prevPage]);

  if (!apiLoading && apiError)
    return <NotFound text={'오류가 발생했습니다.\n 잠시 후에 다시 시도해주시기 바랍니다.'} />;

  return (
    <>
      <h1>관심상품 {numberOfBookmarks}</h1>
      <ListWithImage salesToDisplay={bookmarks} />
      <Pagination
        unitOfPage={9}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setPrevPage={setPrevPage}
        pageOffset={pageOffset}
        setPageOffset={setPageOffset}
        numberOfDatas={numberOfBookmarks}
      />
    </>
  );
};

export default BookmarkList;
