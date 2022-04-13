import axios from 'axios';
import { ACCESS_TOKEN_KEY } from '../config';

export const instance = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    'https://toptal-calorie-app.herokuapp.com/v1', // for test purposes
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

export enum RequestMethodType {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export async function request(
  url: string,
  method: RequestMethodType = RequestMethodType.GET,
  body?: any,
  withToken: boolean = false,
): Promise<any> {
  const options: {
    method: RequestMethodType;
    headers?: any;
    data: any;
    url: string;
  } = {
    method,
    url,
    data: body,
  };
  if (withToken) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  const fetchResponse = await instance(options);

  return fetchResponse.data;
}
