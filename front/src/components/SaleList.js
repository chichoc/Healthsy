import React from 'react';
import SaleProduct from './SaleProduct';
import { Main } from '../styles/sale_list';

const SaleList = () => {
  return (
    <Main className='horizontal_flex' align='flex-start'>
      <SaleProduct />
      <SaleProduct />
      <SaleProduct />
      <SaleProduct />
      <SaleProduct />
      <SaleProduct />
    </Main>
  );
};

export default SaleList;
