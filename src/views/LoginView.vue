<template>
  <div class="container">
    <div class="left">
      <div class="logo">
        <img src="src/assets/images/123.png"/>
      </div>
      <div class="icon">
        <img src="src/assets/images/123.png"/>
      </div>
    </div>
    <div class="right">
      <div class="left-line">
        <img  src="src/assets/images/123.png"/>
      </div>
      <div id="rollBox" :class = "{'box_Rolling': isRolling}" >
        <div class="login box">
          <h3>欢迎登录</h3>
          <div class="box-form">
            <el-form>
              <el-form-item >
                <el-input v-model="userName"  placeholder="请输入用户名" />
              </el-form-item>
              <el-form-item >
                <el-input v-model="password" type="password" placeholder="请输入密码" />
              </el-form-item>
              <el-form-item >
                <el-select v-model="selectedRole" placeholder="请选择用户身份">
                  <el-option label="学生" value="student"></el-option>
                  <el-option label="老师" value="teacher"></el-option>
                  <el-option label="管理员" value="manager"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item >
                <el-button type="danger" @click="login" round block>登录</el-button>
              </el-form-item>
            </el-form>
            <el-button link="text" @click="changeRolling" class="form-link">还未注册?去注册</el-button>
          </div>
        </div>
        <div class="register box">
          <h3>欢迎注册</h3>
          <div class="box-form">
            <el-form>
              <el-form-item >
                <el-input v-model="userName"  placeholder="请输入用户名" />
              </el-form-item>
              <el-form-item >
                <el-input v-model="password" type="password" placeholder="请输入密码" />
              </el-form-item>
              <el-form-item >
                <el-select v-model="selectedRole" placeholder="请选择用户身份">
                  <el-option label="学生" value="student"></el-option>
                  <el-option label="老师" value="teacher"></el-option>
                  <el-option label="管理员" value="manager"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item >
                <el-button type="danger" @click="register" round block>注册</el-button>
              </el-form-item>
            </el-form>
            <el-button link="text" @click="changeRolling" class="form-link">返回登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../axios/request"
import {ElMessageBox} from "element-plus";

export default {
  props: {
    options: {
      type: Array,
      required: true,
      default: () => [
        {label: "学生", value: "student"},
        {label: "老师", value: "teacher"},
        {label: "管理员", value: "manager"}
      ]
    }
  },
  data() {
    return {
      userName: '',
      password: '',
      selectedRole: '',
      isRolling: false,
    }
  },
  methods: {
    login() {
      let url="";
      let msg="";
      switch (this.selectedRole) {
        case "student":
          url="/Stu"
          break;
        case "teacher":
          url="/Teacher"
          break;
        case "manager":
          url="/Manager"
          break;
        default:
          break;
      }
      console.log(this.userName, this.password, this.selectedRole)
      API({
        url: url,
        method: "post",
        params: {
          userName:this.userName,
          pwd:this.password,
          role:this.selectedRole,
        }
      }).then((res) => {
        if(res.data.msg === "success")
        {
          //data::
          // age:19
          // cid:0
          // cname:null
          // email:"8890@qq.com"
          // password:null
          // phoneNumber:"17798907812"
          // sex:"男"
          // sid:10010001
          // sname:"张三"
          // userName:"s0001

          console.log("res.data",res.data)
          this.$cookies.set("data",res.data.data);
          this.$cookies.set("role",res.data.role);
          this.$router.push({ path: '/home'});

        }

      })
    },
    register() {

    },
    changeRolling() {
      this.isRolling = !this.isRolling
    }
  },mounted() {
    this.$cookies.remove();
  }
}

</script>

<style scoped>
#rollBox {
  border: 0px;
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