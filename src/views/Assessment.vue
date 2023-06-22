<template>
  <el-button @click="visible = true">
    Open Dialog with customized header
  </el-button>
  <el-dialog v-model="visible" :show-close="false">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">

        <el-form>
          1:<el-input type="text">修改</el-input>
          2:<el-input type="text">修改</el-input>
          3:<el-input type="text">修改</el-input>
          <el-button type="danger" @click="close">
            <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
            save
          </el-button>
          <el-button type="danger" @click="close">
            <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
            Close
          </el-button>
        </el-form>
      </div>
    </template>
    This is dialog content.
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CircleCloseFilled } from '@element-plus/icons-vue'

const visible = ref(false)
</script>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>