<template>
  <div class="update-password">
    <h2 class="update-password__title">修改密码</h2>
    <form @submit.prevent="updatePassword" class="update-password__form">
      <div class="update-password__form-group">
        <label for="password" class="update-password__label">New Password:</label>
        <input type="password" v-model="password" id="password" name="password" class="update-password__input" required>
      </div>
      <el-button style="background-color: #8c2222;color: white;border: 0px" @click="sumbit">Submit</el-button>
    </form>
  </div>
</template>

<script>
import API from "../../axios/request";

export default {
  data() {
    return {
      password: ''
    };
  },
  methods: {
    sumbit() {
      let url = "";
      let msg = "";
      this.userRole = this.$cookies.get("role")
      switch (this.userRole) {
        case "student":
          url = "/updatePwd"
          break;
        case "teacher":
          url = "/updateTeaPwd"
          break;
        case "manager":
          url = "/updateManPwd"
          break;
        default:
          break;
      }
      API({
        url: url,
        method: "post",
        params: {
          password: this.password
        }

      }).then((res) => {
        console.log("res.data.msg", res.data.msg)
        this.$router.push({path: '/login'});
      })
    }
  }
};
</script>

<style scoped>
.update-password {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.update-password__title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.update-password__form-group {
  margin-bottom: 20px;
}

.update-password__label {
  display: block;
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.update-password__input {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.update-password__submit-btn {
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

@media (max-width: 768px) {
  .update-password {
    padding: 20px;
  }
}
</style>