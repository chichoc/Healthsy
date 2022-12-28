import styled from '@emotion/styled';
import React from 'react';

const PercentBar = ({ percent }) => {
  const selectColor = (percent) => {
    if (percent === 0) return '';
    if (percent >= 100) return 'green';
    return percent < 50 ? 'red' : 'orange';
  };

  return (
    <DivBar className={`horizontal_flex ${selectColor(percent)}`} percent={percent}>
      <div>
        <span></span>
      </div>
      <span>{percent || 0}%</span>
    </DivBar>
  );
};

const DivBar = styled.div`
  flex-wrap: nowrap;
  margin-top: 2px;
  div {
    position: relative;
    flex: 0 1 60%;
    border-radius: 10px;
    background-color: #e8e8e8;
    padding: 5px;
    height: 8px;
  }
  div > span {
    position: relative;
    display: block;
    max-width: ${(props) => props.percent}%;
    border-radius: 10px;
    height: 100%;
  }
  > span {
    margin-left: 5px;
    line-height: 18px;
    font-weight: 600;
    color: #e8e8e8;
  }
  &.green {
    div {
      background-color: #ccffcc;
      span {
        background-color: #00cc00;
      }
    }
    > span {
      color: #00cc00;
    }
  }
  &.orange {
    div {
      background-color: #ffebcc;
      span {
        background-color: #ff9900;
      }
    }
    > span {
      color: #ff9900;
    }
  }
  &.red {
    div {
      background-color: #ffe6e6;
      span {
        background-color: #ff0000;
      }
    }
    > span {
      color: #ff0000;
    }
  }
`;

export default PercentBar;
