import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import NotFound from '../reusable/NotFound';
import ListWithImage from '../reusable/ListWithImage';
import { MainSale } from '../../styles/sale/sale_list';

const SaleList = ({ apiLoading, apiError, salesToDisplay, bottomOfSalesToDisplay }) => {
  const countUnitToDisplay = useSelector((state) => state.sale.countUnit);

  if (salesToDisplay.length === 0) return <NotFound text={'해당되는 상품이 없습니다. \n 다른 조건을 선택해주세요!'} />;
  return (
    <MainSale>
      <ListWithImage salesToDisplay={salesToDisplay} countUnitToDisplay={countUnitToDisplay} />
      <span className='observerTarget' ref={bottomOfSalesToDisplay}></span>
      {apiLoading && <div>Loading..</div>}
      {apiError && <div>Error!</div>}
    </MainSale>
  );
};

export default SaleList;
