import axios from 'axios';
export const refreshAccessToken = async (refreshToken: string) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/refresh-tokens`,
    {
      refreshToken,
    },
  );
  return response;
};
