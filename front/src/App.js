import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import dataPageIndex from './assets/api/dataPageIndex';
import Sale from './pages/Sale';
import Product from './pages/Product';

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/sale' element={<Sale />}>
          <Route path=':category' element={<Sale />} />
        </Route>
        <Route path='/product' element={<Product />}>
          <Route path=':id' element={<Product />} />
        </Route>
        {dataPageIndex.map((elem, index) => (
          <Route key={index} path={elem.path} element={elem.component()} />
        ))}
      </Routes>
    </Provider>
  );
};

export default App;
