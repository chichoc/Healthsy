import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dataProductNav from '../../assets/api/dataProductNav';
import { DivProduct, NavProduct, SectionProduct } from '../../styles/product/product_nav';
import ProductDetail from './ProductDetail';
import ProductInfo from './ProductInfo';
import ProductReview from './ProductReview';
import useSticky from '../customHook/useSticky';

const ProductNav = () => {
  const [showComponent, setShowComponent] = useState(0);
  const { sticky, stickyRef } = useSticky();
  const { reviews: countTotalReviews } = useSelector((state) => state.product.count);
  const infoSection = useRef(null);
  const detailSection = useRef(null);
  const reviewSection = useRef(null);

  const ref = [infoSection, detailSection, reviewSection];

  const scrollToSection = (ref) => {
    const navHeight = -50;
    const moveToScrollY = navHeight + ref.current.offsetTop;
    window.scrollTo({ top: moveToScrollY, behavior: 'smooth' });
  };

  return (
    <DivProduct>
      <NavProduct className={sticky ? 'horizontal_flex sticky' : 'horizontal_flex'} ref={stickyRef}>
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
