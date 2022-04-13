import { useQuery } from 'react-query';
import { UsersListResponseType } from 'shared/types/auth';
import { request, RequestMethodType } from 'shared/utils/request';

export const useUsers = (filters?: { limit?: number; page?: number }) => {
  return useQuery<UsersListResponseType>(
    ['users', filters],
    () => {
      const { limit, page } = filters || {};
      let queryParams = '';
      if (limit) {
        queryParams += `&limit=${limit}`;
      }
      if (page) {
        queryParams += `&page=${page}`;
      }
      return request(
        `/users?${queryParams}`,
        RequestMethodType.GET,
        null,
        true,
      );
    },
    { keepPreviousData: true, staleTime: 5000 },
  );
};
