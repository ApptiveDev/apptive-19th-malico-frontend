import axios from 'axios';
import {ACCESS_TOKEN_ITEM_KEY} from '@modules/authReducer.ts';

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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(import.meta.env.VITE_BASE_SERVER_URL, '/refresh');
        localStorage.setItem(ACCESS_TOKEN_ITEM_KEY, response.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
export default instance;
