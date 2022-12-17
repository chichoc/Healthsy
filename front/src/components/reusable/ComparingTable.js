import React from 'react';
import styled from '@emotion/styled';
import HorizontalList from './HorizontalList';

const ComparingTable = ({ columns, datas }) => {
  const countHeaderLenMax = (arr) => {
    const ArrayOfLen = arr.map((elem) => elem['header'].length);
    return Math.max(...ArrayOfLen);
  };
  const splitString = (header, data) => {
    if (!data) return data;
    if (header.includes('일')) return data.slice(0, 4) + '년 ' + data.slice(4, 6) + '월 ' + data.slice(6) + '일';
    // \n이 여러 개가 연속될 경우
    return data.replaceAll(/[\n]{2,}/g, '\n');
    // return string ? string.split(',').join(', ') : string;
  };

  return (
    <UlProductInfo headerLen={countHeaderLenMax(columns) * 14}>
      {columns.map((column, index) => (
        <li key={column.code} className='horizontal_flex table'>
          {index > 0 ? (
            <>
              <h4>{column.header}</h4>
              {datas.map((data) => (
                <p>{splitString(column.header, data[column.code])}</p>
              ))}
            </>
          ) : (
            <>
              <h4>{column.header}</h4>
              <HorizontalList salesToDisplay={datas} width={'29%'} />
            </>
          )}
        </li>
      ))}
    </UlProductInfo>
  );
};

const UlProductInfo = styled.ul`
  margin-top: 30px;
  font-size: 14px;
  li.table {
    justify-content: flex-start;
    flex-wrap: nowrap;
    line-height: 1.5;
    /* max-height: 300px; */
  }
  li.table h4 {
    min-width: ${(props) => props.headerLen}px;
    background-color: #f0f0f0;
    padding: 1%;
    /* margin: auto 0; */
    align-items: center;
    border-bottom: 1px solid white;
  }
  li.table p {
    /* min-width: 30%; */
    width: 29%;
    /* margin-left: 10px; */
    padding: 2%;
    white-space: pre-line;
    border-right: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    /* background-color: blue; */
  }
  li.table ul {
    margin: 0;
    /* width: 100%; */
    li {
      margin: 0;
      padding: 2%;
      /* padding: 10px; */
      border-top: 1px solid #f0f0f0;
      border-right: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
      /* background-color: red; */
    }
  }
`;

export default ComparingTable;
