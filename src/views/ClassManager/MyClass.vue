<template>
  <div style="padding: 10px">
    <div style="margin: 10px 0">
      <!--      搜索区域-->
      <el-input v-model="search" placeholder="请输入班级名称" style="width: 20%" />
      <el-button type="primary" :icon="Search" @click="SearchClass" style="margin-left: 5px">查询</el-button>
      <!-- 新建班级 -->
      <el-button type="primary" @click="dialogVisible = true" :disabled="!is_teacher"
        style="margin-left: 5px">新建班级</el-button>
    </div>

    <el-dialog v-model="dialogVisible" title="创建班级" width="60%" align-center>
      <!-- 新增 表单 -->
      <!-- 班级名称 班级描述 -->
      <el-form :model="classInfo" label-width="120px">
        <el-form-item label="班级名称">
          <el-input v-model="classInfo.cname" />
        </el-form-item>
        <el-form-item label="班级描述">
          <el-input v-model="classInfo.cdescribe" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addClass">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 表格 -->
    <!-- 班级ID 班级名称 班级描述 教师ID 教师姓名 -->
    <el-table :data="ClassListData" v-loading="loading" style="width: 100%;height:auto;">
      <el-table-column prop="cid" label="班级ID" sortable />
      <el-table-column prop="cname" label="班级名称" />
      <el-table-column prop="cdescribe" label="班级描述" />
      <el-table-column v-if="!is_teacher" to prop="tid" label="教师ID" sortable />
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-row>
            <el-col>
              <el-button size="small" type="success" style="border: 0px;background-color: #298123"
                @click="handleOpen(scope.row.cid, scope.row.cname)">打开
              </el-button>
            </el-col>
            <el-col>
              <el-button :disabled="!is_teacher" size="small"
                style="background-color: white;border: 1px solid #8c2222;color: black" type="default"
                @click=" Visible = true">编辑</el-button>
            </el-col>
            <el-col>
              <el-button size="small" type="danger" :disabled="!is_teacher" style="background-color:#8c2222;border: 0px"
                @click="handleDelete(scope.row.cid)">删除</el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
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



    <!-- 教师 编辑 cid cname cdescribe-->
    <el-dialog v-model="Visible" style="height: auto;width: 600px;border-radius: 10px 10px 10px 10px" :show-close="false"
      custom-class="my-dialog">
      <el-form :model="classInfo" label-width="120px">
        <el-form-item label="班级id:">
          <el-input v-model="classInfo.cid" />
        </el-form-item>
        <el-form-item label="班级名称:">
          <el-input v-model="classInfo.cname" placeholder="请输入班级名称" />
        </el-form-item>
        <el-form-item label="班级描述:">
          <el-input v-model="classInfo.cdescribe" type="textarea" placeholder="请输入班级描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="Visible = false">取消</el-button>
          <el-button type="primary" @click="handleUpdate">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

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
      Visible: false,
      search: "",
      ClassListData: "",
      total: 0,
      urls:"",
      currentPage: 1,
      pageSize: 12,
      loading: true,
    }
  },
  computed: {
    Search() {
      return Search
    },
    // ElInput, ElButton, CircleCloseFilled, ElDialog,
  },
  methods: {
    rowClassName({ rowIndex }) {
      return rowIndex % 2 === 0 ? 'row-color-even' : 'row-color-odd';
    },
    // 打开班级 查看班级成员
    handleOpen(cid, cname) {
      this.$router.push({ path: '/ClassStudent', query: { cid, cname } });
    },

    // 更新 编辑班级信息
    handleUpdate() {
      this.Visible = false
      API({
        url: '/updateClass',
        method: 'get',
        params: {
          cid: this.classInfo.cid,
          cname: this.classInfo.cname,
          cdescribe: this.classInfo.cdescribe,
        }
      }).then((res) => {
        // ElMessageBox.alert(res.data.msg, '提示', {
        //   confirmButtonText: '确认',
        // })
      })

      this.SearchClassListData(this.currentPage);
    },
    // 删除班级
    handleDelete(cid) {
      API({
        url: '/deleteClass',
        method: 'delete',
        params: {
          cid: cid
        }
      }).then((res) => {
        console.log(cid);
      })

      this.SearchClassListData(this.currentPage);

    },
    // 创建班级
    addClass() {
      this.dialogVisible = false
      API({
        url: `/createClass`,
        method: 'post',
        params: {
          cname: this.classInfo.cname,
          cdescribe: this.classInfo.cdescribe,
        }
      }).then((res) => {
        // ElMessageBox.alert(res.data.msg, '提示', {
        //   confirmButtonText: '确认',
        // })
      })

      this.SearchClassListData(this.currentPage);

    },
    // //分页
    // handleCurrentChange(number) {
    //   this.currentPage = number
    //   this.SearchClassListData(number)
    // },
    
    // 搜索
    SearchClass() {
      this.classSearch.keyword = this.search
      API({
        url: '/selectClass',
        method: 'get',
        params: {
          keyword: this.search
        }
      }).then((res) => {
        console.log(this.$cookies.get("role"))
      })
    },
    // 根据班级名展示信息
    SearchClassListData(default_current_page = this.currentPage,urls) {
      this.loading = true
      if (this.$cookies.get("role")=='teacher') {
        urls='/teacher/selectownclass'
      } else {
        urls='/class/yijiaru'
      }
      API({
        url: urls,
        method: 'get',
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
        }
      }).then((res) => {
        this.ClassListData = res.data;
        this.total = res.data.count
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
  