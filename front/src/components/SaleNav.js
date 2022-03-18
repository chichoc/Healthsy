import React from 'react';
import { Nav } from '../styles/sale_nav';

const SaleNav = () => {
  return (
    <Nav>
      <ul className='horizontal_flex'>
        <li>전체</li>
        <li>비타민A</li>
        <li>비타민B</li>
        <li>비타민C</li>
        <li>비타민D</li>
      </ul>
    </Nav>
  );
};

export default SaleNav;
