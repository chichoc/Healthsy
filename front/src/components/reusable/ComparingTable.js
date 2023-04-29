import React from 'react';
import styled from '@emotion/styled';
import HorizontalList from './HorizontalList';
import { BsStarFill } from 'react-icons/bs';
import PercentBar from './PercentBar';

const ComparingTable = ({ columns, checkedSales, datasOfCheckedSales }) => {
  const countHeaderLenMax = (arr) => {
    const ArrayOfLen = arr.map((elem) => elem.header.length + (elem.unit ? elem.unit.length : 0));
    return Math.max(...ArrayOfLen);
  };

  const splitString = (header, data) => {
    if (!data) return data;
    if (header.includes('일')) return data.slice(0, 4) + '년 ' + data.slice(4, 6) + '월 ' + data.slice(6) + '일';
    if (header.includes('가격')) return (data < 1000 ? data : data.toLocaleString()) + '원';
    return data;
  };

  const sumDatas = (datas, header, type, unit) => {
    const sum = datas.reduce((sum, data) => +data.STDR_STND[header][type] + sum, 0);
    if (sum === 0) return type === 'percent' ? 0 : '해당 없음';
    return type === 'percent' ? Math.round(sum) : sum + unit;
  };

  return (
    <UlProductInfo headerLen={countHeaderLenMax(columns) * 14}>
      {columns.map((column, index) => (
        <li key={column.code || column.header} className='horizontal_flex table'>
          <h4 className='vertical_flex'>
            {column.header}
            {column.unit ? (
              <span>
                기준치: {column.standard}
                {column.unit}
              </span>
            ) : (
              ''
            )}
          </h4>
          {index > 0 ? (
            <>
              {column.standard && (
                <p className='sticky'>
                  <span>{sumDatas(datasOfCheckedSales, column.header, 'content', column.unit)}</span>
                  <PercentBar percent={sumDatas(datasOfCheckedSales, column.header, 'percent')} />
                </p>
              )}
              {datasOfCheckedSales.map((data) =>
                column.code ? (
                  column.code.includes(',') ? (
                    <p key={data.id}>
                      <BsStarFill color='#fadd85' size={15} />{' '}
                      <span>{column.code.split(',').map((c) => (c === 'count' ? ` (${data[c]})` : data[c] || 0))}</span>
                    </p>
                  ) : (
                    <p>{splitString(column.header, data[column.code])}</p>
                  )
                ) : (
                  <p>
                    {data.STDR_STND[column.header].content ? (
                      <>
                        <span>
                          {+data.STDR_STND[column.header].content}
                          {column.unit}{' '}
                        </span>
                        <PercentBar percent={Math.round(data.STDR_STND[column.header].percent)} />
                      </>
                    ) : (
                      ''
                    )}
                  </p>
                )
              )}
            </>
          ) : (
            <>
              {column.sum && (
                <h5 key={'total'} className='sticky'>
                  총 함량
                </h5>
              )}
              <HorizontalList salesToDisplay={checkedSales} />
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
  overflow-x: auto;

  li.table {
    justify-content: flex-start;
    flex-wrap: nowrap;
    line-height: 1.5;
  }
  li.table h4 {
    flex: 0 0 ${(props) => props.headerLen}px;
    word-break: keep-all;
    background-color: #f0f0f0;
    padding: 2%;
    box-sizing: border-box;
    border-bottom: 1px solid white;
    left: 0;
  }
  li.table h5 {
    width: calc((100% - ${(props) => props.headerLen}px) / 4);
    background-color: #f0f0f0;
    padding: 2%;
    border: 1px solid #f0f0f0;
    border-left: none;
  }
  li.table h4,
  li.table .sticky {
    position: sticky;
    z-index: 1;
  }
  li.table .sticky {
    left: ${(props) => props.headerLen}px;
    background-color: #ffffff;
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
  li.table p:empty:before {
    content: '해당 없음';
    color: #c8c8c8;
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
      border: 1px solid #f0f0f0;
      border-left: none;
    }
  }
`;

export default ComparingTable;
