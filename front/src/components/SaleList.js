import React from 'react';
import SaleProduct from './SaleProduct';
import { Main, Ul } from '../styles/sale_list';
import dataProduct from '../assets/api/dataProduct';

const SaleList = ({ apiData }) => {
  return (
    <Main>
      <Ul className='horizontal_flex'>
        {dataProduct.map((sale, index) => (
          <li key={index}>
            <SaleProduct brandName={sale.BSSH_NM} productName={sale.PRDLST_NM} />
          </li>
        ))}
      </Ul>
    </Main>
  );
};

export default SaleList;
