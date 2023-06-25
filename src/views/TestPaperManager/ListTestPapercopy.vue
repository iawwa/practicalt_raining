<template>

  <el-container>
    <el-main>
      <el-table :data="TestPaperData.list.data" v-loading="loading" style="width: 100%;height:550px;">
        <el-table-column label="试卷ID" prop="eid"  />
        <el-table-column label="试卷名字" prop="ename" />
        <el-table-column label="描述" prop="edescribe" />
        <el-table-column label="教师名字" prop="tname"  />
        <el-table-column align="right" >
          <template #header>
            <div style="display: flex; align-items: center;text-align: left">
              <el-input
                  v-model="search"
                  placeholder="查询"
                  class="input-with-select"
              >
                <template #prepend>
                  <el-select v-model="search_selectd.chose" placeholder="Select"  style="width: 75px;">
                    <el-option label="名字" value="1" />
                    <el-option label="教师" value="2" />
                    <el-option label="描述" value="3" />
                  </el-select>
                </template>
                <template #append>
                  <el-button :icon="Search" @click="SearchTestPaperData()" style="background-color: greenyellow" />
                </template>
              </el-input>

            </div>




          </template>
          <template #default="scope">
            <el-button size="small" type="success" @click="handleOpen(scope.row.eid)" >打开</el-button>
            <el-button size="small" type="default" @click="handleEdit(scope.row.eid, scope.row.ename,scope.row.edescribe)">编辑</el-button>

            <el-popconfirm
                width="220"
                confirm-button-text="确认"
                cancel-button-text="不"
                icon="el-icon-info"
                icon-color="#626AEF"
                title="你确认要删除吗"
                @confirm="handleDelete(scope.row.eid)"
            >
              <template #reference>
                <el-button
                    size="small"
                    type="danger"
                >删除</el-button>
              </template>
            </el-popconfirm>


          </template>
        </el-table-column>
      </el-table>

    </el-main>


    <el-footer>
      <el-pagination
          :background="true"
          :page-size="pageSize"
          :total="total"
          layout="total, prev, pager, next"
          @current-change="handleCurrentChange"
          class="pagination"
      />
    </el-footer>


  </el-container>
  <el-dialog v-model="visible" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <el-form>
          试卷ID:<el-text >{{editParm.currentTestPageID}}</el-text><p></p>
          试卷名字:<el-input type="text" v-model="editParm.currentTestPageName" placeholder="editParm.currentTestPageName"></el-input>
          试卷描述:<el-input type="text" v-model="editParm.currentTestPageDescribe" placeholder="editParm.currentTestPageDescribe"></el-input>
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
      search_selectd:{
        keyword:"",
        tname:"",
        keydescribe:"",
        chose:"1",
      },
      visible:false,
      search: "",
      TestPaperData: {
        list: []
      },
      total:0,
      currentPage:1,
      pageSize:12,
      editParm:{
        currentTestPageID:1,
        currentTestPageName:"",
        currentTestPageDescribe:"",
      },
      loading:true,
    }
  },
  computed: {
    Search() {
      return Search
    },
    ElInput,ElButton, CircleCloseFilled, ElDialog,
  },
  methods: {
    // 打开试卷
    handleOpen(eid) {
      this.$router.push({ path: '/DoTestPaper', query: { eid } });
    },
    // 编辑
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

      this.SearchTestPaperData(this.currentPage);

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
      this.SearchTestPaperData(this.currentPage);
    },
    handleCurrentChange(number)
    {
      this.currentPage=number
      this.SearchTestPaperData(number)
    },
    SearchTestPaperData(default_current_page=this.currentPage) {
      this.loading=true
      switch (this.search_selectd.chose)
      {
        case "1":
        {
          this.search_selectd.keyword=this.search
          this.search_selectd.keydescribe=""
          this.search_selectd.tname=""
          break;
        }
        case "2":
        {
          this.search_selectd.tname=this.search
          this.search_selectd.keydescribe=""
          this.search_selectd.keyword=""
          break;
        }
        case "3":
        {
          this.search_selectd.keydescribe=this.search
          this.search_selectd.tname=""
          this.search_selectd.keyword=""
          break;
        }
        default:
        {
          break;
        }
      }
      API({
        url: '/selectExamination',
        method: 'get',
        params: {
          page: default_current_page,
          limit: this.pageSize,
          keyword: this.search_selectd.keyword,
          tname: this.search_selectd.tname,
          keydescribe: this.search_selectd.keydescribe,
        }
      }).then((res) => {
        this.TestPaperData.list = res.data;
        this.total=res.data.count
      })
      this.loading=false
    }
  },
  mounted() {
    // 在mounted钩子中调用getData
    this.SearchTestPaperData(1);
  }
};



</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>