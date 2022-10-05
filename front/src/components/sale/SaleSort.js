import React from 'react';
import { DivSaleSort } from '../../styles/sale/sale_sort';
import dataSaleSort from '../../assets/api/dataSaleSort';
import SortUl from '../reusable/SortUl';

const SaleSort = ({ setShowCountUnit }) => {
  return (
    <DivSaleSort className='horizontal_flex'>
      <SortUl dataToMap={dataSaleSort} />
      <select onChange={(e) => setShowCountUnit(e.target.value)}>
        <option value={9}>9개씩</option>
        <option value={16}>16개씩</option>
        <option value={25}>25개씩</option>
      </select>
    </DivSaleSort>
  );
};

export default SaleSort;
