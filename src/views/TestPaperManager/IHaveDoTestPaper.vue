<template>
  <el-container>
    <el-main>
    <el-table :data="TestPaperData" border
              style="width: auto;
              margin-left: 10px;
              height: auto;
              margin-top: 10px;
              margin-right: 10px"
    >
      <el-table-column label="试卷ID" prop="examination.eid"  />
      <el-table-column label="试卷名字" prop="examination.ename" />
      <el-table-column label="描述" prop="examination.edescribe" />
      <el-table-column label="老师名字" prop="examination.teacher.tname"  />
      <el-table-column label="分数" sortable prop="score"  />
    </el-table>
    </el-main>
    <el-footer>
      <el-affix position="bottom" :offset="20">

        <el-pagination
            :background="true"
            :page-size="pageSize"
            :total="total"
            layout=" prev, pager, next"
            @current-change="handleCurrentChange"
            class="pagination"
        />
      </el-affix>
    </el-footer>
  </el-container>
</template>


<script lang="ts">
import API from "../../axios/request";

export default {
  data() {
    return {
      TestPaperData:"",
      currentPage:1,
      total:0,
      pageSize:12,
    }
  },
  methods: {
    handleCurrentChange(number)
    {
      this.currentPage=number
      this.search_data(number)
    },
    search_data(num=this.currentPage)
    {
      API({
        url: '/selectScore',
        method: 'get',
        params: {
          sid:this.$cookies.get("data").sid,
          page:num,
          limit:this.pageSize,
        }
      }).then((res) => {
        console.log("res.data", res.data);
        this.TestPaperData=res.data.data.list;
        this.total=res.data.data.total;
        console.log("total.data", this.total);
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
