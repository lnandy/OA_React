import axios from 'axios';

const axiosInstance = axios.create({
  //baseURL: 'https://api.example.com', // 替换为你的 API 基础 URL
  //baseURL: 'http://1.94.194.171:8080', // 替换为你的 API 基础 URL
  baseURL: `${process.env.PUBLIC_URL}/mock`,
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 例如添加 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.url = `${config.url}.json`;
    //http://localhost:3000/mock
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    // 对响应数据做些什么
    return response;
  },
  error => {
    // 对响应错误做些什么
    return Promise.reject(error);
  }
);

export default axiosInstance;
