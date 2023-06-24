
<template>
  <div>
    <h2>{{ currentQuestion.qdescribe }}</h2>
    <input v-model="userAnswer" type="text" placeholder="请输入答案" />
    <button @click="submitAnswer">提交</button>
    <p v-if="showResult">回答正确！</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eid:"",
      questions: [],
      currentQuestion: null,
      userAnswer: "",
      showResult: false,

    };
  },
  mounted() {
    this.eid = this.$route.query.eid;
    // 假设您将后端传来的数据存储在response中
    const response = {
      msg: "success",
      code: 0,
      data: [
        { eid: 69, qid: 1, qdescribe: "1+1=?", answer: "2", point: 10 },
        { eid: 69, qid: 2, qdescribe: "2+2=?", answer: "4", point: 10 },
        { eid: 69, qid: 3, qdescribe: "3+3=?", answer: "6", point: 10 }
      ]
    };

    // 将数据存储到questions数组中
    this.questions = response.data;

    // 设置当前题目为第一个题目
    this.currentQuestion = this.questions[0];
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
    }
  }
};
</script>

