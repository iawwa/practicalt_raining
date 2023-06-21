<template>
  <el-container>
    <el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="ID" prop="id" />
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="性别" prop="sex" />
        <el-table-column label="年龄" prop="age" />
        <el-table-column label="电话" prop="phone" />
        <el-table-column label="地址" prop="address" />
        <el-table-column align="right">
          <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template>
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-footer>
      <div class="example-pagination-block">
        <div class="example-demonstration">When you have few pages</div>
        <el-pagination layout="prev, pager, next" :total="50" />
      </div>
    </el-footer>

  </el-container>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'

import User_pic from "../components/user_pic.vue";
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
interface User {
  id:number;
  name: string;
  sex: string
  phone:number;
  address: string;
}

const search = ref('')

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}


const person = {
  id:1,
  name:"iawwa",
  sex:"male",
  age:"500",
  phone:110,
  address:"mars"
}
const tableData = ref(Array.from({ length:12}).fill(person))
</script>