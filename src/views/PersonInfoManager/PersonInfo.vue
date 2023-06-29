<template>
  <div class="personal-center">
    <h1 class="title">个人信息</h1>
    <hr>
    <h2 class="subtitle">{{ userRole }} Profile</h2>
    <div class="profile-info">
      <p><strong>Name:</strong> {{ user.sname }}{{user.tname}}{{user.mname}}</p>
      <p><strong>Sex:</strong> {{ user.sex }}</p>
      <p><strong>Age:</strong> {{ user.age }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Phone Number:</strong> {{user.phoneNumber }}</p>
    </div>
  </div>
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
  background-color: #f5f5f5;
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