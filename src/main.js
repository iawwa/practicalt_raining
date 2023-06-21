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

const app = createApp(App)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
//vue对象配置路由
app.use(router).use(ElementPlus).mount('#app')

