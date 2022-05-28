import React from 'react';
import { Route, Routes } from 'react-router-dom';
import dataPageIndex from './assets/api/dataPageIndex';

const App = () => {
  return (
    <Routes>
      {dataPageIndex.map((elem, index) => (
        <Route key={index} path={elem.path} element={elem.component()} />
      ))}
    </Routes>
  );
};

export default App;
