import React from 'react';
import { Content } from '../styles/main_content';
import functionImg from '../assets/img/function1.png';

const MainContent = () => {
  return (
    <Content>
      <div className='content-top'>
        <img src={functionImg} alt='임시이미지'></img>
        <h2>영양제도 과하면 독입니다.</h2>
        <h1>이제 쉽게 관리하세요!</h1>
        <button>Learn More</button>
      </div>
      <div className='content-bottom'>
        <img src={functionImg} alt='임시이미지2'></img>
        <h2>홍보 문구</h2>
      </div>
    </Content>
  );
};

export default MainContent;
