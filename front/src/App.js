import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import dataPageIndex from './assets/api/dataPageIndex';

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        {Object.entries(dataPageIndex).map((elem) => (
          <Route key={elem[0]} path={elem[1].path} element={elem[1].component()} />
        ))}
      </Routes>
    </Provider>
  );
};

export default App;
