import React from 'react';
import styled from '@emotion/styled';

const MainContent = ({ notice, isLogin }) => {
  return (
    <Content>
      <div className='content-top'>
        <img src='./images/function1.png' alt='임시이미지'></img>
        <h2>영양제도 과하면 독입니다.</h2>
        <h1>이제 쉽게 관리하세요!</h1>
        <button>Learn More</button>
      </div>
      <div className='content-bottom'>
        <img src='./images/function1.png' alt='임시이미지2'></img>
        <h2>홍보 문구</h2>
      </div>
    </Content>
  );
};

const Content = styled.main`
  text-align: center;
  flex: 1 0 auto;
  img {
    height: 300px;
  }
  button {
    margin-top: 10px;
    padding: 10px;
  }
`;

export default MainContent;
