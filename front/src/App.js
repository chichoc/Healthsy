import React from 'react';
import { Route, Routes } from 'react-router-dom';
import dataPageIndex from './assets/api/dataPageIndex';
import PageProvider from './contexts/PageContext';

const App = () => {
  return (
    <PageProvider>
      <Routes>
        {Object.values(dataPageIndex).map((elem) => (
          <Route key={elem} path={elem.path} element={elem.component()} />
        ))}
      </Routes>
    </PageProvider>
  );
};

export default App;
