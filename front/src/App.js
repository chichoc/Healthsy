import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Help from './pages/Help';
import Main from './pages/Main';
import Join from './pages/Join';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Sale from './pages/Sale';
import MyPage from './pages/MyPage';
import PageProvider from './contexts/PageContext';

const App = () => {
  const pageIndex = {
    main: { path: '/', component: () => <Main /> },
    login: { path: '/login', component: () => <Login /> },
    join: { path: '/join', component: () => <Join /> },
    sale: { path: '/sale', component: () => <Sale /> },
    help: { path: '/help', component: () => <Help /> },
    myPage: { path: '/mypage', component: () => <MyPage /> },
    notFound: { path: '*', component: () => <NotFound /> },
  };

  return (
    <PageProvider>
      <Routes>
        {Object.values(pageIndex).map((elem) => (
          <Route key={elem} path={elem.path} element={elem.component()} />
        ))}
      </Routes>
    </PageProvider>
  );
};

export default App;
