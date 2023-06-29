<template>
  <el-container style="width: 100%" >
    <el-header>
      <el-steps class="MyElSteps" :active="current_Page" align-center style="margin-top: 10px;padding-top: 0px;margin-bottom: 0px;">
        <el-step class="MyElStep" @click.native="current_Page=0" :icon="ChatSquare" style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);cursor: pointer;" title="Step 1" description="试卷信息" />
        <el-step @click.native="current_Page=1" :icon="Picture" style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);cursor: pointer" title="Step 2" description="试卷封面" />
        <el-step @click.native="current_Page=2" :icon="Edit" style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);cursor: pointer" title="Step 3" description="题目信息" />
      </el-steps>
    </el-header>

    <el-main style="margin-top: 30px;height:auto">
      <Transition name="el-fade-in-linear">
        <el-container v-if="current_Page==0" style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">
          <!--        <el-header>-->
          <!--          <el-text>试卷名称:</el-text>-->
          <!--          <el-input input-style="width: 100px" v-model="questionData.ename"></el-input>-->
          <!--        </el-header>-->
          <el-main>
            <el-form style="align-content: center;" v-if="current_Page==0" >
              <el-form-item label="试卷名称">
                <el-input v-model="questionData.ename"></el-input>
              </el-form-item>
              <el-form-item label="试卷描述">
                <el-input  type="textarea" :rows="20" v-model="questionData.edescribe"></el-input>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </Transition>

      <Transition name="el-fade-in-linear">
        <el-container v-if="current_Page==1" style="height: 800px">
          <el-tabs type="border-card" style="width: 100%;height: auto">
            <el-tab-pane label="上传头像" >
              <el-upload
                  :auto-upload="false"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :show-file-list="false"
                  :on-change="onchange"
                  list-type="picture"
                  class="avatar-uploader"
              >
                <img  class="avatar" v-if="imageUrl" :src="imageUrl" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-tab-pane>
            <el-tab-pane label="默认头像">
              <el-radio-group v-model="selectedDefaultImage" style="width: auto;">
                <el-radio  class="MyElRadioButton" :label="0" >
                  <img :src="defaultImages[0]" alt="Default Image 1">
                </el-radio>

                <el-radio class="MyElRadioButton" :label="1">
                  <img :src="defaultImages[1]" alt="Default Image 2">
                </el-radio>

                <el-radio class="MyElRadioButton" :label="2">
                  <img :src="defaultImages[2]" alt="Default Image 3">
                </el-radio>

              </el-radio-group>
            </el-tab-pane>
          </el-tabs>

        </el-container>
      </Transition>

      <Transition name="el-fade-in-linear">
        <div v-if="current_Page === 2">
          <div v-for="(question, index) in questionData.questions" :key="index" style="margin-top: 10px;">
            <el-form :model="question" label-width="100px" style="margin-top: 10px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);padding-bottom: 5px">
              <el-form-item font-weight="bold" label="题号">
                {{index+1}}
              </el-form-item>
              <el-form-item label="题目描述">
                <el-input v-model="question.qdescribe" style="padding-right: 5%" placeholder="题目描述"></el-input>
              </el-form-item>
              <el-form-item label="答案">
                <el-input v-if="question.qtype =='2'" v-model="question.answer" style="padding-right: 5%" placeholder="答案"></el-input>
                <el-select v-if="question.qtype == '0'" v-model="question.answer" placeholder="答案" style="width: 100px;">
                  <el-option label="√" value="a"></el-option>
                  <el-option label="×" value="b"></el-option>
                </el-select>
                <el-select v-if="question.qtype == '1'" v-model="question.answer" placeholder="答案" style="width: 100px;">
                  <el-option label="A" value="a"></el-option>
                  <el-option label="B" value="b"></el-option>
                  <el-option label="C" value="a"></el-option>
                  <el-option label="D" value="b"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="分值">
                <el-input-number v-model="question.point" controls-position="right" :min="0" :step="1" placeholder="分值"></el-input-number>
              </el-form-item>
              <el-form-item label="题目类型">
                <el-select v-model="question.qtype" placeholder="题目类型" style="width: 100px;">
                  <el-option label="判断题" value="0"></el-option>
                  <el-option label="单选题" value="1"></el-option>
                  <el-option label="填空题" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                    round
                    style="float: right;
              background-color: #8c2222;
              color: white;
              border: 0px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"
                    type="primary"
                    @click="removeQuestion(index)">Del</el-button>
              </el-form-item>
              <template v-if="(question.qtype == '1')">
                <el-form-item label="选项A">
                  <el-input v-model="question.a" style="padding-right: 5%" placeholder="答案"></el-input>
                </el-form-item>
                <el-form-item label="选项B">
                  <el-input v-model="question.b" style="padding-right: 5%" placeholder="答案"></el-input>
                </el-form-item>
                <el-form-item label="选项C">
                  <el-input v-model="question.c" style="padding-right: 5%" placeholder="答案"></el-input>
                </el-form-item>
                <el-form-item label="选项D">
                  <el-input v-model="question.d" style="padding-right: 5%" placeholder="答案"></el-input>
                </el-form-item>
              </template>
            </el-form>
          </div>
          <el-affix position="bottom" :offset="100" >
            <el-button
                round
                style="float: right;
              background-color: #298123;
              color: white;
              border: 0px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"
                type="primary"
                @click="createQuestion">上传提交</el-button>
            <el-button
                round
                style="float: right;
              background-color: #8c2222;
              color: white;
              border: 0px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"
                type="primary"
                @click="addQuestion">增加题目</el-button>
          </el-affix>
        </div>
      </Transition>
      <el-affix position="bottom" :offset="30" style="display: flex">
        <el-button
            round
            style="float: right;
              background-color: #856629;
              color: white;
              border: 0px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"
            :disabled="current_Page>=2"
            type="primary"
            @click="current_Page+=1">Next</el-button>
        <el-button
            round
            style="float: right;
              background-color: #d75959;
              color: white;
              border: 0px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"
            :disabled="current_Page<=0"
            type="primary"
            @click="current_Page-=1">Previous</el-button>
      </el-affix>
    </el-main>
    <el-backtop :bottom="100">
      <div
          style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #8f2222;
        border-radius: 50%;
      "
      >
        UP
      </div>
    </el-backtop>
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
      imageUrl:"",
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
      this.imageUrl = URL.createObjectURL(this.fileList[0].raw);
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

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}


.MyElRadioButton img
{
  width: 180px;
  height: 180px;
}
.MyElRadioButton
{
  color: white;
  padding-top: 0px;
  background-color: white;
  height: auto;
}
.MyElRadioButton :hover
{
  padding: 0px;
  background-color: white;
}
.MyElRadioButton.is-active
{
  padding: 0px;
  background-color: white !important;
}
:deep(.MyElStep){
  background-color: #ADAD! important;
  color: #8c2222 !important;
}
</style>