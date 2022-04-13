/**
 * Asynchronously loads the component for Register
 */

import * as React from 'react';
import Loader from 'shared/ui/components/loader';
import { lazyLoad } from 'shared/utils/loadable';

export const Register = lazyLoad(
  () => import('./index'),
  (module) => module.Register,
  {
    fallback: <Loader />,
  },
);
