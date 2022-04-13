/**
 * Asynchronously loads the component for Dashboard
 */

import * as React from 'react';
import Loader from 'shared/ui/components/loader';
import { lazyLoad } from 'shared/utils/loadable';

export const Dashboard = lazyLoad(
  () => import('./index'),
  (module) => module.Dashboard,
  {
    fallback: <Loader />,
  },
);
