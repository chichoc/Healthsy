import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BookmarkList from './BookmarkList';
import Taking from './Taking';
import Comparing from './Comparing';
import WrittenReview from './WrittenReview';
import InfoEdit from './InfoEdit';
import InfoWithdrawl from './InfoWithdrawl';
import { MainMyPage } from '../../styles/mypage/my_page';

const MyMain = () => {
  let { mymenu } = useParams();
  const userName = useSelector((state) => state.page.userName);
  const data = {
    bookmark: <BookmarkList />,
    taking: <Taking />,
    comparing: <Comparing />,
    info: <InfoEdit />,
    withdrawl: <InfoWithdrawl />,
    review: <WrittenReview />,
  };
  return (
    <MainMyPage>
      <div>{mymenu ? data[mymenu] : <h2>{userName}님 영양제 잘 드시고 계신가요?</h2>}</div>
    </MainMyPage>
  );
};

export default MyMain;
