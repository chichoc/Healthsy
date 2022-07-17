import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import dataProductNav from '../../assets/api/dataProductNav';
import { DivProduct, NavProduct, SectionProduct } from '../../styles/product/product_nav';
import ProductDetail from './ProductDetail';
import ProductInfo from './ProductInfo';
import ProductReview from './ProductReview';

const ProductNav = () => {
  const [showComponent, setShowComponent] = useState(0);
  const { reviews: countTotalReviews } = useSelector((state) => state.product.count);
  const infoSection = useRef(null);
  const detailSection = useRef(null);
  const reviewSection = useRef(null);

  const ref = [infoSection, detailSection, reviewSection];

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <DivProduct>
      <NavProduct className='horizontal_flex'>
        {dataProductNav.map((nav, index) => (
          <button
            key={index}
            className={index === showComponent ? 'selectedNav' : ''}
            onClick={() => {
              setShowComponent(index);
              scrollToSection(ref[index]);
            }}
          >
            {nav.name}
            {index === 2 && ` (${countTotalReviews})`}
          </button>
        ))}
      </NavProduct>
      <SectionProduct>
        <ProductInfo ref={infoSection} />
        <ProductDetail ref={detailSection} />
        <ProductReview ref={reviewSection} />
      </SectionProduct>
    </DivProduct>
  );
};

export default ProductNav;
