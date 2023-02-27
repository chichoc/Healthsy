import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../styles/main_footer';

const MainFooter = () => {
  return (
    <Footer>
      <nav className='horizontal_flex'>
        <Link to='/help/term/info'>개인정보처리방침</Link>
        <Link to='/help/term/service'>이용약관</Link>
      </nav>
      <p>Copyright ⓒ 2022 Healthsy. All Right Reserved.</p>
    </Footer>
  );
};

export default MainFooter;
