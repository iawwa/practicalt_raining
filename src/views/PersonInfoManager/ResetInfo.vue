<template>
  <div class="user-form">
    <h1 class="user-form__title">修改 {{ userRole }} 信息</h1>
    <div v-if="uploadSuccess" class="success-message">上传成功！</div>
    <div class="user-form__form-group">
      <label for="user-name" class="user-form__label">Name:</label>
      <input type="text" v-model="formData.name" id="user-name" name="user-name" class="user-form__input" required>
    </div>
    <div class="user-form__form-group">
      <label for="user-sex" class="user-form__label">Sex:</label>
      <input type="text" v-model="formData.sex" id="user-sex" name="user-sex" class="user-form__input" required>
    </div>
    <div class="user-form__form-group">
      <label for="user-age" class="user-form__label">Age:</label>
      <input type="number" v-model="formData.age" id="user-age" name="user-age" class="user-form__input" required>
    </div>
    <div class="user-form__form-group">
      <label for="user-email" class="user-form__label">Email:</label>
      <input type="email" v-model="formData.email" id="user-email" name="user-email" class="user-form__input" required>
    </div>
    <div class="user-form__form-group">
      <label for="user-phone" class="user-form__label">Phone Number:</label>
      <input type="text" v-model="formData.phoneNumber" id="user-phone" name="user-phone" class="user-form__input" required>
    </div>
    <button type="submit" @click="updateUser">Update</button>
  </div>
</template>

<script>
import axios from 'axios';
import API from "../../axios/request";

export default {
  data() {
    // 初始化数据
    return {
      formData: {
        name: '',
        sex: '',
        age: '',
        email: '',
        phoneNumber: ''
      },
      user: null,
      userRole: '',
      uploadSuccess: false
    };
  },
  methods: {
    // 提交表单
    updateUser() {
      let url = '';
      let msg = '';
      this.userRole = this.$cookies.get("role")
      switch (this.userRole) {
        case "student":
          url = "/updateStu"
          API({
            url:url,
            method:"post",
            params:{
              sname:this.formData.name,
              sex:this.formData.sex,
              age:this.formData.age,
              email:this.formData.email,
              phoneNumber: this.formData.phoneNumber
            }
          }).then((res)=>{
            console.log("sname",this.sname)
            console.log("res.data.msg",res.data.msg)
            console.log("res.data",res.data)
            this.uploadSuccess = true; // set uploadSuccess to true after successful API call
          })
          break;
        case "teacher":
          url = "/updateTea"
          API({
            url:url,
            method:"post",
            params:{
              tname:this.formData.name,
              sex:this.formData.sex,
              age:this.formData.age,
              email:this.formData.email,
              phoneNumber: this.formData.phoneNumber
            }
          }).then((res)=>{
            console.log("tname",this.tname)
            console.log("res.data.msg",res.data.msg)
            console.log("res.data",res.data)
            this.uploadSuccess = true; // set uploadSuccess to true after successful API call
          })
          break;
        case "manager":
          url = "/updateMan"
          API({
            url:url,
            method:"post",
            params:{
              mname:this.formData.name,
              sex:this.formData.sex,
              age:this.formData.age,
              email:this.formData.email,
              phoneNumber: this.formData.phoneNumber
            }
          }).then((res)=>{
            console.log("res.data.msg",res.data.msg)
            console.log("res.data",res.data)
            this.uploadSuccess = true; // set uploadSuccess to true after successful API call
          })
          break;
        default:
          break;
      }
      API({
        url:url,
        method:"get",
        params:{
          name:this.formData.name,
          sex:this.formData.sex,
          age:this.formData.age,
          email:this.formData.email,
          phoneNumber: this.formData.phoneNumber
        }
      }).then((res)=>{
        console.log("mname",this.mname)
        console.log("res.data.msg",res.data.msg)
        console.log("res.data",res.data)
      })
    }
  }
}

</script>

<style scoped>
.user-form {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.user-form__title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.user-form__form-group {
  margin-bottom: 20px;
}

.user-form__label {
  display: block;
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.user-form__input {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.user-form__submit-btn {
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.user-form__divider {
  margin-top: 40px;
  margin-bottom: 20px;
  border: none;
  border-top: 1px solid #ccc;
}

.user-form__subtitle {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.user-form__info-item {
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
}

@media (max-width: 768px) {
  .user-form {
    padding: 20px;
  }
}

.success-message {
  margin-top: 20px;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: green;
  border-radius: 5px;
}
</style>