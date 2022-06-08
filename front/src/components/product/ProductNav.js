import React, { useState } from 'react';
import ProductInfo from './ProductInfo';
import ProductReview from './ProductReview';
import ProductAsk from './ProductAsk';
import ProductDetail from './ProductDetail';
import { SectionProduct, NavProduct, ArticleProduct } from '../../styles/product/product_nav';

const ProductNav = () => {
  const [showComponent, setShowComponent] = useState(0);
  const dataProductNav = [
    { name: '상품 정보', component: <ProductInfo /> },
    { name: '후기', component: <ProductReview /> },
    { name: 'Q&A', component: <ProductAsk /> },
    { name: '구매 정보', component: <ProductDetail /> },
  ];

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
