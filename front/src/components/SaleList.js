import React, { useContext } from 'react';
import SaleProduct from './SaleProduct';
import { Main, Ul } from '../styles/sale_list';
import { PageContext } from '../contexts/PageContext';

const SaleList = ({ apiData, apiLoading, apiError, apiDataBottom }) => {
  const { navigate } = useContext(PageContext);

  return (
    <Main>
      <Ul className='horizontal_flex'>
        {apiData &&
          apiData.map((sale, index) => (
            <SaleProduct
              key={index}
              onClick={() => {
                navigate(`/product/${sale.prod_id}`);
              }}
              brandName={sale.BSSH_NM}
              productName={sale.PRDLST_NM}
              productPrice={sale.prod_price}
            />
          ))}
        <span className='observerTarget' ref={apiDataBottom}>
          dd
        </span>
      </Ul>
      {apiLoading && <div>Loading..</div>}
      {apiError && <div>Error!</div>}
    </Main>
  );
};

export default SaleList;
