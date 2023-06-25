<template>
  <div>
    <div style="display:flex;">
      <el-text>题号:{{currentQuestionIndex}}------</el-text>
      <el-text>问题:{{currentQuestion.qdescribe}}------</el-text>
      <el-text v-if="visable" >答案:{{currentQuestion.answer}}-------</el-text>
      <el-text v-if="visable">得分{{UserScore}}</el-text>
      <el-progress :percentage="progressPercentage" :format="(progressPercentage) => (progressPercentage === 100 ? 'Full' : `${progressPercentage}%`)"  />
    </div>
    <el-input v-model="currentQuestionUserResult" type="text" input-style="width: 200px" placeholder="请输入答案" />
    <div style="display: flex">
      <el-button type="primary" @click="ShiftBeforeQuestion">上一题</el-button>
      <el-button type="primary" @click="ShiftNextQuestion">下一题</el-button>
      <el-button type="primary" @click="SaveCurrentQuestion">保存当前答案</el-button>
      <el-button type="success" @click="SubmitAnswer">提交</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import API from "../../axios/request";

export default {
  data() {
    return {
      eid: "",
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
      progressPercentage:0,
      format:"",
    };
  },
  mounted() {
    this.eid = this.$route.query.eid;
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
  },
  methods: {
    ShiftBeforeQuestion(){
      if(this.currentQuestionIndex>0)
      {
        this.currentQuestionIndex-=1;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      }
    },
    ShiftNextQuestion(){
      if(this.currentQuestionIndex<this.questions.length-1)
      {
        this.currentQuestionIndex+=1;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      }
    },
    SaveCurrentQuestion(){
      this.UserResult[this.currentQuestionIndex] = this.currentQuestionUserResult;
      this.currentDonNumb+=1;
      this.progressPercentage=this.currentDonNumb/this.questions.length*100;
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
    },
  }
};
</script>
