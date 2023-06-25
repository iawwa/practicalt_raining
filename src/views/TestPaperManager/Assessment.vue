<template>
  <div v-for="item in TestPaperData.list.data" style="display: flex">
    <p>{{item.ename}}</p>
    <image src="getImageUrl(item.image)"></image>
    <el-image :src="getImageUrl(item.image)"></el-image>


  </div>
</template>



<script lang="ts">
import API from "../../axios/request";
import {Action, ElButton, ElDialog, ElInput, ElMessage, ElMessageBox} from "element-plus";
import {CircleCloseFilled, Search} from "@element-plus/icons-vue";
import { ElImage } from 'element-plus';

export default {
  data() {
    return {
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
    ElInput,ElButton, CircleCloseFilled, ElDialog,ElImage,
  },
  methods: {
    getImageUrl(blob) {
      console.log(blob)
      let blobuse = new Blob([blob]);
      let url = window.URL.createObjectURL(blobuse);
      return url;



      },
    // 打开试卷
    handleOpen(eid) {
      this.$router.push({ path: '/DoTestPaper', query: { eid } });
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