import React from 'react';
import { Link } from 'react-router-dom';
import dataMyMenu from '../../assets/api/dataMyMenu';
import { NavMyPage } from '../../styles/mypage/mynav';

const MyMenu = () => {
  return (
    <NavMyPage>
      <h2>나의 활동</h2>
      <ul>
        <li>총 함량</li>
      </ul>
      {/* 총 함량, 찜, 최근 본 상품, 마이브랜드, 1:1문의, 상품 Q&A */}
      <h2>나의 쇼핑</h2>
      <ul>
        <li>작성한 후기</li>
      </ul>
      {/* 주문 내역, 취소/교환/반품 내역, 상품 후기 */}
      <h2>나의 계정</h2>
      <ul>
        <li>
          <Link to='/mypage/info'>회원 정보 수정</Link>
        </li>
      </ul>
      {/* 회원 정보 수정, 회원 등급, 쿠폰, 마일리지 */}
    </NavMyPage>
  );
};

export default MyMenu;
