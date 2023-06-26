<template>
  <el-form>
    <el-upload class="upload-demo" action="#" :auto-upload="false" :on-preview="handlePreview"
               :on-remove="handleRemove" :file-list="fileList" :on-change="onchange" list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <!-- 不能放在el-upload组件里面，否则会弹出选择框，与点击上传的效果一样 -->
    <el-button @click="onsumit" size="small" type="primary">上传</el-button>
  </el-form>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      //用来绑定加入的图片，后续用大图片
      dialogImageUrl: '',
      dialogVisible: false,
      //用来接收缓存中的图片
      fileList: []
    };
  },
  methods: {
    handleRemove(file, fileList) { //文件列表移除文件时的钩子
      console.log(file, fileList);
      console.log(file.raw)
    },
    handlePreview(file) { //点击文件列表中已上传的文件时的钩子
      // console.log(file);
    },
    onchange(file, fileList) {
      // console.log("上传时的动作")
      // console.log(file, fileList);
      // console.log(file.raw)
      // fileList.push('file', file.raw);
      this.fileList = fileList;//每一个改变都会将el-upload里面的图片传递的参数复制到this.filelist去
    },
    onsumit() { //上传
      let formData = new FormData();
      for (let i = 0; i < this.fileList.length; i++) {
        //this.fileList[i].raw:获取图片格式
        //这里的file必须和后端Controller中的requestparam参数一致，才能上传成功，否则会报400错误
        formData.append("file", this.fileList[i].raw, this.fileList[i].name);
      }
      formData.append('uploadrole', "lizy");
      console.log(formData)
      //这里重新创建了一个axios实例,是因为我在全局配置里的Content-type是appliacation/json,而这里我想要使用multipart/form-data
      const http1 = axios.create({
        headers: {
          // 'Content-Type': 'multipart/form-data'
          "Content-Type": "multipart/form-data"
        }
      })
      http1({
        url: 'http://localhost:8080/uploadMenucolumn',
        method: 'post',
        data: formData
      })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }
}
</script>

<style>
</style>
