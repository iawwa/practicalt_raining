import axios from 'axios'



// const token = this.$cookies.get('token')
//创建axios实例对象
//使用axios下面的create([config])方法创建axios实例，其中config参数为axios最基本的配置信息。
const API = axios.create({
    baseURL:'http://localhost:8080', //请求后端数据的基本地址，自定义
    timeout: 2000                   //请求超时设置，单位ms
})

// API.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     // 判断是否存在token,把token添加点请求头中，每次请求携带token传给后端
//     console.log(token);
//     if (token) {
//         config.headers['token'] = token
//     }
//     return config
// }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });
//
//
// API.interceptors.response.use(function (response) {
//     // 2xx 范围内的状态码都会触发该函数。
//     const res = response.data
//     // if the custom code is not 20000, it is judged as an error.
//     if (res.code !== 20000) {
//
//         // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//         if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//             // to re-login
//             Cookies.remove('token')
//             MessageBox.confirm('你已经登出系统, 你可以取消停留在该页面，或重新登录', '确认登出', {
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
//     Message({
//         message: error.message,
//         type: 'error',
//         duration: 5 * 1000
//     })
//     return Promise.reject(error);
// });
//导出我们建立的axios实例模块，ES6 export用法
export default API
