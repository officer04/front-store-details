import axios from 'axios';
import { BaseURL } from './../const';

const instance = axios.create({
  baseURL: BaseURL,
});

const authInterceptor = (config) => {
  config.headers['auth_token'] = localStorage.getItem('token');
  return config;
};

instance.interceptors.request.use(authInterceptor);

export { instance };
