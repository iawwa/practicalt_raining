import {createRouter,createWebHistory} from 'vue-router'
import MainBody from "@/views/MainBody.vue";
import VueCookies from "vue-cookies";
const routes=[
    {
        path:"/home",
        component:MainBody,
        children: [
            //这里是用来渲染主页面之下的部分
            // //班级管理
            // {path:"/ClassInfo",component: () => import("@/views/ClassManager/ClassInfo.vue")},
            // {path:"/CreateClass",component: () => import("@/views/ClassManager/CreateClass.vue")},
            // {path:"/ManagerClass",component: () => import("@/views/ClassManager/ManagerClass.vue")},
            //
            // //课程管理部分
            // {path: "/CourseManager",component: () => import("@/views/CourseManager/CourseManager.vue")},
            // {path: "/ListCourse", component: () => import("@/views/CourseManager/ListCourese.vue") },
            // {path: "/MyCourse",component: () => import("@/views/CourseManager/MyCourse.vue") },
            // {path: "/CreateCourse",component: () => import("@/views/CourseManager/CreateCourse.vue")},

            // 个人中心
            {path: '/PersonInfo', component: ()=> import("@/views/PersonInfoManager/PersonInfo.vue") },
            {path: "/ResetPassword", component: () => import("@/views/PersonInfoManager/ResetPassword.vue")},
            {path: "/ResetHeadPic",component: () => import("@/views/PersonInfoManager/ResetHeadPic.vue")},
            {path: "/ResetInfo",component: () => import("@/views/PersonInfoManager/ResetInfo.vue")},
            {path: "/MyInfo",component: () => import("@/views/PersonInfoManager/MyInfo.vue")},


            // 试卷考试管理
            {path: "/TestPaperPark",component: () => import("@/views/TestPaperManager/TestPaperPark.vue")},
            {path: "/CreateTestPaper",component: () => import("@/views/TestPaperManager/CreateTestPaper.vue")},
            {path:"/ListTestPaper",component: () => import("@/views/TestPaperManager/ListTestPaper.vue")},
            {path:"/DoTestPaper",component: () => import("@/views/TestPaperManager/DoTestPaper.vue")},
            {path:"/IHaveDoTestPaper",component: () => import("@/views/TestPaperManager/IHaveDoTestPaper.vue")}

        ],
    },
    {path:"/login", component:()=>import("@/views/LoginView.vue")},
    {path:"/test", component: ()=>import("@/views/TestWeb.vue")},
    // Catch-all route to redirect unknown paths to login
    { path: '/:pathMatch(.*)*', redirect: '/login' },


]
const router=createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let role = VueCookies.get('role');
        if (!role) {
            ElMessageBox.alert('您还未登录，请先登录', '提示', {
                confirmButtonText: '确定'
            });
            if (from.path !== '/login') {
                next('/login');
            } else {
                next();
            }
        } else {
            next();
        }
    }
});

export default router