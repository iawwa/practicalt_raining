<template>
  <el-container style="height: 650px">
    <el-header style="width: 100%; height: 100px; margin-bottom: 10px; background-color: white;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">
      <el-text>{{ename}}</el-text>
      <el-text>剩余时间: {{ timerFormatted }}</el-text>

    </el-header>
    <el-container style="background-color: white">
      <el-aside style="width:70%;height: auto;margin-right: 3px">
        <el-card style="height: auto">
          <div slot="header" style="font-weight: bold;">
            题号: {{ currentQuestionIndex + 1 }}
            <transition name="fade-in-linear">
            <span v-if="visable" style="float: right">得分: {{ UserScore }}</span>
            </transition>
          </div>
          <div style="margin-bottom: 10px;">
            <transition name="fade-in-linear">
              <p style="font-weight: bold;">问题: {{ currentQuestion.qdescribe }}</p>
            </transition>
            <p>分值: {{ currentQuestion.point }}</p>


            <!-- 判断题-->
            <transition name="fade-in-linear">
              <div v-if="currentQuestionClass==0">
                <el-radio-group v-model="result0" class="ml-4">
                  <el-radio label="a" size="large">√</el-radio>
                  <el-radio label="b" size="large">×</el-radio>
                </el-radio-group>
                <p v-if="visable" style="font-weight: bold;">
                  正确答案:
                  <template v-if="currentQuestion.answer === 'a'">
                    <span v-if="currentQuestionClass === '0' && currentQuestion.answer === 'a'" >√</span>
                    <span v-else-if="currentQuestionClass === '0' && currentQuestion.answer === 'b'" >×</span>
                  </template>
                </p>
              </div>
            </transition>
            <transition name="fade-in-linear">
              <div v-if="currentQuestionClass==0">
              <p v-if="visable">你的答案: {{ UserResult[currentQuestionIndex] }}</p>
              </div>
            </transition>


<!--            单选题abcd-->
            <transition name="fade-in-linear">
              <div v-if="currentQuestionClass==1">
                <el-radio-group v-model="result1" class="ml-4">
                  <el-radio label="a" size="large">A:{{choice_a}}</el-radio>
                  <el-radio label="b" size="large">B:{{choice_b}}</el-radio>
                  <el-radio label="c" size="large">C:{{choice_c}}</el-radio>
                  <el-radio label="d" size="large">D:{{choice_d}}</el-radio>
                </el-radio-group>
              <p v-if="visable" style="font-weight: bold;">正确答案: {{ currentQuestion.answer }}</p>
              </div>
            </transition>
            <transition name="fade-in-linear">
              <div v-if="currentQuestionClass==1">
              <p v-if="visable">你的答案: {{ UserResult[currentQuestionIndex] }}</p>
              </div>
            </transition>


<!--            填空题-->
            <transition name="fade-in-linear">
              <div v-if="currentQuestionClass==2">
                <el-input
                    v-model="result2"
                    type="text"
                    input-style="width: 200px"
                    placeholder="请输入答案"
                />
              <p v-if="visable" style="font-weight: bold;">正确答案: {{ currentQuestion.answer }}</p>
              </div>
            </transition>
            <transition name="fade-in-linear">
              <div v-if="currentQuestionClass==2">

              <p v-if="visable">你的答案: {{ UserResult[currentQuestionIndex] }}</p>
              </div>
            </transition>



          </div>

          <div style="display: flex; justify-content: space-between; margin-top: 10px;">
            <el-button type="primary" @click="ShiftBeforeQuestion">上一题</el-button>
            <el-button type="primary" @click="ShiftNextQuestion">下一题</el-button>
            <el-button type="primary" @click="SaveCurrentQuestion" :disabled="isSaveButtonDisabled">
              保存当前答案
            </el-button>
            <el-button type="success" @click="SubmitAnswer" :disabled="isSubmitButtonDisabled||!isStudent">
              提交
            </el-button>
          </div>
        </el-card>
      </el-aside>
      <el-main style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);margin-left: 3px;margin-right: 5px">
        <el-progress
            :percentage="progressPercentage"
            :stroke-width="15"
            striped
            striped-flow
            :duration="10"
            :format="format"
            style="margin-bottom: 15px;width: auto;"
        />
        <el-text>答题卡</el-text>
        <el-row>
          <el-col v-for="(question, index) in questions" :key="index" :span="4">
            <el-button
                :class="[
                'question-button',
                { 'completed-question': isQuestionCompleted[index] === true && !visable },
                { 'correct-question': UserResultSure[index] === 1 && visable },
                { 'incorrect-question': UserResultSure[index] === 0 && visable }
              ]"
                @click="goToQuestion(index)"
                round
                style="width: 40px; height: 40px;
                 overflow: hidden;
                 margin-top: 10px;
                 text-overflow: ellipsis; white-space: nowrap;"
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
import {ElNotification, ElProgress} from 'element-plus';
import {Check, Delete} from "@element-plus/icons-vue";
export default {
  data() {
    return {
      isStudent:false,
      ename:"",
      eid: "",
      sid:0,
      questions: [],
      currentQuestion:{},
      showResult: false,
      // 当前题目索引
      currentQuestionIndex:0,
      // 当前题目类型
      currentQuestionClass:"",
      //选项
      choice_a:null,
      choice_b:null,
      choice_c:null,
      choice_d:null,
      //第一类题目答案:
      result0:"a",
      //第二类题目答案
      result1:"a",
      //第三类题目答案
      result2:null,
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
    //timer
      timer:900, // 15 minutes in seconds
    };
  },
  mounted() {
    this.startTimer();
    this.eid = this.$route.query.eid;
    this.ename=this.$route.query.ename;
    this.sid=this.$cookies.get("data").sid;

    if (this.$cookies.get("role") === "student") {
      this.isStudent=true;
    };
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
      this.UserResult = Array(this.questions.length).fill("");
      this.UserResultSure = Array(this.questions.length).fill(0);
      this.isQuestionCompleted = Array(this.questions.length).fill(false); // 初始化题目完成状态数组
      this.GetCurrentInstanceValue();
    });

  },
  onBeforeUnmount() {
    clearInterval(this.timer.value);
  },
  methods: {
    startTimer() {
      const timerInterval = setInterval(() => {
        this.timer--;
        if (this.timer === 0) {
          this.SubmitAnswer();
          clearInterval(timerInterval);
        }
      }, 1000);
    },
    //通过右边按钮切换题目
    goToQuestion(index) {
      if(index>=0&&index<this.questions.length)
      {
        this.currentQuestionIndex = index;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.showPE()
      }
      this.GetCurrentInstanceValue();
    },
    ShiftBeforeQuestion(){
      if(this.currentQuestionIndex>0)
      {
        this.currentQuestionIndex-=1;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      }
      this.showPE()
      this.GetCurrentInstanceValue();
    },
    ShiftNextQuestion(){
      if(this.currentQuestionIndex<this.questions.length-1)
      {
        this.currentQuestionIndex+=1;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      }
      this.showPE()
      this.currentQuestionClass=this.currentQuestion.qtype
      this.GetCurrentInstanceValue();
    },
    SaveCurrentQuestion(){
      this.isQuestionCompleted[this.currentQuestionIndex] = true;
      console.log("this.currentQuestionClass",this.currentQuestionClass)
      //判断当前题型以获得用户的答案
      if(this.currentQuestionClass==="0")
      {
        if(this.result0==="a")
        {
          this.currentQuestionUserResult ="√";
        }
        else if(this.result0==="b")
        {
          this.currentQuestionUserResult ="×";
        }
        else{}
      }
      else if(this.currentQuestionClass==="1")
      {
        this.currentQuestionUserResult = this.result1
      }
      else if(this.currentQuestionClass==="2")
      {
        this.currentQuestionUserResult = this.result2
      }
      else{
        console.log("题目类型error")
      }
      console.log("this.currentQuestionUserResult",this.currentQuestionUserResult)
      this.UserResult[this.currentQuestionIndex] = this.currentQuestionUserResult;
      this.currentDonNumb+=1;
      this.ShiftNextQuestion();
      if(this.currentDonNumb==this.questions.length)
      {
        this.isSaveButtonDisabled = true;
      }
      // console.log("this.currentQuestionIndex",this.currentQuestionIndex)
      ElNotification.success({
        title: '保存',
        message: '保存成功',
        offset: 100,
      })
    },
    SubmitAnswer() {
      for (var i=0; i<this.questions.length; i++)
      {
        let answer_temp=this.questions[i].answer
        if(this.questions[i].qtype=="0")
        {
          if(this.questions[i].answer==="a")
          {
            answer_temp="√"
          }
          else{
            answer_temp="×"
          }
        }
        if(this.UserResult[i] == answer_temp)
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
      ElNotification.success({
        title: '提交',
        message: '提交成功',
        offset: 100,
      })
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
    ,GetCurrentInstanceValue()
    {
      this.currentQuestionClass=this.currentQuestion.qtype
      this.choice_a=this.currentQuestion.a
      this.choice_b=this.currentQuestion.b
      this.choice_c=this.currentQuestion.c
      this.choice_d=this.currentQuestion.d
      if (this.currentQuestionClass===0) {
        this.currentQuestionUserResult = this.result0;
      }
      else if (this.currentQuestionClass===1) {
        this.currentQuestionUserResult = this.result1;
      }
      else if (this.currentQuestionClass===2) {
        this.currentQuestionUserResult = this.result2;
      }
      else{

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
    timerFormatted() {
      const minutes = Math.floor(this.timer / 60);
      const seconds = this.timer % 60;
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    },
    },

};
</script>
<style>

.completed-question {
  background-color: #5db0ec !important;
  color: white !important;
}
.correct-question {
  background-color: limegreen !important;
  color: white !important;
}

.incorrect-question {
  background-color: indianred !important;
  color: white !important;
}

</style>