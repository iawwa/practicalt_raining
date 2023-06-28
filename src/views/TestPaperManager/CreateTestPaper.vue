<template>

  <div style="border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  padding-left: 20%;
  width: auto;
  height: 650px;">
    <h1 style="font-size: 24px;margin-bottom: 20px;">Create Question</h1>

    <el-form style="width: 900px;display: flex;height: 150px" >
      <el-upload
          style="width: 200px"
          class="upload-demo" action="#" :auto-upload="false" :on-preview="handlePreview"
                 :on-remove="handleRemove" :file-list="fileList" :on-change="onchange" list-type="picture">
        <el-button v-if="!isPiced" size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-form-item label="默认图片" style="width: auto">
        <el-radio-group v-model="selectedDefaultImage" style="margin-top: 5px">
          <el-radio :label="0">
            <img :src="defaultImages[0]" style="width: 80px;height: 80px" alt="Default Image 1">
          </el-radio>
          <el-radio :label="1">
            <img :src="defaultImages[1]" style="width: 80px;height: 80px" alt="Default Image 2" >
          </el-radio>
          <el-radio :label="2">
            <img :src="defaultImages[2]" style="width: 80px;height: 80px" alt="Default Image 3">
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>


    <table>
      <tr style="width: 500px">
        <td>试卷名字:</td>
        <td><el-input input-style="width: 200px" v-model="questionData.ename"></el-input>
          <el-button style="margin-left: 40px" type="primary" @click="addQuestion">添加题目</el-button>
          <el-button style="margin-left: 80px" type="success" @click="createQuestion">创建题目</el-button></td>

      </tr>
      <tr>
        <td>试卷描述:</td>
        <td><el-input type="textarea" :rows="3" input-style="width: 500px" v-model="questionData.edescribe"></el-input></td>
      </tr>
      <tr>
        <td>题目列表:</td>
        <td>
          <table>
            <tr v-for="(question, index) in questionData.questions" :key="index">
              <td>
                <el-input v-model="question.qdescribe" placeholder="题目描述"></el-input>
              </td>
              <td>
                <el-input v-model="question.answer" placeholder="答案"></el-input>
              </td>
              <td>分值:</td>
              <td>
                <el-input-number v-model="question.point" :min="0" :step="1" placeholder="分值"></el-input-number>
              </td>
              <td>
                <el-button type="danger" icon="el-icon-delete" @click="removeQuestion(index)">删除</el-button>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

  </div>

</template>

<script lang="ts">
import {ElMessage, ElMessageBox, ElNotification} from 'element-plus'
import API from "../../axios/request";

import {Plus} from "@element-plus/icons-vue";
import defaultImage1 from '@/assets/images/TestPaperPic/1.png';
import defaultImage2 from '@/assets/images/TestPaperPic/2.png';
import defaultImage3 from '@/assets/images/TestPaperPic/3.png';



export default {
  components: {Plus},
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
            point: 0,
          }
        ],
      },
      //用来接收缓存中的图片
      fileList: [],
      isPiced: false,
      defaultImages: [defaultImage1, defaultImage2, defaultImage3],
      selectedDefaultImage: 0
    };
  },
  methods: {
    handleRemove(file, fileList) { //文件列表移除文件时的钩子
      this.fileList = fileList;//每一个改变都会将el-upload里面的图片传递的参数复制到this.filelist去
      if (this.fileList.length > 0) {
        this.isPiced = true;
      }
      else {
        this.isPiced = false;
      }
    },
    handlePreview(file) { //点击文件列表中已上传的文件时的钩子
      // console.log(file);
    },
    onchange(file, fileList) {
      this.fileList = fileList;//每一个改变都会将el-upload里面的图片传递的参数复制到this.filelist去
      if (this.fileList.length > 0) {
        this.isPiced = true;
      }
      else {
        this.isPiced = false;
      }
    },
    addQuestion() {
      this.questionData.questions.push({
        eid: 0,
        qid: 0,
        qdescribe: "",
        answer: "",
        point: 0
      });
      ElNotification({
        title: 'Add',
        message: "添加一列",
      })
      console.log("selectedDefaultImage", this.selectedDefaultImage);
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
      requestData.append("defaultImageIndex", this.selectedDefaultImage);
      if (this.fileList.length > 0) {
        requestData.append('multipartFile', this.fileList[0].raw);
      }
      API({
        url: url,
        method: 'post',
        data: requestData,
        headers: {
          'Content-Type': 'multipart/form-data' // 设置请求头为 multipart/form-data
        },
      }).then(res =>
          ElMessageBox.alert(res.data.msg, '提示', {
        confirmButtonText: '确认',}))
      console.log(this.questionData);
    }
  }

};
</script>

<style scoped>


</style>

