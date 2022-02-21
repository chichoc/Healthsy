import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Help from './pages/Help';
import Main from './pages/Main';
import Join from './pages/Join';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Sale from './pages/Sale';
import MyPage from './pages/MyPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/sale' element={<Sale />} />
        <Route path='/help' element={<Help />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
