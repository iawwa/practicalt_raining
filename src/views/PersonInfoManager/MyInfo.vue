<template>
  <el-form label-position="top" class="personal-center" :disabled="true">
    <h1 class="title">个人信息</h1>
    <hr>
    <h2 class="subtitle">{{ userRole }} Profile</h2>

    <el-form-item label="Name">
      <el-input v-if="user.tname" v-model="user.tname" :readonly="true"></el-input>
      <el-input v-if="user.mname" v-model="user.mname" :readonly="true"></el-input>
      <el-input v-if="user.sname" v-model="user.sname" :readonly="true"></el-input>
    </el-form-item>

    <el-form-item label="Sex">
      <el-input v-model="user.sex" :readonly="true"></el-input>
    </el-form-item>

    <el-form-item label="Age">
      <el-input v-model="user.age" :readonly="true"></el-input>
    </el-form-item>

    <el-form-item label="Email">
      <el-input v-model="user.email" :readonly="true"></el-input>
    </el-form-item>

    <el-form-item label="Phone Number">
      <el-input v-model="user.phoneNumber" :readonly="true"></el-input>
    </el-form-item>
  </el-form>

</template>
<script>
import axios from 'axios';
import API from "../../axios/request";

export default {
  data() {
    return {
      userRole: '',
      user: {}
    };
  },
  mounted() {
    let url = "";
    let msg = "";
    this.userRole = this.$cookies.get("role")
    switch (this.userRole) {
      case "student":
        url = "/selStuByName"
        break;
      case "teacher":
        url = "/selTeaByName"
        break;
      case "manager":
        url = "/selManByName"
        break;
      default:
        break;
    }
    API({
          url: url,
          method: "get",
          params:{
          }
        }
    ).then((res)=>{
      this.user = res.data;
      console.log("res.data.msg",res.data.msg)
      console.log("res.data",res.data)

    })
  }

};
</script>
<style>
.personal-center {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  font-family: Arial, sans-serif;
  color: #333;
}

.title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 24px;
  margin-top: 20px;
}

.profile-info {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}
</style>