<template>
<el-container style="background-color: #cccccc">
  <el-header style="width: 100%;height: 100px;margin-bottom: 10px;background-color: white">
    <el-text>{{ename}}</el-text>

  </el-header>
  <el-container style="background-color: white">
  <el-aside style="width:70%;height: 600px;">
    <el-text>题号:{{currentQuestionIndex+1}}</el-text>
    <el-text>问题:{{currentQuestion.qdescribe}}------</el-text>
    <el-text>分值:{{currentQuestion.point}}------</el-text>
    <transition name="el-fade-in-linear">
    <el-text v-if="visable">正确答案:{{currentQuestion.answer}}-------</el-text>
    </transition>
    <el-text v-if="visable">你的答案:{{UserResult[currentQuestionIndex]}}</el-text>
    <el-text v-if="visable">得分{{UserScore}}</el-text>
    <el-button v-if="Pvisable&visable" type="success" icon="el-icon-check" circle />
    <el-button v-if="Evisable&visable" type="danger" icon="el-icon-close" circle />



    <el-input v-model="currentQuestionUserResult" type="text" input-style="width: 200px" placeholder="请输入答案" />
    <div style="display: flex">
      <el-button type="primary" @click="ShiftBeforeQuestion">上一题</el-button>
      <el-button type="primary" @click="ShiftNextQuestion">下一题</el-button>
      <el-button type="primary" @click="SaveCurrentQuestion" :disabled="isSaveButtonDisabled">保存当前答案</el-button>
      <el-button type="success" @click="SubmitAnswer" :disabled="isSubmitButtonDisabled">提交</el-button>
    </div>
  </el-aside>


<el-main>
  <el-progress :percentage="progressPercentage"
               :stroke-width="15"
               striped
               striped-flow
               :duration="10"
               :format="format"
               style=" margin-bottom: 15px;width: 350px;" />
  <el-text>答题卡</el-text>
  <el-row>
    <el-col v-for="(question, index) in questions" :key="index" :span="4">
      <el-button
          :class="['question-button', { 'completed-question': index < currentDonNumb }]"
          @click="goToQuestion(index)"
          round
          style="width: 40px; height: 40px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
      >
        {{ index + 1 }}
      </el-button>
    </el-col>
  </el-row>
</el-main>
  </el-container>
</el-container>
</template>

<script lang="ts">
import API from "../../axios/request";
import { ElProgress } from 'element-plus';
import {Check, Delete} from "@element-plus/icons-vue";
export default {
  data() {
    return {
      ename:"",
      eid: "",
      sid:0,
      questions: [],
      currentQuestion:{},
      showResult: false,
      currentQuestionIndex:0,
      UserResult:[],
      currentQuestionUserResult:"",
      //正确错误表，1表示用户做对了，0表示错误
      UserResultSure:[],
      //用户的得分
      UserScore:0,
      //显示答案与得分
      visable: false,
      //完成题目数量
      currentDonNumb:0,
      progressPercentage: 0,
      format:(percentage) => (percentage === 100 ? '完成' : `${percentage}%`),

      //再提交后禁用
      isSaveButtonDisabled: false,
      isSubmitButtonDisabled: false,
      Pvisable: false,
      Evisable: false,
      // 用于跟踪每个题目的完成状态
      isQuestionCompleted: [],
    };
  },
  mounted() {
    this.eid = this.$route.query.eid;
    this.ename=this.$route.query.ename;
    this.sid=this.$cookies.get("data").sid
    // 假设您将后端传来的数据存储在response中
    API({
      url: '/selectQuestionByEid',
      method: 'get',
      params: {
        eid: this.eid,
      }
    }).then((res) => {

      this.questions = res.data.data;
      // console.log(this.questions)
      // 设置当前题目为第一个题目
      this.currentQuestion = this.questions[0]
      console.log(this.currentQuestion)
      this.UserResult = Array(this.questions.length).fill("");
      this.UserResultSure = Array(this.questions.length).fill(0);
      console.log(this.UserResult)
    });
    this.isQuestionCompleted = Array(this.questions.length).fill(false); // 初始化题目完成状态数组
  },
  methods: {
    //通过右边按钮切换题目
    goToQuestion(index)
    {
      if(index>=0&&index<this.questions.length)
      {
        this.currentQuestion = this.questions[index];
        this.currentQuestionIndex = index;
      }
      this.showPE()
    },
    ShiftBeforeQuestion(){
      if(this.currentQuestionIndex>0)
      {
        this.currentQuestionIndex-=1;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      }
      this.showPE()
    },
    ShiftNextQuestion(){
      if(this.currentQuestionIndex<this.questions.length-1)
      {
        this.currentQuestionIndex+=1;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      }
      this.showPE()
    },
    SaveCurrentQuestion(){
      this.UserResult[this.currentQuestionIndex] = this.currentQuestionUserResult;
      this.currentDonNumb+=1;
      this.ShiftNextQuestion();
      if(this.currentDonNumb==this.questions.length)
      {
        this.isSaveButtonDisabled = true;
      }
      this.isQuestionCompleted[this.currentQuestionIndex] = true;
    },
    SubmitAnswer() {
      for (var i=0; i<this.questions.length; i++)
      {
        if(this.UserResult[i] == this.questions[i].answer)
        {
          this.UserScore+=this.questions[i].point;
          this.UserResultSure[i] = 1;

        }
      }
      this.visable = true;
      this.isSaveButtonDisabled = true;
      this.isSubmitButtonDisabled = true;
      this.UploadStudentScore();
      this.showPE()
    },
    UploadStudentScore()
    {
      API({
        url: '/studentAnswer',
        method: 'get',
        params: {
          eid:this.eid,
          sid:this.sid,
          score:this.UserScore,
        }
      })
    },
    //显示当前题目是否正确
    showPE()
    {
      if(this.UserResultSure[this.currentQuestionIndex]==1)
      {
        this.Pvisable = true;
        this.Evisable = false;
      }
      else{
        this.Pvisable = false;
        this.Evisable = true;
      }
    }
  },computed:{
    Check() {
      return Check
    },
    Delete() {
      return Delete
    },
      progressPercentage() {
        let progress_line;
        progress_line=(this.currentDonNumb) / this.questions.length * 100;
        return Math.floor(progress_line);
      },
    },

};
</script>
<style>

.completed-question {
  background-color: #5db0ec !important;
  color: white;
}
</style>