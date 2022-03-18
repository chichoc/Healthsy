import Main from '../../pages/Main';
import Login from '../../pages/Login';
import Join from '../../pages/Join';
import Sale from '../../pages/Sale';
import Help from '../../pages/Help';
import MyPage from '../../pages/MyPage';
import NotFound from '../../pages/NotFound';

const dataPageIndex = {
  main: { path: '/', component: () => <Main /> },
  login: { path: '/login', component: () => <Login /> },
  join: { path: '/join', component: () => <Join /> },
  sale: { path: '/sale', component: () => <Sale /> },
  help: { path: '/help', component: () => <Help /> },
  myPage: { path: '/mypage', component: () => <MyPage /> },
  notFound: { path: '*', component: () => <NotFound /> },
};

export default dataPageIndex;
