<template>
  <div class="common-layout">
    <el-container class="layout-container-demo">
      <el-header class="ori_el_header">
        <div style="display: flex">
          <div style="width: 15%">
            <User_pic></User_pic>
          </div>
          <div style="width: 80%">
            头部主体
            <router-link to="/">Go to Home</router-link>
          </div>
          <div class="toolbar" style="width: 5%;margin-top: 45px;padding-left: 50px;">
            <el-dropdown>
              <el-icon style="margin-right: 8px; margin-top: 1px;border: 0px">
                <img src="src/assets/Icons/Utilities Sidebar.ico" style="width: 50px;height: 50px;" />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu >
                  <el-dropdown-item>注销</el-dropdown-item>
                  <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>

      </el-header>
      <el-container >
        <el-aside width="200px" class="ori_el_aside">
          <el-scrollbar>
          <el-menu :default-openeds="['1', '3']">

            <el-sub-menu index="1">
              <template #title>
                <el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Documents.ico"></el-icon>课程中心
              </template>
              <el-menu-item index="1-1"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Home.ico"></el-icon>课程主页</el-menu-item>
              <el-menu-item index="1-2"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Desktop.ico"></el-icon>我的课程</el-menu-item>
              <el-menu-item index="1-3"><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Connect.ico"></el-icon>课程管理</el-menu-item>

            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Apps.ico"></el-icon>个人中心
              </template>
              <el-sub-menu index="2-4">
                <template #title>个人信息</template>
                <el-menu-item index="2-4-1">修改密码</el-menu-item>
                <el-menu-item index="2-4-1">修改头像</el-menu-item>
                <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="2-4">
                <template #title>查看课程</template>
                <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="2-4">
                <template #title>查看课程</template>
                <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>

            <el-sub-menu index="3">
              <template #title>
                <el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Default App.ico"></el-icon>考试管理
              </template>
              <el-menu-item-group>
                <template #title><el-icon><img style="width: 30px;height: 30px" src="src/assets/Icons/Home.ico"></el-icon>测试管理主页</template>
                <el-menu-item index="3-1">Option 1</el-menu-item>
                <el-menu-item index="3-2">Option 2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <template #title>Group 1</template>
                <el-menu-item index="3-1">Option 1</el-menu-item>
                <el-menu-item index="3-2">Option 2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group 2">
                <el-menu-item index="3-3">Option 3</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="3-4">
                <template #title>Option 4</template>
                <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>

          </el-menu>
        </el-scrollbar>
        </el-aside>

        <el-main class="ori_el_main">
          <el-container>
            <el-main>
              <el-scrollbar>
                <el-table :data="tableData">
                  <el-table-column prop="id" label="id" width="50" />
                  <el-table-column prop="name" label="name" width="120" />
                  <el-table-column prop="sex" label="sex" width="50" />
                  <el-table-column prop="age" label="age" width="140" />
                  <el-table-column prop="phone" label="phone" width="120" />
                  <el-table-column prop="address" label="address"   />
                  <el-button>Default</el-button>
                  <el-button type="primary">Primary</el-button>
                  <el-button type="success">Success</el-button>
                  <el-button type="info">Info</el-button>
                  <el-button type="warning">Warning</el-button>
                  <el-button type="danger">Danger</el-button>
                </el-table>
              </el-scrollbar>
            </el-main>

            <el-footer>
              <div class="example-pagination-block">
                <div class="example-demonstration">When you have few pages</div>
                <el-pagination layout="prev, pager, next" :total="50" />
              </div>
            </el-footer>

          </el-container>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import User_pic from "../components/user_pic.vue";
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'


const item = {
  id:1,
  name:"iawwa",
  sex:"male",
  age:"500",
  phone:110,
  address:"mars"
}
const tableData = ref(Array.from({ length: 8 }).fill(item))
</script>


<style scoped>

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
  background-color: #a63021;
  position: relative;
  color: var(--el-text-color-primary);
}
.ori_el_aside
{
  color: var(--el-text-color-primary);
  background-color: #a63021;
}
.ori_el_main
{
  color: var(--el-text-color-primary);
  padding: 0;
}
</style>







