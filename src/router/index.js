import {createRouter,createWebHistory} from 'vue-router'
import MainBody from "@/views/MainBody.vue";
const routes=[
    {
        path:"/home",
        component:MainBody,
        children: [
            //这里是用来渲染主页面之下的部分
            {path: '/PersonInfo', component: ()=> import("@/views/PersonInfoManager/PersonInfo.vue") },
            {path: "/ListCourse", component: () => import("@/views/CourseManager/ListCourese.vue") },
            {path: "/ResetPassword", component: () => import("@/views/PersonInfoManager/ResetPassword.vue")},
            {path: "/ResetHeadPic",component: () => import("@/views/PersonInfoManager/ResetHeadPic.vue")},
            {path: "/ResetInfo",component: () => import("@/views/PersonInfoManager/ResetInfo.vue")},
            {path: "/CreateCourse",component: () => import("@/views/CourseManager/CreateCourse.vue")},
            {path: "/MyCourse",component: () => import("@/views/CourseManager/MyCourse.vue")},
            {path: "/CourseManager",component: () => import("@/views/CourseManager/CourseManager.vue")},
            {path: "/Assessment",component: () => import("@/views/TestPaperManager/Assessment.vue")},
            {path: "/CreateTestPaper",component: () => import("@/views/TestPaperManager/CreateTestPaper.vue")},
            {path:"/ClassInfo",component: () => import("@/views/ClassManager/ClassInfo.vue")},
            {path:"/CreateClass",component: () => import("@/views/ClassManager/CreateClass.vue")},
            {path:"/ManagerClass",component: () => import("@/views/ClassManager/ManagerClass.vue")},
            {path:"/ListTestPaper",component: () => import("@/views/TestPaperManager/ListTestPaper.vue")},
        ],
    },
    {
        path:"/login",
        component:()=>import("@/views/LoginView.vue")
    },
    {
        path:"/test",
        component: ()=>import("@/views/TestWeb.vue")
    }
]
const router=createRouter({
    history: createWebHistory(),
    routes
})
export default router