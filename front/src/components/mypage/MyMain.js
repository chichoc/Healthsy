import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BookmarkList from './BookmarkList';
import InfoEdit from './InfoEdit';
import InfoWithdrawl from './InfoWithdrawl';
import Taking from './Taking';
import { MainMyPage } from '../../styles/mypage/mymain';

const MyMain = () => {
  let { mymenu } = useParams();
  const userName = useSelector((state) => state.page.userName);
  const data = {
    bookmarks: <BookmarkList />,
    taking: <Taking />,
    info: <InfoEdit />,
    withdrawl: <InfoWithdrawl />,
  };

  return (
    <MainMyPage>
      <div>{mymenu ? data[mymenu] : <h2>{userName}님 영양제 잘 드시고 계신가요?</h2>}</div>
    </MainMyPage>
  );
};

export default MyMain;
