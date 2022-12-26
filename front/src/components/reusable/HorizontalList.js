import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { IoCloseCircle } from 'react-icons/io5';
import productImg from '../../assets/img/testSale.jpeg';

const HorizontalList = ({
  salesToDisplay,
  check = false,
  remove = false,
  checkedSales,
  handleCheck,
  handleRemove,
  width = 'auto',
}) => {
  const navigate = useNavigate();
  return (
    <UlSale className={`horizontal_flex`} width={width}>
      {salesToDisplay &&
        salesToDisplay.map(
          (sale) =>
            sale && (
              <li
                key={sale.id}
                className={
                  !checkedSales || checkedSales.some((checkedSale) => checkedSale.id === sale.id) ? '' : 'unchecked'
                }
                onClick={(e) => (check ? handleCheck(sale.id, e) : navigate(`/product/${sale.id}`))}
              >
                {remove && (
                  <button onClick={() => handleRemove(sale.id)}>
                    <IoCloseCircle color='#888888' size={22} />
                  </button>
                )}
                <img src={productImg} alt='제품 이미지' />
                <h3 className='brand_prod'>{sale.brand}</h3>
                <h3 className='name_prod'>{sale.PRDLST_NM}</h3>
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
    margin: 20px 1%;
    width: ${(props) => props.width};
    flex: 1 0 ${(props) => props.width};
    position: relative;
    text-align: left;
    opacity: 1;
  }
  li.unchecked {
    opacity: 0.5;
  }
  label {
    position: absolute;
    top: 2px;
    left: -5px;
  }
  button {
    position: absolute;
    top: -5px;
    right: -10px;
  }
  button svg {
    border-radius: 11px;
    background-color: white;
  }
  button svg:hover {
    fill: #cc2900;
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
