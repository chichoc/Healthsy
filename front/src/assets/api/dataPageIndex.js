import Main from '../../pages/Main';
import Login from '../../pages/Login';
import Join from '../../pages/Join';
import Sale from '../../pages/Sale';
import Product from '../../pages/Product';
import Help from '../../pages/Help';
import MyPage from '../../pages/MyPage';
import NotFound from '../../pages/NotFound';

const dataPageIndex = [
  { path: '/', component: () => <Main /> },
  { path: '/login', component: () => <Login /> },
  { path: '/join', component: () => <Join /> },
  { path: '/sale/:category', component: () => <Sale /> },
  { path: '/sale', component: () => <Sale /> },
  { path: '/product/:id', component: () => <Product /> },
  { path: '/product', component: () => <Product /> },
  { path: '/help/:helpmenu/:termType', component: () => <Help /> },
  { path: '/help/:helpmenu', component: () => <Help /> },
  { path: '/mypage/:mymenu', component: () => <MyPage /> },
  { path: '/mypage', component: () => <MyPage /> },
  { path: '*', component: () => <NotFound /> },
];

export default dataPageIndex;
