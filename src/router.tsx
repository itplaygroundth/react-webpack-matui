import { ComponentType, Suspense, lazy }  from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from './layouts/SiderbarLayout';
// import BaseLayout from './layouts/BaseLayout';
import BaseLayout from './layouts/BaseLayout';
import SuspenseLoader from './components/SuspenseLoader';
import { PropTypes } from '@mui/material';
import React from 'react';

 

const Loader = (Component:ComponentType) => (props:any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  )

  const Overview = Loader(lazy(() => import('@src/content/overview')));
  // Dashboards

const Crypto = Loader(lazy(() => import('@src/content/dashboards/Crypto')));
const Admin = Loader(lazy(() => import('@src/content/dashboards/Admin')));
  const Status404 = Loader(
    lazy(() => import('@src/content/pages/Status/Status404'))
  );
  const routes: RouteObject[]=[
    {
      path: '',
      element: <BaseLayout />,
      children: [
        {
          path: '/',
          element: <Overview />
        },
        {
          path: 'overview',
          element: <Navigate to="/" replace />
        },
        {
          path: 'status',
          children: [
            {
              path: '',
              element: <Navigate to="404" replace />
            },
            {
              path: '404',
              element: <Status404 />
            },
            // {
            //   path: '500',
            //   element: <Status500 />
            // },
            // {
            //   path: 'maintenance',
            //   element: <StatusMaintenance />
            // },
            // {
            //   path: 'coming-soon',
            //   element: <StatusComingSoon />
            // }
          ]
        },
        {
          path: '*',
          element: <Status404 />
        }
      ]
    },
    {
      path: 'dashboards',
      element: <SidebarLayout />,
      children: [
        {
          path: '',
          element: <Navigate to="admin" replace />
        },
        {
          path: 'crypto',
          element: <Crypto />
        },
        {
          path: 'admin',
          element: <Admin />
        },
        // {
        //   path: 'messenger',
        //   element: <Messenger />
        // }
      ]
    },

  ]
  export default routes;