import axios from 'axios'
import { ElMessageBox,ElMessage } from 'element-plus'
import { getToken,removeToken } from '@/utils/auth'
//导入router对象
import router from '../router/index.js'
// create an axios instance
const api = axios.create({
    baseURL:"http://localhost:8080/",//请求后端的基本地址
    timeout:2000, //请求超时设置
})
//定义拦截器
// 添加请求拦截器
// api.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     // 判断是否存在token,把token添加点请求头中，每次请求携带token传给后端
//     let token=getToken();
//     if (token) {
//         config.headers['token'] = token
//     }
//     return config
// }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });
//
// // 添加响应拦截器
// api.interceptors.response.use(function (response) {
//     // 2xx 范围内的状态码都会触发该函数。
//     const res = response.data;
//     console.log(response);
//     // if the custom code is not 20000, it is judged as an error.
//     if (res.code !== 20000) {
//
//         // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//         if (res.code === 50008 || res.code === 50012 || res.code === 50014||res.code===5000) {
//             // to re-login
//             removeToken('token')
//             ElMessageBox.confirm('你已经登出系统, 你可以取消停留在该页面，或重新登录', '确认登出', {
//                 confirmButtonText: '重新登录',
//                 cancelButtonText: '取消',
//                 type: 'warning'
//             }).then(() => {
//                 router.replace({path:'/login'})
//             })
//         }
//         return response
//     } else {
//         return response
//     }
// }, function (error) {
//     console.log('err' + error) // for debug
//     ElMessage({
//         message: error.message,
//         type: 'error',
//         duration: 5 * 1000
//     })
//     return Promise.reject(error);
// });

export default api
