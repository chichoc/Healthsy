import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import SaleProduct from './SaleProduct';
import { MainSale, UlSale } from '../../styles/sale/sale_list';

const SaleList = ({ apiLoading, apiError, salesToDisplay, bottomOfSalesToDisplay }) => {
  const countUnitToDisplay = useSelector((state) => state.sale.countUnit);
  const changeCountUnit = (num) => {
    if (num < 16) return 'small_unit';
    else if (num > 16) return 'big_unit';
    else return 'medium_unit';
  };

  return (
    <MainSale>
      <UlSale className={`horizontal_flex`}>
        {salesToDisplay &&
          salesToDisplay.map((sale) => (
            <SaleProduct
              className={changeCountUnit(countUnitToDisplay)}
              key={sale.id}
              id={'id' in sale ? sale.id : ''}
              brand={'brand' in sale ? sale.brand : ''}
              name={'PRDLST_NM' in sale ? sale.PRDLST_NM : ''}
              price={'price' in sale ? sale.price : ''}
              score={'score' in sale ? sale.score : 0}
              count={'count' in sale ? sale.count : 0}
            />
          ))}
      </UlSale>
      <span className='observerTarget' ref={bottomOfSalesToDisplay}></span>
      {apiLoading && <div>Loading..</div>}
      {apiError && <div>Error!</div>}
    </MainSale>
  );
};

export default SaleList;
