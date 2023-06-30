<template>
  <el-container style=" height: 100%;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);margin: 10px">
    <el-main style="padding: 0px;height: auto">
      <el-table
          :data="TestPaperData.data"
          v-loading="loading"
          style="width: 100%;height:auto;">
        <el-table-column label="试卷ID" prop="eid"  />
        <el-table-column label="试卷名字" prop="ename" />
        <el-table-column label="描述" prop="edescribe" />
        <el-table-column label="教师名字" prop="teacher.tname"  />
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
                    <el-option label="试卷" value="1" />
                    <el-option label="教师" value="2" />
                    <el-option label="描述" value="3" />
                  </el-select>
                </template>
                <template #append>
                  <el-button :icon="Search" @click="SearchTestPaperData()" style="background-color: #931414;color: white" />
                </template>
              </el-input>

            </div>


          </template>

          <template #default="scope">
            <el-button
                size="small"
                type="success"
                style="border: 0px;background-color: #298123"
                @click="handleOpen(scope.row.eid,scope.row.ename)">打开
            </el-button>
            <el-button
                :disabled="!(is_admin||is_teacher)"
                size="small"
                style="background-color: white;border: 1px solid #8c2222;color: black"
                type="default"
                @click="handleEdit(scope.row.eid, scope.row.ename,scope.row.edescribe)">编辑</el-button>

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
                    :disabled="!(is_admin||is_teacher)"
                    style="background-color:#8c2222;border: 0px"
                >删除</el-button>
              </template>
            </el-popconfirm>


          </template>
        </el-table-column>
      </el-table>

    </el-main>


    <el-footer >
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
    </el-footer>


  </el-container>
  <transition name="el-fade-in">
    <el-dialog v-model="visible" style="height: auto;width: 600px;border-radius: 10px 10px 10px 10px" :show-close="false" custom-class="my-dialog">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <el-form class="my-form">
            <div class="form-row">
              <el-text class="form-label">试卷ID:</el-text>
              <el-text class="form-input">{{ editParm.currentTestPageID }}</el-text>
            </div>
            <div class="form-row">
              <el-text class="form-label">试卷名字:</el-text>
              <el-input
                  style="margin-left: 20px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);border-radius: 5%"
                  type="text" v-model="editParm.currentTestPageName" placeholder="请输入试卷名字"></el-input>
            </div>
            <div class="form-row">
              <el-text class="form-label">试卷描述:</el-text>
              <el-input
                  class="form-textarea"
                  style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);border-radius: 5%"
                  type="textarea"
                  v-model="editParm.currentTestPageDescribe"
                  placeholder="请输入试卷描述"
                  :rows="7"
              ></el-input>
            </div>
            <div class="button-row">
              <el-button
                  class="MyElButton"
                  round
                  style="float: right;
              background-color: #298123;
              color: white;
              border: 0px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"
                  type="primary"
                  @click="submitUpdate"><el-icon><Check /></el-icon></el-button>
              <el-button
                  class="MyElButton"
                  round
                  style="float: right;
              background-color: #856629;
              color: white;
              border: 0px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"
                  type="primary"
                  @click="visible2=true"><el-icon><Edit /></el-icon></el-button>

              <el-button
                  round
                  class="MyElButton"
                  style="float: right;
              background-color: #8c2222;
              color: white;
              border: 0px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"
                  type="primary"
                  @click="close"><el-icon><Close /></el-icon></el-button>
            </div>
          </el-form>

        </div>
      </template>

    </el-dialog>
  </transition>

  <transition name="el-fade-in">
    <el-dialog v-model="visible2" style="width: 60%;height: auto;border-radius: 10px 10px 10px 10px" :show-close="false" custom-class="my-dialog">
      <el-table
          :data="questions"
          style="width: 100%;height:auto;">

<!--        <el-table-column label="试卷号" prop="eid" />-->
        <el-table-column label="题号" prop="qid" width="100" />
<!--        <el-table-column label="题目类型" prop="qtype"  />-->
        <el-table-column label="题目正文" prop="qdescribe"  />
        <el-table-column label="答案" prop="answer"  />
<!--        <el-table-column label="A" prop="a"  />-->
<!--        <el-table-column label="B" prop="b"  />-->
<!--        <el-table-column label="C" prop="c"  />-->
<!--        <el-table-column label="D" prop="d"  />-->

        <!--   Integer eid, Integer qid, String qdescribe, String answer,Integer point,Integer qtype,String a,String b,String c,String d-->
        <el-table-column align="right" >
          <template #default="scope">
            <el-button
                size="small"
                style="background-color: white;border: 1px solid #8c2222;color: black"
                type="default"
                @click="EditQuestion(scope.row.eid, scope.row.qid,scope.row.qdescribe,scope.row.answer,scope.row.point,scope.row.qtype,scope.row.a,scope.row.b,scope.row.c,scope.row.d)">编辑</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!--    eid, Integer qid, String qdescribe, String answer,Integer point-->

    </el-dialog>
  </transition>

  <transition name="el-fade-in">
    <el-dialog v-model="visible3"
               style="padding: 3px;
               height: auto;
               width: 90vh;
               box-shadow: 3px 2px 4px rgba(0, 0, 0, 0.2);
               border-radius: 5%" :show-close="false" custom-class="my-dialog">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <el-form class="my-form">
            <div class="form-row">
              <el-text class="form-label">试卷ID:</el-text>
              <el-text class="form-input">{{ questEditParm.currentQuestionEid }}</el-text>
            </div>
            <div class="form-row">
              <el-text class="form-label">题号:</el-text>
              <el-text class="form-input">{{ questEditParm.currentQuestionQID }}</el-text>
            </div>

            <div class="form-row">
              <el-text class="form-label">题目类型:</el-text>
              <el-select v-model="questEditParm.currentQuestionQtype" placeholder="题目类型" style="width: 100px;">
                <el-option label="判断题" value="0"></el-option>
                <el-option label="单选题" value="1"></el-option>
                <el-option label="填空题" value="2"></el-option>
              </el-select>
            </div>

            <div class="form-row">
              <el-text class="form-label">题目正文:</el-text>
              <el-input
                  class="form-textarea"
                  style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);border-radius: 5%"
                  type="textarea"
                  v-model="questEditParm.currentQuestionDescribe"
                  placeholder="请输入题目描述"
                  :rows="7"
              ></el-input>
            </div>

            <div class="form-row">
              <el-text class="form-label">题目答案:</el-text>
              <el-input
                  v-if="questEditParm.currentQuestionQtype==2"
                  style="margin-left: 20px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);border-radius: 5%"
                  type="text" v-model="questEditParm.currentQuestionAnswer" placeholder="请输入题目答案"></el-input>
              <el-select v-if="questEditParm.currentQuestionQtype==0" v-model="questEditParm.currentQuestionAnswer" placeholder="答案" style="width: 100px;">
                <el-option label="√" value="a"></el-option>
                <el-option label="×" value="b"></el-option>
              </el-select>
              <el-select v-if="questEditParm.currentQuestionQtype==1" v-model="questEditParm.currentQuestionAnswer" placeholder="答案" style="width: 100px;">
                <el-option label="A" value="a"></el-option>
                <el-option label="B" value="b"></el-option>
                <el-option label="C" value="c"></el-option>
                <el-option label="D" value="d"></el-option>
              </el-select>
            </div>

            <div class="form-row">
              <el-text class="form-label">题目分数:</el-text>
              <el-input-number
                  :min="0"
                  style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);border-radius: 5%"
                  v-model="questEditParm.currentQuestionPoint" placeholder="请输入题目答案"></el-input-number>
            </div>



            <div class="form-row" v-if="questEditParm.currentQuestionQtype==1">
              <el-text class="form-label">A:</el-text>
              <el-input
                  style="margin-left: 20px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);border-radius: 5%"
                  type="text" v-model="questEditParm.currentQuestionA" placeholder="内容"></el-input>
            </div>
            <div class="form-row" v-if="questEditParm.currentQuestionQtype==1">
              <el-text class="form-label">B:</el-text>
              <el-input
                  style="margin-left: 20px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);border-radius: 5%"
                  type="text" v-model="questEditParm.currentQuestionB" placeholder="内容"></el-input>
            </div>
            <div class="form-row" v-if="questEditParm.currentQuestionQtype==1">
              <el-text class="form-label">C:</el-text>
              <el-input
                  style="margin-left: 20px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);border-radius: 5%"
                  type="text" v-model="questEditParm.currentQuestionC" placeholder="内容"></el-input>
            </div>
            <div class="form-row" v-if="questEditParm.currentQuestionQtype==1">
              <el-text class="form-label">D:</el-text>
              <el-input
                  style="margin-left: 20px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);border-radius: 5%"
                  type="text" v-model="questEditParm.currentQuestionD" placeholder="内容"></el-input>
            </div>



            <div class="button-row">
              <el-button
                  class="MyElButton"
                  round
                  style="float: right;
              background-color: #298123;
              color: white;
              border: 0px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"
                  type="primary"
                  @click="SubmitQuestionEdit"><el-icon><Check /></el-icon></el-button>

              <el-button
                  round
                  class="MyElButton"
                  style="float: right;
              background-color: #8c2222;
              color: white;
              border: 0px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"
                  type="primary"
                  @click="close"><el-icon><Close /></el-icon></el-button>
            </div>
          </el-form>

        </div>
      </template>

    </el-dialog>
  </transition>
</template>



<script lang="ts">
import API from "../../axios/request";
import {Action, ElButton, ElDialog, ElInput, ElMessage, ElMessageBox, ElNotification} from "element-plus";
import {CircleCloseFilled, Search} from "@element-plus/icons-vue";



export default {
  data() {
    return {
      // 0:管理员1:教师2:学生
      is_studnet:false,
      is_admin:false,
      is_teacher:false,
      search_selectd:{
        keyword:"",
        tname:"",
        keydescribe:"",
        chose:"1",
      },
      visible:false,
      visible2:false,
      visible3:false,
      search: "",
      TestPaperData:"",
      total:0,
      currentPage:1,
      pageSize:12,
      editParm:{
        currentTestPageID:1,
        currentTestPageName:"",
        currentTestPageDescribe:"",
      },
      loading:true,
      //存放当前题目
      questions:[],
      // Integer eid, Integer qid, String qdescribe, String answer,Integer point,Integer qtype,String a,String b,String c,String d
      questEditParm:
          {
            currentQuestionQID:"",
            currentQuestionDescribe:"",
            currentQuestionAnswer:"",
            currentQuestionPoint:"",
            currentQuestionEid:"",
            currentQuestionQtype:"",
            currentQuestionA:"",
            currentQuestionB:"",
            currentQuestionC:"",
            currentQuestionD:"",
          }
    }
  },
  computed: {
    Search() {
      return Search
    },
    ElInput,ElButton, CircleCloseFilled, ElDialog,
  },
  methods: {
    rowClassName({ rowIndex }) {
      return rowIndex % 2 === 0 ? 'row-color-even' : 'row-color-odd';
    },
    // 打开试卷
    handleOpen(eid,ename) {
      this.$router.push({ path: '/DoTestPaper', query: { eid,ename } });
    },
    //编辑题目
    EditQuestion(a,b,c,d,e,f,g,h,i,k)
    {

      this.visible3=true;
      this.questEditParm.currentQuestionEid=a;
      this.questEditParm.currentQuestionQID=b;
      this.questEditParm.currentQuestionDescribe=c;
      this.questEditParm.currentQuestionAnswer=d;
      this.questEditParm.currentQuestionPoint=e;
      this.questEditParm.currentQuestionQtype=f;
      this.questEditParm.currentQuestionA=g;
      this.questEditParm.currentQuestionB=h;
      this.questEditParm.currentQuestionC=i;
      this.questEditParm.currentQuestionD=k;
    },
    SubmitQuestionEdit()
    {
      console.log("this.questEditParm",this.questEditParm)
      API({
        url: '/updateQuestionById',
        method: 'post',
        params: {
          eid: this.questEditParm.currentQuestionEid,
          qid: this.questEditParm.currentQuestionQID,
          qdescribe: this.questEditParm.currentQuestionDescribe,
          answer: this.questEditParm.currentQuestionAnswer,
          point: this.questEditParm.currentQuestionPoint,
          qtype: this.questEditParm.currentQuestionQtype,
          a: this.questEditParm.currentQuestionA,
          b: this.questEditParm.currentQuestionB,
          c: this.questEditParm.currentQuestionC,
          d: this.questEditParm.currentQuestionD,
        }
      }).then((res) => {
        ElMessageBox.alert(res.data.msg, '提示', {
          confirmButtonText: '确认',})
      })

    },
    // 编辑试卷
    handleEdit(a,b,c) {
      this.visible = true
      this.editParm.currentTestPageID=a
      this.editParm.currentTestPageName=b
      this.editParm.currentTestPageDescribe=c
      API({
        url: '/selectQuestionByEid',
        method: 'get',
        params: {
          eid: a,
        }
      }).then((res) => {
        this.questions = res.data.data;
        console.log("this.questions",this.questions)
      });
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
        // ElMessageBox.alert(res.data.msg, '提示', {
        //   confirmButtonText: '确认',})
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
        this.TestPaperData = res.data;
        this.total=res.data.count
        console.log("res.data",res.data)
      })
      this.loading=false
    }
  },
  mounted() {
    // 在mounted钩子中调用getData
    this.SearchTestPaperData(1);
    let current_role=this.$cookies.get("role");
    switch(current_role){
      case "student":
      {
        this.is_studnet=true
        break
      }
      case "teacher":
      {
        this.is_teacher=true
        break
      }
      case "manager":{
        this.is_admin=true
        break
      }
    }
    console.log(this.$cookies.get("data"));
    console.log(this.$cookies.get("role"))
  }
};



</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.my-dialog {
  width: auto;
}

.my-header {
  padding: 20px;
}

.my-form {
  display: grid;
  gap: 20px;
}

.form-row {
  display: flex;
  align-items: center;
}

.form-label {
  font-size: 16px;
  width: 100px;
}

.form-input {
  font-size: 16px;
  flex-grow: 1;
}

.form-textarea {
  width: 400px;
  resize: vertical;
}

.button-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}


</style>