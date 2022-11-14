import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onSelectNav, onSelectAllNav } from '../../store/features/saleSlice';
import nutrients from '../../assets/api/dataSaleNutrient';
import brands from '../../assets/api/dataSaleBrand';
import funcs from '../../assets/api/dataSaleFunc';
import { Nav } from '../../styles/sale/sale_nav';

const SaleNav = () => {
  let { category } = useParams();
  const selectedNav = useSelector((state) => state.sale.selectedNav[category]);
  const dispatch = useDispatch();

  return (
    <Nav>
      <h5>최대 4개까지 선택 가능합니다</h5>
      <ul className='horizontal_flex'>
        <button
          className={selectedNav.length === 0 ? 'selectAll' : ''}
          onClick={() => dispatch(onSelectAllNav({ category }))}
        >
          전체
        </button>
        {{
          brand: brands,
          nutrient: nutrients,
          func: funcs,
        }[category].map((navName, index) => (
          <li key={index}>
            <button
              className={selectedNav.includes(navName) ? 'select' : ''}
              onClick={() => dispatch(onSelectNav({ navName, category }))}
            >
              {navName}
            </button>
          </li>
        ))}
      </ul>
    </Nav>
  );
};

export default SaleNav;
