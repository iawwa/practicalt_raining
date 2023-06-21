import {createRouter,createWebHistory} from 'vue-router'
import MainBody from "@/views/MainBody.vue";
const routes=[
    {
        path:"/",
        component:MainBody
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