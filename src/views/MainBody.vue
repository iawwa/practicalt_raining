<template>

  <div class="common-layout" style="height: 100%;overflow: hidden">
    <el-container class="layout-container-demo">
      <el-header  style="display: flex;height: 100px;background-color: #8c2222;position: relative;color: var(--el-text-color-primary);">
        <el-container>
          <el-aside style="width: 30%">
            <User_pic></User_pic>
          </el-aside>
          <el-main style="width: 65%;">
            <el-text style="margin-left: 100px;text-align: center">{{role}}</el-text>
          </el-main>
          <el-aside style="width: 5%;">
            <div class="toolbar" >
              <el-dropdown>
                <el-icon style="margin-right: 8px; margin-top: 1px;border: 0px">
                  <img src="src/assets/Icons/Utilities Sidebar.ico" style="width: 50px;height: 50px;" />
                </el-icon>
                <template #dropdown>
                  <el-dropdown-menu >
                    <router-link  to="/login"><el-dropdown-item>注销</el-dropdown-item></router-link>
                    <router-link  to="/MyInfo"><el-dropdown-item>信息</el-dropdown-item></router-link>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </el-aside>
        </el-container>

      </el-header>

      <el-container >

        <el-aside width="200px" style="color: var(--el-text-color-primary);background-color: #9f3425;">
          <el-scrollbar>
          <el-menu :default-openeds="[]">


            <el-sub-menu index="1">
              <template #title>
                <el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Firefox.ico"></el-icon >个人中心
              </template>
              <router-link to="/PersonInfo"><el-menu-item index="1-1"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Home.ico"></el-icon>用户信息管理</el-menu-item></router-link>
              <router-link to="/ResetPassword"><el-menu-item index="1-2"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Computer Blue.ico"></el-icon>修改密码</el-menu-item></router-link>
              <router-link to="/ResetHeadPic"><el-menu-item index="1-3"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Pictures.ico"></el-icon>修改头像</el-menu-item></router-link>
              <router-link to="/ResetInfo"><el-menu-item index="1-4"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Get Info.ico"></el-icon>信息修改</el-menu-item></router-link>


            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Documents.ico"></el-icon>课程中心
              </template>
              <router-link to="/CreateCourse"><el-menu-item index="2-1"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Preview.ico"></el-icon>创建课程</el-menu-item></router-link>
              <router-link to="/MyCourse"><el-menu-item index="2-2"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Desktop.ico"></el-icon>我的课程</el-menu-item></router-link>
              <router-link to="/CourseManager"><el-menu-item index="2-3"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Connect.ico"></el-icon>课程管理</el-menu-item></router-link>
            </el-sub-menu>


            <el-sub-menu index="3">
              <template #title>
                <el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Default App.ico"></el-icon>考试测评
              </template>
              <el-menu-item-group>
                <router-link to="/Assessment"><el-menu-item index="3-1"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Home.ico"></el-icon>考试中心</el-menu-item></router-link>
                <router-link to="/CreateTestPaper"><el-menu-item index="3-2"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Burn Folder.ico"></el-icon>创建试卷</el-menu-item></router-link>
                <router-link to="/ListTestPaper"><el-menu-item index="3-3"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Library Sidebar.ico"></el-icon>查看试卷</el-menu-item></router-link>
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="4">
              <template #title>
                <el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Apps.ico"></el-icon>班级中心
              </template>
              <el-menu-item-group>
                <router-link to="/CreateClass"><el-menu-item index="4-1"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Developer Folder.ico"></el-icon>创建班级</el-menu-item></router-link>
                <router-link to="/ManagerClass"><el-menu-item index="4-2"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Public.ico"></el-icon>管理班级</el-menu-item></router-link>
                <router-link to="/ClassInfo"><el-menu-item index="4-3"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Get Info.ico"></el-icon>班级信息</el-menu-item></router-link>
              </el-menu-item-group>
            </el-sub-menu>


          </el-menu>
        </el-scrollbar>
        </el-aside>

        <el-main style="  color: var(--el-text-color-primary);padding: 0;">
        <RouterView></RouterView>
        </el-main>

      </el-container>
    </el-container>

  </div>



</template>


<script lang="ts">
import User_pic from "../components/user_pic.vue";

export default
{
  data()
  {
    return{
      role:"default",
    }
  },methods:{
  },mounted()
  {
    this.role=this.$cookies.get("role")
    console.log(this.role)
  }

}


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


</style>







