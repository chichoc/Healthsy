import React from 'react';
import SaleProduct from './SaleProduct';
import { MainSale, UlSale } from '../../styles/sale/sale_list';

const SaleList = ({ apiLoading, apiError, apiDataBottom, showApi, showCountUnit }) => {
  const changeCountUnit = (num) => {
    if (num < 16) return 'small_unit';
    else if (num > 16) return 'big_unit';
    else return 'medium_unit';
  };

  return (
    <MainSale>
      <UlSale className={`horizontal_flex`}>
        {showApi &&
          showApi.map(
            (sale, index) =>
              sale && (
                <SaleProduct
                  className={changeCountUnit(showCountUnit)}
                  key={index}
                  prodId={'id' in sale ? sale.id : ''}
                  brandName={'brand' in sale ? sale.brand : ''}
                  productName={'PRDLST_NM' in sale ? sale.PRDLST_NM : ''}
                  productPrice={'price' in sale ? sale.price : ''}
                />
              )
          )}
        <span className='observerTarget' ref={apiDataBottom}></span>
      </UlSale>
      {apiLoading && <div>Loading..</div>}
      {apiError && <div>Error!</div>}
    </MainSale>
  );
};

export default SaleList;
