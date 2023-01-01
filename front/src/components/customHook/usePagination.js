import React, { useEffect, useRef, useState } from 'react';
import Pagination from '../reusable/Pagination';

const usePagination = ({ unitOfPage = 10, unitOfPageOffset = 10, numberOfDatas, sort }) => {
  // unitOfPage: 한 페이지당 보여줄 데이터 개수
  // unitOfPageOffset: 페이지 블록 단위
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [pageOffset, setPageOffset] = useState(1);

  const maxPage = Math.ceil(numberOfDatas / unitOfPage);
  const maxPageOffset = maxPage - (maxPage % unitOfPageOffset) + 1;

  useEffect(() => {
    setCurrentPage(1);
    setPrevPage(0);
    setPageOffset(1);
  }, [sort]);

  const renderPagination = () =>
    numberOfDatas > 0 && (
      <Pagination
        unitOfPageOffset={unitOfPageOffset}
        maxPage={maxPage}
        maxPageOffset={maxPageOffset}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setPrevPage={setPrevPage}
        pageOffset={pageOffset}
        setPageOffset={setPageOffset}
      />
    );

  return [renderPagination, currentPage, prevPage, headerRef];
};

export default usePagination;
