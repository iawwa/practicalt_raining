<template>
  <div>
    <!-- 教师管理页面标题 -->
    <h1>教师管理</h1>

    <!-- 教师列表 -->
    <el-table :data="teachers" style="width: 100%; margin-top: 20px;">
      <el-table-column prop="tid" label="ID" width="150"></el-table-column>
      <el-table-column prop="tname" label="姓名" width="120"></el-table-column>
      <el-table-column prop="sex" label="性别" width="80"></el-table-column>
      <el-table-column prop="age" label="年龄" width="80"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
      <el-table-column prop="phoneNumber" label="电话" width="150"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <!-- 编辑教师按钮 -->
          <el-button @click="editTeacher(scope.row)">编辑</el-button>
          <!-- 删除教师按钮 -->
          <el-button type="danger" @click="deleteTeacher(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加教师按钮 -->
    <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">添加教师</el-button>

    <!-- 添加/编辑教师对话框 -->
    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="30%" :before-close="handleClose">
      <!-- 教师信息表单 -->
      <el-form :model="teacher" :rules="rules" ref="form">
        <el-form-item label="姓名" prop="tname">
          <el-input v-model="teacher.tname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="teacher.password"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="teacher.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input type="number" v-model.number="teacher.age"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="teacher.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phoneNumber">
          <el-input v-model="teacher.phoneNumber"></el-input>
        </el-form-item>
      </el-form>

      <!-- 对话框底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addTeacher">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import API from "../../axios/request";
import {ElButton} from "element-plus";
import {ElDialog} from "element-plus";

export default {
  data() {
    return {
      pageNum: '',
      pageSize: '',
      teachers: [],
      dialogTitle: '',
      dialogVisible: false,
      teacher: {
        id: '',
        tname: '',
        password: '',
        sex: '',
        age: 0,
        email: '',
        phone: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在1到10个字符', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'},
        ],
        age: [
          {required: true, message: '请输入年龄', trigger: 'blur'},
          {type: 'number', message: '年龄必须为数字值', trigger: 'blur'},
          // {min: 18, max: 100, message: '年龄必须在18到100之间', trigger: 'blur'}
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
      url: "/teacher/listallTeacher",
      method: "get",
      params: {
        pageNum: 1,
        pageSize: 10,
      }
    }).then((res) => {
      this.teachers = res.data;
      console.log("res.data", res.data)
    })
  },
  methods: {
    addTeacher() {
      let msg = "";
      API({
        url: "/teacher/saveTeacher",
        method: "post",
        params: {
          userName: this.teacher.tname,
          password: this.teacher.password,
          tname: this.teacher.tname,
          sex: this.teacher.sex,
          age: this.teacher.age,
          email: this.teacher.email,
          phoneNumber: this.teacher.phoneNumber
        }
      }).then((res) => {
        console.log("res.data.msg", res.data.msg)
      })
    },
    editTeacher(row) {
      this.dialogTitle = '编辑教师信息';
      this.dialogVisible = true;
      this.teacher = Object.assign({}, row);
    },
    // 删除教师

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