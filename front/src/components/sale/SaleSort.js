import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onSelectCountUnit, onSelectSort } from '../../store/features/saleSlice';
import SortUl from '../reusable/SortUl';
import dataSaleSort from '../../assets/api/dataSaleSort';
import { DivSaleSort } from '../../styles/sale/sale_sort';

const SaleSort = () => {
  const countUnitToDisplay = useSelector((state) => state.sale.countUnit);
  const sort = useSelector((state) => state.sale.sort);
  const dispatch = useDispatch();
  const countUnits = [9, 16, 25];

  return (
    <DivSaleSort className='horizontal_flex'>
      <SortUl dataToMap={dataSaleSort} selectedData={sort} handleClick={onSelectSort} />
      <select value={countUnitToDisplay} onChange={(e) => dispatch(onSelectCountUnit(e.target.value))}>
        {countUnits.map((unit) => (
          <option key={unit} value={unit}>
            {unit}개씩 보기
          </option>
        ))}
      </select>
    </DivSaleSort>
  );
};

export default SaleSort;
