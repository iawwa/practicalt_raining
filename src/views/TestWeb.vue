<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="getData()">test axios 请求数据</button>
    <p>这是请求到的数据{{testData.list}}</p>
  </div>
</template>
<script>
import { reactive } from 'vue'
import API from "../axios/request"
export default{
  name:'About',
  setup(){
    //数据
    const testData = reactive({
      list:[]
    });

    //测试请求方法
    const getData = function(){
      API({
        url:'/selectExamination',
        method:'get',
        params:{
          page:1,
          limit:4
        }
      }).then((res)=>{
        alert('请求成功!');
        testData.list = res.data;
      });
    }
    return{
      testData,
      getData,
    }
  }

}
</script>
