import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/config/constants';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { RootLayout } from './RootLayout';

const RanduieliPage = lazy(() => import('@/pages/RanduieliPage'));
const AjutorPage = lazy(() => import('@/pages/AjutorPage'));

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.randuieli.slice(1), element: <RanduieliPage /> },
      { path: ROUTES.ajutor.slice(1), element: <AjutorPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
