import { lazy } from 'react';

const Home = lazy(() => import('./pages/home/index.tsx')); 
const Detail = lazy(() => import('./pages/detail/index.tsx'));
const Bigvr = lazy(() => import('./pages/bigvr/index.tsx'));
const Login = lazy(() => import('./pages/login/index.tsx'));
const Personal = lazy(() => import('./pages/personal/index.tsx'));
const Newhome = lazy(() => import('./pages/newhome/index.tsx'));
const Used = lazy(() => import('./pages/used/index.tsx'));
const Rent = lazy(() => import('./pages/rent/index.tsx'));
const Question = lazy(() => import('./pages/question/index.tsx'));
const Qa = lazy(() => import('./pages/qa/index.tsx'));

const routes = [
  { name: '首页', component: Home, path: '/Home' },
  { name: '详情', component: Detail, path: '/detail/:id' },
  { name: '大详情', component: Bigvr, path: '/bigvr/:id' },
  { name: '登录', component: Login, path: '/Login' },
  { name: '个人中心', component: Personal, path: '/Personal' },
  { name: '新房', component: Newhome, path: '/Newhome/:path' },
  { name: '二手房', component: Used, path: '/Used/:path' },
  { name: '租房', component: Rent, path: '/Rent/:path' },
  { name: '问答', component: Question, path: '/Question' },
  { name: '问答详情', component: Qa, path: '/Qa/:id' },
];

export default routes;
