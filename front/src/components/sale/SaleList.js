import React from 'react';
import { useSelector } from 'react-redux';
import SaleProduct from './SaleProduct';
import { Main, Ul } from '../../styles/sale/sale_list';

const SaleList = ({ apiLoading, apiError, apiDataBottom }) => {
  const showApiData = useSelector((state) => state.sale.value.showApi.data);

  return (
    <Main>
      <Ul className='horizontal_flex'>
        {showApiData &&
          showApiData.map(
            (sale, index) =>
              sale && (
                <SaleProduct
                  key={index}
                  prodId={'id' in sale ? sale.id : ''}
                  brandName={'brand' in sale ? sale.brand : ''}
                  productName={'PRDLST_NM' in sale ? sale.PRDLST_NM : ''}
                  productPrice={'price' in sale ? sale.price : ''}
                />
              )
          )}
        <span className='observerTarget' ref={apiDataBottom}></span>
      </Ul>
      {apiLoading && <div>Loading..</div>}
      {apiError && <div>Error!</div>}
    </Main>
  );
};

export default SaleList;
