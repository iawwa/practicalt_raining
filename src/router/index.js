import {createRouter,createWebHistory} from 'vue-router'
import HomeView from '@/components/HomeView.vue'
import AboutView from '@/components/AboutView.vue'
import MainHeader from '@/components/MainHeader.vue'
import StudentList from '@/components/StudentList.vue'
/**
 * 定义路由数组
 */
const routes=[
    {
        path:"/",
        name:'home',
        component:HomeView
    },
    {
        path:"/student",
        component:StudentList
    },
    {
        path:"/about",
        name:"about",
        component:AboutView,
        children:[
            {
                path:"a",
                component:MainHeader
            }
        ]
    }
]
const router=createRouter({
    history: createWebHistory(),
    routes
})

export default router
