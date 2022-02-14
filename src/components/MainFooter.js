import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const MainFooter = () => {
  return (
    <Footer>
      <nav>
        <Ul className='horizontal_flex'>
          <li>
            <Link to='/help'>회사소개</Link>ㅣ
          </li>
          <li>
            <Link to='/help'>개인정보처리방침</Link>ㅣ
          </li>
          <li>
            <Link to='/help'>이용약관</Link>
          </li>
        </Ul>
      </nav>
      <Company>
        <p>㈜Healthsy</p>
        <Caution>
          <p>㈜헬씨는 통신판매중개자이며, 통신판매의 당사자가 아닙니다.</p>
          <p>상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다.</p>
        </Caution>
        <p>ⓒ Healthsy Inc. All Rights Reserved.</p>
      </Company>
    </Footer>
  );
};

const Footer = styled.footer`
  background-color: #344b47;
  color: #96b1ac;
  border-top: solid 1px #e8f3f1;
  margin-top: 40px;
  padding: 40px 120px;
  flex-shrink: 0;
  nav {
    padding-bottom: 20px;
  }
`;

const Ul = styled.ul`
  justify-content: start;
`;

const Company = styled.div`
  p {
    padding: 3px 0;
  }
`;

const Caution = styled.div`
  margin: 10px 0;
  color: #e8f3f1;
`;

export default MainFooter;
