import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleNav, removeNav } from '../../store/features/saleSlice';
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
      <h5>
        최대 4개까지 선택 가능합니다 <span>({selectedNav.length}/4)</span>
      </h5>
      <ul className='horizontal_flex'>
        <button
          className={selectedNav.length === 0 ? 'selectAll' : ''}
          onClick={() => selectedNav.length > 0 && dispatch(removeNav(category))}
        >
          전체
        </button>
        {{
          nutrient: nutrients,
          brand: brands,
          func: funcs,
        }[category].map((navName, index) => (
          <li key={navName}>
            <button
              className={selectedNav.includes(navName) ? 'select' : ''}
              onClick={() => {
                // 4개 선택했을 경우 선택하지 않은 항목 클릭시 아무 동작 안함
                if (selectedNav.length < 4 || selectedNav.includes(navName)) dispatch(handleNav({ navName, category }));
              }}
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
