<template>
    <el-table :data="TestPaperData.data" border
              style="width: auto;
              margin-left: 10px;
              height: 630px;
              margin-top: 10px;
              margin-right: 10px"
    >
      <el-table-column label="试卷ID" prop="examination.eid"  />
      <el-table-column label="试卷名字" prop="examination.ename" />
      <el-table-column label="描述" prop="examination.edescribe" />
      <el-table-column label="老师名字" prop="examination.teacher.tname"  />
      <el-table-column label="分数" prop="score"  />
    </el-table>
</template>


<script lang="ts">
import API from "../../axios/request";

export default {
  data() {
    return {
      TestPaperData:"",
    }
  },
  methods: {
    search_data()
    {
      API({
        url: '/selectScore',
        method: 'get',
        params: {
          sid:this.$cookies.get("data").sid,
        }
      }).then((res) => {
        console.log("res.data", res.data);
        this.TestPaperData=res.data;
      })
    },
  },mounted() {
    this.search_data()
  }
}

</script>
<style>
.el-table-column label {
  font-weight: bold;
  color: black;
}
</style>
