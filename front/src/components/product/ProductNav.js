import React, { useState } from 'react';
import dataProductNav from '../../assets/api/dataProductNav';
import { SectionProduct, NavProduct, ArticleProduct } from '../../styles/product/product_nav';

const ProductNav = () => {
  const [showComponent, setShowComponent] = useState(0);

  return (
    <SectionProduct>
      <NavProduct className='horizontal_flex'>
        {dataProductNav.map((nav, index) => (
          <button
            onClick={() => {
              setShowComponent(index);
            }}
            key={index}
          >
            {nav.name}
          </button>
        ))}
      </NavProduct>
      <ArticleProduct>{dataProductNav[showComponent].component}</ArticleProduct>
    </SectionProduct>
  );
};

export default ProductNav;
