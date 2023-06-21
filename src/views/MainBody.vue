<template>
  <div class="common-layout">
    <el-container class="layout-container-demo">
      <el-header class="ori_el_header">
        <div style="display: flex">
          <div style="width: 15%;padding-top: 4px" >
            <User_pic></User_pic>
          </div>
          <div style="width: 80%">
            头部主体
          </div>
          <div class="toolbar" style="width: 5%;margin-top: 45px;padding-left: 50px;">
            <el-dropdown>
              <el-icon style="margin-right: 8px; margin-top: 1px;border: 0px">
                <img src="src/assets/Icons/Utilities Sidebar.ico" style="width: 50px;height: 50px;" />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu >
                  <el-dropdown-item><router-link  to="/login">注销</router-link></el-dropdown-item>
                  <el-dropdown-item >退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>

      </el-header>
      <el-container >
        <el-aside width="200px" class="ori_el_aside">
          <el-scrollbar>
          <el-menu :default-openeds="[]">


            <el-sub-menu index="1">
              <template #title>
                <el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Apps.ico"></el-icon >个人中心
              </template>
              <el-menu-item index="1-1"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Home.ico"></el-icon><router-link to="/personinfo">个人主页</router-link></el-menu-item>
              <el-sub-menu index="1-2">
                <template #title>个人信息</template>
                <el-menu-item index="1-2-1"><router-link to="/resetpassword">修改密码</router-link></el-menu-item>
                <el-menu-item index="1-2-2"><router-link to="/resetheadpic">修改头像</router-link></el-menu-item>
                <el-menu-item index="1-2-3">信息修改</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="1-3">
                <template #title>查看课程</template>
                <el-menu-item index="1-3-1"><router-link to="/listcourse">我的课程</router-link></el-menu-item>
              </el-sub-menu>
            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Documents.ico"></el-icon>课程中心
              </template>
              <el-menu-item index="2-1"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Home.ico"></el-icon>课程主页</el-menu-item>
              <el-menu-item index="2-2"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Desktop.ico"></el-icon>我的课程</el-menu-item>
              <el-menu-item index="2-3"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Connect.ico"></el-icon>课程管理</el-menu-item>

            </el-sub-menu>


            <el-sub-menu index="3">
              <template #title>
                <el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Default App.ico"></el-icon>课程测试
              </template>
              <el-menu-item-group>

                <el-menu-item index="3-1"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Home.ico"></el-icon>测试管理主页</el-menu-item>
                <el-menu-item index="3-2">你好</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="4">
              <template #title>
                <el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Default App.ico"></el-icon>班级中心
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Home.ico"></el-icon>班级信息管理</el-menu-item>
                <el-menu-item index="4-2">创建班级</el-menu-item>
                <el-menu-item index="4-2">管理班级</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>


          </el-menu>
        </el-scrollbar>
        </el-aside>

        <el-main class="ori_el_main">
        <RouterView></RouterView>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>


<script lang="ts" setup>
import User_pic from "../components/user_pic.vue";


</script>


<style scoped>
a{
  text-decoration: none;
  background-color: white;
}




.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.ori_el_header
{
  height: 100px;
  background-color: #9f3425;
  position: relative;
  color: var(--el-text-color-primary);
}
.ori_el_aside
{
  color: var(--el-text-color-primary);
  background-color: #9f3425;
}
.ori_el_main
{
  color: var(--el-text-color-primary);
  padding: 0;
}
</style>







