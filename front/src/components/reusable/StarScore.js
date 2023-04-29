import styled from '@emotion/styled';
import React from 'react';
import { BsStarFill } from 'react-icons/bs';

const StarScore = ({ size = 20, score, count = '' }) => {
  return (
    <ScoreIcons size={size} className='horizontal_flex'>
      {[...Array(5)].map((_, index) => (
        <BsStarFill
          key={index}
          title={score + '점'}
          size={size}
          className={score >= index + 1 ? 'score_select' : 'score_icon'}
        />
      ))}
      {typeof count === 'number' && <span>({count})</span>}
    </ScoreIcons>
  );
};

const ScoreIcons = styled.span`
  justify-content: flex-start;
  align-items: center;
  .score_icon {
    color: #f0f0f0;
  }
  .score_select {
    color: #fadd85;
  }
  span {
    font-size: ${(props) => props.size - 3}px;
    color: #808080;
    margin-left: 3px;
  }
`;

export default StarScore;
