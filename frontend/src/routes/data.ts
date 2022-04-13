import { Reports } from 'pages/reports/loadable';
import { CreateFoodEntry } from 'pages/create-food-entry/loadable';
import { Dashboard } from 'pages/home/loadable';
import { Home } from 'pages/dashboard/loadable';
import { Login } from 'pages/login/loadable';
import { Register } from 'pages/register/loadable';
import { NotFound } from './NotFound';
import { Users } from 'pages/users';

export const openRoutes = [
  {
    path: '/',
    Component: Dashboard,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '*',
    Component: NotFound,
  },
];

export const customerRoutes = [
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/food-entry/create',
    Component: CreateFoodEntry,
  },
  {
    path: '/food-entry/:entryId/edit',
    Component: CreateFoodEntry,
  },
  {
    path: '*',
    Component: NotFound,
  },
];

export const adminRoutes = [
  {
    path: '/reports',
    Component: Reports,
  },
  {
    path: '/users',
    Component: Users,
  },
  ...customerRoutes,
];
