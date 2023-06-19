import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
//导入router对象
import router from './router/index.js'
//导入图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//导入axios 对象
import axios from './axios/index.js'

const app = createApp(App)

//将axios 挂载到Vue全局对象上
app.config.globalProperties.$http=axios;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
//vue对象配置路由
app.use(ElementPlus).use(router).mount('#app')