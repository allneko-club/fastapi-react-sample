import Axios from 'axios';
import {getLocalToken} from 'lib/storage'
import {apiUrl} from 'config'

function authRequestInterceptor(config) {
  const token = getLocalToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: apiUrl,
})

axios.interceptors.request.use(authRequestInterceptor);
