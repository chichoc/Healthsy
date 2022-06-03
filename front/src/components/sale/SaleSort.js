import React from 'react';
import { SortNav } from '../../styles/sale_sort';
import sortList from '../../assets/api/dataSaleSort';

const SaleSort = () => {
  return (
    <SortNav className='horizontal_flex'>
      <ul>
        {sortList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <select>
        <option defaultValue='9'>9개씩</option>
        <option value='16'>16개씩</option>
        <option value='25'>25개씩</option>
      </select>
    </SortNav>
  );
};

export default SaleSort;
