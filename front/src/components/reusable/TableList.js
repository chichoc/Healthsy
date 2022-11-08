import React from 'react';
import styled from '@emotion/styled';

const TableList = ({ columns, datas }) => {
  const countHeaderLenMax = (arr) => {
    const ArrayOfLen = arr.map((elem) => elem['header'].length);
    return Math.max(...ArrayOfLen);
  };
  const splitString = (header, data) => {
    if (header.includes('일')) return data.slice(0, 4) + '년 ' + data.slice(4, 6) + '월 ' + data.slice(6) + '일';
    return data.replaceAll(/[\n]{2,}/g, '\n');
  };
  return (
    <UlProductInfo headerLen={countHeaderLenMax(columns) * 14}>
      {columns.map(
        (column) =>
          datas[column.code] && (
            <li key={column.header} className='horizontal_flex'>
              <h4>{column.header}</h4>
              <p>{splitString(column.header, datas[column.code])}</p>
            </li>
          )
      )}
    </UlProductInfo>
  );
};

const UlProductInfo = styled.ul`
  li {
    justify-content: flex-start;
    flex-wrap: nowrap;
    margin-bottom: 8px;
    line-height: 1.5;
  }
  h4 {
    min-width: ${(props) => props.headerLen}px;
  }
  p {
    margin-left: 20px;
    white-space: pre-line;
  }
`;

export default TableList;
