import styled from '@emotion/styled';
import React from 'react';

const TableList = ({ data, header }) => {
  return (
    <UlProductInfo>
      {data && (
        <li key={header} className='horizontal_flex'>
          <h4>{header}</h4>
          <span>{data}</span>
        </li>
      )}
    </UlProductInfo>
  );
};

const UlProductInfo = styled.ul`
  margin-bottom: 5px;
  li {
    justify-content: flex-start;
    flex-wrap: nowrap;
  }
  li h4 {
    min-width: 120px;
  }
`;

export default TableList;
