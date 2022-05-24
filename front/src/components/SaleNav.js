import React from 'react';
import { Nav } from '../styles/sale_nav';
import nutrients from '../assets/api/dataSaleNutrient';
import brands from '../assets/api/dataSaleBrand';
import funcs from '../assets/api/dataSaleFunc';
import { useParams } from 'react-router-dom';

const SaleNav = () => {
  let { category } = useParams();

  return (
    <Nav className='horizontal_flex'>
      {{
        brand: brands.sort(),
        nutrient: nutrients.sort(),
        func: funcs.sort(),
      }[category].map((data, index) => (
        <button key={index}>{data}</button>
      ))}
    </Nav>
  );
};

export default SaleNav;
