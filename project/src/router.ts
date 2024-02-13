import { lazy } from 'react';

const Home = lazy(() => import('./pages/home/index.tsx')); 
const Login = lazy(() => import('./pages/login/index.tsx'));

const routes = [
  { name: '首页', component: Home, path: '/Home' },
  { name: '登录', component: Login, path: '/Login' }
];

export default routes;
