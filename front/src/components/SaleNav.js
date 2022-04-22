import React from 'react';
import { Nav } from '../styles/sale_nav';
import nutrients from '../assets/api/dataSaleNutrient';

const SaleNav = () => {
  return (
    <Nav className='horizontal_flex'>
      {nutrients.map((nutrient, index) => (
        <button>{nutrient}</button>
      ))}
    </Nav>
  );
};

export default SaleNav;
