<template>

  <el-container>
    <el-main>
      <el-table :data="TestPaperData.list.data" style="width: 100%;height:550px">
        <el-table-column label="试卷ID" prop="eid" style="width: 10%;" />
        <el-table-column label="试卷名字" prop="ename" style="width: 15%;" />
        <el-table-column label="描述" prop="edescribe" style="width: 30%;" />
        <el-table-column label="教师ID" prop="tid" style="width: 10%;" />
        <el-table-column align="right" style="width: 25%;">
          <template #header>
            <div style="display: flex; align-items: center;">
              <el-input v-model="search" size="small" placeholder="Type to search"></el-input>
              <el-button @click="SearchTestPaperData()" style="margin-left: 5%;background-color: greenyellow"  :icon="Search" ></el-button>
            </div>

          </template>
          <template #default="scope">
            <el-button size="small" type="success" @click="handleOpen(scope.$index, scope.row)">打开</el-button>
            <el-button size="small" type="default" @click="handleEdit(scope.row.eid, scope.row.ename,scope.row.edescribe)">编辑</el-button>
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row.eid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-footer>
      <div class="example-pagination-block">
        <el-pagination layout="prev, pager, next"  @current-change="handleCurrentChange" :page-size="pageSize" />
      </div>
    </el-footer>
+-

  </el-container>
  <el-dialog v-model="visible" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <el-form>

          <el-input type="text" v-model="editParm.currentTestPageName" placeholder="editParm.currentTestPageName">试卷名字</el-input>
          <el-input type="text" v-model="editParm.currentTestPageDescribe" placeholder="editParm.currentTestPageDescribe">试卷描述</el-input>
          <el-button type="success" @click="submitUpdate">
            <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
            更改
          </el-button>

          <el-button type="danger" @click="close">
            <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
            关闭
          </el-button>
        </el-form>
      </div>
    </template>
  </el-dialog>

</template>



<script lang="ts">
import API from "../../axios/request";
import {Action, ElButton, ElDialog, ElInput, ElMessage, ElMessageBox} from "element-plus";
import {CircleCloseFilled, Search} from "@element-plus/icons-vue";

export default {
  data() {
    return {
      visible:false,
      search: "",
      TestPaperData: {
        list: []
      },
      currentPage:1,
      pageSize:12,
      editParm:{
        currentTestPageID:1,
        currentTestPageName:"",
        currentTestPageDescribe:"",
      },
    }
  },
  computed: {
    Search() {
      return Search
    },
    ElInput,ElButton, CircleCloseFilled, ElDialog,
  },
  methods: {
    handleOpen(index, row) {
      console.log(index, row);
    },
    handleEdit(a,b,c) {
      this.visible = true
      this.editParm.currentTestPageID=a
      this.editParm.currentTestPageName=b
      this.editParm.currentTestPageDescribe=c
    },
    submitUpdate(){
      this.visible=false

      API({
        url: '/updateExamination',
        method: 'get',
        params: {
          eid: this.editParm.currentTestPageID,
          ename:this.editParm.currentTestPageName,
          edescribe:this.editParm.currentTestPageDescribe,
        }
      }).then((res) => {
        ElMessageBox.alert(res.data.msg, '提示', {
          confirmButtonText: '确认',})
      })
    },
    handleDelete(eid) {
      API({
        url: '/deleteExamination',
        method: 'delete',
        params: {
          eid: eid,
        }
      }).then((res) => {
        ElMessageBox.alert(res.data.msg, '提示', {
          confirmButtonText: '确认',})
      })
    },
    handleCurrentChange(number)
    {
      this.currentPage=number
      this.SearchTestPaperData(number)
    },
    SearchTestPaperData(default_current_page=this.currentPage) {
      API({
        url: '/selectExamination',
        method: 'get',
        params: {
          page: default_current_page,
          limit: this.pageSize,
          keyword: this.search,
        }
      }).then((res) => {
        this.TestPaperData.list = res.data;
      })
    }
  },
  mounted() {
    // 在mounted钩子中调用getData
    this.SearchTestPaperData(1);
  }
};
import { ref } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CircleCloseFilled } from '@element-plus/icons-vue'




</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>