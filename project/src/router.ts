import { lazy } from 'react';

const Newhome = lazy(() => import('./pages/newhome/index.tsx')); 
const Used = lazy(() => import('./pages/used/index.tsx')); 
const Rent = lazy(() => import('./pages/rent/index.tsx')); 

const routes = [
  { name: '新房管理', component: Newhome, path: '/Newhome' },
  { name: '二手房管理', component: Used, path: '/Used' },
  { name: '出租房管理', component: Rent, path: '/Rent' },
];

export default routes;
