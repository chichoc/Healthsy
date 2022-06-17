import React, { useState } from 'react';
import dataProductNav from '../../assets/api/dataProductNav';
import { DivProduct, NavProduct, SectionProduct } from '../../styles/product/product_nav';

const ProductNav = () => {
  const [showComponent, setShowComponent] = useState(0);

  return (
    <DivProduct>
      <NavProduct className='horizontal_flex'>
        {dataProductNav.map((nav, index) => (
          <button
            key={index}
            className={index === showComponent && 'selectedNav'}
            onClick={() => {
              setShowComponent(index);
            }}
          >
            {nav.name}
          </button>
        ))}
      </NavProduct>
      <SectionProduct>{dataProductNav[showComponent].component}</SectionProduct>
    </DivProduct>
  );
};

export default ProductNav;
