import React from 'react';
import { useNavigate } from 'react-router-dom';
import StarScore from './StarScore';
import useScrollY from '../customHook/useScrollY';
import productImg from '../../assets/img/testSale.jpeg';
import { UlSale, ArticleSale } from '../../styles/sale/sale_list';

const ListWithImage = ({ salesToDisplay, countUnitToDisplay = 9, img }) => {
  const navigate = useNavigate();

  const { storeScroll } = useScrollY();

  const changeCountUnit = (num) => {
    if (num < 16) return 'small_unit';
    else if (num > 16) return 'big_unit';
    else return 'medium_unit';
  };

  const commaPrice = (price = 20000) => (price < 1000 ? price : price.toLocaleString());

  return (
    <UlSale className={`horizontal_flex`}>
      {salesToDisplay &&
        salesToDisplay.map((sale) => (
          <li
            key={sale.id}
            className={changeCountUnit(countUnitToDisplay)}
            onClick={() => {
              storeScroll();
              navigate(`/product/${sale.id}`);
            }}
          >
            <img src={productImg} alt='제품 이미지' />
            <ArticleSale isScored={sale.score}>
              <h2 className='brand_prod'>{sale.brand}</h2>
              <h2 className='name_prod'>{sale.PRDLST_NM}</h2>
              <h3 className='price_prod'> {commaPrice(sale.price)}</h3>
              <h4>
                <StarScore score={sale.score} size={15} count={sale.count} />
              </h4>
            </ArticleSale>
          </li>
        ))}
    </UlSale>
  );
};

export default ListWithImage;
