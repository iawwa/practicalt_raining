//导入axios
import axios from 'axios'


//创建axios实例对象

const api=axios.create({
    baseURL:"http://localhost:9000/",//请求后端的基本地址
    timeout:2000, //请求超时设置
})

//定义拦截器
// 添加请求拦截器
api.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
api.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default api;