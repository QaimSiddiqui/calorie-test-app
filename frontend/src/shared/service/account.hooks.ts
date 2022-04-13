import { UserType } from './../types/auth';
import { useQuery } from 'react-query';
import { request, RequestMethodType } from '../utils/request';
import { useTokenContext } from './token.context';

export const useAccount = () => {
  const { decodedToken } = useTokenContext();
  return useQuery<UserType>('user', () =>
    request(`/users/${decodedToken?.sub}`, RequestMethodType.GET, null, true),
  );
};
