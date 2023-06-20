<template>
  <div class="div_body">
    <el-container>
      <el-header class="header">
        <el-menu :default-active="activeIndex" class="el-menu-header" text-color="#fff" mode="horizontal"
          :ellipsis="false" @select="handleSelect">
          <el-menu-item index="0"><img src="src/assets/logo.svg" alt="Logo" style="width: 50px;height: 50px"></el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="1">Processing Center</el-menu-item>
          <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
              <template #title>item four</template>
              <el-menu-item index="2-4-1">item one</el-menu-item>
              <el-menu-item index="2-4-2">item two</el-menu-item>
              <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px" class="aside">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" background-color="#333"
            text-color="#fff" @close="handleClose" router>
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <Menu />
                </el-icon>
                <span>课程管理</span>
              </template>
              <el-menu-item index="1-1">课程列表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <Menu />
                </el-icon>
                <span>班级管理</span>
              </template>
              <el-menu-item index="1-1">班级列表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon>
                  <Menu />
                </el-icon>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/student">用户列表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon>
                  <Menu />
                </el-icon>
                <span>测评管理</span>
              </template>
              <el-menu-item index="1-1">题库列表</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">后台</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>

</script>
<style>
.div_body
{
  display: flex;
  justify-content: flex-start;
}

.header {
  background-color: #333;
  color: #fff;
}

.aside {
  background-color: #333;
  color: #fff;
  height: calc(100vh - 60px);
}

.el-menu-header {
  background-color: #333;
  color: #fff;
  border-bottom: 0px;
}

.flex-grow {
  flex-grow: 1;
}

@media (hover: none) {
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

</style>