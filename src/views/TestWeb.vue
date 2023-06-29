<template>
  <el-table
      :data="TestPaperData.data"
      style="width: 100%;height:auto;">
    <el-table-column label="试卷ID" prop="eid"  />
    <el-table-column label="试卷名字" prop="ename" />
    <el-table-column label="描述" prop="edescribe" />
    <el-table-column label="教师名字" prop="teacher.tname"  />
    <el-table-column align="right" >
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
import API from "../axios/request";



export default {
  data() {
    return {
      //定义变量
      TestPaperData:"",
    }
  },
  methods:
  {
    //定义函数的地方如下
   searcha()
    {
      API({
        url: '/selectExamination',
        method: 'get',
        params: {
          page: 0,
          limit: 10,
        }
      }).then((res) => {
        this.TestPaperData = res.data;
        console.log("res.data",res.data)
      })
    }
  }
  ,
  mounted() {
    //初始化的会做的东西也就是第一次进页面
    this.searcha()
  }
}
</script>