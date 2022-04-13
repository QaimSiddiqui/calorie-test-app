import { AxiosError } from 'axios';

const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError).isAxiosError;
};

export const getAxiosError = (error: unknown): string => {
  if (isAxiosError(error)) {
    if (error.response) {
      if (error.response.data?.message) {
        return error.response.data.message;
      }
      return error.response.statusText;
    }
    return error.message;
  }
  return 'Unknown error';
};
