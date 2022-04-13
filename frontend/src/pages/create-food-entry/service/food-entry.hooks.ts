import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { request, RequestMethodType } from 'shared/utils/request';
import { useToast } from 'shared/hooks/use-toast';
import { FoodEntryType, UpsertFoodEntryType } from 'shared/types/calories';

export const useUpsertFoodEntry = (id?: string) => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    (foodEntry: UpsertFoodEntryType) =>
      request(
        `/food-entries/${id || ''}`,
        id ? RequestMethodType.PATCH : RequestMethodType.POST,
        foodEntry,
        true,
      ),
    {
      onError: (error: AxiosError) => {
        addToast(`Failed to ${id ? 'update' : 'create'} food entry`, {
          variant: 'error',
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries('foodEntries');
        addToast(`Food entry ${id ? 'updated' : 'created'}`);
        navigate('/');
      },
    },
  );
};

export const useFoodEntry = (id?: string) => {
  return useQuery<FoodEntryType>(
    'foodEntries',
    () => request(`/food-entries/${id}`, RequestMethodType.GET, null, true),
    {
      enabled: !!id,
    },
  );
};
