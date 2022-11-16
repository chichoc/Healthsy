import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeScroll } from '../../store/features/saleSlice';
import StarScore from '../reusable/StarScore';
import useScrollY from '../customHook/useScrollY';
import productImg from '../../assets/img/testSale.jpeg';
import { ArticleSale } from '../../styles/sale/sale_list';

const SaleProduct = ({ className, id, brand, name, price = '20000', score, count }) => {
  const navigate = useNavigate();
  const { storeScroll } = useScrollY();
  const commaPrice = (price) => (price < 1000 ? price : price.toLocaleString());

  return (
    <li
      className={className}
      onClick={() => {
        storeScroll();
        navigate(`/product/${id}`);
      }}
    >
      <img src={productImg} alt='제품 이미지' />
      <ArticleSale isScored={score}>
        <h2 className='brand_prod'>{brand}</h2>
        <h1 className='name_prod'>{name}</h1>
        <h3 className='price_prod'> {commaPrice(price)}</h3>
        <h4>
          <StarScore score={score} size={15} count={count} />
        </h4>
      </ArticleSale>
    </li>
  );
};

export default SaleProduct;
// export default React.memo(SaleProduct);
