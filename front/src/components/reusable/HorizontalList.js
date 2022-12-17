import styled from '@emotion/styled';
import React from 'react';
import CircleCheck from '../reusable/CircleCheck';
import productImg from '../../assets/img/testSale.jpeg';

const HorizontalList = ({ salesToDisplay, check = false, checkedSales, handleCheck, width = '15%' }) => {
  return (
    <UlSale className={`horizontal_flex`} width={width}>
      {salesToDisplay &&
        salesToDisplay.map(
          (sale) =>
            sale && (
              <li key={sale.id} onClick={() => handleCheck(sale.id)}>
                {check && (
                  <CircleCheck
                    id={sale.id}
                    checked={checkedSales.find((comparing) => comparing.id === sale.id)}
                    dark={true}
                  />
                )}
                <img src={productImg} alt='제품 이미지' />
                <h2 className='brand_prod'>{sale.brand}</h2>
                <h2 className='name_prod'>{sale.PRDLST_NM}</h2>
              </li>
            )
        )}
    </UlSale>
  );
};

const UlSale = styled.ul`
  justify-content: flex-start;
  margin: 5px 0;
  overflow-x: auto;
  flex-wrap: nowrap;
  li {
    cursor: pointer;
    margin: 20px 1% 20px 1%;
    width: ${(props) => props.width};
    flex: 0 0 ${(props) => props.width};
    position: relative;
    text-align: left;
  }

  label {
    position: absolute;
    top: 2px;
    left: -5px;
  }
  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 10px;
  }
  .brand_prod,
  .name_prod {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .brand_prod {
    margin-top: 7px;
    color: #787878;
    font-size: 13px;
  }
  .name_prod {
    margin-top: 6px;
    font-size: 14px;
  }
`;

export default HorizontalList;
