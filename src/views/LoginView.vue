<template>
  <div class="container">
    <div class="left">
      <div class="logo">
        <img src="https://365.issedu365.com/ouselres/course/static/img/logo.svg"/>
      </div>
      <div class="icon">
        <img src="https://365.issedu365.com/ouselres/course/static/img/inset.png"/>
      </div>
    </div>
    <div class="right">
      <div class="left-line">
        <img  src="https://365.issedu365.com/ouselres/course/static/img/xzjh.png"/>
      </div>
      <div id="rollBox" :class = "{'box_Rolling': isRolling}" >
        <div class="login box">
          <h3>欢迎登录</h3>
          <div class="box-form">
            <el-form >
              <el-form-item >
                <el-input v-model="username"  placeholder="请输入姓名" />
              </el-form-item>
              <el-form-item >
                <el-input v-model="password" type="password" placeholder="请输入密码" />
              </el-form-item>

              <el-form-item >
                <el-button type="danger" @click="login" round block>登录</el-button>
              </el-form-item>
            </el-form>
            <el-button link type="danger" @click= "changeRolling" class="form-link">还未注册?去注册</el-button>
          </div>
        </div>
        <div class="register box">
          <h3>欢迎注册</h3>
          <div class="box-form">
            <el-form >
              <el-form-item >
                <el-input v-model="username"  placeholder="请输入姓名" />
              </el-form-item>
              <el-form-item >
                <el-input v-model="password" type="password" placeholder="请输入密码" />
              </el-form-item>
              <el-form-item >
                <el-input v-model="repassword" type="password" placeholder="请输入确认密码" />
              </el-form-item>
              <el-form-item >
                <el-button type="danger" @click="register" round block>注册</el-button>
              </el-form-item>
            </el-form>
            <el-button link type="danger" @click= "changeRolling" class="form-link">返回登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const repassword = ref('')
const isRolling = ref(false)

function login() {
  console.log('登录', username.value, password.value)
  // 在这里可以根据用户名和密码进行登录操作
}

function register() {
  console.log('注册', username.value, password.value, repassword.value)
  // 在这里可以根据用户名和密码进行注册操作
}

let changeRolling=()=>{
  isRolling.value=isRolling.value==true?false:true;
}
</script>

<style scoped>
#rollBox {
  border: 2px solid red;
}
.container {
  background: #f4f5f7;
}
.left{
  background-color: rgba(84, 136, 246, .1);
  width:55%;
  height:100vh;
  float: left;
  padding-left:8%;
}
.logo{
  margin-top: 15px;
  margin-bottom: 30px;
}
.icon img{
  width:95%;
}
.right{
  width:45%;
  height:100%;
  float: left;
  margin-top:50px;
  padding-left:100px;
}
.left-line{
  position: absolute;
  left:48%;
  z-index:2;
  top:0;
}
.left-line img{
  height:100vh;
  width: 100%;
}
.box{
  z-index:999;
  position: relative;
  width:360px;
}
.box h3{
  text-align: center;
  font-size: 24px;
  margin:20px 0;
}
.box-form{
  padding:50px 15px 200px 15px;
  box-shadow: 4px 4px 20px  #ccc;
  border-radius: 12px;
}
#rollBox {
  width: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  backface-visibility: hidden ;
  transform-style: preserve-3d;
  transition-duration: 0.5s;
  transition-timing-function: ease-in;
  width: 360px;
}
.register{
  transform: rotateY(180deg);
  visibility: hidden;
  position: absolute;
}
.box_Rolling {
  .login {
    transform: rotateY(180deg);
    visibility: hidden;
  }
  .register {
    transform: rotateY(360deg) !important;
    visibility: visible !important;
  }
}
.el-form-item {
  margin-bottom: 20px;
}
.el-input {
  height: 40px;
}
.el-button {
  width: 100%;
  height:40px;
}
.form-link{
  text-align: right;
  display: inline;
}
</style>