import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SaleProduct from './SaleProduct';
import { Main, Ul } from '../styles/sale_list';

const SaleList = ({ apiData, apiLoading, apiError, apiDataBottom }) => {
  const navigate = useNavigate();

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
              // brandName={sale.BSSH_NM}
              brandName={'BSSH_NM' in sale ? sale.BSSH_NM : ''}
              productName={'PRDLST_NM' in sale ? sale.PRDLST_NM : ''}
              productPrice={'prod_price' in sale ? sale.prod_price : ''}
              // 콘솔 찍어볼 것
            />
          ))}
        <span className='observerTarget' ref={apiDataBottom}></span>
      </Ul>
      {apiLoading && <div>Loading..</div>}
      {apiError && <div>Error!</div>}
    </Main>
  );
};

export default SaleList;
