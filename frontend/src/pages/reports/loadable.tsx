/**
 * Asynchronously loads the component for Reports
 */

import * as React from 'react';
import Loader from 'shared/ui/components/loader';
import { lazyLoad } from 'shared/utils/loadable';

export const Reports = lazyLoad(
  () => import('./index'),
  (module) => module.Reports,
  {
    fallback: <Loader />,
  },
);
