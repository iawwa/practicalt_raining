<template>
  <div>
    <h2>{{ currentQuestion.qdescribe }}</h2>
    <input v-model="userAnswer" type="text" placeholder="请输入答案" />
    <button @click="submitAnswer">提交</button>
    <p v-if="showResult">回答正确！</p>
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
      userAnswer: "",
      showResult: false,
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
    });
  },
  methods: {
    submitAnswer() {
      // 检查用户答案是否正确
      if (this.userAnswer === this.currentQuestion.answer) {
        this.showResult = true;
      } else {
        this.showResult = false;
      }

      // 切换到下一题
      this.nextQuestion();
    },
    nextQuestion() {
      const currentIndex = this.questions.indexOf(this.currentQuestion);
      const nextIndex = currentIndex + 1;

      // 如果还有下一题，更新当前题目
      if (nextIndex < this.questions.length) {
        this.currentQuestion = this.questions[nextIndex];
        this.userAnswer = "";
        this.showResult = false;
      } else {
        // 已经回答完所有题目，进行其他操作（如显示分数等）
        // ...
      }
    },
  }
};
</script>
