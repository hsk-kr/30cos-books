import axios from 'axios';

export const naverApi = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? 'https://openapi.naver.com/' : '',
});

naverApi.interceptors.request.use(
  (config) => {
    if (!config.headers) config.headers = {};

    config.headers['X-Naver-Client-Id'] =
      process.env.REACT_APP_X_Naver_Client_Id || '';
    config.headers['X-Naver-Client-Secret'] =
      process.env.REACT_APP_X_Naver_Client_Secret || '';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
