import { useCallback } from 'react';
import { useSnackbar } from 'notistack';

export const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const addToast = useCallback(
    (message, { variant = 'success', ...options } = {}) => {
      return enqueueSnackbar(message, { variant, ...options });
    },
    [enqueueSnackbar],
  );

  return { addToast };
};
