import React from 'react';
import styled from '@emotion/styled';
import withPage from './withPage';
import HelpMain from '../components/help/HelpMain';
import HelpNav from '../components/help/HelpNav';

const Help = () => {
  return (
    <DivHelp className='horizontal_flex'>
      <HelpNav />
      <HelpMain />
    </DivHelp>
  );
};

export default withPage(Help);

const DivHelp = styled.div`
  justify-content: flex-start;
  flex-wrap: nowrap;
  margin: 0 100px;
`;
