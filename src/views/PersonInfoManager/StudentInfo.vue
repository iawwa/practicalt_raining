<template>
  <div>
    <!-- 教师管理页面标题 -->
    <h1>学生管理</h1>

    <!-- 学生列表 -->
    <el-table :data="students" style="width: 100%; margin-top: 20px;">
      <el-table-column prop="sid" label="ID" width="150"></el-table-column>
      <el-table-column prop="sname" label="姓名" width="120"></el-table-column>
      <el-table-column prop="sex" label="性别" width="80"></el-table-column>
      <el-table-column prop="age" label="年龄" width="80"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
      <el-table-column prop="phoneNumber" label="电话" width="150"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <div v-if="scope.$index === 0">
            <!-- 编辑教师按钮 -->
            <el-button @click="Visible = true">编辑</el-button>
            <!-- 删除教师按钮 -->
            <el-button type="danger" @click="Visible1= true">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加教师按钮 -->
    <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">添加学生</el-button>

    <!-- 添加学生对话框 -->
    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="30%" :before-close="handleClose">
      <!-- 学生信息表单 -->
      <el-form :model="student" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="student.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="student.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="sname">
          <el-input v-model="student.sname"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="student.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input type="number" v-model.number="student.age"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="student.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phoneNumber">
          <el-input v-model="student.phoneNumber"></el-input>
        </el-form-item>
      </el-form>

      <!-- 对话框底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStudent">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑学生对话框 -->
    <el-dialog :title="dialogTitle" v-model="Visible" width="30%" :before-close="handleClose">
      <!-- 学生信息表单 -->
      <el-form :model="student" :rules="rules" ref="form">
        <el-form-item label="id" prop="sid">
          <el-input v-model="student.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="sname">
          <el-input v-model="student.sname"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="student.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input type="number" v-model.number="student.age"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="student.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phoneNumber">
          <el-input v-model="student.phoneNumber"></el-input>
        </el-form-item>
      </el-form>

      <!-- 对话框底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="Visible = false">取 消</el-button>
        <el-button type="primary" @click="editStudent">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除教师对话框 -->
    <el-dialog :title="dialogTitle" v-model="Visible1" width="30%" :before-close="handleClose">
      <!-- 教师信息表单 -->
      <el-form :model="student" :rules="rules" ref="form">
        <el-form-item label="id" prop="id">
          <el-input v-model="student.id"></el-input>
        </el-form-item>
      </el-form>
      <!-- 对话框底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="Visible1 = false">取 消</el-button>
        <el-button type="primary" @click="deleteStudent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import API from "../../axios/request";
import { reactive, ref } from 'vue'
import {ElButton} from "element-plus";
import {ElDialog} from "element-plus";

export default {
  data() {
    return {
      pageNum: '',
      pageSize: '',
      students: [],
      dialogTitle: '',
      Visible: false,
      Visible1:false,
      dialogVisible: false,
      student: {
        id: '',
        username: '',
        password: '',
        sname:'',
        sex: '',
        age: 0,
        email: '',
        phoneNumber: '',
      },
      rules: {
        id:[
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在1到10个字符', trigger: 'blur'}
        ],
        sname:[
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'},
        ],
        age: [
          {required: true, message: '请输入年龄', trigger: 'blur'},
          {type: 'number', message: '年龄必须为数字值', trigger: 'blur'},
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        phoneNumber: [
          {required: true, message: '请输入电话号码', trigger: 'blur'},
          {pattern: /^1[0-9]{10}$/, message: '请输入正确的手机号码', trigger: 'blur'}
        ],
      },
    };
  },
  component:{
    ElButton,ElDialog
  },
  mounted() {
    API({
      url: "/student/listall",
      method: "get",
      params: {
        pageNum: 1,
        pageSize: 20,
      }
    }).then((res) => {
      this.students = res.data;
      console.log("res.data", res.data)
    })
  },
  methods: {
    addStudent() {
      let msg = "";
      API({
        url: "/student/save",
        method: "post",
        data: JSON.stringify({
          userName: this.student.username,
          password: this.student.password,
          sname: this.student.sname,
          sex: this.student.sex,
          age: this.student.age,
          email: this.student.email,
          phoneNumber: this.student.phoneNumber
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then((res) => {
        console.log("res.data.msg", res.data.msg)
        this.dialogVisible = false;
      })
    },
    editStudent() {
      this.dialogTitle = '编辑学生信息';
      API({
        url:"/student/mod",
        method:"put",
        data: JSON.stringify({
          sid:this.student.id,
          sname: this.student.sname,
          sex: this.student.sex,
          age: this.student.age,
          email: this.student.email,
          phoneNumber: this.student.phoneNumber
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then((res)=>{
        console.log("res.data.msg", res.data.msg)
        this.Visible=false;
      })
    },
    // 删除教师
    deleteStudent(){
      this.Visible1="删除学生";
      API({
        url:"/student/delete",
        method:"delete",
        data: JSON.stringify({
          sid:this.student.id,
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then((res)=>{
        console.log("res.data.msg", res.data.msg)
        this.Visible1=false;
      })
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
  }
}


</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>