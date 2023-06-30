<template>

  <div class="common-layout" style="height: 100vh;overflow: hidden">
    <el-container class="layout-container-demo"  >
      <el-header  style="display: flex;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      margin-bottom: 2px;
      height: 100px;
      padding-left: 2px;padding-right: 2px;
      background-color: #8c2222;
      position: relative;
      color: var(--el-text-color-primary);">
        <el-container>
          <el-aside style="width: 20%;">
            <el-image
                :src="getImageUrl(circleUrl)"
                style="
                  width: 80px;
                  height: 80px;
                  border: 2px solid #dad5d5;
                  margin-top: 10px;
                  border-radius: 45%"
            >
            </el-image>
          </el-aside>
          <el-main>
            <!-- 循环公告 -->
            <el-carousel style="margin-top: 15px" height="20px" interval="4000" indicator-position="none" arrow="never">
              <el-carousel-item v-for="item in noticeList" :key="item.id">
                <div class="notice-item">
                  <span class="notice-title">{{ item.title }}</span>
                  <span class="notice-content">{{ item.content }}</span>
                </div>
              </el-carousel-item>
            </el-carousel>

          </el-main>
          <el-aside style="width: 20%;float:left; display: flex; align-items: center; padding: 0px; overflow: hidden;margin-right: auto">
            <div style="height: 240px;height: 92px;left: auto">
              <img src="../../src/assets/images/title.png" style="width: 100%; height: 100%;">
            </div>

            <div style="margin-left: 10%;margin-top: 5%">
              <el-dropdown>
                <el-icon>
                  <img src="src/assets/Icons/Utilities Sidebar.ico" style="width: 50px; height: 50px;">
                </el-icon>
                <template #dropdown>
                  <el-dropdown-menu class="MyElDropdownMenu">
                    <router-link class="MyRouterLink" to="/login"><el-dropdown-item>注销</el-dropdown-item></router-link>
                    <router-link class="MyRouterLink" to="/MyInfo"><el-dropdown-item>信息</el-dropdown-item></router-link>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </el-aside>


        </el-container>

      </el-header>

      <el-container style="height:90vh">

        <el-aside width="200px" style="color: var(--el-text-color-primary);
        margin: 2px;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">
          <el-scrollbar>
          <el-menu :default-openeds="[]">


            <el-sub-menu index="1"  class="MyElMenutitle" style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">
              <template #title class="MyElMenutitle">
                <el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Firefox.ico"></el-icon >个人中心
              </template>
              <router-link v-if="is_admin" to="/PersonInfo"><el-menu-item index="1-1"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Home.ico"></el-icon>教师信息管理</el-menu-item></router-link>
              <router-link v-if="is_admin" to="/StudentInfo"><el-menu-item index="1-5"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Get Info.ico"></el-icon>学生信息管理</el-menu-item></router-link>
              <router-link to="/ResetPassword"><el-menu-item class="MyElMenuItem" index="1-2"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Computer Blue.ico"></el-icon>修改密码</el-menu-item></router-link>
              <router-link to="/ResetHeadPic"><el-menu-item class="MyElMenuItem" index="1-3"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Pictures.ico"></el-icon>修改头像</el-menu-item></router-link>
              <router-link to="/ResetInfo"><el-menu-item class="MyElMenuItem" index="1-4"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Get Info.ico"></el-icon>信息修改</el-menu-item></router-link>

            </el-sub-menu>

            <el-sub-menu index="2" style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">
              <template #title class="MyElMenutitle">
                <el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Apps.ico"></el-icon>班级中心
              </template>
              <el-menu-item-group>
                <router-link to=""><el-menu-item class="MyElMenuItem" index="2-1"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Developer Folder.ico"></el-icon>所有班级</el-menu-item></router-link>
                <router-link to=""><el-menu-item class="MyElMenuItem" index="2-2"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Public.ico"></el-icon>我的班级</el-menu-item></router-link>
                <router-link to="/MyCourse"><el-menu-item class="MyElMenuItem" index="2-3"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Desktop.ico"></el-icon>我的课程</el-menu-item></router-link>
                <router-link to="/TeacherManagerRequest"><el-menu-item class="MyElMenuItem" index="2-4"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Mail.ico"></el-icon>管理申请</el-menu-item></router-link>
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="3" style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">
              <template #title class="MyElMenutitle">
                <el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Default App.ico"></el-icon>考试测评
              </template>
              <el-menu-item-group>
                <router-link v-if="is_studnet" to="/TestPaperPark"><el-menu-item class="MyElMenuItem" index="3-1"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Home.ico"></el-icon>考试中心</el-menu-item></router-link>
                <router-link v-if="is_admin||is_teacher" to="/CreateTestPaper"><el-menu-item class="MyElMenuItem" index="3-2"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Burn Folder.ico"></el-icon>新增试卷</el-menu-item></router-link>
                <router-link v-if="is_admin||is_teacher" to="/ListTestPaper"><el-menu-item class="MyElMenuItem" index="3-3"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Library Sidebar.ico"></el-icon>查看试卷</el-menu-item></router-link>
                <router-link v-if="is_studnet" to="/IHaveDoTestPaper"><el-menu-item class="MyElMenuItem" index="3-4"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Favorites.ico"></el-icon>我的足迹</el-menu-item></router-link>
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
import { ElImage } from 'element-plus';
import {ElNotification} from "element-plus";
import API from "../axios/request";

export default
{
  data()
  {
    return{
      role:"default",
      is_studnet:false,
      is_admin:false,
      is_teacher:false,
      username:"",
      circleUrl:"",
      // 循环公告的数据
      noticeList: [
        {
          id: 1,
          title: "重要通知：",
          content: "请大家注意安全防范，不要随意点击陌生链接。"
        },
        {
          id: 2,
          title: "温馨提示：",
          content: "请大家及时更新个人信息，以便我们更好地为您服务。"
        },
        {
          id: 3,
          title: "活动公告：",
          content: "本月有幸运抽奖活动，快来参与吧！"
        },
      ]
    }
  },methods:{
    getImageUrl(blob) {
      let url = 'data:' + 'image/png' + ';base64,' + blob;
      return url;
    },
  },mounted()
  {
    let appellation="";
    let url="";
    console.log("this.$cookies.get(\"data\")：",this.$cookies.get("data"))
    this.role=this.$cookies.get("role")
    switch(this.role){
      case "student":
      {
        this.is_studnet=true
        this.username=this.$cookies.get("data").sname
        url="/getStuImage"
        appellation="同学！"
        break
      }
      case "teacher":
      {
        this.is_teacher=true
        this.username=this.$cookies.get("data").tname
        url="/getTeaImage"
        appellation="老师！"
        break
      }
      case "manager":{
        this.is_admin=true
        this.username=this.$cookies.get("data").mname
        url="/getImage"
        break
      }
    }

    API({
      url: url,
      method: 'get',
    }).then((res) => {
      this.circleUrl=res.data.image
    })

    ElNotification({
      title: '欢迎',
      message: "欢迎！"+this.username+appellation,
    })
  },components: {
  },computed: {
    //调用这个计算属性以选择性展示管理员教师与学生

  },

}


</script>


<style scoped>
a{
  text-decoration: none;
  background-color: white;
}

.common-layout {
  /* 添加阴影效果 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.layout-container-demo {
  /* 添加阴影效果 */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.notice-item {
  display: flex;
  align-items: center;
}

.notice-title {
  font-size: 14px;
  font-weight: bold;
  color: white;
}

.notice-content {
  font-size: 14px;
  margin-left: 10px;
  color: white;
}

.MyElMenuItem
{
  background-color:white;
  color: black;
}
.MyElMenuItem:hover
{
 background-color: #f8f8f8;

}
.MyElMenuItem:focus
{
 background-color: #cccccc;

}
.MyElMenutitle
{
  background-color:white;
}
.MyElMenutitle:hover
{
  background-color:#f8f8f8;
  color: #f8f8f8;
}
.MyElMenutitle:focus
{
  background-color:#cccccc;
  color: black;
}
.MyRouterLink
{

}
.MyRouterLink:hover
{

}
.MyRouterLink:focus
{

}
.MyElDropdownMenu:focus
{

}
.MyElDropdownMenu:hover
{

}

</style>







