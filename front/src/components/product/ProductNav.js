import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import dataProductNav from '../../assets/api/dataProductNav';
import { DivProduct, NavProduct, SectionProduct } from '../../styles/product/product_nav';

const ProductNav = () => {
  const [showComponent, setShowComponent] = useState(0);
  const { reviews: countTotalReviews } = useSelector((state) => state.product.count);

  return (
    <DivProduct>
      <NavProduct className='horizontal_flex'>
        {dataProductNav.map((nav, index) => (
          <button
            key={index}
            className={index === showComponent ? 'selectedNav' : ''}
            onClick={() => {
              setShowComponent(index);
            }}
          >
            {nav.name}
            {index === 2 && ` (${countTotalReviews})`}
          </button>
        ))}
      </NavProduct>
      <SectionProduct>{dataProductNav[showComponent].component}</SectionProduct>
    </DivProduct>
  );
};

export default ProductNav;
