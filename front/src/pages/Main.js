import React from 'react';
import MainContent from '../components/MainContent';
import withPage from './withPage';

const Main = () => {
  return (
    <>
      <MainContent />
    </>
  );
};

export default withPage(Main);
