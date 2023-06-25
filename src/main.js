// import './assets/main.css'
//
// import { createApp } from 'vue'
// import App from './App.vue'
// //导入图标库

// //
// // createApp(App).mount('#app')

import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
//导入router对象
import  router from "./router/index.js"
//导入图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueCookies from "vue-cookies";



//import axsio
import axios from "./axios/request.js"
         //将这个vue3app全局挂载到#app元素上

const app = createApp(App)
app.config.globalProperties.$axios=axios;  //配置axios的全局引用

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
//vue对象配置路由
app.use(router).use(VueCookies).use(ElementPlus).mount('#app')

