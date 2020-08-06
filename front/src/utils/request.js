import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response.data || {};
  },
  error => {
    // 对响应错误做点什么
    if (error && error.response && error.response.status) {
      switch (error.response.status) {
        case 500:
          // do something...
          console.log(error.response.message);
          console.log(error.response);
          break;
        case 404:
          // do something...
          break;
        default:
          // do something...
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
