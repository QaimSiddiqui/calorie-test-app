import format from 'date-fns/format';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useToast } from './../hooks/use-toast';
import { FoodEntriesListResponseType } from 'shared/types/calories';
import { request, RequestMethodType } from 'shared/utils/request';

export const useFoodEntries = (filters?: {
  limit?: number;
  page?: number;
  startDate: Date | null;
  endDate: Date | null;
  isMonthView?: boolean;
  month?: Date | null;
}) => {
  return useQuery<FoodEntriesListResponseType>(
    ['foodEntries', filters],
    () => {
      const { startDate, endDate, limit, page, isMonthView, month } =
        filters || {};
      let queryParams = '';
      if (!isMonthView) {
        queryParams = 'sortBy=date:desc&';
        if (startDate && endDate) {
          queryParams += `startDate=${format(
            startDate,
            'yyyy-MM-dd',
          )}&endDate=${format(endDate, 'yyyy-MM-dd')}`;
        }
        if (limit) {
          queryParams += `&limit=${limit}`;
        }
        if (page) {
          queryParams += `&page=${page}`;
        }
      } else if (month) {
        queryParams = `month=${format(month, 'yyyy-MM-dd')}&isMonthView=true`;
      }
      return request(
        `/food-entries?${queryParams}`,
        RequestMethodType.GET,
        null,
        true,
      );
    },
    { keepPreviousData: true, staleTime: 5000 },
  );
};

export const useDeleteFoodEntry = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return useMutation(
    (id?: string) =>
      request(`/food-entries/${id}`, RequestMethodType.DELETE, undefined, true),
    {
      onError: (err, variables, context) => {
        addToast('Error deleting food entry', { variant: 'error' });
      },
      onSuccess: () => {
        addToast('Food entry deleted');
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries('foodEntries');
      },
    },
  );
};
