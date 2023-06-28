<template>
  <el-container style="width: 100%">
    <el-header>
      <el-steps :active="current_Page" align-center style="margin-top: 10px;padding-top: 0px;margin-bottom: 0px;">
        <el-step @click.native="current_Page=0" :icon="ChatSquare" style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);cursor: pointer;" title="Step 1" description="试卷信息" />
        <el-step @click.native="current_Page=1" :icon="Picture" style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);cursor: pointer" title="Step 2" description="试卷封面" />
        <el-step @click.native="current_Page=2" :icon="Edit" style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);cursor: pointer" title="Step 3" description="题目信息" />
        <el-step @click.native="current_Page=3" :icon="Upload" style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);cursor: pointer" title="Step 4" description="检查提交" />
      </el-steps>
    </el-header>

    <el-main style="margin-top: 30px;height:auto">
      <div v-if="current_Page === 0" style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
        <div style="float: left">
          <el-text>试卷名称:</el-text>
          <el-input input-style="width: 100px" v-model="questionData.ename"></el-input>
        </div>
        <div>
          <el-text>试卷描述:
          </el-text>
          <el-input type="textarea" :rows="3" input-style="width: 500px" v-model="questionData.edescribe"></el-input>
        </div>
      </div>


      <div v-if="current_Page==1">
        <el-form style="width: 900px; display: flex; height: 150px;">
          <el-upload
              style="width: 200px"
              class="upload-demo"
              :auto-upload="false"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :on-change="onchange"
              list-type="picture"
          >
            <el-button v-if="!isPiced" size="small" type="primary">点击上传</el-button>
          </el-upload>

          <el-form-item label="默认图片" style="width: auto">
            <el-radio-group v-model="selectedDefaultImage" style="margin-top: 5px">
              <el-radio :label="0">
                <img :src="defaultImages[0]" style="width: 80px; height: 80px" alt="Default Image 1">
              </el-radio>
              <el-radio :label="1">
                <img :src="defaultImages[1]" style="width: 80px; height: 80px" alt="Default Image 2">
              </el-radio>
              <el-radio :label="2">
                <img :src="defaultImages[2]" style="width: 80px; height: 80px" alt="Default Image 3">
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>

      <div v-if="current_Page==2">
        <el-button style="margin-left: 40px" type="primary" @click="addQuestion">添加题目</el-button>
        题目列表:
        <table v-for="(question, index) in questionData.questions" :key="index">
          <tr >
            <td>
              <el-text>第{{index+1}}题</el-text>
              <el-input style="" v-model="question.qdescribe" placeholder="题目描述"></el-input>
            </td>
            <td>
              <el-input v-model="question.answer" placeholder="答案"></el-input>
            </td>
            <td>分值:</td>
            <td>
              <el-input-number v-model="question.point" :min="0" :step="1" placeholder="分值"></el-input-number>
            </td>
            <td>题目类型:</td>
            <td>
              <el-select v-model="question.qtype" placeholder="题目类型" style="width:100px;">
                <el-option label="判断题" value="0" />
                <el-option label="单选题" value="1" />
                <el-option label="填空题" value="2" />
              </el-select>
            </td>
            <td>
              <el-button type="danger" icon="el-icon-delete" @click="removeQuestion(index)">删除</el-button>
            </td>
          </tr>
          <tr v-if="!(question.qtype==2)" >
            <td>a</td><el-input v-model="question.a" placeholder="答案"></el-input>
            <td>b</td><el-input v-model="question.b" placeholder="答案"></el-input>
            <td>c</td><el-input v-model="question.c" placeholder="答案"></el-input>
            <td>d</td><el-input v-model="question.d" placeholder="答案"></el-input>
          </tr>
        </table>
      </div>

      <div v-if="current_Page==3">
        <el-button style="margin-left: 80px" type="success" @click="createQuestion">创建题目</el-button>
      </div>


    </el-main>
  </el-container>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import API from '../../axios/request';
import {ChatSquare, Edit, Picture, Plus, Upload} from '@element-plus/icons-vue';
import defaultImage1 from '@/assets/images/TestPaperPic/1.png';
import defaultImage2 from '@/assets/images/TestPaperPic/2.png';
import defaultImage3 from '@/assets/images/TestPaperPic/3.png';

export default {
  components: { Plus },
  computed: {
    ChatSquare() {
      return ChatSquare
    },
    Upload() {
      return Upload
    },
    Edit() {
      return Edit
    },
    Picture() {
      return Picture
    },
  },
  data() {
    return {
      questionData: {
        ename: '',
        edescribe: '',
        questions: [
          {
            eid: 0,
            qid: 0,
            qdescribe: '',
            answer: '',
            point: 0,
            qtype:"",
            a:"",
            b:"",
            c:"",
            d:"",
          },
        ],
      },
      // 用来接收缓存中的图片
      fileList: [],
      isPiced: false,
      defaultImages: [defaultImage1, defaultImage2, defaultImage3],
      selectedDefaultImage: 0,
      // 是否显示默认图片
      isShowDefaultImage: false,
      current_Page: 0,
    };
  },
  mounted() {},
  methods: {
    handleRemove(file, fileList) {
      // 文件列表移除文件时的钩子
      this.fileList = fileList; // 每一个改变都会将el-upload里面的图片传递的参数复制到this.filelist去
      this.isPiced = this.fileList.length > 0;
    },
    handlePreview(file) {
      // 点击文件列表中已上传的文件时的钩子
      // console.log(file);
    },
    onchange(file, fileList) {
      this.fileList = fileList; // 每一个改变都会将el-upload里面的图片传递的参数复制到this.filelist去
      this.isPiced = this.fileList.length > 0;
    },
    addQuestion() {
      this.questionData.questions.push({
        eid: 0,
        qid: 0,
        qdescribe: '',
        answer: '',
        point: 0,
        qtype:"",
        a:"",
        b:"",
        c:"",
        d:"",
      });
      ElNotification({
        title: 'Add',
        message: '添加一列',
      });
      console.log('selectedDefaultImage', this.selectedDefaultImage);
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
      requestData.append('defaultImageIndex', this.selectedDefaultImage);
      if (this.fileList.length > 0) {
        requestData.append('multipartFile', this.fileList[0].raw);
      }
      API({
        url: url,
        method: 'post',
        data: requestData,
        headers: {
          'Content-Type': 'multipart/form-data', // 设置请求头为 multipart/form-data
        },
      }).then((res) =>
          ElMessageBox.alert(res.data.msg, '提示', {
            confirmButtonText: '确认',
          })
      );
      console.log(this.questionData);
    },
  },
};
</script>

<style>

</style>
