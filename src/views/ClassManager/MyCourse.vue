<template>
    <el-container style=" height: 100%;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);margin: 10px">
      <el-main style="padding: 0px;height: auto">
        <el-table
            :data="videoPaperData[0]"
            v-loading="loading"
            style="width: 100%;height:auto;">
          <el-table-column label="班级ID" prop="cid"  />
          <el-table-column label="视频ID" prop="vid" />
          <el-table-column label="视频名称" prop="vname" />
          <!-- <el-table-column label="教师名字" prop="teacher.tname"  /> -->
          <el-table-column align="right" >
            <template #header>
              <div style="display: flex; align-items: center;text-align: left">
                <el-button
                      size="small"
                      type="danger"
                      :disabled="!is_teacher"
                      v-if="is_teacher"
                      @click="handleAdd()"
                      style="background-color:#298123;border: 0px;margin-right: 10px;"
                  >添加</el-button>
  
                <!-- <el-input
                    v-model="search"
                    placeholder="查询视频名称"
                    class="input-with-select"
                >
                  <template #append>
                    <el-button :icon="Search" @click="SearchVideoData()" style="background-color: #931414;color: white" />
                  </template>
                </el-input> -->
  
              </div>
  
  
            </template>
  
            <template #default="scope">
              <el-button
                  size="small"
                  type="success"
                  style="border: 0px;background-color: #298123"
                  @click="handleOpen(scope.row.vid,scope.row.vlink)">打开
              </el-button>
              <el-button
                  :disabled="!(is_admin||is_teacher)"
                  v-if="is_teacher"
                  size="small"
                  style="background-color: white;border: 1px solid #8c2222;color: black"
                  type="default"
                  @click="handleEdit(scope.row)">编辑</el-button>
  
              <el-popconfirm
                  width="220"
                  confirm-button-text="确认"
                  cancel-button-text="不"
                  icon="el-icon-info"
                  icon-color="#626AEF"
                  title="你确认要删除吗"
                  @confirm="handleDelete(scope.row.vid)"
              >
                <template #reference>
                  <el-button
                      size="small"
                      type="danger"
                      :disabled="!(is_admin||is_teacher)"
                      v-if="is_teacher"
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
  
    <!-- 编辑弹窗 -->
    <transition name="el-fade-in">
      <el-dialog v-model="visible" style="height: auto;width: 600px;border-radius: 10px 10px 10px 10px" :show-close="false" custom-class="my-dialog">
        <template #header="{ close, titleId, titleClass }">
          <div class="my-header">
            <el-form class="my-form">
              <!-- <div class="form-row">
                <el-text class="form-label">班级ID:</el-text>
                <el-input
                    style="margin-left: 20px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);border-radius: 5%"
                    type="text" v-model="editParm.cid" placeholder="请输入班级ID"></el-input>
              </div> -->
              <div class="form-row">
                <el-text class="form-label">视频ID:</el-text>
                <el-input
                    style="margin-left: 20px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);border-radius: 5%"
                    type="text" v-model="editParm.vid" disabled placeholder="请输入视频ID"></el-input>
              </div>
  
              <div class="form-row">
                <el-text class="form-label">视频名称:</el-text>
                <el-input
                    style="margin-left: 20px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);border-radius: 5%"
                    type="text" v-model="editParm.vname" placeholder="请输入视频名称"></el-input>
              </div>
  
              <!-- <div class="form-row">
                <el-text class="form-label">教师名字:</el-text>
                <el-input
                    style="margin-left: 20px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);border-radius: 5%"
                    type="text" v-model="editParm.tname" placeholder="请输入教师名字"></el-input>
              </div>
  
              <div class="form-row">
                <el-text class="form-label">视频上传:</el-text>
                <el-upload
                  :auto-upload="true"
                  action="/uploadVideo"
                  :http-request="uploadFile"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :show-file-list="false"
                  :on-change="onchange"
                  class="avatar-uploader"
                >
                  <el-button class="btn"><i class="el-icon-paperclip"></i>上传视频</el-button>
                </el-upload>
              </div> -->
  
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
  
    <!-- 添加弹窗 -->
    <transition name="el-fade-in">
      <el-dialog v-model="visible2" style="padding: 0px;height: auto;width: 600px;border-radius: 10px 10px 10px 10px" :show-close="false" custom-class="my-dialog">
        <template #header="{ close, titleId, titleClass }">
          <div class="my-header">
            <el-form class="my-form">
              <div class="form-row">
                <el-text class="form-label">班级ID:</el-text>
                <el-input
                    style="margin-left: 20px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);border-radius: 5%"
                    type="text" v-model="addParm.cid" placeholder="请输入班级ID"></el-input>
              </div>
<!--              <div class="form-row">-->
<!--                <el-text class="form-label">视频ID:</el-text>-->
<!--                <el-input-->
<!--                    style="margin-left: 20px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);border-radius: 5%"-->
<!--                    type="text" v-model="addParm.vid" placeholder="请输入视频ID"></el-input>-->
<!--              </div>-->
  
              <div class="form-row">
                <el-text class="form-label">视频名称:</el-text>
                <el-input
                    style="margin-left: 20px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);border-radius: 5%"
                    type="text" v-model="addParm.vname" placeholder="请输入视频名称"></el-input>
              </div>
  
              <!-- <div class="form-row">
                <el-text class="form-label">教师名字:</el-text>
                <el-input
                    style="margin-left: 20px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);border-radius: 5%"
                    type="text" v-model="addParm.tname" placeholder="请输入教师名字"></el-input>
              </div> -->
  
              <div class="form-row">
                <el-text class="form-label">视频上传:</el-text>
                <el-upload
                  :auto-upload="false"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :show-file-list="false"
                  :on-change="onchange"
                  class="avatar-uploader"
                >
                  <el-button class="btn"><i class="el-icon-paperclip"></i>上传视频</el-button>
                </el-upload>
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
                    @click="SubmitAdd"><el-icon><Check /></el-icon></el-button>
  
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
  
    <!-- 播放弹窗 -->
    <transition name="el-fade-in">
      <el-dialog v-model="visible3" style="padding: 0px;height: auto;width: 600px;border-radius: 10px 10px 10px 10px" :show-close="false" custom-class="my-dialog">
        <template #header="{ close, titleId, titleClass }">
          <!-- controls  //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。 -->
          <!-- autoplay = "muted", //自动播放属性,muted:静音播放。 -->
          <!-- preload="auto" //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。 -->
          <!-- poster="../assets/images/logo.svg"> //设置视频封面。 -->
          <!-- :src="这里后台传回来的视频链接地址" -->
          <div class="my-header">
            <Video id="myVideo"       
              class="videoClass" 
              controls
              autoplay="muted"
              preload="auto"
              :src="vlink"
              >     
              <!-- <source id="video" :src="vlink" type="video/mp4" > -->
            </Video>
          </div>
  
          <div class="button-row">
                
                <el-button
                    round
                    class="MyElButton"
                    style="float: right;
                  background-color: #8c2222;
                  color: white;
                  border: 0px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"
                    type="primary"
                    @click="visible3 = false"><el-icon><Close /></el-icon></el-button>
              </div>
        </template>
  
      </el-dialog>
    </transition>
  
  </template>
  
  
  
  <script lang="ts">
  import API from "../../axios/request";
  import {Action, ElButton, ElDialog, ElInput, ElMessage, ElMessageBox, ElNotification} from "element-plus";
  import {CircleCloseFilled, Search} from "@element-plus/icons-vue";
  import Video from 'video.js'
  
  
  export default {
    data() {
      return {
        // 0:管理员1:教师2:学生
        is_studnet:false,
        is_admin:false,
        is_teacher:false,
        visible:false,
        visible2:false,
        visible3:false,
        search: "",
        videoPaperData:"",
        total:0,
        currentPage:1,
        pageSize:12,
        addParm:{
          cid:0,
          vid:0,
          vname:'',
          vlink:'',
        },
        fileList: [],
        editParm:{
          cid:0,
          vid:0,
          vname:'',
          vlink:'',
          tname:''
        },
        loading:true,
        vlink:'',
        cid:"",
      }
    },
    computed: {
      Search() {
        return Search
      },
      ElInput,ElButton, CircleCloseFilled, ElDialog,
    },
    methods: {
      // 打开视频
      handleOpen(vid,vlink) {
        console.log("link============",vlink);
        this.vlink = "";
        this.vlink = "http://" + vlink 
        this.visible3 = true;
        // this.$router.push({ path: '/DoTestPaper', query: { eid,ename } });
      },
      // 添加信息
      handleAdd(){
        this.visible2 = true;
      },
      handleRemove(file, fileList) {
        this.fileList = fileList;
      },
      handlePreview(file) {
        // console.log(file);
      },
      onchange(file, fileList) {
        this.fileList = fileList;
      },
      // 上传文件
      uploadFile() {
        const url = '/uploadVideo'; // 后端接口的URL
        const requestData = new FormData();
        let that = this;
        requestData.append('vid', this.addParm.vid);
        requestData.append('vname', this.addParm.vname);
        requestData.append('cid', this.addParm.cid);
        if (this.fileList.length > 0) {
          requestData.append('videoFile', this.fileList[0].raw);
        }
        API({
          url: url,
          method: 'post',
          data: requestData,
          headers: {
            'Content-Type': 'video/mp4', // 设置请求头为 multipart/form-data
          },
        }).then((res) =>{
            that.SearchVideoData(that.currentPage);
            ElMessageBox.alert(res.data.msg, '提示', {
              confirmButtonText: '确认',
            })
        }
        );
      },
      // 添加提交
      SubmitAdd(){
        this.visible2=false;
        let that= this;
        that.uploadFile();
        // API({
        //   url: '/addVideo',
        //   method: 'get',
        //   params: this.addParm
        // }).then((res) => {
            
        //   ElMessageBox.alert(res.data.msg, '提示', {
        //     confirmButtonText: '确认',})
        // })
  
        this.SearchVideoData(this.currentPage);
      },
  
      // 编辑信息
      handleEdit(editData) {
        this.visible = true;
        this.editParm.vid = editData.vid;
        this.editParm.vname = editData.vname;
      },
  
      // 编辑提交
      submitUpdate(){
        this.visible=false
        API({
          url: '/updateVideoByVid',
          method: 'get',
          params: {
            vid: this.editParm.vid,
            vname:this.editParm.vname,
          }
        }).then((res) => {
          ElMessageBox.alert("操作成功", '提示', {
            confirmButtonText: '确认',})
        })
  
        this.SearchVideoData(this.currentPage);
  
      },
  
      // 删除
      handleDelete(vid) {
        let that = this;
        API({
          url: '/delectVideoByVid',
          method: 'delete',
          params: {
            vid: vid,
          }
        }).then((res) => {
            that.SearchVideoData(that.currentPage);
          ElMessageBox.alert("操作成功", '提示', {
            confirmButtonText: '确认',})
        })
        
  
      },
  
      // 页数更换
      handleCurrentChange(number)
      {
        this.currentPage=number
        this.SearchVideoData(number)
      },
  
      // 查询
      SearchVideoData(default_current_page=this.currentPage) {
        this.loading=true;
        let current_data=this.$cookies.get("data");
        let obj = {}
        if(this.is_studnet){
          API({
            url: '/class/yijiaru',
            method: 'get',
            params: {pageNum:1,pageSize:100}
          }).then((res) => {
            console.log(res)
             console.log("======",res)
            let datastudent = res.data;
            console.log("current_data====",datastudent)
            datastudent.forEach(el => {
              console.log(44444);
                console.log("aaa",el)

                console.log("el.cid",el.cid)
                API({
                  url: '/selectVideoByCid',
                  method: 'get',
                  params:{
                    cid:this.cid,
                  }
                }).then((res) => {
                  this.videoPaperData = [res.data];
                  this.total=this.videoPaperData.length
                  console.log("res.data",res.data)
                })
              
            }
            );
          })
        }else{
          // 取cid
          API({
            url: '/selectAllClass',
            method: 'get',
            params: {pageNum:1,pageSize:100}
          }).then((res) => {
             console.log("======",res)
            let data = res.data;
            console.log("current_data====",current_data)
            data.forEach(el => {

              if(el.tid == current_data.tid){
                API({
                  url: '/selectVideoByCid',
                  method: 'get',
                  params:{
                    cid:this.cid,
                  }
                }).then((res) => {
                  this.videoPaperData = [res.data];
                  this.total=this.videoPaperData.length
                  console.log("res.data",res.data)
                })
              }
            });
          })
        }

        this.loading=false
      }
  
    },
  
    // 初始化函数
    mounted() {
      // 在mounted钩子中调用getData
      this.cid=this.$route.query.cid
      let current_role=this.$cookies.get("role");
      console.log(this.$cookies.get("role"))
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
      this.SearchVideoData(1);
      console.log(this.$cookies.get("data"));
      
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
  
  .videoClass{
    height: 100%;
    width: 100%;
  }
  </style>