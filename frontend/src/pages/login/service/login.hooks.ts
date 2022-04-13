import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useTokenContext } from 'shared/service/token.context';
import { AuthState } from 'shared/types/auth';
import { request, RequestMethodType } from 'shared/utils/request';

export const useLogin = () => {
  const { saveTokens } = useTokenContext();
  const navigate = useNavigate();
  return useMutation(
    (credentials: { email: string; password: string }) =>
      request('/auth/login', RequestMethodType.POST, credentials),
    {
      onError: () => {
        saveTokens(null);
      },
      onSuccess: (data: AuthState) => {
        saveTokens(data?.tokens);
        navigate('/');
      },
    },
  );
};
