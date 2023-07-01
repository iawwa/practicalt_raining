<template>
  <div style="padding: 10px">
    <div style="margin: 10px 0">
      <!--      搜索区域-->
      <el-input v-model="search" placeholder="请输入班级名称" style="width: 20%" />
      <el-button type="primary" :icon="Search" @click="SearchClassListData" style="margin-left: 5px">查询</el-button>
      <el-button v-if="is_studnet" style="margin-left: 5px"
                 @click="handleRequest">申请加入班级
      </el-button>
      <el-button v-if="is_studnet" style="margin-left: 5px"
                 @click="handleOutRequest">申请退出班级
      </el-button>
    </div>


    <!-- 表格 -->
    <!-- 班级ID 班级名称 班级描述 教师ID 教师姓名 -->
    <el-table :data="ClassListData" v-loading="loading" style="width: 100%;height:auto;">
      <el-table-column prop="cid" label="班级ID" sortable />
      <el-table-column prop="cname" label="班级名称" />
      <el-table-column prop="cdescribe" label="班级描述" />
      <el-table-column prop="tid" label="教师ID" sortable />
    </el-table>
    <!-- <el-footer >
    <el-affix position="bottom" :offset="5">
      <el-pagination
          style="margin-top: 0px;padding-top: 0px"
          :background="true"
          :page-size="pageSize"
          :total="total"
          layout=" prev, pager, next"
          @current-change="handleCurrentChange"
          class="pagination"
      />
    </el-affix>
  </el-footer> -->

  </div>
</template>

<script lang='ts'>
import { Delete, Edit, Search } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import API from "../../axios/request";

export default {
  data() {
    return {
      // 0:管理员1:教师2:学生
      is_studnet: false,
      is_admin: false,
      is_teacher: false,
      // 根据班级名进行查询
      classSearch: {
        keyword: ""
      },
      // 班级信息 创建班级使用
      classInfo: {
        cid: "",
        cname: "",
        cdescribe: "",
        tid: "",
      },
      dialogVisible: false,
      search: "",
      ClassListData: "",
      total: 0,
      currentPage: 1,
      pageSize: 12,
      loading: true
    }
  },
  computed: {
    Search() {
      return Search
    },
    // ElInput, ElButton, CircleCloseFilled, ElDialog,
  },
  methods: {
    // 申请加入班级
    handleRequest() {
      this.$router.push({ path: '/StudentReuqest' });
    },
    //
    handleOutRequest(){
      this.$router.push({ path: '/StudentOutReuqest' });
    },

    // //分页
    // handleCurrentChange(number) {
    //   this.currentPage = number
    //   this.SearchClassListData(number)
    // },
    //根据班级名(关键词)展示信息
    SearchClassListData(default_current_page = this.currentPage) {
      this.loading = true
      this.classSearch.keyword = this.search
      API({
        url: '/selectClass',
        method: 'get',
        params: {
          keyword: this.search
        }
      }).then((res) => {
        this.ClassListData = res.data;
        this.total = res.data.count
        // console.log(this.classSearch.keyword)
      })
      this.loading = false
    }
  },
  mounted() {
    // 在mounted钩子中调用getData
    this.SearchClassListData(1);
    let current_role = this.$cookies.get("role");
    switch (current_role) {
      case "student":
      {
        this.is_studnet = true
        break
      }
      case "teacher":
      {
        this.is_teacher = true
        break
      }
      case "manager": {
        this.is_admin = true
        break
      }
    }
    console.log(this.$cookies.get("data").tid);
    console.log(this.$cookies.get("role"))
  }
};




</script>
