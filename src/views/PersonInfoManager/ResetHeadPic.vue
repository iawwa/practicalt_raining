<template>
  <div class="image-upload">
    <h2 class="image-upload__title">Upload Image</h2>
    <div class="image-upload__form-group">
      <label for="image" class="image-upload__label">Select an image file:</label>
      <input type="file" ref="fileInput" id="image" name="image" class="image-upload__input" accept="image/*" required>
    </div>
    <button type="submit" class="image-upload__submit-btn" @click="uploadImage">Upload</button>
    <div v-if="imageURL" class="image-upload__preview">
      <img :src="imageURL" alt="Preview">
    </div>
  </div>
</template>

<script>
import API from "../../axios/request";

export default {
  data() {
    return {
      imageURL: null
    };
  },
  methods: {
    // 上传图像文件
    uploadImage() {
      const file = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append("multipartFile", file);
      let url="";
      this.userRole = this.$cookies.get("role")
      switch (this.userRole) {
        case "student":
          url="/updateStuImageData"
          break;
        case "teacher":
          url="/updateTeaImageData"
          break;
        case "manager":
          url="/updateImageData"
          break;
        default:
          break;
      }
      API({
        url: url,
        method: "post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then((res) => {
        console.log("res", res);
        this.imageURL = "data:image/png;base64," + res.imageBase64;
      }).catch((err) => {
        console.log("err", err);
      })
    }
  }
};
</script>

<style scoped>
.image-upload {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.image-upload__title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.image-upload__form-group {
  margin-bottom: 20px;
}

.image-upload__label {
  display: block;
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.image-upload__input {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.image-upload__submit-btn {
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.image-upload__preview {
  margin-top: 20px;
  text-align: center;
}

.image-upload__preview img {
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .image-upload {
    padding: 20px;
  }
}
</style>