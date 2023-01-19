import axios from 'axios';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import usePagination from '../customHook/usePagination';
import ListWithImage from '../reusable/ListWithImage';
import NotFound from '../reusable/NotFound';

const BookmarkList = () => {
  const userId = useSelector((state) => state.page.userId);

  const [bookmarks, setBookmarks] = useState([]);
  const [numberOfBookmarks, setNumberOfBookmarks] = useState(0);
  // request state
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const [renderPagination, currentPage, prevPage, headerRef] = usePagination({ numberOfDatas: numberOfBookmarks });

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
      setApiLoading(true);
      let pageNumDiffer, cursorIdx;
      if (currentPage === 1) pageNumDiffer = 1;
      else {
        pageNumDiffer = currentPage - prevPage;
        cursorIdx = pageNumDiffer > 0 ? bookmarks[8].bookmarksId : bookmarks[0].bookmarksId;
      }
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
    if (numberOfBookmarks === 0) return;
    fetchBoomarks();
  }, [numberOfBookmarks, currentPage]);

  if (!apiLoading && apiError)
    return <NotFound text={'오류가 발생했습니다.\n 잠시 후에 다시 시도해주시기 바랍니다.'} />;

  return (
    <>
      <h1 ref={headerRef}>관심상품 {numberOfBookmarks}</h1>
      {numberOfBookmarks > 0 ? (
        <>
          <ListWithImage salesToDisplay={bookmarks} />
          {renderPagination()}
        </>
      ) : (
        <NotFound text={'아직 담으신 상품이 없습니다!'} />
      )}
    </>
  );
};

export default BookmarkList;
