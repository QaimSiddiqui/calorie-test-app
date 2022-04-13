/**
 * Asynchronously loads the component for Login
 */

import * as React from 'react';
import Loader from 'shared/ui/components/loader';
import { lazyLoad } from 'shared/utils/loadable';

export const Login = lazyLoad(
  () => import('./index'),
  (module) => module.Login,
  {
    fallback: <Loader />,
  },
);
