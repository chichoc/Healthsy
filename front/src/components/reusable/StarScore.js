import styled from '@emotion/styled';
import React from 'react';
import { BsStarFill } from 'react-icons/bs';

const StarScore = ({ size = 20, score }) => {
  return (
    <ScoreIcons>
      {[...Array(5)].map((_, index) => (
        <BsStarFill
          key={index}
          title={score + '점'}
          size={size}
          className={score >= index + 1 ? 'score_icon score_select' : 'score_icon'}
        />
      ))}
    </ScoreIcons>
  );
};

const ScoreIcons = styled.span`
  .score_icon {
    color: #e8f3f1;
    margin-bottom: 5px;
  }
  .score_icon.score_select {
    color: #fadd85;
  }
`;

export default StarScore;
