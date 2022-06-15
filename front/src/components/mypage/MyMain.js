import React from 'react';
import { useParams } from 'react-router-dom';
import InfoEdit from './InfoEdit';
import { MainMyPage } from '../../styles/mypage/mymain';

const MyMain = () => {
  let { mymenu } = useParams();
  const data = {
    info: <InfoEdit />,
  };

  return (
    <MainMyPage>
      <div>{mymenu ? data[mymenu] : <h2>권나연님 영양제 잘 드시고 계신가요?</h2>}</div>
    </MainMyPage>
  );
};

export default MyMain;
