import {ACCESS_TOKEN_ITEM_KEY} from '@modules/authReducer.ts';
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVER_URL,
  withCredentials: true,
});
instance.defaults.withCredentials = true;
instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_ITEM_KEY);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (! error.response) {
      return Promise.reject(error);
    }
    if (!originalRequest._retry &&
      (error.response.status === 401)) {
      originalRequest._retry = true;
      if (typeof localStorage.getItem(ACCESS_TOKEN_ITEM_KEY) === 'string') {
        try {
          const accessToken = localStorage.getItem(ACCESS_TOKEN_ITEM_KEY);
          if (accessToken) {
            // eslint-disable-next-line max-len
            const response = await axios.post(import.meta.env.VITE_BASE_SERVER_URL + '/refresh', {}, {
              withCredentials: true,
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              },
            });
            localStorage.removeItem(ACCESS_TOKEN_ITEM_KEY);
            localStorage.setItem(ACCESS_TOKEN_ITEM_KEY, response.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return axios(originalRequest);
          }
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);
export default instance;
