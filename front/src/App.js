import React from 'react';
import { Route, Routes } from 'react-router-dom';
import dataPageIndex from './assets/api/dataPageIndex';
import PageProvider from './contexts/PageContext';

const App = () => {
  return (
    <PageProvider>
      <Routes>
        {Object.entries(dataPageIndex).map((elem) => (
          <Route key={elem[0]} path={elem[1].path} element={elem[1].component()} />
        ))}
      </Routes>
    </PageProvider>
  );
};

export default App;
