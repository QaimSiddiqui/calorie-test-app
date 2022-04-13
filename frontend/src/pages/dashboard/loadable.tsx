/**
 * Asynchronously loads the component for Home
 */

import * as React from 'react';
import Loader from 'shared/ui/components/loader';
import { lazyLoad } from 'shared/utils/loadable';

export const Home = lazyLoad(
  () => import('./index'),
  (module) => module.Home,
  {
    fallback: <Loader />,
  },
);
