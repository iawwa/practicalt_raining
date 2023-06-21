import {createRouter,createWebHistory} from 'vue-router'
import MainBody from "@/views/MainBody.vue";
import personinfo from "@/views/personinfo.vue";
const routes=[
    {
        path:"/",
        component:MainBody,
        children: [
            //这里是用来渲染主页面之下的部分
            { path: '/PersonInfo', component: personinfo },
            {path: "/ListCourse", component: () => import("@/views/ListCourese.vue") },
            {path: "/ResetPassword", component: () => import("@/views/ResetPassword.vue")},
            {path: "/ResetHeadPic",component: () => import("@/views/ResetHeadPic.vue")},
            {path: "/ResetInfo",component: () => import("@/views/ResetInfo.vue")},
            {path: "/CreateCourse",component: () => import("@/views/CreateCourse.vue")},
            {path: "/MyCourse",component: () => import("@/views/MyCourse.vue")},
            {path: "/CourseManager",component: () => import("@/views/CourseManager.vue")},
            {path: "/Assessment",component: () => import("@/views/Assessment.vue")},
            {path: "/CreateTestPaper",component: () => import("@/views/CreateTestPaper.vue")},
            {path:"/ClassInfo",component: () => import("@/views/ClassInfo.vue")},
            {path:"/CreateClass",component: () => import("@/views/CreateClass.vue")},
            {path:"/ManagerClass",component: () => import("@/views/ManagerClass.vue")},
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