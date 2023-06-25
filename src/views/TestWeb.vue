<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="getData()">test axios 请求数据</button>
    <p>这是请求到的数据{{data}}</p>
    <p>梁伟静</p>
  </div>
</template>
<script lang="ts">
import API from "../axios/request"
export default{
  data() {
    return{
      data:"",
    }
  },methods:{
    getData(){
      API({
        url:'/selectExamination',
        method:'get',
        params:{
          page:1,
          limit:4
        }
      }).then((res)=>{
        this.data = res.data;
      });
    }
  }
}
</script>
