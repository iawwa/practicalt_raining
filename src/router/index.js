import {createRouter,createWebHistory} from 'vue-router'
import MainBody from "@/views/MainBody.vue";
const routes=[
    {
        path:"/",
        component:MainBody
    }
]
const router=createRouter({
    history: createWebHistory(),
    routes
})
export default router