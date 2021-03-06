import styled from '@emotion/styled';
import React, { useState } from 'react';

const SortUl = ({ dataToMap }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <Ul className='horizontal_flex'>
      {dataToMap.map((item, index) => (
        <li
          key={index}
          className={selectedIdx === index ? 'selected' : ''}
          onClick={() => {
            setSelectedIdx(index);
          }}
        >
          {item.name}
        </li>
      ))}
    </Ul>
  );
};

const Ul = styled.ul`
  max-width: 500px;
  flex-wrap: nowrap;
  align-items: end;
  margin: 10px 0;
  li {
    flex: 0 1 auto;
    font-size: 14px;
    margin: 0 4px;
    white-space: nowrap;
    color: #838996;
    cursor: pointer;
  }
  li::before {
    content: '\\2713';
    font-size: 13px;
    vertical-align: top;
    margin-right: 3px;
  }
  li.selected {
    color: #000000;
    font-weight: bold;
  }
`;

export default SortUl;
