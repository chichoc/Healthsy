import React, { useEffect, useLayoutEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import SaleProduct from './SaleProduct';
import notFoundImg from '../../assets/img/notFound.svg';
import { MainSale, UlSale } from '../../styles/sale/sale_list';

const SaleList = ({ apiLoading, apiError, salesToDisplay, bottomOfSalesToDisplay }) => {
  const countUnitToDisplay = useSelector((state) => state.sale.countUnit);
  const changeCountUnit = (num) => {
    if (num < 16) return 'small_unit';
    else if (num > 16) return 'big_unit';
    else return 'medium_unit';
  };

  if (salesToDisplay.length === 0)
    return (
      <MainSale className='vertical_flex not_found'>
        <figure>
          <img src={notFoundImg} alt='notfound' />
          <figcaption>
            by Anggah Wahyu from{' '}
            <a
              href='https://thenounproject.com/browse/icons/term/not-found/'
              target='_blank'
              rel='noopener noreferrer'
              title='not found Icons'
            >
              Noun Project
            </a>
          </figcaption>
        </figure>
        <p>
          해당되는 상품이 없습니다. <br /> 다른 조건을 선택해주세요!
        </p>
      </MainSale>
    );
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
