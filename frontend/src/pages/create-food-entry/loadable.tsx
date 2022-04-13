/**
 * Asynchronously loads the component for CreateFoodEntry
 */

import * as React from 'react';
import Loader from 'shared/ui/components/loader';
import { lazyLoad } from 'shared/utils/loadable';

export const CreateFoodEntry = lazyLoad(
  () => import('./index'),
  (module) => module.CreateFoodEntry,
  {
    fallback: <Loader />,
  },
);
