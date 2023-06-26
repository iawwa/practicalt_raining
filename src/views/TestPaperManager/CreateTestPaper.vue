<template>
  <div>
    <h1>Create Question</h1>
    <el-form ref="questionForm" :model="questionData" label-width="120px">

     <UploadPic></UploadPic>

      <el-form-item label="试卷名字">
        <el-input v-model="questionData.ename"></el-input>
      </el-form-item>
      <el-form-item label="试卷描述">
        <el-input v-model="questionData.edescribe"></el-input>
      </el-form-item>
      <el-form-item label="题目列表">
        <el-row v-for="(question, index) in questionData.questions" :key="index" style="width: 1000px">
          <el-col :span="8" style="margin-left: 20px">
            <el-input v-model="question.qdescribe" placeholder="题目描述"></el-input>
          </el-col>
          <el-col :span="4" style="margin-left: 20px">
            <el-input v-model="question.answer" placeholder="答案"></el-input>
          </el-col>
          <el-col :span="1" style="margin-left: 20px">
            分值:
          </el-col>
          <el-col :span="3" >
            <el-input-number v-model="question.point" :min="0" :step="1" placeholder="分值"></el-input-number>
          </el-col>
          <el-col :span="4" style="margin-left: 50px">
            <el-button type="danger" icon="el-icon-delete" @click="removeQuestion(index)">删除</el-button>
          </el-col>
        </el-row>

      </el-form-item>
      <el-button type="primary" @click="addQuestion">添加题目</el-button>
      <el-button type="success" @click="createQuestion">创建题目</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import {ElMessage, ElMessageBox} from 'element-plus'
import API from "../../axios/request";
import UploadPic from "../../components/TestPaperManager/UploadPic.vue";
export default {
  components: {UploadPic},
  computed: {
  },
  data() {
    return {
      questionData: {
        ename: "",
        edescribe: "",
        questions: [
          {
            eid: 0,
            qid: 0,
            qdescribe: "",
            answer: "",
            point: 0
          }
        ],

      },
    };
  },
  methods: {
    addQuestion() {
      this.questionData.questions.push({
        eid: 0,
        qid: 0,
        qdescribe: "",
        answer: "",
        point: 0
      });
    },
    removeQuestion(index) {
      this.questionData.questions.splice(index, 1);
    },
    createQuestion() {
      const url = '/createExamination'; // 后端接口的URL
      const requestData = new FormData();

      requestData.append('ename', this.questionData.ename);
      requestData.append('edescribe', this.questionData.edescribe);
      requestData.append('questions', JSON.stringify(this.questionData.questions));

      API({
        url: url,
        method: 'post',
        data: requestData,
        headers: {
          'Content-Type': 'multipart/form-data' // 设置请求头为 multipart/form-data
        },
        params: {
          multipartFile:this.imageUrl.value,
        }
      }).then(res =>
          ElMessageBox.alert(res.data.msg, '提示', {
        confirmButtonText: '确认',}))
      console.log(this.questionData);
    }
  }

};
</script>

<style>


</style>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>