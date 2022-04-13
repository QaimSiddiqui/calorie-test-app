import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useToast } from '../hooks/use-toast';
import { instance } from '../utils/request';
import { refreshAccessToken } from './refresh-token';
import { useTokenContext } from './token.context';

interface Props {
  children: JSX.Element;
}
const WithAxios = ({ children }: Props) => {
  const { saveTokens, tokens } = useTokenContext();
  const navigate = useNavigate();
  const { addToast } = useToast();

  useMemo(() => {
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (
          error.response.status !== 401 ||
          error.config.url.includes('/login')
        ) {
          return Promise.reject(error);
        }
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            if (!tokens?.refresh?.token) {
              saveTokens(null);
              navigate('/login');
              return Promise.reject(error);
            }
            let res = await refreshAccessToken(tokens?.refresh?.token);
            instance.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${res?.data?.access?.token}`;
            saveTokens(res?.data);
            return instance(originalRequest);
          } catch (error) {
            saveTokens(null);
            addToast('Please login again.', { variant: 'error' });
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      },
    );
  }, [addToast, navigate, saveTokens, tokens?.refresh?.token]);

  return children;
};

export default WithAxios;
