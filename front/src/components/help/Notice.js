import React from 'react';
import usePagination from '../customHook/usePagination';
import dataNotice from '../../assets/api/dataNotice';
import { UlBoard } from '../../styles/help/help_notice';

const Notice = () => {
  const lengthOfNotices = dataNotice.length;
  const [renderPagination, currentPage, prevPage, headerRef] = usePagination({ numberOfDatas: lengthOfNotices });

  return (
    <>
      <h1 ref={headerRef}>공지사항</h1>
      <UlBoard>
        {dataNotice.slice((currentPage - 1) * 10, currentPage * 10).map(({ id, title, createDate }) => (
          <li className='horizontal_flex' key={id}>
            <span className='id'>{id}</span>
            <h2>{title}</h2>
            <span className='date'>{createDate}</span>
          </li>
        ))}
      </UlBoard>
      {renderPagination()}
    </>
  );
};

export default Notice;
