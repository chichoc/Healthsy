import React from 'react';
import { Nav } from '../styles/sale_nav';
import nutrients from '../assets/api/dataSaleNutrient';
import brands from '../assets/api/dataSaleBrand';

const SaleNav = () => {
  return (
    <Nav className='horizontal_flex'>
      {/* {nutrients.map((nutrient, index) => (
        <button key={index}>{nutrient}</button>
      ))} */}
      {brands.map((brand, index) => (
        <button key={index}>{brand}</button>
      ))}
    </Nav>
  );
};

export default SaleNav;
