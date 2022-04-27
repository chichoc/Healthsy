import React from 'react';
import SaleProduct from './SaleProduct';
import { Main, Ul } from '../styles/sale_list';
import dataProduct from '../assets/api/dataProduct';

const SaleList = ({ apiData, apiLoading, apiError, apiDataBottom }) => {
  return (
    <Main>
      <Ul className='horizontal_flex'>
        {apiData &&
          apiData.map((sale, index) => (
            <li key={index}>
              <SaleProduct brandName={sale.BSSH_NM} productName={sale.PRDLST_NM} />
            </li>
          ))}
      </Ul>
      {apiLoading && <div>Loading..</div>}
      {apiError && <div>Error!</div>}
      <div ref={apiDataBottom}>target</div>
    </Main>
  );
};

export default SaleList;
