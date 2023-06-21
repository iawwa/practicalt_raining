import {createRouter,createWebHistory} from 'vue-router'
import MainBody from "@/views/MainBody.vue";
import personinfo from "@/views/personinfo.vue";
const routes=[
    {
        path:"/",
        component:MainBody,
        children: [
            //这里是用来渲染主页面之下的部分
            { path: '/personinfo', component: personinfo },

        ],
    },
    {
        path:"/login",
        component:()=>import("@/views/LoginView.vue")
    }
]
const router=createRouter({
    history: createWebHistory(),
    routes
})
export default router