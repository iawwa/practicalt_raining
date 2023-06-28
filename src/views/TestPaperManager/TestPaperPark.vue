<template>
 <el-container>
   <el-main style="height:590px;padding: 0px">
    <div v-for="(item, index) in TestPaperData.data" :key="index" style="background-color: #ffffff; display: flex;">
      <div class="row" v-if="index % 3 === 0">
        <div v-for="subItem in TestPaperData.data.slice(index, index + 3)" :key="subItem.id" class="item">
          <el-container
              class="active-container"
              style="cursor: pointer;
              background-color: #dad5d5;
              width: 390px;height: 185px;
              margin:5px;
              margin-left: 25px;
              border: 2px solid #dad5d5;
              border-radius: 20px 20px 20px 20px"
            @click="handleOpen(subItem.eid,subItem.ename)"
          >
            <el-aside style="display: flex;width: 185px;">
              <el-image
                  :src="getImageUrl(subItem.image)"
                  style="width: auto;height: auto;
                  border: 2px solid #dad5d5;
                  border-radius: 10%"
                  class="active-image"
              >
              </el-image>

            </el-aside>
            <el-main style="width: 205px;display: flex; flex-direction: column;">
              <el-text style="text-align: center;color: black;font-size: 20px;font-family: 'Ma Shan Zheng', cursive;">{{ subItem.ename }}</el-text>
              <el-text style="text-align: center;font-family: 'ZCOOL XiaoWei', cursive;">{{subItem.teacher.tname}}</el-text>
              <el-text style="text-align: center;">{{subItem.edescribe}}</el-text>
            </el-main>
          </el-container>

        </div>
      </div>
    </div>
   </el-main>
   <el-footer>
      <el-pagination
          :background="true"
          :page-size="pageSize"
          :total="total"
          layout=" prev, pager, next"
          @current-change="handleCurrentChange"
          class="pagination"
          style="margin-top: auto;"
      />
   </el-footer>
 </el-container>

</template>



<script lang="ts">
import API from "../../axios/request";
import {Action, ElButton, ElDialog, ElInput, ElMessage, ElMessageBox} from "element-plus";
import {CircleCloseFilled, Search} from "@element-plus/icons-vue";
import { ElImage } from 'element-plus';

export default {
  data() {
    return {
      ElMainMyStyle:"",
      image_data:"",
      // 0:管理员1:教师2:学生
      current_role:"0",
      search_selectd:{
        keyword:"",
        tname:"",
        keydescribe:"",
        chose:"1",
      },
      visible:false,
      search: "",
      TestPaperData:"",
      total:0,
      currentPage:1,
      pageSize:9,
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
    ElInput,ElButton, CircleCloseFilled, ElDialog,ElImage,
  },
  methods: {
    getImageUrl(blob) {
      console.log(blob);
      let url = 'data:' + 'image/png' + ';base64,' + blob;
      return url;
      },
    // 打开试卷
    handleOpen(eid,ename) {
      this.$router.push({ path: '/DoTestPaper', query: { eid,ename } });
    },
    // 编辑
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
        this.TestPaperData= res.data;
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

.row {
  display: flex;
  justify-content: space-between;
}

.item {
  flex-basis: 23%;
  /* 其他样式属性 */
}


.active-container:hover {
  /* 在鼠标悬停时，添加激活效果的样式 */
  background-color: #ffffff;
  border-color: #000000;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.active-image:hover {
  /* 在鼠标悬停时，添加激活效果的样式 */
  border-color: #000000;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}


</style>

