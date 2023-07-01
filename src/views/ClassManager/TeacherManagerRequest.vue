<template>
  <el-container>
    <el-main>
      <el-table :data="RequestData" border
                style="width: auto;
              margin-left: 10px;
              height: 80vh;
              margin-top: 10px;
              margin-right: 10px"
                :default-sort="{ prop: 'score', order: 'descending' }"
      >
        <el-table-column label="学生ID" prop="sid"  />
        <el-table-column label="学生名字" prop="sname" />
        <el-table-column label="班级ID" prop="cid" />
        <el-table-column label="班级名字" prop="cname" />
        <el-table-column align="right" >
          <template #header></template>
          <template #default="scope">
            <el-button
                size="small"
                type="success"
                style="border: 0px;background-color: #298123"
                @click="handleAgreeRequest(scope.row.sid,scope.row.cid)">同意
            </el-button>
            <el-button
                size="small"
                style="background-color: #8c2222;border: 1px solid #8c2222;color: white"
                type="default"
                @click="handleDisagreeRequest(scope.row.sid,scope.row.cid)">拒绝</el-button>

          </template>
        </el-table-column>
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
import {ElMessageBox} from "element-plus";

export default {
  data() {
    return {
      RequestData:"",
      currentPage:1,
      pageSize:12,
      total:0,
    }
  },
  methods: {
    handleAgreeRequest(sid,cid){
      API({
        url: '/student/agreeRequest',
        method: 'put',
        data: {
          sid: sid,
          cid: cid,
        },
        headers: {
          'Content-Type': 'application/json',
        },

      }).then((res) => {
        console.log("res", res);
        ElMessageBox.alert(res.data.msg, '提示', {
          confirmButtonText: '确认',})
      })
    },
    handleDisagreeRequest(sid,cid){

      API({
        url: '/student/disRequest',
        method: 'delete',
        data: {
          sid: sid,
          cid: cid,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        console.log("res", res);
        ElMessageBox.alert(res.data.msg, '提示', {
          confirmButtonText: '确认',})
      })

    },

    handleCurrentChange(number)
    {
      this.currentPage=number
      this.SearchRequestData(number)
    },
    SearchRequestData(pageNum=this.currentPage)
    {
      API({
        url: '/student/listRequest',
        method: 'get',
        params: {
          pageNum: pageNum,
          pageSize: this.pageSize
        }
      }).then((res) => {
        console.log("res.data", res.data);
        this.RequestData=res.data.data.list;
        this.total=res.data.data.total,
            console.log("this.total",this.total)
      })
    },
  },mounted() {
    this.SearchRequestData()
  }
}

</script>
<style>
.el-table-column label {
  font-weight: bold;
  color: black;
}
</style>