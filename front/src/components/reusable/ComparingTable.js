import React from 'react';
import styled from '@emotion/styled';
import HorizontalList from './HorizontalList';
import { BsStarFill } from 'react-icons/bs';

const ComparingTable = ({ columns, checkedSales, datasOfCheckedSales }) => {
  const countHeaderLenMax = (arr) => {
    const ArrayOfLen = arr.map((elem) => elem['header'].length);
    return Math.max(...ArrayOfLen);
  };

  const splitString = (header, data) => {
    if (!data) return data;
    if (header.includes('일')) return data.slice(0, 4) + '년 ' + data.slice(4, 6) + '월 ' + data.slice(6) + '일';
    if (header.includes('가격')) return (data < 1000 ? data : data.toLocaleString()) + '원';
    return data;
  };

  return (
    <UlProductInfo headerLen={countHeaderLenMax(columns) * 10}>
      {columns.map((column, index) => (
        <li key={column.code} className='horizontal_flex table'>
          <h4>{column.header}</h4>
          {index > 0 ? (
            <>
              {datasOfCheckedSales.map((data) =>
                column.code.includes(',') ? (
                  <p>
                    <BsStarFill color='#fadd85' size={15} />{' '}
                    <span>{column.code.split(',').map((c) => (c === 'count' ? ` (${data[c]})` : data[c] || 0))}</span>
                  </p>
                ) : data.hasOwnProperty(column.code) ? (
                  <p>{splitString(column.header, data[column.code])}</p>
                ) : (
                  ''
                )
              )}
            </>
          ) : (
            <HorizontalList salesToDisplay={checkedSales} />
          )}
        </li>
      ))}
    </UlProductInfo>
  );
};

const UlProductInfo = styled.ul`
  margin-top: 30px;
  font-size: 14px;
  overflow-x: auto;

  li.table {
    justify-content: flex-start;
    flex-wrap: nowrap;
    line-height: 1.5;
  }
  li.table h4 {
    min-width: ${(props) => props.headerLen}px;
    background-color: #f0f0f0;
    padding: 2% 1%;
    border-bottom: 1px solid white;
  }
  li.table p {
    width: calc((100% - ${(props) => props.headerLen}px) / 4);
    flex: 1 1 calc((100% - ${(props) => props.headerLen}px) / 4);
    padding: 2%;
    white-space: pre-line;
    border-right: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    letter-spacing: 0.2px;
  }
  li.table svg {
    vertical-align: text-top;
  }
  li.table ul {
    margin: 0;
    line-height: 1.2;
    li {
      width: calc((100% - ${(props) => props.headerLen}px) / 4);
      flex: 1 1 calc((100% - ${(props) => props.headerLen}px) / 4);
      margin: 0;
      padding: 2%;
      border-top: 1px solid #f0f0f0;
      border-right: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
    }
  }
`;

export default ComparingTable;
