import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Global from './styles/global';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Help from './pages/Help';
import Main from './pages/Main';
import Join from './pages/Join';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Sale from './pages/Sale';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/sale' element={<Sale />} />
        <Route path='/help' element={<Help />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    <Global />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
