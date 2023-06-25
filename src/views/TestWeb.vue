<template>
  <div class="about">
    <button @click="getData()">test axios 请求数据</button>
    <p>这是请求到的数据{{data}}</p>
    <p>测试梁伟静</p>
  </div>
</template>
<script lang="ts">
import API from "../axios/request.js"
export default{
  data(){
    return{
      //定义变量
      data:"",
    }
  }, methods:
{
  //定义函数
  getData()
  {
    API({
      url:'/selectExamination',
      method:'get',
      params:{
        page:1,
        limit:4,
      }
    }).then((res) => {

      this.data=res.data;
    })
  }
}





}
</script>
